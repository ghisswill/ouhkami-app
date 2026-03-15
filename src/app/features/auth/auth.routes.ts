import { Routes } from "@angular/router";
import { AuthLayout } from "./components/auth-layout/auth-layout";
import { publicGuard } from "../../core/guards/auth.guard";
import { Login } from "./components/login/login";
import { Register } from "./components/register/register";

export const AUTH_ROUTES : Routes = [
    {
        path: '',
        component: AuthLayout,
        canActivate: [publicGuard],
        children: [
            {path: 'login', component: Login},
            {path: 'register', component: Register},
            {path: '', redirectTo: 'login', pathMatch: 'full'}
        ]
    }
]