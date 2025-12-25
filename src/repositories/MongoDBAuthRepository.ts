import axios from "axios";
import AuthRepositoryInterface, {AuthLoginBody, AuthRegisterBody} from "./AuthRepositoryInterface";

const BASE_URL = `${process.env.API_URL}/api/auth` || 'http://localhost:5000/api/auth'

export default class MongoDBAuthRepository implements AuthRepositoryInterface {
    async login(body: AuthLoginBody) {
        const res = await axios.post(`${BASE_URL}/login`, body)
        return res.data
    }
    async register(body: AuthRegisterBody) {
        const res = await axios.post(`${BASE_URL}/register`, body)
        return res.data
    }
}