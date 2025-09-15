-- Inserir dados de teste para o algoritmo genético

-- Inserir disciplinas
INSERT INTO "Disciplina" (id, nome, carga_horaria_total, tipo_de_sala) VALUES 
('550e8400-e29b-41d4-a716-446655440001', 'Matemática', 60, 'Sala'),
('550e8400-e29b-41d4-a716-446655440002', 'Português', 40, 'Sala'),
('550e8400-e29b-41d4-a716-446655440003', 'Programação', 80, 'Lab')
ON CONFLICT (id) DO NOTHING;

-- Inserir professores (usuários)
INSERT INTO "User" (id, nome, email, senha, role) VALUES 
('550e8400-e29b-41d4-a716-446655440011', 'Prof. João Silva', 'joao@email.com', '$2b$10$hashedpassword1', 'PROFESSOR'),
('550e8400-e29b-41d4-a716-446655440012', 'Prof. Maria Santos', 'maria@email.com', '$2b$10$hashedpassword2', 'PROFESSOR'),
('550e8400-e29b-41d4-a716-446655440013', 'Prof. Carlos Lima', 'carlos@email.com', '$2b$10$hashedpassword3', 'PROFESSOR')
ON CONFLICT (id) DO NOTHING;

-- Inserir salas
INSERT INTO "Sala" (id, nome, predio, capacidade, tipo) VALUES 
('550e8400-e29b-41d4-a716-446655440021', 'Sala 101', 'Bloco A', 40, 'Sala'),
('550e8400-e29b-41d4-a716-446655440022', 'Sala 102', 'Bloco A', 35, 'Sala'),
('550e8400-e29b-41d4-a716-446655440023', 'Lab 201', 'Bloco B', 30, 'Lab')
ON CONFLICT (id) DO NOTHING;

-- Inserir horários
INSERT INTO "Horario" (id, codigo, "diaSemana", "horarioInicio", "horarioFim") VALUES 
('550e8400-e29b-41d4-a716-446655440031', 'SEG_08_10', 'Segunda', '08:00:00', '10:00:00'),
('550e8400-e29b-41d4-a716-446655440032', 'TER_10_12', 'Terça', '10:00:00', '12:00:00'),
('550e8400-e29b-41d4-a716-446655440033', 'QUA_14_16', 'Quarta', '14:00:00', '16:00:00')
ON CONFLICT (id) DO NOTHING;

-- Inserir alocações para a turma existente
INSERT INTO "Alocacao" (id, id_turma, id_disciplina, id_user, id_sala, id_horario) VALUES 
('550e8400-e29b-41d4-a716-446655440041', '7f413d5b-510f-4c6b-9abf-b55b676d6824', '550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440011', '550e8400-e29b-41d4-a716-446655440021', '550e8400-e29b-41d4-a716-446655440031'),
('550e8400-e29b-41d4-a716-446655440042', '7f413d5b-510f-4c6b-9abf-b55b676d6824', '550e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440012', '550e8400-e29b-41d4-a716-446655440022', '550e8400-e29b-41d4-a716-446655440032'),
('550e8400-e29b-41d4-a716-446655440043', '7f413d5b-510f-4c6b-9abf-b55b676d6824', '550e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440013', '550e8400-e29b-41d4-a716-446655440023', '550e8400-e29b-41d4-a716-446655440033')
ON CONFLICT (id) DO NOTHING;