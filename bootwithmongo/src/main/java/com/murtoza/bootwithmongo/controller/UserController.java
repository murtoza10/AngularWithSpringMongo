package com.murtoza.bootwithmongo.controller;

import com.murtoza.bootwithmongo.model.User;
import com.murtoza.bootwithmongo.repository.UserRepository;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;


import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class UserController {
	@Autowired
    private UserRepository repository;

    @PostMapping("/Adduser")
    public String register(@RequestBody User user) {
        repository.save(user);
        return "Hi " + user.getAdmin() + " your Registration process successfully completed";
    }
    
    @GetMapping("/getAllUsers")
    public List<User> findAllUsers() {
        return repository.findAll();
    }

//    @GetMapping("/findUser/{email}")
//    public List<User> findUser(@PathVariable String email) {
//        return repository.findByEmail(email);
//    }

    @DeleteMapping("/cancelUser/{id}")
    public List<User> cancelRegistration(@PathVariable String id) {
        repository.deleteById(id);
        return repository.findAll();
    }


}
