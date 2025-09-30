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
    // Regex para capturar dias e horários: ex: "2M123" ou "35M12"
    const match = padrao.match(/^(\d+)([MTN])(\d+)$/);
    
    if (match) {
      const [, diasStr, periodo, horariosStr] = match;
      
      // Processar cada dia
      for (const diaChar of diasStr) {
        const diaSemana = diasSemanaMap[diaChar];
        if (diaSemana) {
          // Processar cada horário
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