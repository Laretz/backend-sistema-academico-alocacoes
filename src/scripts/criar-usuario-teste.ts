import { prisma } from "../lib/prisma";
import { hash } from "bcryptjs";

async function criarUsuarioTeste() {
  try {
    console.log("🔄 Criando usuário de teste...");

    // Verificar se o usuário já existe
    const usuarioExistente = await prisma.user.findUnique({
      where: {
        email: "admin@teste.com"
      }
    });

    if (usuarioExistente) {
      console.log("✅ Usuário de teste já existe:");
      console.log(`   Email: ${usuarioExistente.email}`);
      console.log(`   Nome: ${usuarioExistente.nome}`);
      console.log(`   Role: ${usuarioExistente.role}`);
      return;
    }

    // Criar usuário de teste
    const senhaHash = await hash("123456", 6);
    
    const usuario = await prisma.user.create({
      data: {
        nome: "Administrador Teste",
        email: "admin@teste.com",
        senha: senhaHash,
        role: "COORDENADOR",
        especializacao: "Administração",
        carga_horaria_max: 40,
        preferencia: "Manhã"
      }
    });

    console.log("✅ Usuário de teste criado com sucesso!");
    console.log(`   ID: ${usuario.id}`);
    console.log(`   Email: ${usuario.email}`);
    console.log(`   Nome: ${usuario.nome}`);
    console.log(`   Role: ${usuario.role}`);
    console.log(`   Senha: 123456`);
    
  } catch (error) {
    console.error("❌ Erro ao criar usuário de teste:", error);
  } finally {
    await prisma.$disconnect();
  }
}

criarUsuarioTeste();