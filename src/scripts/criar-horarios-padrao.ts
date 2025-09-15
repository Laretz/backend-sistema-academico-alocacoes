import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Horários padrão da instituição
const horariosDefinidos = {
    'M': [ // Manhã
        { inicio: { hora: 7, minuto: 0 }, fim: { hora: 7, minuto: 50 } },   // M1
        { inicio: { hora: 7, minuto: 50 }, fim: { hora: 8, minuto: 40 } },  // M2
        { inicio: { hora: 8, minuto: 55 }, fim: { hora: 9, minuto: 45 } },  // M3
        { inicio: { hora: 9, minuto: 45 }, fim: { hora: 10, minuto: 35 } }, // M4
        { inicio: { hora: 10, minuto: 50 }, fim: { hora: 11, minuto: 40 } }, // M5
        { inicio: { hora: 11, minuto: 40 }, fim: { hora: 12, minuto: 30 } }  // M6
    ],
    'T': [ // Tarde
        { inicio: { hora: 13, minuto: 0 }, fim: { hora: 13, minuto: 50 } },  // T1
        { inicio: { hora: 13, minuto: 50 }, fim: { hora: 14, minuto: 40 } }, // T2
        { inicio: { hora: 14, minuto: 55 }, fim: { hora: 15, minuto: 45 } }, // T3
        { inicio: { hora: 15, minuto: 45 }, fim: { hora: 16, minuto: 35 } }, // T4
        { inicio: { hora: 16, minuto: 50 }, fim: { hora: 17, minuto: 40 } }, // T5
        { inicio: { hora: 17, minuto: 40 }, fim: { hora: 18, minuto: 30 } }  // T6
    ],
    'N': [ // Noite
        { inicio: { hora: 18, minuto: 45 }, fim: { hora: 19, minuto: 35 } }, // N1
        { inicio: { hora: 19, minuto: 35 }, fim: { hora: 20, minuto: 25 } }, // N2
        { inicio: { hora: 20, minuto: 35 }, fim: { hora: 21, minuto: 25 } }, // N3
        { inicio: { hora: 21, minuto: 25 }, fim: { hora: 22, minuto: 15 } }  // N4
    ]
};

const diasSemana = [
    'SEGUNDA',
    'TERCA',
    'QUARTA',
    'QUINTA',
    'SEXTA',
    'SABADO'
];

async function criarHorariosPadrao() {
    console.log('🕐 Criando horários padrão da instituição...');
    
    try {
        let horariosCreated = 0;
        
        for (const dia of diasSemana) {
            for (const [turno, horarios] of Object.entries(horariosDefinidos)) {
                for (let i = 0; i < horarios.length; i++) {
                    const horario = horarios[i];
                    if (!horario) {
                        continue; // ou lançar erro
}
    const numeroHorario = i + 1;

                    
                    // Criar objetos Date apenas com tempo (sem timezone)
                    const horario_inicio = new Date(`1970-01-01T${horario.inicio.hora.toString().padStart(2, '0')}:${horario.inicio.minuto.toString().padStart(2, '0')}:00.000Z`);
                    const horario_fim = new Date(`1970-01-01T${horario.fim.hora.toString().padStart(2, '0')}:${horario.fim.minuto.toString().padStart(2, '0')}:00.000Z`);
                    
                    const codigo = `${turno}${numeroHorario}`;
                    
                    // Verificar se já existe
                    const existente = await prisma.horario.findFirst({
                        where: {
                            dia_semana: dia,
                            codigo: codigo
                        }
                    });
                    
                    if (!existente) {
                        await prisma.horario.create({
                            data: {
                                dia_semana: dia,
                                codigo: codigo,
                                horario_inicio: horario_inicio,
                                horario_fim: horario_fim
                            }
                        });
                        
                        horariosCreated++;
                        console.log(`✅ Criado: ${dia} ${turno}${numeroHorario} (${horario.inicio.hora}:${horario.inicio.minuto.toString().padStart(2, '0')} - ${horario.fim.hora}:${horario.fim.minuto.toString().padStart(2, '0')})`);
                    }
                }
            }
        }
        
        console.log(`\n🎉 Processo concluído! ${horariosCreated} horários criados.`);
        
        // Mostrar estatísticas
        const totalHorarios = await prisma.horario.count();
        console.log(`📊 Total de horários no banco: ${totalHorarios}`);
        
    } catch (error) {
        console.error('❌ Erro ao criar horários:', error);
    } finally {
        await prisma.$disconnect();
    }
}

// Executar se chamado diretamente
if (require.main === module) {
    criarHorariosPadrao();
}

export { criarHorariosPadrao };