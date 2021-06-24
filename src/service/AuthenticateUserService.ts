import { getCustomRepository } from "typeorm";

import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import { UsersRepositories } from "../repositories/UsersRepositories";

interface IAuthenticateRequest {
  email: string;
  password: string;
}

class AuthenticateUserService {

  async execute({email, password}: IAuthenticateRequest) {
    const usersRepositories = getCustomRepository(UsersRepositories);

    // verificar se email existe
    const user = await usersRepositories.findOne({
      email
    });

    if(!user) {
      throw new Error("Email/Password incorrect");
    }

    // verificar se senha está incorreta
    const passwordMatch = await compare(password, user.password)

    if(!passwordMatch) {
      throw new Error("Email/Password incorrect");
    }

    // gerar token
    const token = sign({
      email: user.email
    }, "868ed576e59984d93b6dcb8d61b7eca0", {
      subject: user.id,
      expiresIn: "1d"
    });

    return token;
  }
}

export { AuthenticateUserService };