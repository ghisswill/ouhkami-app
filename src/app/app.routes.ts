import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {
        path: '', redirectTo: 'hub', pathMatch: 'full'
    },
    {
        path: 'auth',
        loadChildren: () => import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES)
    },
    {
        path: 'hub',
        canActivate: [authGuard],
        loadChildren: () => import('./features/hub/hub/hub.routes').then(m => m.HUB_ROUTES)
    },
    {
        path: 'todo',
        canActivate: [authGuard],
        loadChildren: () => import('./features/todo/todo/todo.routes').then(m => m.TODO_ROUTES)
    },
    /* {
        path: 'hecommerce',
        canActivate: [authGuard],
        loadComponent: () => import('./features/ecommerce/ECommerce.component').then(m => m.ECommerceComponent)
    }, */
    {
        path: '**',
        redirectTo: 'hub',
    }
];
