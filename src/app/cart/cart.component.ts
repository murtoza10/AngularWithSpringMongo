import { ProductService } from './../product.service';
import { AppItems } from './../models/app-items';
import { ShoppingCartService } from './../shopping-cart.service';
import { NavbarComponent } from './../navbar/navbar.component';
import { Component, OnInit, ViewChild, OnDestroy, ChangeDetectorRef,  
  ChangeDetectionStrategy } from '@angular/core';
import { map, take } from 'rxjs/operators';
import { AppShoppingCart } from '../models/shoppingcart';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { Observable, Subscription } from 'rxjs';
import { AppProducts } from '../models/app-products';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  // providers: [NavbarComponent]
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartComponent implements OnInit,OnDestroy {

  displayedColumns = ['title','quantity', 'price'];
  dataSource: MatTableDataSource<AppItems>;

  // @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  //items: AppItems=null;
  TotalCartItemCount: number;
  cart: AppShoppingCart;
  products: AppProducts[]=[];
  items;
  TotalItemPrice:number[]=[];
  TotalPrice:number;

  subscription:Subscription;
  subscription1: Subscription;
  subscription2:Subscription;

  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit() {
   this.getCart();
  this.getTotalQuantity();
  this.getTotalPrice();
  //   this.dataSource = new MatTableDataSource(this.items);
  }

  getTotalQuantity(){
    this.shoppingCartService.TotalQuantity.subscribe(totalQuantity=>
      this.TotalCartItemCount=totalQuantity);
   }

   getTotalPrice(){
    this.shoppingCartService.TotalPrice.subscribe(totalPrice=>
      this.TotalPrice=totalPrice);
   }

  getCart(){
    this.shoppingCartService.carts.subscribe(cart=>{
      this.cart= cart
      this.items=cart.items;
    });
  }

  clearCart(){
    this.shoppingCartService.clearCart();
  }

  ngOnDestroy(){
    if(this.subscription) this.subscription.unsubscribe();
    if(this.subscription1) this.subscription1.unsubscribe();
    if(this.subscription2) this.subscription2.unsubscribe();
  }

}