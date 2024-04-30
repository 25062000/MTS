import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ClientDashboardComponent } from './client/client-dashboard/client-dashboard.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { UsersListComponent } from './admin/users-list/users-list.component';
import { authGuard, adminGuard } from './service/auth.guard';
import { ViewChartComponent } from './client/view-chart/view-chart.component';
import { ChartManagementComponent } from './admin/chart-management/chart-management.component';

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'client/dashboard', component: ClientDashboardComponent, canActivate:[authGuard]},
    {path: 'client/viewChart', component: ViewChartComponent, canActivate:[authGuard]},

    {path: 'admin/login',component: LoginComponent},
    {path: 'admin/dashboard', component: AdminDashboardComponent, canActivate:[adminGuard]},
    {path: 'admin/users', component: UsersListComponent, canActivate:[adminGuard]},
    {path: 'admin/charts', component: ChartManagementComponent, canActivate:[adminGuard]},
];
