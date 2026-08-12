import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home';
import { Register } from './features/auth/pages/register/register';

export const routes: Routes = [
    {path:'', component: HomeComponent},
    {path: 'register', component: Register}
];
