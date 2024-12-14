import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
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
