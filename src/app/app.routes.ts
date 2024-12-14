import { Routes } from '@angular/router';

import { OfferComponent, OfferListComponent, OfferPageComponent } from './offer';
import { LoginComponent, SignUpComponent } from './auth';


export const routes: Routes = [
    { path: '', redirectTo: 'offer', pathMatch: 'full' },
    {
        path: 'offer', component: OfferComponent,
        children: [
            {
                path: 'offer-list',
                component: OfferListComponent,
            },
            {
                path: 'offer-page',
                component: OfferPageComponent,
            }
        ]
    },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignUpComponent },
];
