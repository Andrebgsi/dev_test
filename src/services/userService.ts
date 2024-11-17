import { AppDataSource } from "../data-source";
import { User } from "../entity/User";

export class UserService {
  private static readonly userRepository = AppDataSource.getRepository(User);

  static async createUser(data: { firstName: string; lastName: string; email: string }) {
    const newUser = this.userRepository.create(data); // Cria a instância do usuário
    return await this.userRepository.save(newUser);   // Salva no banco
  }

  static async getAllUsers() {
    return await this.userRepository.find({ relations: ["posts"] }); // Inclui os posts relacionados
  }

  static async getUserById(id: number) {
    return await this.userRepository.findOne({ where: { id }, relations: ["posts"] });
  }

  static async updateUser(id: number, data: Partial<User>) {
    const userToUpdate = await this.userRepository.findOne({ where: { id } });

    if (!userToUpdate) return null;

    this.userRepository.merge(userToUpdate, data); // Atualiza os campos alterados
    return await this.userRepository.save(userToUpdate); // Salva no banco
  }

  static async deleteUser(id: number) {
    const result = await this.userRepository.delete(id);
    return result.affected === 1; // Retorna true se o usuário foi deletado
  }
}
