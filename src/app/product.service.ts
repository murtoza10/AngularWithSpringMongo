import { Observable } from 'rxjs';
import { AppProducts } from './models/app-products';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  PRODUCTS: AppProducts[]=[];

  private dbPath = '/products';

  productsRef: AngularFireList<AppProducts> = null;

  constructor(private  db: AngularFireDatabase,private http:HttpClient) {
    this.productsRef = db.list(this.dbPath);
  }

  create(product){
    return this.db.list('/products').push(product);
  }

   getAll(){
    //return this.productsRef;
    return this.http.get<AppProducts[]>("http://localhost:9090/getAllProducts");
  }

  get(productId){
    return this.db.object('/products/'+productId);
  }

  update(productId, product){
    return this.db.object('/products/'+productId).update(product);
  }

  delete(productId){
    return this.db.object('/products/'+productId).remove();
  }

}
