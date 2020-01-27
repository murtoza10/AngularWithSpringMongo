package com.murtoza.bootwithmongo.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
//import org.springframework.data.querydsl.QuerydslPredicateExecutor;

import com.murtoza.bootwithmongo.model.User;

public interface UserRepository extends MongoRepository<User,String>{


}
