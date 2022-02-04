package com.shopreview.app.shop;


import com.shopreview.app.siteuser.SiteUser;
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
    private final ShopRepository shopRepository;

    @GetMapping
    public List<Shop> getAllShops() {
        return shopService.getAllShops();
    }

    @PostMapping
    public String addRestaurant(@RequestBody Shop shop) {
        shopService.addShop(shop);
        // grab the name and just return a string to say it's been successful
        return shopRepository.findById(shop.getShopId()).get().getShop_name() + " saved successfully";
    }

    @DeleteMapping()
    // maybe just send the id, actually
    public void deleteRestaurant(@RequestBody Shop shop) {
        shopService.deleteShop(shop);
    }

    @PatchMapping()
    public void updateUser(@RequestBody Shop shop) { shopService.updateShop(shop); }
}