import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { Categories } from '../../shared/interfaces/categories/categories';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {
  private readonly categoriesService = inject(CategoriesService)
  categories:Categories[] = [];
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
    this.callCategories()
  }
}
