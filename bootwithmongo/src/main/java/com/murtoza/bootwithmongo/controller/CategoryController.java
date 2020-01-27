package com.murtoza.bootwithmongo.controller;

import org.springframework.web.bind.annotation.*;

import com.murtoza.bootwithmongo.model.Category;
import com.murtoza.bootwithmongo.repository.CategoryRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class CategoryController {
	@Autowired
    private CategoryRepository repository;

    @PostMapping("/Addcategory")
    public String saveCategory(@RequestBody Category category) {
        repository.save(category);
        return category.getName() + " is successfully stored";
    }
    
    @GetMapping("/getAllCategories")
    public List<Category> getAllCategories() {
        return repository.findAll(Sort.by(Sort.Direction.ASC, "name"));
    }

//    @GetMapping("/findUser/{email}")
//    public List<User> findUser(@PathVariable String email) {
//        return repository.findByEmail(email);
//    }

    @DeleteMapping("/cancelCategory/{id}")
    public List<Category> cancelCategory(@PathVariable String id) {
        repository.deleteById(id);
        return repository.findAll();
    }
}
