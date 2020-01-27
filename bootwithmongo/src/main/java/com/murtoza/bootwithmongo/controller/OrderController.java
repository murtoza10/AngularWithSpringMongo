package com.murtoza.bootwithmongo.controller;

import org.springframework.web.bind.annotation.*;

import com.murtoza.bootwithmongo.model.Order;
import com.murtoza.bootwithmongo.repository.OrderRepository;

import org.springframework.beans.factory.annotation.Autowired;


import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class OrderController {
	@Autowired
    private OrderRepository repository;

    @PostMapping("/Addorder")
    public String saveOrder(@RequestBody Order order) {
        repository.save(order);
        return order.getItems() + " is successfully stored";
    }
    
    @GetMapping("/getAllOrder")
    public List<Order> findAllOrder() {
        return repository.findAll();
    }

//    @GetMapping("/findUser/{email}")
//    public List<User> findUser(@PathVariable String email) {
//        return repository.findByEmail(email);
//    }

    @DeleteMapping("/cancelOrder/{id}")
    public List<Order> cancelOrder(@PathVariable String id) {
        repository.deleteById(id);
        return repository.findAll();
    }
}
