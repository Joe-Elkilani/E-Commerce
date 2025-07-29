import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products/products.service';
import { Datails } from '../../shared/interfaces/datails/datails';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly productsService = inject(ProductsService)
  prodDatails:Datails | null = null;
  prodId:any;
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next:(res) => {
        this.prodId = res.get('id')
        this.productsService.getspecificyProduct(this.prodId).subscribe({
          next:(res) => {
            this.prodDatails = res.data;
            console.log(res.data)
          },error:(err) => {
            console.log(err)
          }
        })
      },error:(err) => {
        console.log(err)
      }
    })
  }
}
