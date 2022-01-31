package com.shopreview.app.shop;


import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path="api/shops")
@AllArgsConstructor
public class ShopController {

    private final ShopService shopService;

    @GetMapping
    public List<Shop> getAllShops() {
        return shopService.getAllShops();
    }

    @PostMapping
    public void addRestaurant(@RequestBody Shop shop) {
        shopService.addShop(shop);
    }

    @DeleteMapping()
    // maybe just send the id, actually
    public void deleteRestaurant(@RequestBody Shop shop) {
        shopService.deleteShop(shop);
    }
}