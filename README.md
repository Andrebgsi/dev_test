# 👨‍💻 Realização do teste da Water Services and Technologies para Vaga de Desenvolvedor Jr.

## Contextualização!
⚠️ Segue as descrições do que foi requisitado e as seguintes resoluões, dentro do escopo requisitado

### Estrutura do Projeto:
```dotnetcli
src/
├── controllers/
│   ├── userController.ts
│   └── postController.ts
├── entity/
│   ├── User.ts
│   └── Post.ts
├── routes/
│   ├── userRoutes.ts
│   └── postRoutes.ts
├── services/
│   ├── userService.ts
│   └── postService.ts
├── data-source.ts
├── deb.test.ts
├── index.ts
```

## 1º Passo: Criação das Tabelas no `init.sql`
<details>
<summary>Dentro do arquivo `init.sql`, crie as seguintes tabelas:</summary><br />

### Tabela `user`
- **id** – Tipo: `Int`, autoincremental, chave primária (PK).
- **firstName** – Tipo: `Varchar(100)`, não nulo.
- **lastName** – Tipo: `Varchar(100)`, não nulo.
- **email** – Tipo: `Varchar(100)`, não nulo.

### Tabela `post`
- **id** – Tipo: `Int`, autoincremental, chave primária (PK).
- **title** – Tipo: `Varchar(100)`, não nulo.
- **description** – Tipo: `Varchar(100)`, não nulo.
- **userId** – Tipo: `Int`, não nulo (chave estrangeira referenciando a tabela `user`).
</details>

### ✅ Resolução 01

```sql
USE test_db;

CREATE TABLE IF NOT EXISTS user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(100) NOT NULL,
    lastName VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS post (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description VARCHAR(100) NOT NULL,
    userId INT NOT NULL,
    FOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE
);
```
---

## 2º Passo: Criação das Entidades `User` e `Post`

Dentro da pasta `src/Entity`, crie as entidades correspondentes às tabelas `User` e `Post`.

### ✅ Resolução 02:
#### Entidades `src/entity/Post.ts`:
```javascript
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 100, nullable: false })
  title!: string;

  @Column({ type: "varchar", length: 100, nullable: false })
  description!: string;

  @ManyToOne(() => User, (user) => user.posts, { nullable: false, onDelete: "CASCADE" })
  user!: User;
}
```

#### Entidades `src/entity/User.ts`:
```javascript
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Post } from "./Post";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 100, nullable: false })
  firstName!: string;

  @Column({ type: "varchar", length: 100, nullable: false })
  lastName!: string;

  @Column({ type: "varchar", length: 100, nullable: false, unique: true })
  email!: string;

  @OneToMany(() => Post, (post) => post.user)
  posts!: Post[];
}
```
---

## 3º Passo: Configurar endpoints `users` e `posts`

Dentro de `src/index.ts`, configure dois endpoints `users` & `posts`
### ✅ Resolução 03:
#### Endpoint `users`:
```javascript
export const createUser = async (req: Request, res: Response) => {
  const { firstName, lastName, email } = req.body;
  try {
    const newUser = userRepository.create({ firstName, lastName, email });
    await userRepository.save(newUser);
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Error creating user" });
  }
};
```
#### Endpoint `posts`
```javascript
export const createPost = async (req: Request, res: Response) => {
  const { title, description, userId } = req.body;
  try {
    const user = await userRepository.findOneBy({ id: userId });
    if (!user) return res.status(404).json({ error: "User not found" });

    const newPost = postRepository.create({ title, description, user });
    await postRepository.save(newPost);
    res.status(201).json(newPost);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Error creating post" });
  }
};
```
---


## 4º Passo: Configuração do Dockerfile

Configure o `Dockerfile` da aplicação para garantir que ela seja construída corretamente no ambiente Docker.

### ✅ Resolução 04:
```javascript
FROM node:22.11-alpine3.20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```
---

## 5º Passo: Teste da Aplicação

Execute os seguintes comandos para testar a aplicação:

1. **Subir a aplicação utilizando Docker Compose**:
   ```bash
   docker compose up --build
   docker exec -it <Container Name> /bin/sh
   
   ```

   Dentro do container, execute o teste:
   ```bash
   npm test
   ```

### ✅ Resolução 05:
<img width="600" alt="Exemplo de pull request" src="images/print_db.test.png">

## 6º Passo: Crie um fork desse repositório e submita o código preenchido nele.
Crie um Pull Request para a brach master nos enviando o código

✅ Realizado


## 🎁 Extras: Criação do CRUD complementar:

para complentar o desafio, criei o restante do CRUD basico

```dotnetcli
CRUD de Posts:

getAllPosts: Listar todos os posts
getPostById: Obter um post pelo ID
createPost: Criar um novo post
updatePost: Atualizar um post pelo ID
deletePost: Deletar um post pelo ID
```

```dotnetcli
CRUD de Users:

createUser: Criar um novo usuario
getAllUsers: Listar todos os Usuarios
getUserById: Obter um usuario pelo ID
updateUser: Atualizar um usuario pelo ID
deleteUser: Deletar um usuario pelo ID
```

Proximos passos: Teste e regras de negocios no middleware

# Conclusão

😉 Fico a disposição para novos desafios ou tirar duvidas.

## ☎️ `Segue meus contatos:`


  🔗 Conecte-se comigo no <a href="https://linkedin.com/in/andre-bacelar-goncalves" target="_blank" rel="noopener">LinkedIn</a>
  
  ✉️ E-mail: [andrebgsi@gmail.com](mailto:andrebgsi@gmail.com)

  🌐 Acessar meu portfólio <a href="http://andrebg.com.br/" target="_blank" rel="noopener">andrebg.com.br</a>

  👨‍💻 GitHub <a href="https://github.com/Andrebgsi" target="_blank" rel="noopener">@Andrebgsi</a>