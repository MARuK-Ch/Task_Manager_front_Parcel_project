import {User} from '../models/UserModel'

export interface UserRepositoryInterface {
  get(id: string): User | undefined
  changePassword(id: string): User | undefined
  edit(id: string): User | undefined
}
