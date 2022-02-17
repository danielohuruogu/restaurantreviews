package com.shopreview.app.review;

import com.shopreview.app.shop.Address;
import com.shopreview.app.shop.GeoLocation;
import com.shopreview.app.shop.Shop;
import com.shopreview.app.siteuser.Role;
import com.shopreview.app.siteuser.SiteUser;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.sql.Date;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
class ReviewRepositoryTest {

	@Autowired
	private ReviewRepository repository;

	@Test
	public void saveReview() {
		Address address = new Address();
		GeoLocation geoLocation = new GeoLocation();

		Shop shop =
				Shop.builder()
						.shopId(1L)
						.shopName("SFC")
						.address(address)
						.typeOfFood(List.of("takeaway", "chicken", "delicious"))
						.noOfRatings(2)
						.geoLocation(geoLocation)
						.website("hello.com")
						.build();

		SiteUser user =
				SiteUser.builder()
						.userId(1L)
						.firstName("Dave")
						.lastName("Schmave")
						.password("hello")
						.email("dave@schmave.com")
						.role(Role.Admin)
						.build();

		Review review =
				Review.builder()
						.reviewId(1L)
						.reviewAuthor(user)
						.shop(shop)
						.rating(1)
						.keywords(List.of("tasty", "tasty again", "tasty thrice"))
						.title("tasty")
						.body("just tasty")
						.dateOfVisit(Date.valueOf("2022-01-02"))
						.build();

		repository.save(review);
	}
}