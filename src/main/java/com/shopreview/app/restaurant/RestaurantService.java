package com.shopreview.app.restaurant;

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
    }
}
