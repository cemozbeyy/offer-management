import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'signup-component',
    templateUrl: 'signup.component.html',
    styleUrls: ['signup.component.scss'],
    standalone: true,
    imports: [CommonModule]
})

export class SignUpComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}