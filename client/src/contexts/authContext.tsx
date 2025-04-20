import { User } from "better-auth/types";
import { createContext } from "react";


export type AuthContextType = {
    isAuthenticated: boolean;
    user: User;
}


export const AuthContext = createContext<AuthContextType>({
    
})