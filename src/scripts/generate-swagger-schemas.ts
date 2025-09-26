import { writeFileSync, readFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

// Mapeamento de controllers para schemas Swagger
const controllerSchemas = {
  // Usuários
  'users/profile.ts': {
    schema: 'profileSchema',
    config: {
      tags: ['Usuários'],
      summary: 'Obter perfil do usuário',
      description: 'Retorna as informações do perfil do usuário autenticado',
      security: [{ Bearer: [] }],
      response: {
        200: {
          type: 'object',
          properties: {
            user: {
              type: 'object',
              properties: {
                id: { type: 'string', format: 'uuid' },
                nome: { type: 'string' },
                email: { type: 'string', format: 'email' },
                role: { type: 'string', enum: ['ADMIN', 'PROFESSOR', 'COORDENADOR'] },
                especializacao: { type: 'string', nullable: true },
                carga_horaria_max: { type: 'number', nullable: true },
                preferencia: { type: 'string', nullable: true }
              }
            }
          }
        }
      }
    }
  },
  'users/buscar-usuarios.ts': {
    schema: 'buscarUsuariosSchema',
    config: {
      tags: ['Usuários'],
      summary: 'Buscar usuários',
      description: 'Lista todos os usuários do sistema com paginação',
      security: [{ Bearer: [] }],
      querystring: {
        page: { type: 'string', description: 'Número da página' },
        limit: { type: 'string', description: 'Itens por página' }
      },
      response: {
        200: {
          type: 'object',
          properties: {
            users: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'string', format: 'uuid' },
                  nome: { type: 'string' },
                  email: { type: 'string', format: 'email' },
                  role: { type: 'string', enum: ['ADMIN', 'PROFESSOR', 'COORDENADOR'] }
                }
              }
            }
          }
        }
      }
    }
  },
  // Disciplinas
  'disciplinas/criar-disciplina.ts': {
    schema: 'criarDisciplinaSchema',
    config: {
      tags: ['Disciplinas'],
      summary: 'Criar nova disciplina',
      description: 'Cria uma nova disciplina no sistema',
      security: [{ Bearer: [] }],
      body: {
        nome: { type: 'string', description: 'Nome da disciplina' },
        codigo: { type: 'string', description: 'Código único da disciplina' },
        carga_horaria: { type: 'number', description: 'Carga horária em horas' }
      },
      response: {
        201: {
          type: 'object',
          properties: {
            disciplina: {
              type: 'object',
              properties: {
                id: { type: 'string', format: 'uuid' },
                nome: { type: 'string' },
                codigo: { type: 'string' },
                carga_horaria: { type: 'number' }
              }
            }
          }
        }
      }
    }
  },
  'disciplinas/buscar-disciplinas.ts': {
    schema: 'buscarDisciplinasSchema',
    config: {
      tags: ['Disciplinas'],
      summary: 'Buscar disciplinas',
      description: 'Lista todas as disciplinas cadastradas',
      querystring: {
        page: { type: 'string', description: 'Número da página' }
      },
      response: {
        200: {
          type: 'object',
          properties: {
            disciplinas: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'string', format: 'uuid' },
                  nome: { type: 'string' },
                  codigo: { type: 'string' },
                  carga_horaria: { type: 'number' }
                }
              }
            }
          }
        }
      }
    }
  },
  // Turmas
  'turmas/criar-turma.ts': {
    schema: 'criarTurmaSchema',
    config: {
      tags: ['Turmas'],
      summary: 'Criar nova turma',
      description: 'Cria uma nova turma no sistema',
      security: [{ Bearer: [] }],
      body: {
        nome: { type: 'string', description: 'Nome da turma' },
        semestre: { type: 'number', description: 'Semestre da turma' },
        ano: { type: 'number', description: 'Ano letivo' },
        disciplina_id: { type: 'string', format: 'uuid', description: 'ID da disciplina' },
        curso_id: { type: 'string', format: 'uuid', description: 'ID do curso' }
      },
      response: {
        201: {
          type: 'object',
          properties: {
            turma: {
              type: 'object',
              properties: {
                id: { type: 'string', format: 'uuid' },
                nome: { type: 'string' },
                semestre: { type: 'number' },
                ano: { type: 'number' },
                disciplina_id: { type: 'string', format: 'uuid' },
                curso_id: { type: 'string', format: 'uuid' }
              }
            }
          }
        }
      }
    }
  },
  // Salas
  'salas/criar-sala.ts': {
    schema: 'criarSalaSchema',
    config: {
      tags: ['Salas'],
      summary: 'Criar nova sala',
      description: 'Cria uma nova sala no sistema',
      security: [{ Bearer: [] }],
      body: {
        nome: { type: 'string', description: 'Nome/número da sala' },
        capacidade: { type: 'number', description: 'Capacidade máxima' },
        tipo: { type: 'string', enum: ['LABORATORIO', 'SALA_AULA', 'AUDITORIO'], description: 'Tipo da sala' },
        predio_id: { type: 'string', format: 'uuid', description: 'ID do prédio' }
      },
      response: {
        201: {
          type: 'object',
          properties: {
            sala: {
              type: 'object',
              properties: {
                id: { type: 'string', format: 'uuid' },
                nome: { type: 'string' },
                capacidade: { type: 'number' },
                tipo: { type: 'string' },
                predio_id: { type: 'string', format: 'uuid' }
              }
            }
          }
        }
      }
    }
  },
  // Prédios
  'predios/criar-predio.ts': {
    schema: 'criarPredioSchema',
    config: {
      tags: ['Prédios'],
      summary: 'Criar novo prédio',
      description: 'Cria um novo prédio no sistema',
      security: [{ Bearer: [] }],
      body: {
        nome: { type: 'string', description: 'Nome do prédio' },
        codigo: { type: 'string', description: 'Código único do prédio' }
      },
      response: {
        201: {
          type: 'object',
          properties: {
            predio: {
              type: 'object',
              properties: {
                id: { type: 'string', format: 'uuid' },
                nome: { type: 'string' },
                codigo: { type: 'string' }
              }
            }
          }
        }
      }
    }
  },
  // Horários
  'horarios/criar-horario.ts': {
    schema: 'criarHorarioSchema',
    config: {
      tags: ['Horários'],
      summary: 'Criar novo horário',
      description: 'Cria um novo horário no sistema',
      security: [{ Bearer: [] }],
      body: {
        dia_semana: { type: 'string', enum: ['SEGUNDA', 'TERCA', 'QUARTA', 'QUINTA', 'SEXTA', 'SABADO'], description: 'Dia da semana' },
        hora_inicio: { type: 'string', pattern: '^\\d{2}:\\d{2}$', description: 'Hora de início (HH:MM)' },
        hora_fim: { type: 'string', pattern: '^\\d{2}:\\d{2}$', description: 'Hora de fim (HH:MM)' }
      },
      response: {
        201: {
          type: 'object',
          properties: {
            horario: {
              type: 'object',
              properties: {
                id: { type: 'string', format: 'uuid' },
                dia_semana: { type: 'string' },
                hora_inicio: { type: 'string' },
                hora_fim: { type: 'string' }
              }
            }
          }
        }
      }
    }
  },
  // Alocações
  'alocacoes/criar-alocacao.ts': {
    schema: 'criarAlocacaoSchema',
    config: {
      tags: ['Alocações'],
      summary: 'Criar nova alocação',
      description: 'Cria uma nova alocação de horário',
      security: [{ Bearer: [] }],
      body: {
        turma_id: { type: 'string', format: 'uuid', description: 'ID da turma' },
        sala_id: { type: 'string', format: 'uuid', description: 'ID da sala' },
        horario_id: { type: 'string', format: 'uuid', description: 'ID do horário' },
        professor_id: { type: 'string', format: 'uuid', description: 'ID do professor' }
      },
      response: {
        201: {
          type: 'object',
          properties: {
            alocacao: {
              type: 'object',
              properties: {
                id: { type: 'string', format: 'uuid' },
                turma_id: { type: 'string', format: 'uuid' },
                sala_id: { type: 'string', format: 'uuid' },
                horario_id: { type: 'string', format: 'uuid' },
                professor_id: { type: 'string', format: 'uuid' }
              }
            }
          }
        }
      }
    }
  }
};

