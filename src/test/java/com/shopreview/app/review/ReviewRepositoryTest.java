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
						.shop_name("SFC")
						.address(address)
						.type_Of_Food(List.of("takeaway", "chicken", "delicious"))
						.no_of_ratings(2)
						.geoLocation(geoLocation)
						.shop_reviews(List.of())
						.website("hello.com")
						.build();

		SiteUser user =
				SiteUser.builder()
						.userId(1L)
						.first_name("Dave")
						.last_name("Schmave")
						.password("hello")
						.email("dave@schmave.com")
						.role(Role.Admin)
						.reviews(List.of())
						.build();

		Review review =
				Review.builder()
						.reviewId(1L)
						.review_author(user)
						.shop(shop)
						.rating(Rating._1)
						.keywords(List.of("tasty", "tasty again", "tasty thrice"))
						.title("tasty")
						.body("just tasty")
						.date_of_visit(Date.valueOf("2022-01-02"))
						.build();

		repository.save(review);
	}
}