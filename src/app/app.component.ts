import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private router = inject(Router);

  ngOnInit() {
    const isHaveCookie = localStorage.getItem("userCookie")!;
    console.log(isHaveCookie)
    if (isHaveCookie) {
      this.router.navigate(['./offer']);
    }
    else {
      this.router.navigate(['./login']);
    }
  }
}
