import { Token } from './token.model'

export interface UserCreate {
    email: string
    password: string
    firstname: string
    lastname: string
    role_id?: number
    date_of_birth: string |null
}

export interface UserResponse {
    id: number
    email:string
    firstname: string
    lastname: string
    role_id: number
    date_of_birth: string
    created_at: string
}

export interface UserLogin {
    email: string
    password: string
}

export interface UserRegisterResponse {
    user: UserResponse
    token: Token
}

export interface UserUpdate {
    email: string
    firstname: string
    lastname: string
    date_of_birth: string |null
}