package com.shopreview.app.ServicesAndControllers;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.shopreview.app.ServicesAndControllers.exception.BadRequestException;
import com.shopreview.app.review.ReviewRepository;
import com.shopreview.app.shop.Address;
import com.shopreview.app.shop.GeoLocationService;
import com.shopreview.app.shop.Shop;
import com.shopreview.app.shop.ShopRepository;
import com.shopreview.app.ServicesAndControllers.exception.NotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@AllArgsConstructor
@Service
public class ShopService {
    private final ShopRepository shopRepository;
    private final ReviewRepository reviewRepository;
    private final GeoLocationService geoLocationService;

    // **** functions to help service functions
    // for updating shop entities
    @Autowired
    ObjectMapper objectMapper;

    // for generating geolocation data:
    private void computeAddress(Shop shop) {
        if (shop.getAddress() != null && shop.getGeoLocation() == null && !shop.isGeoProcessed()) {
            geoLocationService.computeGeoLocation((shop.getAddress().toString()))
                    .ifPresent(shop::setGeoLocation);
            shop.setGeoProcessed(true);
        }
    }

    // **** data manipulation functions
    public List<Shop> getAllShops() {
        final List<Shop> shops = shopRepository.findAll();
        shops.forEach(this::computeAddress);
        return shops;
    }

    public Shop getShopById(Long id) {
        if(!shopRepository.existsById(id)){
            throw new NotFoundException(
                    "Shop with id " + id + " does not exist"
            );
        }
        Shop shopToRetrieve = shopRepository.findById(id).get();
        computeAddress(shopToRetrieve);

        return shopToRetrieve;
    }

    public void deleteShop(Shop shop) {
        Long shop_id = shop.getShopId();
        String name = shop.getShopName();
        // will need to add check to make sure that the restaurant exists
        if(!shopRepository.existsById(shop_id)) {
            throw new NotFoundException(
                    "Can't find " + name + ". Please try again"
            );
        }
        shopRepository.deleteById(shop_id);
    }

    public void checkShopAndCollection(RequestWrapper requestArrayList) {
        System.out.println(requestArrayList);
        // will need to grab the shop name and postcode out of the request
        List reqItems = requestArrayList.getRequestItems();
        Object shopDetails = reqItems.get(0);
        Object reviewDetails = reqItems.get(1);
        System.out.println(shopDetails);
        System.out.println(reviewDetails);
        // if the shop exists, do nothing
        // if it doesn't add it to the database

        // and then focus on the review section
        // save it to the database
        // grab its id and add it to the shop's collection
    }

    public void updateShopDetails(Long shopId, Map<Integer, Optional> newShopDetails) throws IOException {
//        Long shop_id = newShopDetails.getShopId();
        if(!shopRepository.existsById(shopId)){
            throw new NotFoundException(
                    "Shop with id " + shopId + " does not exist"
            );
        }

        Shop existingShop = shopRepository.findById(shopId).get();
        Shop updatedShop = objectMapper
                .setDefaultMergeable(Boolean.TRUE)
                .readerForUpdating(existingShop).readValue((JsonParser) newShopDetails);

        updatedShop.setGeoProcessed(false);

        shopRepository.saveAndFlush(updatedShop);
    }

// for postman
    public void addShop(Shop shop) {
 //       will need to add check to make sure restaurant isn't already there
//        Boolean shopAlreadyExists = shopRepository.selectExistingName(shop.getShop_name());
//        if (shopAlreadyExists){
//            throw new BadRequestException(
//                    "Shop " + shop.getShop_name() + " taken"
//            );
//        }
//        could check by place_id or name
        shopRepository.save(shop);
    }
}

// *********** SUPERCEDED CODE



//            .map(shopToUpdate -> {
//                shopToUpdate.setShop_name(newShopDetails.getShop_name());
//                shopToUpdate.setAddress(newShopDetails.getAddress());
//                shopToUpdate.setType_Of_Food(newShopDetails.getType_Of_Food());
//                shopToUpdate.setWebsite(newShopDetails.getWebsite());
//                return shopRepository.save(shopToUpdate);
//            })
//            .orElseGet(() -> {
//                newShopDetails.setShopId(shop_id);
//                return shopRepository.save(newShopDetails);
//            });

//        newShopDetails.forEach(
//                (change, value) -> {
//                    switch (change) {
//                        case "shop_name":
//                            existingShop.setShop_name(String.valueOf(value));
//                            break;
//                        case "shop_street":
//                            // will create a computeGeoLocation interface implementation
//                            // will return
////                            Address newAddress = new Address();
//                            existingShop.setAddress(value);
//                            break;
//                        case "type_Of_Food":
//                            existingShop.setType_Of_Food(List.of(String.valueOf(value)));
//                    }
//                }
//        )