package com.murtoza.bootwithmongo.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.murtoza.bootwithmongo.model.Category;

@Repository
public interface CategoryRepository extends MongoRepository<Category,String>{

}
