import {User} from "../models/UserModel";

export default interface AuthRepositoryInterface {
    login(body: AuthLoginBody): Promise<User>
    register(body: AuthRegisterBody): Promise<User>
}

export interface AuthLoginBody {
    email: string
    password: string
}

export interface AuthRegisterBody {
    email: string
    password: string
    name?: string
}