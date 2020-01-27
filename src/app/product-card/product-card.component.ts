import { AppShoppingCart } from './../models/shoppingcart';
import { take, map } from 'rxjs/operators';
import { ShoppingCartService } from './../shopping-cart.service';
import { AppProducts } from './../models/app-products';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { AppItems } from '../models/app-items';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit,OnDestroy{
  @Input('product') product:AppProducts;
  @Input('productId') productId;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart:AppShoppingCart;
  subscription: Subscription;
  items: AppItems=null;
  cartId;
  quantity:number=0;
  interval;
  
  constructor(private cartService: ShoppingCartService) { 
    
  }
  ngOnInit(){
    this.refresh();
  }
  getQuantity(){
    // if(typeof this.shoppingCart.items==='undefined'||typeof this.shoppingCart==='undefined') return 0;
    
    for(let item of this.shoppingCart.items){
      if(item.id===this.product.id){
        console.log(item);
        this.quantity= item ? item.quantity : 0;
      } 
    }
    return this.quantity;
    //return 0;
    //return this.quantity;
    // let item = this.shoppingCart.items[this.product.id];
    // console.log(this.shoppingCart.items[0]);
    
    
    // if(typeof this.items===null|| typeof this.items==='undefined'){
    //   return 0;      
    // } 
    // else{
    //   console.log("getQuantity " + this.items.quantity);
    //   return this.items.quantity;
    // } 
    // if(typeof this.items==='undefined'||typeof this.shoppingCart==='undefined') return 0;
    // let item = this.items[this.product.id];
    // return item ? item.quantity : 0;
    // this.subscription=this.cartService.getQuantity(this.productId).pipe(take(1)).subscribe(quantity=>{
    //   this.quantity=quantity;
    // console.log("productId"+this.productId+"quantity"+this.quantity);}
    //   );
  }
  
  refresh(){
    this.subscription = this.cartService.getCart1().subscribe(cart=>{
      this.shoppingCart= cart;
      this.getQuantity();
      console.log("item id & item quantity "+this.shoppingCart.id+" quantity "+this.shoppingCart.items);
    });
  }
  
  addToCart(){
    this.cartService.updateCartItem(this.product,1);
    this.interval=setInterval(() => {
      this.refresh();
      console.log('timeout!');
      clearInterval(this.interval);
  }, 100);
    //this.quantity++;
    //this.getQuantity();
}

  ngOnDestroy(){
   this.subscription.unsubscribe();
  }

}
