package com.shopreview.app.ServicesAndControllers;

import com.shopreview.app.review.Review;
import com.shopreview.app.review.ReviewRepository;
import com.shopreview.app.ServicesAndControllers.exception.NotFoundException;
import com.shopreview.app.shop.ShopRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class ReviewService {
	private final ReviewRepository reviewRepository;
	private final ShopRepository shopRepository;

	public List<Review> getAllReviews() {
		return reviewRepository.findAll();
	}

	public Review getReviewById(Long id) {
		if(!reviewRepository.existsById(id)){
			throw new NotFoundException(
					"Review with id" + id + "does not exist"
			);
		}
		return reviewRepository.findById(id).get();
	}

	public void addReview(Review review) {
		reviewRepository.save(review);
	}

	public void deleteReview(Long id) {
		if(!reviewRepository.existsById(id)){
			throw new NotFoundException(
					"Review with id " + id + " does not exist"
			);
		}
		reviewRepository.deleteById(id);
	}
}
