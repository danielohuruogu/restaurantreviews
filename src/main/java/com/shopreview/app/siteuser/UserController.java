package com.shopreview.app.siteuser;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/users")
@AllArgsConstructor
public class UserController {

    private final UserService userService;

    // can also do @RequestMapping to create a route with multiple methods
    // the code below just splits the methods up
    @GetMapping
    public List<SiteUser> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping(value = "/{id}")
    public SiteUser getUserById(@PathVariable("id") Long id) {
        return userService.getUserById(id);
    }

    @PostMapping
    public void addUser(@RequestBody SiteUser user) {
        userService.addUser(user);
    }

    @DeleteMapping(value = "/{id}")
    public void deleteUser(@PathVariable("id") Long id) {
        userService.deleteUser(id);
    }

    @PutMapping(value = "/{id}")
    public void replaceUser(@RequestBody SiteUser user, @PathVariable Long id){
        userService.replaceUser(user);
    }
}

