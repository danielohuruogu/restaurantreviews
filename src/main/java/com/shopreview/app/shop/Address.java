package com.shopreview.app.shop;

import lombok.*;

import javax.persistence.Embeddable;

@Embeddable
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Address {
    private String street;
    private String city;
    private String postCode;

    @Override
    public String toString(){
        return String.join(", ", street, city, postCode);
    }


}
