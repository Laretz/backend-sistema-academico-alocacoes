import { Prisma, User } from "@prisma/client";
import { UsersRepository } from "../users-repository";

export class InMemoryUsersRepository implements UsersRepository {

  private users: User[] = [];

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user: User = {
      id: `user-${this.users.length + 1}`,
      nome: data.nome,
      email: data.email,
      senha: data.senha,
      role: data.role as "PROFESSOR" | "ADMIN" | "COORDENADOR",
      especializacao: data.especializacao ?? null,
      preferencia: data.preferencia ?? null,
      cargaHorariaMax: data.cargaHorariaMax ?? null,
    };

    this.users.push(user);

    return user;
  }


    async findById(id: string): Promise<User | null> {
    const user = this.users.find((u) => u.id === id);
    return user ?? null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((u) => u.email === email);
    return user ?? null;
  }
}
