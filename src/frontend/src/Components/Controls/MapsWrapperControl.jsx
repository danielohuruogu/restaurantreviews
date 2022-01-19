import React from 'react';
import MapComponent from './MapComponent.jsx';

export function MapsWrapper(props) {

	const { center, zoom, componentToRender } = props;

	const apiKey = `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;

    function render(status) {
        if (status === Status.LOADING) return <h3>{status} ...</h3>;
        if (status === Status.FAILURE) return <h3>{status} ...</h3>;
        return null;
    };

    return (
		<Wrapper apiKey={apiKey} render={render} libraries={["places"]}>
{/* 			<MapSection center={center} zoom={zoom} setAddressState={setAddressState}/> */}
			<componentToRender center={center} zoom={zoom}/>
		</Wrapper>
    )
}

