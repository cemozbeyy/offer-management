import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Offer } from '../../core/interfaces/offer-detail.interface';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTableModule } from 'ng-zorro-antd/table';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'offer-lis-component',
    templateUrl: './offer-list.component.html',
    styleUrls: ['./offer-list.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        NzDividerModule,
        NzTableModule
    ]
})
export class OfferListComponent implements OnInit {
    offerData: Offer[] = [];

    constructor(private route: ActivatedRoute) { }

    ngOnInit(): void {

        this.offerData.push(window.history.state.offerData);

        if (this.offerData) {
            console.log('data:', this.offerData);
        } else {
            console.log('data not found.');
        }
    }
}
