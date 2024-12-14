import { Routes } from '@angular/router';
import { OfferComponent } from './offer/offer.component';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/signup/signup.component';

export const routes: Routes = [
    { path: '', redirectTo: 'offer', pathMatch: 'full' },
    { path: 'offer', component: OfferComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignUpComponent },
];
