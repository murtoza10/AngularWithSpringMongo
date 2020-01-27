import { take, map } from 'rxjs/operators';
import { AppProducts } from './models/app-products';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { AppItems } from './models/app-items';
import { AppShoppingCart } from './models/shoppingcart';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  itemsRef: AngularFireList<AppItems> = null;
  items: AppItems=null;
  cart: AppShoppingCart=null;
  private cartSource = new BehaviorSubject<AppShoppingCart>(new AppShoppingCart());
  carts = this.cartSource.asObservable();
  private TotalQuantitySource = new BehaviorSubject<number>(0);
  TotalQuantity = this.TotalQuantitySource.asObservable();
  private TotalPriceSource = new BehaviorSubject<number>(0);
  TotalPrice = this.TotalPriceSource.asObservable();
  quantity:number;
  interval;
  interval1;
  interval2;
  

  constructor(private db:AngularFireDatabase,private http:HttpClient) {
    this.getCart1().subscribe(cart=>{
      this.cartSource.next(cart);
     });
     this.getTotalQuantity().subscribe(totalquantity=>{
      this.TotalQuantitySource.next(totalquantity);
     });
     this.getTotalPrice().subscribe(totalprice=>{
      this.TotalPriceSource.next(totalprice);
     });
   }

  // async clearCart1(){
  //   let cartId = await this.getOrCreateCartId();
  //   this.db.list('/shopping-cart/'+cartId).remove();
  // }
  clearCart(){
    let cartId= this.getOrCreateCartId();
    return this.http.delete<AppShoppingCart>("http://localhost:9090/cancelCart/"+cartId);
  }
  // create1(){
  //   return this.db.list('/shopping-cart').push({
  //     date : new Date().getTime()
  //   });
  // }

  create(){
    let item=[];
    let cart ={
            items: item
        }
        
    return this.http.post<AppShoppingCart>("http://localhost:9090/Addcart",JSON.stringify(cart),{
      headers: new HttpHeaders().set('Content-Type', 'application/json')
   });
  }

  // async getCart(): Promise<AngularFireObject<AppShoppingCart>>{
  //   let cartId = await this.getOrCreateCartId();
  //   return this.db.object('/shopping-cart/'+cartId);
  // }

  getCart1(){
    let cartId= this.getOrCreateCartId();
    return this.http.get<AppShoppingCart>("http://localhost:9090/getCart/"+cartId);
  }

  getTotalQuantity(){
    let cartId= this.getOrCreateCartId();
    return this.http.get<number>("http://localhost:9090/getTotalQuantity/"+cartId);
  }

  getTotalPrice(){
    let cartId= this.getOrCreateCartId();
    return this.http.get<number>("http://localhost:9090/getTotalPrice/"+cartId);
  }

  // async getCartfor(){
  //   let cartId = await this.getOrCreateCartId();
  //   return this.itemsRef=this.db.list('/shopping-cart/'+cartId);
  // }

  // async getAllItem(){
  //   let cartId = await this.getOrCreateCartId();
  //   return this.db.list('/shopping-cart/'+cartId+ '/items/');
  // }
  // getItem(cartId: string,productId:string): AngularFireObject<AppItems>{
  //   return this.db.object('/shopping-cart/'+cartId+ '/items/' +productId);
  // }
  getItem1(productId){
    let cartId= this.getOrCreateCartId();
    return this.http.get<AppItems>("http://localhost:9090/getItem/"+cartId+"/"+productId);
  }
  // getItemForUpdate(cartId: string,productId:string){
  //   return this.db.object('/shopping-cart/'+cartId+ '/items/' +productId);
  // }

  // getOrCreateCartId1(){
  //   let cartId = localStorage.getItem('cartId');
  //   if(cartId) return cartId;

  //   let result = this.create();
  //   localStorage.setItem('cartId', result.key);
  //   return result.key;
  // }

  getOrCreateCartId(){
    let cartId = localStorage.getItem('cartId');
    if(cartId) return cartId;

    let result = this.create().pipe(take(1)).subscribe(cart=>{
      localStorage.setItem('cartId', cart.id);
      return cart.id
    });
    result.unsubscribe();
    return result;
  }


  // getCartId(){
  //   return this.http.get("http://localhost:9090/getCartId");
  // }

  updateCartItem(product:AppProducts,change:number){
    //let cartId= this.getCartId();
    let item=[];
    // this.getQuantity(product.id).pipe(
    //   take(1)
    //   ).subscribe(quantity=>{
    //   this.quantity=(quantity || 0)+change;
    // console.log("quantity"+this.quantity);}
    //   );
    let cartId= this.getOrCreateCartId();
    
      item[0]={id: product.id,
      title: product.title,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity: 0
      }
    let cart ={
        items: item
    }
    console.log(cart);
    console.log(cartId);
    console.log(product.id);
    
    this.http.put("http://localhost:9090/Updatecart/"+cartId+"/"+product.id+"/"+change,JSON.stringify(cart),{
      headers: new HttpHeaders().set('Content-Type', 'application/json') ,     
      responseType: 'text' 
   }).pipe(take(1)).subscribe();
   this.interval=setInterval(() => {
    this.getCart1().subscribe(cart=>{
      this.cartSource.next(cart);
     });
    clearInterval(this.interval);
}, 100);
this.interval1=setInterval(() => {
  this.getTotalQuantity().subscribe(totalquantity=>{
    this.TotalQuantitySource.next(totalquantity);
   });
  clearInterval(this.interval1);
}, 100);
this.interval2=setInterval(() => {
  this.getTotalPrice().subscribe(totalprice=>{
    this.TotalPriceSource.next(totalprice);
   });
  clearInterval(this.interval2);
}, 100);



      //.pipe(take(1)).subscribe();
    
    // let cartId =  this.getOrCreateCartId();
    // let item$= this.getItem(cartId,product.id);

    // item$.snapshotChanges().pipe(
    //   take(1),
    //   map(action => {
    //     const $key = action.payload.key;
    //     const data = { $key, ...action.payload.val() };
    //     return data;
    //   })
    // ).subscribe(items=> {
    //   this.items= items;
    //   // if(this.items.quantity===null) this.items.quantity=0;
    //   this.quantity =(this.items.quantity || 0)+change;
    //   if(this.quantity===0) item$.remove();
    //   else item$.update({
    //       title: product.title,
    //       price: product.price,
    //       quantity: this.quantity,
    //       imageUrl: product.imageUrl
    //   });
      
    //   });
  }

  getQuantity(productId){
    //let cartId =  this.getOrCreateCartId();
    // let item$= this.getItem(cartId,product.key);
    return this.http.get<number>("http://localhost:9090/getQuantity/"+"5e1803cae1b7755fa72bf2c3"+"/"+productId);
    //.subscribe(respons=> console.log(respons.toString()));

    // var quantity;
    // return item$.snapshotChanges().pipe(
    //   take(1),
    //   map(action => {
    //     const $key = action.payload.key;
    //     const data = { $key, ...action.payload.val() };
    //     return data;
    //   })
    // ).subscribe(items=> {
    //   this.items= items;
    //   quantity =(this.items.quantity || 0);  
    //    return quantity;
    //   });
      // console.log('from service quantity',this.items);  
      // return this.items;
  }
  
  

}
