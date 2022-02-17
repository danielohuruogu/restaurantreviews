package com.shopreview.app.ServicesAndControllers;


import com.shopreview.app.shop.Shop;
import com.shopreview.app.shop.ShopRepository;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

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

    // at this path, I want to just send through a single ID and update that item
    // in database
    @PatchMapping(path="/{shopId}")
    public void updateShopDetails(@PathVariable Long shopId, @RequestBody Map<Integer, Optional> newShopDetails) throws IOException {
        shopService.updateShopDetails(shopId, newShopDetails);
    }
    @PostMapping()
    public void updateShopCollectionOrAddShop(@RequestBody RequestWrapper[] req) {
//        shopService.checkShopAndCollection(req);
        System.out.println(req);
    }

    @DeleteMapping()
    public void deleteShop(@RequestBody Shop shop) {
        shopService.deleteShop(shop);
    }

//******************* *******************//
    // for use in postman
//    @PostMapping
//    public String addShop(@RequestBody Shop shop) {
//        shopService.addShop(shop);
//        // grab the name and just return a string to say it's been successful
//        return shopRepository.findById(shop.getShopId()).get().getShopName() + " saved successfully";
//    }
}