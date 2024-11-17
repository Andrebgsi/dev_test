"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPost = void 0;
const data_source_1 = require("../data-source");
const Post_1 = require("../entity/Post");
const User_1 = require("../entity/User");
const postRepository = data_source_1.AppDataSource.getRepository(Post_1.Post);
const userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
const createPost = async (req, res) => {
    const { title, description, userId } = req.body;
    const user = await userRepository.findOneBy({ id: userId });
    if (!user)
        return res.status(404).json({ error: "User not found" });
    const post = postRepository.create({ title, description, user });
    await postRepository.save(post);
    res.status(201).json(post);
};
exports.createPost = createPost;
