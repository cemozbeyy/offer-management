import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'offer-component',
    templateUrl: 'offer.component.html',
    standalone: true,
    imports: [CommonModule]
})

export class OfferComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}