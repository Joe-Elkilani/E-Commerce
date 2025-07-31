import { Component, OnInit, inject } from '@angular/core';
import { FlowbiteService } from '../../core/services/flowbite/flowbite.service';
import { initFlowbite } from 'flowbite';
import { Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { UserService } from '../../core/services/user/user.service';
import { MyTranslateService } from '../../core/services/myTranslate/my-translate.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { CartService } from '../../core/services/cart/cart.service';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { signal } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterModule, TranslatePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly flowbiteService = inject(FlowbiteService);
  private readonly router = inject(Router);
  private readonly userService = inject(UserService);
  private readonly myTranslateService = inject(MyTranslateService);
  private readonly translateService = inject(TranslateService);
  private readonly cartService = inject(CartService);

  loggedIn = signal(false);
  numOfCartItems: number = 0;

  ngOnInit(): void {
    // تهيئة Flowbite
    this.flowbiteService.loadFlowbite(() => initFlowbite());

    // تحديث حالة تسجيل الدخول
    this.userService.isLoggedIn$.subscribe((status) => this.loggedIn.set(status));

    // تنفيذ فقط في المتصفح وليس SSR
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      if (token) {
        this.getCartItems();
        this.cartService.getCarts().subscribe({
          next: (res) => {
            this.cartService.numberOfCart.next(res.numOfCartItems);
          },
          error: (err) => {
            console.log(err);
          }
        });
      }

      // الاشتراك في عدد عناصر السلة
      this.cartService.numberOfCart.subscribe({
        next: (value) => {
          this.numOfCartItems = value;
        }
      });
    }
  }

  // تسجيل الخروج
  signOut(): void {
    this.userService.signOut();
  }

  // تغيير اللغة
  changeLang(lang: string): void {
    this.myTranslateService.changeLang(lang);
  }

  // تحديد اللغة الحالية
  currentLang(lang: string) {
    return this.translateService.currentLang === lang;
  }

  // تحميل عدد عناصر السلة
  private getCartItems(): void {
    this.cartService.getCarts().subscribe({
      next: (res) => {
        this.cartService.numberOfCart.next(res.numOfCartItems);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
