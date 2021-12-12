package com.shopreview.app.user;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping(path = "api/users")
public class UserController {

    @GetMapping
    public List<User> getAllUsers(){
        List<User> users = Arrays.asList(
                new User(
                        1L,
                        "Daniel",
                        "Ohuruogu",
                        "hello@hello.com",
                        "pass",
                        241292L,
                        "Admin"
                ),
                new User(
                        2L,
                        "James",
                        "Ogu",
                        "hello@hello.com",
                        "pass",
                        241292L,
                        "User"
                )
        );
        return users;
    }
}
