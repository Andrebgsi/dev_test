import express from 'express';
import { AppDataSource } from "./data-source";
import { User } from './entity/User';
import { Post } from './entity/Post';

const app = express();
app.use(express.json());



const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const initializeDatabase = async () => {
  await wait(20000);
  try {
    await AppDataSource.initialize();
    console.log("Data Source has been initialized!");
  } catch (err) {
    console.error("Error during Data Source initialization:", err);
    process.exit(1);
  }
};

initializeDatabase();

app.post('/users', async (req, res) => {
  const { firstName, lastName, email } = req.body;
  const userRepository = AppDataSource.getRepository(User);

  try {
    const newUser = userRepository.create({ firstName, lastName, email });
    await userRepository.save(newUser);
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Error creating user" });
  }
});

app.post('/posts', async (req, res) => {
  const { title, description, userId } = req.body;
  const postRepository = AppDataSource.getRepository(Post);
  const userRepository = AppDataSource.getRepository(User);

  try {
    const user = await userRepository.findOneBy({ id: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newPost = postRepository.create({ title, description, user });
    await postRepository.save(newPost);
    res.status(201).json(newPost);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Error creating post" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
