import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {
        path : '',
        loadComponent:() => 
           import('./home-section.component').then((m) => m.HomePageComponent),     
    },
    {
        path : 'settings',
        loadComponent:() => 
           import('./setting-section.component').then((m) => m.SettingsPageComponent),     
    },
    {
        path:'**',
        redirectTo:''
    }

];
