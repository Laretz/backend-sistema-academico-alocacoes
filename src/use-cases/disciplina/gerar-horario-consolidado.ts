import { AlocacoesRepository } from "../../repositories/alocacoes-repository";

interface GerarHorarioConsolidadoUseCaseRequest {
  disciplinaId: string;
}

interface GerarHorarioConsolidadoUseCaseResponse {
  horarioConsolidado: string;
}

export class GerarHorarioConsolidadoUseCase {
  constructor(private alocacoesRepository: AlocacoesRepository) {}

  async execute({ disciplinaId }: GerarHorarioConsolidadoUseCaseRequest): Promise<GerarHorarioConsolidadoUseCaseResponse> {
    const alocacoes = await this.alocacoesRepository.findByDisciplinaId(disciplinaId);

    if (!alocacoes || alocacoes.length === 0) {
      return { horarioConsolidado: '' };
    }

    // Mapear dias da semana para números
    const diasMap: { [key: string]: string } = {
       'SEGUNDA': '2',
       'TERCA': '3', 
       'QUARTA': '4',
       'QUINTA': '5',
       'SEXTA': '6',
       'SABADO': '7'
     };

    // Agrupar alocações por dia da semana
    const alocacoesPorDia = new Map<string, typeof alocacoes>();
    
    for (const alocacao of alocacoes) {
      if (!alocacao.horario) continue;
      
      const dia = alocacao.horario.dia_semana;
      if (!alocacoesPorDia.has(dia)) {
        alocacoesPorDia.set(dia, []);
      }
      alocacoesPorDia.get(dia)!.push(alocacao);
    }

    // Processar cada dia e gerar padrões de horário
    const padroesPorHorario = new Map<string, string[]>();
    
    for (const [dia, alocacoesDoDia] of alocacoesPorDia) {
      // Ordenar por código do horário para garantir sequência
      alocacoesDoDia.sort((a, b) => a.horario.codigo.localeCompare(b.horario.codigo));
      
      const codigosDia = diasMap[dia];
      if (!codigosDia) continue;
      
      const turno = alocacoesDoDia[0].horario.codigo.charAt(0); // M, T, N
      
      // Verificar se os horários são sequenciais
      const horariosSequenciais = this.verificarSequencialidade(alocacoesDoDia);
      
      if (horariosSequenciais.length > 0) {
         let padraoHorario: string;
         
         if (horariosSequenciais.length === 1) {
           // Aula isolada - usar apenas o número do horário
           const numeroHorario = horariosSequenciais[0].charAt(1);
           padraoHorario = `${turno}${numeroHorario}`;
         } else {
           // Múltiplas aulas - usar formato de intervalo
           const primeiroHorario = horariosSequenciais[0].charAt(1);
           const ultimoHorario = horariosSequenciais[horariosSequenciais.length - 1].charAt(1);
           padraoHorario = `${turno}${primeiroHorario}${ultimoHorario}`;
         }
         
         if (!padroesPorHorario.has(padraoHorario)) {
           padroesPorHorario.set(padraoHorario, []);
         }
         padroesPorHorario.get(padraoHorario)!.push(codigosDia);
       }
    }

    // Gerar horários consolidados agrupando dias consecutivos com mesmo padrão
    const horariosConsolidados: string[] = [];
    
    for (const [padraoHorario, diasCodigos] of padroesPorHorario) {
      if (diasCodigos.length === 1) {
        horariosConsolidados.push(`${diasCodigos[0]}${padraoHorario}`);
      } else {
        // Verificar se os dias são consecutivos
        const diasNumericos = diasCodigos.map(d => parseInt(d)).sort((a, b) => a - b);
        const saoConsecutivos = this.verificarDiasConsecutivos(diasNumericos);
        
        if (saoConsecutivos && diasNumericos.length > 1) {
           const primeiroDay = diasNumericos[0];
           const ultimoDay = diasNumericos[diasNumericos.length - 1];
           horariosConsolidados.push(`${primeiroDay}${ultimoDay}${padraoHorario}`);
         } else {
          // Dias não consecutivos, manter separados
          for (const dia of diasCodigos) {
            horariosConsolidados.push(`${dia}${padraoHorario}`);
          }
        }
      }
    }

    return { horarioConsolidado: horariosConsolidados.join(', ') };
  }

  private verificarSequenciais(numeros: string[]): boolean {
    if (numeros.length <= 1) return false;
    
    for (let i = 1; i < numeros.length; i++) {
      const atual = parseInt(numeros[i]);
      const anterior = parseInt(numeros[i - 1]);
      
      if (atual !== anterior + 1) {
        return false;
      }
    }
    
    return true;
  }

  private verificarSequencialidade(alocacoes: any[]): string[] {
    return alocacoes.map(alocacao => alocacao.horario.codigo);
  }

  private verificarDiasConsecutivos(dias: number[]): boolean {
    if (dias.length <= 1) return true;
    
    for (let i = 1; i < dias.length; i++) {
      if (dias[i] !== dias[i - 1] + 1) {
        return false;
      }
    }
    return true;
  }
}