package com.shopreview.app.shop;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ShopRepository
		extends JpaRepository<Shop, Long> {
//	@Query("" +
//			"SELECT CASE WHEN COUNT(s) > 0 THEN + " +
//			"TRUE ELSE FALSE END " +
//			"FROM Shop s " +
//			"WHERE s.shop_name = ?1"
//	)
//	Boolean selectExistingName(String name);
}
