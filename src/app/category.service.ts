import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db:AngularFireDatabase,private http:HttpClient) { }

  getCategories(){
    return this.http.get("http://localhost:9090/getAllCategories");

    // return this.db.list('/categories',ref => 
    // ref.orderByChild('name'));
  }
}
