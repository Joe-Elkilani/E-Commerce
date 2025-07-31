import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { Products } from '../../shared/interfaces/products/products';
import { NgClass } from '@angular/common';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { Categories } from '../../shared/interfaces/categories/categories';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../shared/pipes/search/search.pipe';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  imports: [NgClass, CarouselModule,RouterLink,FormsModule,SearchPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  private readonly productsService = inject(ProductsService)
  private readonly cartService = inject(CartService)
  private readonly categoriesService = inject(CategoriesService)
  private readonly toastrService = inject(ToastrService)
  searchItem:string = "";
  products:Products[] = [];
  categories:Categories[] = [];
  likedProducts: Record<string, boolean> = {};

  callProducts():void {
    this.productsService.getProducts().subscribe({
      next: (res) => {
        this.products = res.data
      },error:(err) => {
        console.log(err)
      }
    })
  }
    callCategories():void {
    this.categoriesService.getCategories().subscribe({
      next: (res) => {
        this.categories = res.data
      },error:(err) => {
        console.log(err)
      }
    })
  }
  ngOnInit(): void {
    this.callProducts()
    this.callCategories()
  }

  toggleLike(productId: string): void {
    this.likedProducts[productId] = !this.likedProducts[productId];
    if (typeof window !== 'undefined') {
      localStorage.setItem('likedProducts', JSON.stringify(this.likedProducts));
    }
  }

  isProductLiked(productId: string): boolean {
    return this.likedProducts[productId] === true;
  }

  addProductToCart(id:string) {
    this.cartService.addProdToCart(id).subscribe({
      next:(res) => {
        this.cartService.numberOfCart.next(res.numOfCartItems)
      },error:(err) => {
        console.log(err)
      }
    })
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    rtl:true,
    dots: false,
    navSpeed: 700,
    autoplay: true,
    autoplayHoverPause: true,
    autoplayTimeout: 2000,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 7
      }
    },
    nav: true
  }

  mainsliderOpations: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    rtl:true,
    pullDrag: false,
    autoplay: true,
    autoplayHoverPause: true,
    autoplayTimeout: 2000,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: true,
  }
}
