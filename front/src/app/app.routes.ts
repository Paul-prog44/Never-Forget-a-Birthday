import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home';
import { Register } from './features/auth/register/register';
import { Login } from './features/auth/login/login';

export const routes: Routes = [
    {path:'', component: HomeComponent},
    {path: 'register', component: Register},
    {path: 'login', component: Login}
];
