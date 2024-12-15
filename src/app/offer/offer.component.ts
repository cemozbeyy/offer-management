import { Component, inject, OnInit } from '@angular/core';
import { OfferPageComponent } from './offer-page/offer-page.component';
import { Router, RouterOutlet } from '@angular/router';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';

@Component({
    selector: 'offer-component',
    templateUrl: 'offer.component.html',
    standalone: true,
    imports: [
        OfferPageComponent,
        RouterOutlet,
        NzPageHeaderModule
    ]
})

export class OfferComponent implements OnInit {
    constructor() { }
    router = inject(Router);

    ngOnInit() { }
    onBack(): void {
        this.router.navigate(['/offer'])
    }
}