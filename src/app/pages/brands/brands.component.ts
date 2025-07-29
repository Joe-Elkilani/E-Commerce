import { BrandsService } from './../../core/services/brands/brands.service';
import { Component, inject, OnInit } from '@angular/core';
import { Brands } from '../../shared/interfaces/brands/brands';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css'
})
export class BrandsComponent implements OnInit {
  private readonly brandsService = inject(BrandsService)
  brands:Brands[] = [];
  callBrands():void {
    this.brandsService.getBrands().subscribe({
      next: (res) => {
        this.brands = res.data
      },error:(err) => {
        console.log(err)
      }
    })
  }
  ngOnInit(): void {
    this.callBrands()
  }
}
