# Funcionalidade de Grade de Horários

Este documento explica como usar as novas funcionalidades implementadas para visualização de grade de horários e criação de horários com códigos padronizados.

## 1. Visualização de Grade de Horários

### Endpoint: `GET /grade-horarios`

Este endpoint retorna uma grade de horários organizada por dias da semana, mostrando todas as alocações de forma estruturada.

#### Parâmetros de Query (opcionais):
- `id_turma`: UUID da turma para filtrar alocações específicas
- `id_user`: UUID do professor para ver apenas suas alocações
- `id_sala`: UUID da sala para ver alocações específicas da sala

#### Exemplos de uso:

```bash
# Ver grade completa de todas as alocações
GET /grade-horarios

# Ver grade de uma turma específica
GET /grade-horarios?id_turma=123e4567-e89b-12d3-a456-426614174000

# Ver grade de um professor específico
GET /grade-horarios?id_user=123e4567-e89b-12d3-a456-426614174001

# Ver grade de uma sala específica
GET /grade-horarios?id_sala=123e4567-e89b-12d3-a456-426614174002
```

#### Resposta:

```json
{
  "gradeHorarios": {
    "segunda": [
      {
        "id": "alocacao-id",
        "diaSemana": "segunda-feira",
        "horarioInicio": "2024-01-15T07:00:00.000Z",
    "horarioFim": "2024-01-15T08:50:00.000Z",
        "disciplina": {
          "id": "disciplina-id",
          "nome": "Matemática",
          "cargaHorariaTotal": 60
        },
        "professor": {
          "id": "professor-id",
          "nome": "João Silva",
          "especializacao": "Matemática"
        },
        "sala": {
          "id": "sala-id",
          "nome": "Sala 101",
          "predio": "Bloco A",
          "capacidade": 40,
          "tipo": "Aula Teórica"
        },
        "turma": {
          "id": "turma-id",
          "nome": "1º Ano A",
          "numAlunos": 35,
          "periodo": 1,
          "turno": "manhã"
        }
      }
    ],
    "terca": [],
    "quarta": [],
    "quinta": [],
    "sexta": [],
    "sabado": []
  }
}
```

## 2. Criação de Horários com Código Padronizado

### Endpoint: `POST /horarios/codigo`

Este endpoint permite criar horários usando códigos padronizados similares aos usados em instituições de ensino.

#### Formato do Código:
`[DIA][TURNO][HORARIOS]`

- **DIA**: Número do dia da semana (2=Segunda, 3=Terça, 4=Quarta, 5=Quinta, 6=Sexta, 7=Sábado)
- **TURNO**: Letra do turno (M=Manhã, T=Tarde, N=Noite)
- **HORARIOS**: Números dos horários (cada horário = 50 minutos)

#### Horários por Turno (com intervalos):

**Matutino (M1-M6):**
- M1: 07:00 às 07:50
- M2: 07:50 às 08:40
- M3: 08:55 às 09:45 (intervalo de 15 min após M2)
- M4: 09:45 às 10:35
- M5: 10:50 às 11:40 (intervalo de 15 min após M4)
- M6: 11:40 às 12:30

**Vespertino (T1-T6):**
- T1: 13:00 às 13:50
- T2: 13:50 às 14:40
- T3: 14:55 às 15:45 (intervalo de 15 min após T2)
- T4: 15:45 às 16:35
- T5: 16:50 às 17:40 (intervalo de 15 min após T4)
- T6: 17:40 às 18:30

**Noturno (N1-N4):**
- N1: 18:45 às 19:35
- N2: 19:35 às 20:25
- N3: 20:35 às 21:25 (intervalo de 10 min após N2)
- N4: 21:25 às 22:15

#### Exemplos de Códigos:

- `2M12`: Segunda-feira, Manhã, horários 1 e 2 (07:00 às 08:50)
- `3T34`: Terça-feira, Tarde, horários 3 e 4 (15:00 às 16:50)
- `5N12`: Sexta-feira, Noite, horários 1 e 2 (19:00 às 20:50)
- `4M1`: Quarta-feira, Manhã, horário 1 (07:00 às 07:50)
- `4M23`: Quarta-feira, Manhã, horários 2 e 3 (08:00 às 09:50)
- `6T45`: Sábado, Tarde, horários 4 e 5 (16:00 às 17:50)

#### Requisição:

```json
{
  "codigo": "2M12"  // Segunda, manhã, 07:00-08:50
}
```

#### Resposta:

```json
{
  "horario": {
    "id": "horario-id",
    "diaSemana": "segunda-feira",
    "horarioInicio": "2024-01-15T07:00:00.000Z",
    "horarioFim": "2024-01-15T08:50:00.000Z"
  }
}
```

## 3. Casos de Uso

### Visualização de Grade por Turma
Para exibir uma planilha similar à mencionada pelo usuário, mostrando todas as disciplinas e professores de uma turma específica:

```bash
GET /grade-horarios?id_turma=TURMA_ID
```

### Visualização de Grade por Professor
Para que um professor veja apenas seus horários:

```bash
GET /grade-horarios?id_user=PROFESSOR_ID
```

### Criação Rápida de Horários
Para criar rapidamente horários usando o padrão da instituição:

```bash
POST /horarios/codigo
{
  "codigo": "2M12"
}
```

## 4. Integração com Frontend

O frontend pode usar essas APIs para:

1. **Exibir uma tabela de horários**: Usar o endpoint `/grade-horarios` para obter dados estruturados
2. **Filtrar por contexto**: Mostrar apenas horários relevantes (turma, professor, sala)
3. **Criar horários facilmente**: Usar códigos padronizados em vez de selecionar datas/horas manualmente
4. **Organizar visualmente**: Os dados já vêm organizados por dia da semana e ordenados por horário

## 5. Benefícios

- **Padronização**: Códigos de horário seguem padrão institucional
- **Flexibilidade**: Múltiplas formas de visualizar a grade
- **Eficiência**: Dados pré-organizados reduzem processamento no frontend
- **Usabilidade**: Interface mais intuitiva para criação de horários