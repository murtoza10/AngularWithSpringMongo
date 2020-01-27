package com.murtoza.bootwithmongo.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.murtoza.bootwithmongo.model.Product;

public interface ProductRepository extends MongoRepository<Product,String>{

}
