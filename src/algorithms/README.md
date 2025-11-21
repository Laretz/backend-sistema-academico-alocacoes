# Algoritmos — Guia das variáveis de ambiente

Este documento descreve, de forma breve e objetiva, o propósito de cada variável definida em `backend/.env.example`, com foco no módulo de algoritmos (especialmente o Algoritmo Genético utilizado para alocação de horários/recursos).

Observação importante:
- Nunca coloque valores reais de segredos/tokens aqui. Use somente o arquivo `.env` local e mantenha `.env.example` como referência de chaves necessárias.

## Ambiente
- `NODE_ENV`: Define o ambiente de execução (ex.: `dev`, `test`, `prod`). Controla comportamentos de logging, otimizações e integrações.
- `PORT`: Porta HTTP na qual o backend inicia o servidor.
- `JWT_SECRET`: Segredo usado para assinar e validar tokens JWT (autenticação). Deve ser definido apenas em `.env` real.

## Algoritmo Genético — Parâmetros principais
- `GA_POPULATION_SIZE`: Tamanho da população de soluções por geração. Impacta diversidade e tempo de execução.
- `GA_GENERATIONS`: Número máximo de gerações (iterações evolutivas) antes de finalizar.
- `GA_MIN_GENERATIONS`: Número mínimo de gerações a serem executadas, mesmo que haja melhora rápida.
- `GA_PATIENCE`: Quantidade de gerações sem melhora necessária antes de acionar parada antecipada (early stopping).
- `GA_FITNESS_TARGET`: Meta de fitness (qualidade) para encerrar a busca quando atingida/superada.
- `GA_MUTATION_RATE`: Taxa de mutação (probabilidade de modificar genes/atributos em indivíduos). Controla exploração do espaço de soluções.
- `GA_CROSSOVER_RATE`: Taxa de crossover (probabilidade de combinar dois indivíduos). Controla recombinação de soluções.
- `GA_ELITISM_RATE`: Percentual de elite mantido entre gerações (preserva os melhores indivíduos para garantir continuidade de qualidade).

## Penalidades e bonificações globais
- `GA_HARD_PENALTY_MULTIPLIER`: Multiplicador aplicado às penalidades de restrições “hard” (obrigatórias). Valores maiores forçam o algoritmo a evitar violações.
- `GA_SOFT_MULTIPLIER`: Multiplicador para bonificações/penalidades de restrições “soft” (desejáveis). Ajusta a sensibilidade a preferências.

## Pesos — Hard constraints (violação não aceitável)
- `GA_WEIGHT_PROFESSOR_AVAILABILITY`: Peso para indisponibilidade do professor no horário (deve evitar).
- `GA_WEIGHT_ROOM_AVAILABILITY`: Peso para indisponibilidade da sala (conflitos de uso simultâneo).
- `GA_WEIGHT_ROOM_CAPACITY`: Peso para exceder a capacidade da sala (lotação acima do permitido).
- `GA_WEIGHT_ROOM_TYPE_COMPATIBILITY`: Peso para incompatibilidade entre tipo de sala e tipo de aula/disciplina.
- `GA_WEIGHT_WORKLOAD_LIMIT`: Peso para ultrapassar limite de carga horária do professor.
- `GA_WEIGHT_TURMA_AVAILABILITY`: Peso para indisponibilidade da turma (choques de horário com outras disciplinas).
- `GA_WEIGHT_NO_SUNDAY`: Peso para agendamento em domingo (se o domínio proíbe aulas neste dia).

## Pesos — Soft constraints (preferências/desejáveis)
- `GA_WEIGHT_DAY_INTERVAL_QUALITY`: Peso para distribuição equilibrada de dias (evitar concentração excessiva em poucos dias).
- `GA_WEIGHT_CONSECUTIVE_CLASSES`: Peso para encadeamento de aulas consecutivas (pode ser bom para fluxo contínuo ou reduzir deslocamentos).
- `GA_WEIGHT_AVOID_INTRA_DAY_GAPS`: Peso para evitar “buracos” no mesmo dia (janelas longas ociosas entre aulas).
- `GA_WEIGHT_AVOID_SATURDAY`: Peso para evitar sábado (preferência institucional ou dos usuários).
- `GA_WEIGHT_AVOID_T6`: Peso para evitar um slot específico (ex.: T6), quando considerado indesejado.
- `GA_WEIGHT_PRIORITIZE_EARLY_SLOTS`: Peso para priorizar horários mais cedo (ex.: início da manhã/tarde).
- `GA_WEIGHT_AVOID_START_AT_2`: Peso para evitar início em um horário específico (ex.: 2º bloco do dia), conforme convenções locais.

## Boas práticas
- Mantenha estes valores sob controle por ambiente (dev/test/prod) e versionados apenas no `.env.example` sem valores sensíveis.
- Ajuste pesos e taxas com parcimônia: aumentos agressivos podem afetar performance e qualidade da solução.