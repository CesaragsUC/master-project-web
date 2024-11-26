import { User } from "./usuario";

export interface UserLogin {
    id: string;
    email: string;
    password: string;
    confirmPassword: string;
    access_token: string;
    user: string;
}
