import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'offer-list-component',
    templateUrl: 'offer-list.component.html',
    styleUrls: ['offer-list.component.scss'],
    standalone: true,
    imports: [CommonModule]
})

export class OfferListComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}