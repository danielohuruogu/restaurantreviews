import React from 'react';

import { Wrapper, Status } from "@googlemaps/react-wrapper";

export default function MapsWrapper(props) {

	const { center, zoom, style, ComponentToRender, ...other } = props;

	const apiKey = `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY1}`;

    function render(status) {
        if (status === Status.LOADING) return <h3>{status} ...</h3>;
        if (status === Status.FAILURE) return <h3>{status} ...</h3>;
        return null;
    };

    return (
		<Wrapper apiKey={apiKey} render={render} libraries={["places"]}>
			<ComponentToRender center={center} zoom={zoom} style={style} {...other}/>
		</Wrapper>
    )
}
