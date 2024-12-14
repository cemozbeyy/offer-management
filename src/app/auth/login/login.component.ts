import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'login-component',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.scss'],
    standalone: true,
    imports: [CommonModule]
})

export class LoginComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}