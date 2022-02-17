package com.shopreview.app.ServicesAndControllers;

import com.shopreview.app.shop.ShopRepository;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.junit.jupiter.api.Assertions.*;

@WebMvcTest(ShopController.class)
class ShopControllerTest {

	@Autowired
	private MockMvc mockMvc;

	@MockBean
	private ShopService shopService;

	@MockBean
	private ShopRepository shopRepository;

	@Test
	void updateShopDetails() {
	}

	@Test
	void updateShopCollectionOrAddShop() {

		RequestWrapper request = new RequestWrapper();


//		Mockito.when(shopService.checkShopAndCollection(request)).thenReturn(value));
	}
}