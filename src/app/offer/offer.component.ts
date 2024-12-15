import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';

@Component({
    selector: 'offer-component',
    templateUrl: 'offer.component.html',
    standalone: true,
    imports: [
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