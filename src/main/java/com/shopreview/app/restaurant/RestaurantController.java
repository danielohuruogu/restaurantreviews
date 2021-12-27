package com.shopreview.app.restaurant;


import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path="api/restaurants")
@AllArgsConstructor
public class RestaurantController {

    private final RestaurantService restaurantService;

    @GetMapping
    public List<Restaurant> getAllRestaurants() { return restaurantService.getAllRestaurants(); }

    @PostMapping
    public void addRestaurant(@RequestBody Restaurant restaurant) {
        restaurantService.addRestaurant(restaurant);
    }

    @DeleteMapping(value="/{id}")
    public void deleteRestaurant(@PathVariable("id") Long id) { restaurantService.deleteRestaurant(id);}
}