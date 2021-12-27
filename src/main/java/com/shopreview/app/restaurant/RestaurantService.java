package com.shopreview.app.restaurant;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class RestaurantService{

    private final RestaurantRepository restaurantRepository;

    public List<Restaurant> getAllRestaurants() {
        return restaurantRepository.findAll();
    }

    public void addRestaurant(Restaurant restaurant) {
        // will have to create exceptions here
        restaurantRepository.save(restaurant);
    }

    public void deleteRestaurant(Long id) {
        // will have to create exceptions here
        restaurantRepository.deleteById(id);
    }
}
