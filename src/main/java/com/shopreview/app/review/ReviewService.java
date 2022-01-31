package com.shopreview.app.review;

import com.shopreview.app.review.exception.ReviewNotFoundException;
import com.shopreview.app.siteuser.SiteUser;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class ReviewService {
	private final ReviewRepository reviewRepository;

	public List<Review> getAllReviews() {
		return reviewRepository.findAll();
	}

	public Review getReviewById(Long id) {
		if(!reviewRepository.existsById(id)){
			throw new ReviewNotFoundException(
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
			throw new ReviewNotFoundException(
					"Review with id " + id + " does not exist"
			);
		}
		reviewRepository.deleteById(id);
	}
}
