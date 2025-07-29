import { Component, inject } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { Products } from '../../shared/interfaces/products/products';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { Categories } from '../../shared/interfaces/categories/categories';

@Component({
  selector: 'app-products',
  imports: [NgClass,RouterLink,FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  private readonly productsService = inject(ProductsService)
  private readonly categoriesService = inject(CategoriesService)
  products:Products[] = [];
  searchItem:string = "";
  selectedCategory: string = '';
  categories:Categories[] = [];
  get filteredProducts() {
    return this.products.filter(product => {
      const matchesCategory =
        !this.selectedCategory || product.category.name === this.selectedCategory;
      const matchesSearch =
        !this.searchItem || product.title.toLowerCase().includes(this.searchItem.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }
  likedProducts: Record<string, boolean> = {};
  callProducts():void {
    this.productsService.getAllProducts().subscribe({
      next: (res) => {
        this.products = res.data
        console.log(this.products)
      },error:(err) => {
        console.log(err)
      }
    })
  }
  callCategories():void {
    this.categoriesService.getCategories().subscribe({
      next: (res) => {
        this.categories = res.data
        console.log(this.categories)
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
  localStorage.setItem('likedProducts', JSON.stringify(this.likedProducts));
  }
  isProductLiked(productId: string): boolean {
    return this.likedProducts[productId] === true;
  }
}
