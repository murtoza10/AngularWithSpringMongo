package com.murtoza.bootwithmongo.controller;

import com.murtoza.bootwithmongo.model.Product;
import com.murtoza.bootwithmongo.repository.ProductRepository;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;


import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class ProductController {
	@Autowired
    private ProductRepository repository;

    @PostMapping("/Addproduct")
    public String saveProduct(@RequestBody Product product) {
        repository.save(product);
        return product.getTitle() + " is successfully stored";
    }
    
    @GetMapping("/getAllProducts")
    public List<Product> findAllProducts() {
        return repository.findAll();
    }

//    @GetMapping("/getQuantity/{id}")
//    public int getQuantity(@PathVariable String id) {
//        return repository.findById(id).
//    }
//    @GetMapping("/findUser/{email}")
//    public List<User> findUser(@PathVariable String email) {
//        return repository.findByEmail(email);
//    }

    @DeleteMapping("/cancelProduct/{id}")
    public List<Product> cancelProduct(@PathVariable String id) {
        repository.deleteById(id);
        return repository.findAll();
    }
}
