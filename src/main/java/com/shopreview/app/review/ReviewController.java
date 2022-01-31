package com.shopreview.app.review;

import com.shopreview.app.siteuser.SiteUser;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/reviews")
@AllArgsConstructor
public class ReviewController {

	private final ReviewService reviewService;

	@GetMapping
	public List<Review> getAllReviews() {
		return reviewService.getAllReviews();
	}

	@GetMapping(value = "/{id}")
	public Review getReviewById(@PathVariable("id") Long id) {
		return reviewService.getReviewById(id);
	}

	@PostMapping
	public void addReview(@RequestBody Review review) {
		reviewService.addReview(review);
	}

	@DeleteMapping(value = "/{id}")
	public void deleteReview(@PathVariable("id") Long id) {
		reviewService.deleteReview(id);
	}
}
