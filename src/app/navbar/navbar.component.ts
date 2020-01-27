import { CartComponent } from './../cart/cart.component';
import { ShoppingCartService } from './../shopping-cart.service';
import { AuthService } from './../auth.service';
import { Component, OnInit,ChangeDetectorRef,  
  ChangeDetectionStrategy, 
  AfterContentChecked} from '@angular/core';
import { AppUser } from '../models/app-user';
import { map, take } from 'rxjs/operators';
import { AppShoppingCart } from '../models/shoppingcart';
import { Subscription } from 'rxjs';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
  // providers: [],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnInit{

  appUser: AppUser;
  ShoppingCartItemCount: number;
  cart;
  subscription: Subscription;

  constructor(private auth: AuthService,private shoppingCartService: ShoppingCartService) {
    
   }

   ngOnInit(){
    this.auth.appUser$.subscribe(appUser=> this.appUser = appUser);
    this.getShoppingCartItemCount();
   }

   getShoppingCartItemCount(){
    this.shoppingCartService.TotalQuantity.subscribe(totalQuantity=>{
      this.ShoppingCartItemCount=totalQuantity;
      console.log(totalQuantity);
    });
      
   }
  
    logout(){
      this.auth.logout();
    }

}
 