import { CartComponent } from './../cart/cart.component';
import { NavbarComponent } from './../navbar/navbar.component';
import { ProductCardComponent } from './../product-card/product-card.component';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { AppProducts } from '../models/app-products';
import { AppShoppingCart } from '../models/shoppingcart';
import { AppItems } from '../models/app-items';
import { Subscription } from 'rxjs';
import { ShoppingCartService } from '../shopping-cart.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent implements OnInit,OnDestroy{
  @Input('product') product:AppProducts;
  @Input('productId') productId;
  
  // @Input('items') items: AppItems;
  @Input('shopping-cart') shoppingCart:AppShoppingCart;
  quantity: number=0;
  interval;
  interval1;
  flag:boolean=false;
  
  subscription:Subscription;
  constructor(private cartService: ShoppingCartService,private productCard: ProductCardComponent,
    private navBar:NavbarComponent, private cartComponent: CartComponent) {}

  ngOnInit(){
    // this.subscription = this.cartService.getItem1(this.product.id).subscribe(item=>{
    //   this.items= item;
    //   console.log("item id & item quantity "+this.items.id+" quantity "+this.items.quantity);
    // });
    //this.getQuantity();
    // this.subscription = this.cartService.getCart1().subscribe(cart=>{
    //   this.shoppingCart= cart;
    //   this.getQuantity();
    //   console.log("item id & item quantity "+this.shoppingCart.id+" quantity "+this.shoppingCart.items);
    // });
    
    this.refresh();
  }
  
  getQuantity(){
    // this.subscription = this.cartService.getItem1(this.product.id).pipe(take(1)).subscribe(item=>{
    //   this.items= item;
    //   console.log("item id & item quantity "+this.items.id+" quantity "+this.items.quantity);
    // });
    this.flag =false;
    for(let item of this.shoppingCart.items){
      if(item.id===this.productId){
        console.log("item "+item);
        this.quantity= item ? item.quantity : 0;
        this.flag =true;
        console.log("flag true");
      } 
    }
    // return 0;
    if(this.flag==false) {
      console.log("quantity and flag 0");
      return 0;
    }
    else{
      console.log("quantity "+ this.quantity);
      return this.quantity;
    } 
    
    // if(typeof this.shoppingCart.items==='undefined'||typeof this.shoppingCart==='undefined') return 0;
    // let item = this.shoppingCart.items[this.product.id];
    // console.log(this.shoppingCart.items[this.product.id]);
    // // console.log('pro',this.product);
    // // console.log('prokey',this.product.key);
    // // console.log('cart',this.shoppingCart);
    // return item ? item.quantity : 0;
    // if(typeof this.items==='undefined'|| typeof this.items==='undefined'){
    //   return 0;
      
    // } 
    // else{
    //   console.log("getQuantity " + this.items.quantity);
    //   return this.items.quantity;
    // } 
    // this.subscription=this.cartService.getQuantity(this.productId).subscribe(quantity=>{
    //   this.quantity=quantity;
    //   console.log("productId"+this.productId+"quantity"+this.quantity);}
    //   );
  }
  removeFromCart(){
    this.cartService.updateCartItem(this.product,-1);
    this.interval=setInterval(() => {
      this.refresh();
      console.log('timeout!');
      clearInterval(this.interval);
  }, 100);
  //clearInterval(this.interval);
  
  }

  refresh(){
    this.subscription = this.cartService.getCart1().subscribe(cart=>{
      
      this.shoppingCart= cart;
      // this.cartComponent.items=this.shoppingCart.items;
      this.quantity=this.productCard.quantity=this.getQuantity();
      // this.cartComponent.items=cart.items;
      // this.cartComponent.getTotalQuantity();
      // this.cartComponent.getTotalPrice();
      
      console.log("item id & item quantity "+this.shoppingCart.id+" quantity "+this.shoppingCart.items);
    });
  //   this.interval1=setInterval(() => {
  //     this.navBar.getShoppingCartItemCount();
      
  //     console.log('timeout!');
  //     clearInterval(this.interval1);
  // }, 100);
     
    // this.cartComponent.getTotalQuantity();     
    // this.cartComponent.getTotalPrice();
      // this.cartComponent.getCart();
      //this.cartComponent.items=this.shoppingCart.items;
  }

  addToCart(){
    
      let update=this.cartService.updateCartItem(this.product,1);
      this.interval=setInterval(() => {
        this.refresh();
        console.log('timeout!');
        clearInterval(this.interval);
    }, 100);
  //   this.interval1=setInterval(() => {
  //     this.navBar.getShoppingCartItemCount();
  //     //this.cartComponent.items=this.shoppingCart.items;
  //     console.log('timeout!');
  //     clearInterval(this.interval1);
  // }, 100);
    //clearInterval(this.interval);
      // this.subscription = this.cartService.getCart1().subscribe(cart=>{
      //   this.shoppingCart= cart;
      //   this.getQuantity();
      //   console.log("item id & item quantity "+this.shoppingCart.id+" quantity "+this.shoppingCart.items);
      // });
      //this.quantity++;
      // this.subscription = this.cartService.getItem1(this.product.id).pipe(take(1)).subscribe(item=>{
      //   this.items= item;
      //   console.log("item id & item quantity "+this.items.id+" quantity "+this.items.quantity);
      // });
      //this.getQuantity();
      console.log("update"+update);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
