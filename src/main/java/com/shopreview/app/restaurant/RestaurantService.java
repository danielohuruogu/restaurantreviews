package com.shopreview.app.restaurant;

import com.shopreview.app.restaurant.exception.RestaurantNotFoundException;
import com.shopreview.app.siteuser.exception.BadRequestException;
import com.shopreview.app.siteuser.exception.UserNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class RestaurantService {
    private final RestaurantRepository restaurantRepository;

    public List<Restaurant> getAllRestaurants() {
        return restaurantRepository.findAll();
    }

    public void addRestaurant(Restaurant restaurant) {
        // will need to add check to make sure restaurant isn't already there
        // could check by place_id or name
        restaurantRepository.save(restaurant);
    }

    public void deleteRestaurant(Restaurant restaurant) {
        long restaurant_id = restaurant.getRestaurant_Id();
        String name = restaurant.getRestaurant_name();
        // will need to add check to make sure that the restaurant exists
        if(!restaurantRepository.existsById(restaurant_id)) {
            throw new RestaurantNotFoundException(
                    "Can't find " + name + ". Please try again"
            );
        }
        restaurantRepository.deleteById(restaurant_id);
    }
}
