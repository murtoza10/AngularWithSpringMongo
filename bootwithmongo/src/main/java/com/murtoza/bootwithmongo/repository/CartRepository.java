package com.murtoza.bootwithmongo.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.murtoza.bootwithmongo.model.Cart;

@Repository
public interface CartRepository extends MongoRepository<Cart,String>{

	
}

