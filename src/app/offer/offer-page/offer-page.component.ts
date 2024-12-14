import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'offer-page-component',
    templateUrl: 'offer-page.component.html',
    styleUrls: ['offer-page.component.scss'],
    standalone: true,
    imports: [CommonModule]
})

export class OfferPageComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}