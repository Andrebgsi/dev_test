"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const data_source_1 = require("../data-source");
const User_1 = require("../entity/User");
const userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
const createUser = async (req, res) => {
    const { firstName, lastName, email } = req.body;
    const user = userRepository.create({ firstName, lastName, email });
    await userRepository.save(user);
    res.status(201).json(user);
};
exports.createUser = createUser;
