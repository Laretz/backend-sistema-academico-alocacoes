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

  async findMany(page: number, search?: string): Promise<User[]> {
    let filteredUsers = this.users;
    
    if (search) {
      const searchLower = search.toLowerCase();
      filteredUsers = this.users.filter((user) => 
        user.nome.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower) ||
        (user.especializacao && user.especializacao.toLowerCase().includes(searchLower))
      );
    }
    
    const startIndex = (page - 1) * 20;
    const endIndex = startIndex + 20;
    
    return filteredUsers.slice(startIndex, endIndex);
  }

  async update(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    const userIndex = this.users.findIndex((u) => u.id === id);
    
    if (userIndex === -1) {
      throw new Error('User not found');
    }
    
    const updatedUser = {
      ...this.users[userIndex],
      ...data,
    } as User;
    
    this.users[userIndex] = updatedUser;
    
    return updatedUser;
  }

  async delete(id: string): Promise<void> {
    const userIndex = this.users.findIndex((u) => u.id === id);
    
    if (userIndex === -1) {
      throw new Error('User not found');
    }
    
    this.users.splice(userIndex, 1);
  }
}
