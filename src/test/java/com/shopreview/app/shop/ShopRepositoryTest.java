package com.shopreview.app.shop;

import com.shopreview.app.review.Review;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class ShopRepositoryTest {

	@Autowired
	private ShopRepository shopRepository;

	@Test
	public void saveShop() {
		Shop shop = Shop.builder()
				.shop_name("KFC")
				.address(new Address("76 Evesham Street","London", "E16 2QT"))
				.geoLocation(new GeoLocation(0.012,0.0230))
				.no_of_ratings(4)
				.type_Of_Food(List.of("tasty", "delicious","huh huh"))
				.shop_reviews(Collections.emptyList())
				.website("hello.com")
				.geoProcessed(false)
				.build();

		shopRepository.save(shop);
	}

//	@Test
//	public void printShopByFirstNameContaining() {
//		List<Shop> shops =
//				shopRepository.findByShopNameContaining("K");
//
//		System.out.println("shops= " + shops);
//	}

}