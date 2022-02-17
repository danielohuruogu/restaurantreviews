package com.shopreview.app.ServicesAndControllers;

import com.shopreview.app.review.Review;
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

	@DeleteMapping(value = "/{id}")
	public void deleteReview(@PathVariable("id") Long id) {
		reviewService.deleteReview(id);
	}

	// ************* ************ //

	@GetMapping(value = "/{id}")
	public Review getReviewById(@PathVariable("id") Long id) {
		return reviewService.getReviewById(id);
	}

	@PostMapping
	public String addReview(@RequestBody Review review) {
		reviewService.addReview(review);

		return "review saved successfully";
	}
}
