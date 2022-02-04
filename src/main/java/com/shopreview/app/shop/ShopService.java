package com.shopreview.app.shop;

import com.shopreview.app.shop.exception.ShopNotFoundException;
import com.shopreview.app.siteuser.exception.BadRequestException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class ShopService {
    private final ShopRepository shopRepository;

    public List<Shop> getAllShops() {
        return shopRepository.findAll();
    }

    public Shop getUserById(Long id) {
        if(!shopRepository.existsById(id)){
            throw new ShopNotFoundException(
                    "Shop with id " + id + " does not exist"
            );
        }
        return shopRepository.findById(id).get();
    }

    public void addShop(Shop shop) {
        // will need to add check to make sure restaurant isn't already there
//        Boolean shopAlreadyExists = shopRepository.selectExistingName(shop.getShop_name());
//        if (shopAlreadyExists){
//            throw new BadRequestException(
//                    "Shop " + shop.getShop_name() + " taken"
//            );
//        }
        // could check by place_id or name
        shopRepository.save(shop);
    }

    public void deleteShop(Shop shop) {
        Long shop_id = shop.getShopId();
        String name = shop.getShop_name();
        // will need to add check to make sure that the restaurant exists
        if(!shopRepository.existsById(shop_id)) {
            throw new ShopNotFoundException(
                    "Can't find " + name + ". Please try again"
            );
        }
        shopRepository.deleteById(shop_id);
    }

    public Shop updateShop(Shop newShopDetails) {
        Long shop_id = newShopDetails.getShopId();
        if(!shopRepository.existsById(shop_id)){
            throw new ShopNotFoundException(
                    "Shop with id " + shop_id + " does not exist"
            );
        }

        return shopRepository.findById(shop_id)
                .map(shopToUpdate -> {
                    shopToUpdate.setShop_name(newShopDetails.getShop_name());
                    shopToUpdate.setAddress(newShopDetails.getAddress());
                    shopToUpdate.setType_Of_Food(newShopDetails.getType_Of_Food());
                    shopToUpdate.setWebsite(newShopDetails.getWebsite());
                    return shopRepository.save(shopToUpdate);
                })
                .orElseGet(() -> {
                    newShopDetails.setShopId(shop_id);
                    return shopRepository.save(newShopDetails);
                });
    }
}