// Função para gerar schema Swagger
function generateSwaggerSchema(config: any, schemaName: string): string {
  const imports = `import { createSwaggerSchema, addCommonResponses } from "../../../utils/swagger-utils";
import { z } from "zod";

`;
  
  let schemaCode = `// Schema para documentação Swagger
export const ${schemaName} = createSwaggerSchema({\n`;
  
  if (config.tags) {
    schemaCode += `    tags: ${JSON.stringify(config.tags)},\n`;
  }
  
  if (config.summary) {
    schemaCode += `    summary: '${config.summary}',\n`;
  }
  
  if (config.description) {
    schemaCode += `    description: '${config.description}',\n`;
  }
  
  if (config.security) {
    schemaCode += `    security: ${JSON.stringify(config.security)},\n`;
  }
  
  if (config.body) {
    schemaCode += `    body: z.object({\n`;
    for (const [key, value] of Object.entries(config.body as any)) {
      const field = value as any;
      if (field.type === 'string') {
        let zodType = 'z.string()';
        if (field.format === 'uuid') zodType += '.uuid()';
        if (field.format === 'email') zodType += '.email()';
        if (field.enum) zodType = `z.enum(${JSON.stringify(field.enum)})`;
        if (field.pattern) zodType += `.regex(/${field.pattern}/)`;
        schemaCode += `        ${key}: ${zodType}.describe('${field.description}'),\n`;
      } else if (field.type === 'number') {
        schemaCode += `        ${key}: z.number().describe('${field.description}'),\n`;
      }
    }
    schemaCode += `    }),\n`;
  }
  
  if (config.querystring) {
    schemaCode += `    querystring: z.object({\n`;
    for (const [key, value] of Object.entries(config.querystring as any)) {
      const field = value as any;
      schemaCode += `        ${key}: z.string().optional().describe('${field.description}'),\n`;
    }
    schemaCode += `    }),\n`;
  }
  
  if (config.response) {
    schemaCode += `    response: addCommonResponses(${JSON.stringify(config.response, null, 8)})\n`;
  }
  
  schemaCode += `});\n\n`;
  
  return imports + schemaCode;
}

