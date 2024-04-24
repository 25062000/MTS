import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ClientDashboardComponent } from './client/client-dashboard/client-dashboard.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { UsersListComponent } from './admin/users-list/users-list.component';
import { authGuard } from './service/auth.guard';

export const routes: Routes = [
    {
        path: 'login', 
        component: LoginComponent,
    },
    {path: 'register', component: RegisterComponent},
    {path: 'client/dashboard', component: ClientDashboardComponent},
    {
        path: 'admin/login', 
        component: LoginComponent,
        children:[
            {path: 'admin/dashboard', component: AdminDashboardComponent, canActivate:[authGuard]},
            {path: 'admin/users', component: UsersListComponent, canActivate:[authGuard]},
        ]
    },
   
];
