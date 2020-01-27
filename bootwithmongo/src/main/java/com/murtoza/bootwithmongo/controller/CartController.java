package com.murtoza.bootwithmongo.controller;

import com.murtoza.bootwithmongo.model.Cart;
import com.murtoza.bootwithmongo.model.Item;
import com.murtoza.bootwithmongo.model.Product;
import com.murtoza.bootwithmongo.repository.CartRepository;

import org.springframework.web.bind.annotation.*;
import org.apache.tomcat.util.http.parser.MediaType;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class CartController {
	@Autowired
    private CartRepository repository;
	
	private int totalQuantity;
	private int Quantity=0;
	private double totalPrice;
	Item item;
	boolean flag = false;
	boolean flag1 = false;
	int indexofCart;
	
    @PostMapping("/Addcart")
    public Cart saveCart(@RequestBody Cart cart) {
       return repository.save(cart);
        //return cart.getId();
    }
    
    @GetMapping("/getAllCarts")
    public List<Cart> findAllCarts() {
        return repository.findAll();
    }
    
    @GetMapping("/getCart/{id}")
    public Optional<Cart> getCart(@PathVariable String id) {
        return repository.findById(id);

    }
    
    //@GetMapping("/getItem/{id}/{item_id}")
    @GetMapping(value = "/getItem/{id}/{item_id}", produces= org.springframework.http.MediaType.TEXT_EVENT_STREAM_VALUE)
    public Item getItem(@PathVariable String id,@PathVariable String item_id) {
    	
    	if(repository.findById(id).isPresent()) {
    		Cart cartById = repository.findById(id).get();
        	if(!cartById.getItems().isEmpty()) {
        	cartById.getItems().forEach(a-> {
            	if(a.getId().equals(item_id)) {
            		item= a;
            		//flag = true;
            	}
            });
        	}
    	}
    	return item;
    }
    
    @GetMapping("/getCartId")
    public String getCartId() {
    	//reading local Storage then return the CartId if any or return null
        return "5e1693c3d21f765fb1ae1cb0";

    }
    
    @GetMapping("/findItems/{id}")
    public List<Item> getItems(@PathVariable String id) {
        return repository.findById(id).get().getItems();

    }

    @GetMapping("/getTotalQuantity/{id}")
    public int getTotalQuantity(@PathVariable String id) {
    	totalQuantity=0;
        repository.findById(id).get().getItems().forEach(a-> totalQuantity= totalQuantity+ a.getQuantity());
        return totalQuantity;
    }
    
    @GetMapping("/getQuantity/{id}/{product_id}")
    public int getQuantity(@PathVariable String id,@PathVariable String product_id ) {
    	Quantity=0;
    	if(repository.findById(id).isPresent()) {
        repository.findById(id).get().getItems().forEach(a-> {
        	System.out.println(a.getId()+" "+product_id+" "+ a.getQuantity());
        	if(a.getId().equals(product_id)) {
        		Quantity= a.getQuantity();
        		System.out.println(a.getId()+"ami "+product_id+" "+ a.getQuantity());
        		//flag = true;
        	}
        });
    	}
        return Quantity;
    }
    
    @GetMapping("/getTotalPrice/{id}")
    public double getTotalPrice(@PathVariable String id) {
    	totalPrice=0;
        repository.findById(id).get().getItems().forEach(a-> totalPrice= totalPrice+ a.getQuantity()*a.getPrice());
        return totalPrice;
    }
    
    //@PutMapping("/Updatecart/{id}/{product_id}/{change}")
    @RequestMapping(value = "/Updatecart/{id}/{product_id}/{change}",
    method = RequestMethod.PUT,consumes = {"text/plain;charset=UTF-8", org.springframework.http.MediaType.APPLICATION_JSON_VALUE}, produces=org.springframework.http.MediaType.TEXT_EVENT_STREAM_VALUE)
    public String updateCart(@RequestBody Cart cart,@PathVariable String id,@PathVariable String product_id,@PathVariable String change) {
    		
    	if(repository.findById(id).isPresent()) {
    		Cart cartById = repository.findById(id).get();
    	if(!cartById.getItems().isEmpty()) {
    	cartById.getItems().forEach(a-> {
        	if(a.getId().equals(product_id)) {
        		if(a.getQuantity()==1 && change.equals("-1")) {
        			indexofCart =cartById.getItems().indexOf(a);
        			flag1=true;
        			
        		}else {
        			a.setQuantity(a.getQuantity()+Integer.parseInt(change));
            		System.out.println("cart present item present ");
            		//System.out.println("item "+item.getQuantity()+" "+item.getTitle());
            		repository.save(cartById);
        		}
        		
        		flag = true;
        	}
        });
    	if(flag==false) {
    		for(Item item: cart.getItems()) {
    			item.setQuantity(item.getQuantity()+Integer.parseInt(change));
    			//System.out.println("item "+item.getQuantity()+" "+item.getTitle());
    			cartById.getItems().add(item);
    		}
    		System.out.println("cart present may be items also present but item doesnot match ");
    		repository.save(cartById);
    	}else {
    		if(flag1==true) {
    			System.out.println("when quantity is 1 and change is -1 so item needs to be removed ");
    			
    			System.out.println(indexofCart);
    			cartById.getItems().remove(indexofCart);
    			repository.save(cartById);
    		}
    	}
    	//System.out.println("cart present ");
    	}else {
    		System.out.println("cart present but item doesnot we need to insert the item into empty cart ");
    		cart.getItems().get(0).setQuantity(1);
    		cartById.getItems().add(cart.getItems().get(0));
    		repository.save(cartById);
    	}
    	}else {
    		System.out.println("cart not present ");
    		cart.getItems().get(0).setQuantity(1);
    		repository.save(cart);
    	}
    	flag=false;
    	flag1=false;
        return cart.getItems() + " is successfully stored";
    }

    @DeleteMapping("/cancelCart/{id}")
    public List<Cart> cancelCart(@PathVariable String id) {
        repository.deleteById(id);
        return repository.findAll();
    }
}
