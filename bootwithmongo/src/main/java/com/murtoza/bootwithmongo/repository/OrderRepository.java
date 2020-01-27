package com.murtoza.bootwithmongo.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.murtoza.bootwithmongo.model.Order;

public interface OrderRepository extends MongoRepository<Order,String>{

}