// Função para atualizar um controller com schema Swagger
function updateControllerWithSchema(filePath: string, schemaName: string, schemaCode: string) {
  try {
    let content = readFileSync(filePath, 'utf-8');
    
    // Verificar se já tem schema
    if (content.includes('createSwaggerSchema')) {
      console.log(`✓ ${filePath} já possui schema Swagger`);
      return;
    }
    
    // Adicionar imports
    const importIndex = content.indexOf('import');
    if (importIndex !== -1) {
      const lastImportIndex = content.lastIndexOf('import');
      const nextLineIndex = content.indexOf('\n', lastImportIndex);
      content = content.slice(0, nextLineIndex + 1) + schemaCode + content.slice(nextLineIndex + 1);
    } else {
      content = schemaCode + content;
    }
    
    writeFileSync(filePath, content);
    console.log(`✓ Adicionado schema Swagger em ${filePath}`);
  } catch (error) {
    console.error(`✗ Erro ao atualizar ${filePath}:`, error);
  }
}

// Função principal
function generateAllSchemas() {
  const controllersDir = join(__dirname, '../http/controllers');
  
  console.log('🚀 Gerando schemas Swagger para controllers...');
  
  for (const [controllerPath, config] of Object.entries(controllerSchemas)) {
    const fullPath = join(controllersDir, controllerPath);
    const { schema, config: schemaConfig } = config;
    
    if (statSync(fullPath).isFile()) {
      const schemaCode = generateSwaggerSchema(schemaConfig, schema);
      updateControllerWithSchema(fullPath, schema, schemaCode);
    } else {
      console.log(`⚠️  Arquivo não encontrado: ${fullPath}`);
    }
  }
  
  console.log('✅ Geração de schemas concluída!');
}

// Executar se chamado diretamente
if (require.main === module) {
  generateAllSchemas();
}

export { generateAllSchemas };