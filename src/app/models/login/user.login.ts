import { User } from "../user/usuario";

export interface LoginRequest {
    id: string;
    email: string;
    password: string;
    confirmPassword: string;
    access_token: string;
    user: string;
}