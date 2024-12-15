import { Component, OnInit } from '@angular/core';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTableModule } from 'ng-zorro-antd/table';

@Component({
    selector: 'offer-list-component',
    templateUrl: 'offer-list.component.html',
    styleUrls: ['offer-list.component.scss'],
    standalone: true,
    imports: [
        NzDividerModule, NzTableModule
    ]
})

export class OfferListComponent implements OnInit {
    listOfData: any[] = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park'
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park'
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park'
        }
    ];
    constructor() { }

    ngOnInit() { }
}