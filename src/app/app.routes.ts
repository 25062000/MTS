import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ClientDashboardComponent } from './client/client-dashboard/client-dashboard.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { UsersListComponent } from './admin/users-list/users-list.component';
import { authGuard, adminGuard } from './service/auth.guard';
import { ViewChartComponent } from './client/view-chart/view-chart.component';
import { ChartManagementComponent } from './admin/chart-management/chart-management.component';
import { ChartRequestComponent } from './admin/chart-request/chart-request.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [


    
    { path: '', redirectTo: '/homepage', pathMatch: 'full' },
    { path: 'homepage', component: HomeComponent },
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'client/viewChart', component: ViewChartComponent, canActivate:[authGuard]},
    {path: 'client/dashboard', component: ClientDashboardComponent, canActivate:[authGuard]},
    
    {path: 'admin/login',component: LoginComponent},
    {path: 'admin/dashboard', component: AdminDashboardComponent, canActivate:[adminGuard]},
    {path: 'admin/users', component: UsersListComponent, canActivate:[adminGuard]},
    {path: 'admin/charts', component: ChartManagementComponent, canActivate:[adminGuard]},
    {path: 'admin/viewChartRequest', component: ChartRequestComponent, canActivate:[adminGuard]}
];
