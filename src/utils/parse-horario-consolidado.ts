/**
 * Converte um horário consolidado (ex: "2M123") em uma estrutura de horários
 * @param horarioConsolidado - String como "2M123" ou "35M12T34"
 * @returns Array de objetos com dia da semana e horários
 */
export interface HorarioParseado {
  diaSemana: string;
  horarios: string[];
  horaInicio: string;
  horaFim: string;
}

export function parseHorarioConsolidado(horarioConsolidado: string): HorarioParseado[] {
  if (!horarioConsolidado || horarioConsolidado.trim() === '') {
    return [];
  }

  const resultado: HorarioParseado[] = [];
  
  // Mapear números para dias da semana
  const diasSemanaMap: Record<string, string> = {
    '1': 'DOMINGO',
    '2': 'SEGUNDA',
    '3': 'TERCA',
    '4': 'QUARTA',
    '5': 'QUINTA',
    '6': 'SEXTA',
    '7': 'SABADO'
  };

  // Dividir por vírgula para múltiplos padrões
  const padroes = horarioConsolidado.split(',').map(p => p.trim());

  for (const padrao of padroes) {
    // Regex para capturar dias, período e horários: ex: "23M12" = segunda e terça, manhã, horários 1 e 2
    const match = padrao.match(/^(\d+)([MTN])(\d+)$/);
    
    if (match) {
      const [, diasStr, periodo, horariosStr] = match;
      
      // Processar cada dia
      for (const diaChar of diasStr) {
        const diaSemana = diasSemanaMap[diaChar];
        if (diaSemana) {
          // Cada dia tem todos os horários especificados
          const horarios: string[] = [];
          for (const horarioChar of horariosStr) {
            horarios.push(`${periodo}${horarioChar}`);
          }
          
          // Definir horários padrão baseado no período (cada horário tem 50 minutos)
          let horaInicio = '07:00';
          let horaFim = '07:50';
          
          if (periodo === 'M') { // Manhã
            horaInicio = '07:00';
            const minutosFinais = horarios.length * 50;
            const horasFinais = Math.floor(minutosFinais / 60) + 7;
            const minutosRestantes = minutosFinais % 60;
            horaFim = `${horasFinais.toString().padStart(2, '0')}:${minutosRestantes.toString().padStart(2, '0')}`;
          } else if (periodo === 'T') { // Tarde
            horaInicio = '13:00';
            const minutosFinais = horarios.length * 50;
            const horasFinais = Math.floor(minutosFinais / 60) + 13;
            const minutosRestantes = minutosFinais % 60;
            horaFim = `${horasFinais.toString().padStart(2, '0')}:${minutosRestantes.toString().padStart(2, '0')}`;
          } else if (periodo === 'N') { // Noite
            horaInicio = '19:00';
            const minutosFinais = horarios.length * 50;
            const horasFinais = Math.floor(minutosFinais / 60) + 19;
            const minutosRestantes = minutosFinais % 60;
            horaFim = `${horasFinais.toString().padStart(2, '0')}:${minutosRestantes.toString().padStart(2, '0')}`;
          }
          
          resultado.push({
            diaSemana,
            horarios,
            horaInicio,
            horaFim
          });
        }
      }
    }
  }

  return resultado;
}

/**
 * Converte horário consolidado em formato de aulas por semana
 * @param horarioConsolidado - String como "2M123"
 * @returns Número total de aulas por semana
 */
export function calcularAulasPorSemana(horarioConsolidado: string): number {
  const horarios = parseHorarioConsolidado(horarioConsolidado);
  return horarios.reduce((total, horario) => total + horario.horarios.length, 0);
}

/**
 * Extrai os dias da semana do horário consolidado
 * @param horarioConsolidado - String como "2M123"
 * @returns Array com os nomes dos dias da semana
 */
export function extrairDiasSemana(horarioConsolidado: string): string[] {
  const horarios = parseHorarioConsolidado(horarioConsolidado);
  return [...new Set(horarios.map(h => h.diaSemana))];
}

/**
 * Calcula a data do último dia de aula baseado no horário consolidado
 * @param horarioConsolidado - String como "2M123" ou "56M12"
 * @param dataInicio - Data de início da disciplina
 * @param totalAulas - Total de aulas da disciplina
 * @returns Data do último dia de aula
 */
export function calcularUltimoDiaAula(
  horarioConsolidado: string,
  dataInicio: Date,
  totalAulas: number
): Date | null {
  if (!horarioConsolidado || !dataInicio || totalAulas <= 0) {
    return null;
  }

  // Mapear dias da semana para números do JavaScript (0=domingo, 1=segunda, etc.)
  const diasSemanaMap: Record<string, number> = {
    'DOMINGO': 0,
    'SEGUNDA': 1,
    'TERCA': 2,
    'QUARTA': 3,
    'QUINTA': 4,
    'SEXTA': 5,
    'SABADO': 6
  };

  const horariosParseados = parseHorarioConsolidado(horarioConsolidado);
  
  if (horariosParseados.length === 0) {
    return null;
  }

  // Criar mapa de quantas aulas há em cada dia da semana
  const aulasPorDia = new Map<number, number>();
  horariosParseados.forEach(horario => {
    const diaNumero = diasSemanaMap[horario.diaSemana];
    if (diaNumero !== undefined) {
      const aulasNoDia = horario.horarios.length;
      aulasPorDia.set(diaNumero, (aulasPorDia.get(diaNumero) || 0) + aulasNoDia);
    }
  });

  if (aulasPorDia.size === 0) {
    return null;
  }

  let dataAtual = new Date(dataInicio);
  let aulasContadas = 0;

  // Proteção contra loop infinito
  let iteracoes = 0;
  const maxIteracoes = totalAulas * 10; // Limite seguro

  while (aulasContadas < totalAulas && iteracoes < maxIteracoes) {
    const diaSemanaAtual = dataAtual.getDay();

    // Verificar se há aula neste dia e quantas
    const aulasNesteDia = aulasPorDia.get(diaSemanaAtual) || 0;
    if (aulasNesteDia > 0) {
      aulasContadas += aulasNesteDia;
      
      // Se chegamos ou ultrapassamos o total de aulas, esta é a data de conclusão
      if (aulasContadas >= totalAulas) {
        return new Date(dataAtual);
      }
    }

    // Avançar para o próximo dia
    dataAtual.setDate(dataAtual.getDate() + 1);
    iteracoes++;
  }

  // Se chegou aqui, algo deu errado
  return null;
}