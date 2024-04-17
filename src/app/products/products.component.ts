import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../model/product.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{



  //private http!:HttpClient;
  constructor(private productservice:ProductService ){}

  products:Array<Product> =[]
  public keyword: string="";


  ngOnInit(): void {
   this.getProducts();
  }

  getProducts(){

   // this.products = this.productservice.getProduct()
    this.productservice.getProducts(1, 2)
    .subscribe({
      next :data =>{this.products=data
      },
     
        error: err =>{
          console.log(err);
        }
     
    })
  }

 

handlaCheckProduct(p: Product) {
  this.productservice.checkProduct(p)
  .subscribe({
    next: updatedProduct =>{
      this.getProducts();
      //p.checked=!p.checked;
    }
  })
 
  }


  handleDelete(p: Product) {
    if(confirm("Etes vous sûre?"))
    this.productservice.deletProduct(p).subscribe({
      next:value =>{
        //this.getProducts();
        this.products=this.products.filter(p=>p.id!= p.id);
      }
    })
    }

    searchProducts() {
      this.productservice.searchProducts(this.keyword).subscribe({
        next:value=>
        {this.products=value;
        }
      })
      }

}

