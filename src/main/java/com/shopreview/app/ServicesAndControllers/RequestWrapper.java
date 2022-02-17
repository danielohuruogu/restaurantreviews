package com.shopreview.app.ServicesAndControllers;

import com.shopreview.app.review.Review;
import com.shopreview.app.shop.Shop;

import java.util.List;

public class RequestWrapper {
	private List<Object> requestItems;

	public RequestWrapper(Object... reqItems){
		for (Object o: reqItems){
			this.requestItems.add(o);
		}
	}

	public List getRequestItems(){
		return this.requestItems;
	}
}
