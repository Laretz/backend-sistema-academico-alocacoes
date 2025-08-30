import { AlocacoesRepository } from "../../repositories/alocacoes-repository";
import { RecursoNaoEncontradoError } from "../errors/recurso-nao-encontrado";

interface BuscarGradeHorariosUseCaseRequest {
  id_turma?: string | undefined;
  id_user?: string | undefined;
  id_sala?: string | undefined;
}

interface HorarioAlocacao {
    id: string;
    diaSemana: string;
    horarioInicio: Date;
    horarioFim: Date;
    disciplina: {
        id: string;
        nome: string;
        cargaHorariaTotal: number;
    };
    professor: {
        id: string;
        nome: string;
        especializacao?: string;
    };
    sala: {
        id: string;
        nome: string;
        predio: string;
        capacidade: number;
        tipo: string;
    };
    turma: {
        id: string;
        nome: string;
        numAlunos: number;
        periodo: number;
        turno: string;
    };
}

interface GradeHorarios {
    segunda: HorarioAlocacao[];
    terca: HorarioAlocacao[];
    quarta: HorarioAlocacao[];
    quinta: HorarioAlocacao[];
    sexta: HorarioAlocacao[];
    sabado: HorarioAlocacao[];
}

export class BuscarGradeHorariosUseCase {
    constructor(private alocacoesRepository: AlocacoesRepository) {}

    async execute({ id_turma, id_user, id_sala }: BuscarGradeHorariosUseCaseRequest) {
        let alocacoes;

        // Busca alocações baseado no filtro fornecido
        if (id_turma) {
            alocacoes = await this.alocacoesRepository.findByTurmaId(id_turma, 1);
        } else if (id_user) {
            alocacoes = await this.alocacoesRepository.findByUserId(id_user, 1);
        } else if (id_sala) {
            alocacoes = await this.alocacoesRepository.findBySalaId(id_sala, 1);
        } else {
            // Se nenhum filtro for fornecido, busca todas as alocações
            alocacoes = await this.alocacoesRepository.findMany(1);
        }

        // Organiza as alocações por dia da semana
        const gradeHorarios: GradeHorarios = {
            segunda: [],
            terca: [],
            quarta: [],
            quinta: [],
            sexta: [],
            sabado: []
        };

        alocacoes.forEach((alocacao: any) => {
            const horarioAlocacao: HorarioAlocacao = {
                id: alocacao.id,
                diaSemana: alocacao.horario.diaSemana,
                horarioInicio: alocacao.horario.horarioInicio,
                horarioFim: alocacao.horario.horarioFim,
                disciplina: {
                    id: alocacao.disciplina.id,
                    nome: alocacao.disciplina.nome,
                    cargaHorariaTotal: alocacao.disciplina.cargaHorariaTotal
                },
                professor: {
                    id: alocacao.user.id,
                    nome: alocacao.user.nome,
                    especializacao: alocacao.user.especializacao
                },
                sala: {
                    id: alocacao.sala.id,
                    nome: alocacao.sala.nome,
                    predio: alocacao.sala.predio,
                    capacidade: alocacao.sala.capacidade,
                    tipo: alocacao.sala.tipo
                },
                turma: {
                    id: alocacao.turma.id,
                    nome: alocacao.turma.nome,
                    numAlunos: alocacao.turma.numAlunos,
                    periodo: alocacao.turma.periodo,
                    turno: alocacao.turma.turno
                }
            };

            // Mapeia o dia da semana para a propriedade correspondente
            const diaSemana = alocacao.horario.diaSemana.toLowerCase();
            switch (diaSemana) {
                case 'segunda':
                case 'segunda-feira':
                    gradeHorarios.segunda.push(horarioAlocacao);
                    break;
                case 'terca':
                case 'terça':
                case 'terça-feira':
                case 'terca-feira':
                    gradeHorarios.terca.push(horarioAlocacao);
                    break;
                case 'quarta':
                case 'quarta-feira':
                    gradeHorarios.quarta.push(horarioAlocacao);
                    break;
                case 'quinta':
                case 'quinta-feira':
                    gradeHorarios.quinta.push(horarioAlocacao);
                    break;
                case 'sexta':
                case 'sexta-feira':
                    gradeHorarios.sexta.push(horarioAlocacao);
                    break;
                case 'sabado':
                case 'sábado':
                    gradeHorarios.sabado.push(horarioAlocacao);
                    break;
            }
        });

        // Ordena os horários de cada dia por horário de início
        Object.keys(gradeHorarios).forEach(dia => {
            gradeHorarios[dia as keyof GradeHorarios].sort((a, b) => 
                new Date(a.horarioInicio).getTime() - new Date(b.horarioInicio).getTime()
            );
        });

        return { gradeHorarios };
    }
}