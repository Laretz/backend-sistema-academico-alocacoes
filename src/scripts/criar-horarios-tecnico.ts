import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Horários do regime Técnico (EAJ)
const horariosDefinidos = {
  M: [
    { inicio: { hora: 7, minuto: 15 }, fim: { hora: 8, minuto: 0 } }, // M1
    { inicio: { hora: 8, minuto: 0 }, fim: { hora: 8, minuto: 45 } }, // M2
    { inicio: { hora: 8, minuto: 45 }, fim: { hora: 9, minuto: 30 } }, // M3
    { inicio: { hora: 9, minuto: 45 }, fim: { hora: 10, minuto: 30 } }, // M4
    { inicio: { hora: 10, minuto: 30 }, fim: { hora: 11, minuto: 15 } }, // M5
    { inicio: { hora: 11, minuto: 15 }, fim: { hora: 12, minuto: 0 } }, // M6
  ],
  T: [
    { inicio: { hora: 13, minuto: 15 }, fim: { hora: 14, minuto: 0 } }, // T1
    { inicio: { hora: 14, minuto: 0 }, fim: { hora: 14, minuto: 45 } }, // T2
    { inicio: { hora: 14, minuto: 45 }, fim: { hora: 15, minuto: 30 } }, // T3
    { inicio: { hora: 15, minuto: 45 }, fim: { hora: 16, minuto: 30 } }, // T4
    { inicio: { hora: 16, minuto: 30 }, fim: { hora: 17, minuto: 15 } }, // T5
    // Se houver T6 no técnico, adicionar aqui
  ],
  // No período noturno não foi informado; caso necessário, adicionar aqui
};

const diasSemana = ["SEGUNDA", "TERCA", "QUARTA", "QUINTA", "SEXTA", "SABADO"];

async function criarHorariosTecnico() {
  console.log("🕐 Criando horários do regime Técnico (EAJ)...");

  try {
    let horariosCreated = 0;

    for (const dia of diasSemana) {
      for (const [turno, horarios] of Object.entries(horariosDefinidos)) {
        for (let i = 0; i < horarios.length; i++) {
          const horario = horarios[i];
          if (!horario) continue;
          const numeroHorario = i + 1;

          const horario_inicio = new Date(
            `1970-01-01T${horario.inicio.hora.toString().padStart(2, "0")}:${horario.inicio.minuto
              .toString()
              .padStart(2, "0")}:00.000Z`
          );
          const horario_fim = new Date(
            `1970-01-01T${horario.fim.hora.toString().padStart(2, "0")}:${horario.fim.minuto
              .toString()
              .padStart(2, "0")}:00.000Z`
          );

          const codigo = `${turno}${numeroHorario}`;

          // Verificar se já existe um horário Técnico igual para o mesmo dia e código
          const existente = await prisma.horario.findFirst({
            where: {
              dia_semana: dia,
              codigo,
              regime: "TECNICO",
            },
          });

          if (!existente) {
            await prisma.horario.create({
              data: {
                dia_semana: dia,
                codigo,
                horario_inicio,
                horario_fim,
                regime: "TECNICO",
              },
            });

            horariosCreated++;
            console.log(
              `✅ [TECNICO] ${dia} ${codigo} (${horario.inicio.hora}:${horario.inicio.minuto
                .toString()
                .padStart(2, "0")} - ${horario.fim.hora}:${horario.fim.minuto
                .toString()
                .padStart(2, "0")})`
            );
          }
        }
      }
    }

    console.log(`\n🎉 Processo concluído! ${horariosCreated} horários técnicos criados.`);

    const totalTecnico = await prisma.horario.count({ where: { regime: "TECNICO" } });
    console.log(`📊 Total de horários (TECNICO) no banco: ${totalTecnico}`);
  } catch (error) {
    console.error("❌ Erro ao criar horários técnicos:", error);
  } finally {
    await prisma.$disconnect();
  }
}

if (require.main === module) {
  criarHorariosTecnico();
}

export { criarHorariosTecnico };