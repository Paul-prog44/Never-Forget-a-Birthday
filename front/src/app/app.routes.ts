import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Register } from './features/auth/register/register';
import { Login } from './features/auth/login/login';
import { Profile } from './features/profile/profile';
import { Logout } from './features/auth/logout/logout';
import { AddFriend } from './features/friends/add-friend/add-friend';

export const routes: Routes = [
    {path:'', component: Home},
    {path: 'register', component: Register},
    {path: 'login', component: Login},
    {path: 'profile', component: Profile},
    {path:'logout', component: Logout},
    {path:'add-friend', component: AddFriend}
];
