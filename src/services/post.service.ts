import { AppDataSource } from "../data-source";
import { Post } from "../entity/Post";
import { User } from "../entity/User";

export class PostService {
  private static readonly postRepository = AppDataSource.getRepository(Post);
  private static readonly userRepository = AppDataSource.getRepository(User);

  static async createPost(data: { title: string; description: string; userId: number }) {
    // Verificando se o usuário existe
    const user = await this.userRepository.findOne({ where: { id: data.userId } });

    if (!user) {
      throw new Error("User not found");
    }

    // Criando o novo post com um objeto compatível com DeepPartial<Post>
    const newPost = this.postRepository.create({
      title: data.title,
      description: data.description,
      user: user, // Relacionamento com o usuário
    });

    // Salvando o novo post no banco de dados
    return await this.postRepository.save(newPost);
  }

  static async getAllPosts() {
    // Buscando todos os posts, incluindo os usuários relacionados
    return await this.postRepository.find({ relations: ["user"] });
  }

  static async getPostById(id: number) {
    // Buscando um post específico, incluindo o usuário relacionado
    return await this.postRepository.findOne({ where: { id }, relations: ["user"] });
  }

  static async updatePost(id: number, data: Partial<Post>) {
    // Buscando o post a ser atualizado
    const postToUpdate = await this.postRepository.findOne({ where: { id } });

    if (!postToUpdate) return null;

    // Atualizando as informações do post
    this.postRepository.merge(postToUpdate, data);
    return await this.postRepository.save(postToUpdate);
  }

  static async deletePost(id: number) {
    // Deletando o post
    const result = await this.postRepository.delete(id);
    return result.affected === 1; // Retorna true se o post foi deletado
  }
}
