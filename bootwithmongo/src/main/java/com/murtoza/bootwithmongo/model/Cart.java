package com.murtoza.bootwithmongo.model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

//import lombok.AllArgsConstructor;
//import lombok.Data;
//import lombok.NoArgsConstructor;
//import lombok.ToString;

//@Data
//@AllArgsConstructor
//@NoArgsConstructor
//@ToString
@Document(collection = "carts")
public class Cart {
	@Id
    private String id;
    private List<Item> items;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public List<Item> getItems() {
		return items;
	}
	public void setItems(List<Item> item) {
		this.items = item;
	}
    
}
