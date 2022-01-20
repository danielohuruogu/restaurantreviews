import React, { useEffect, useRef } from 'react'
import ChickenBucket from './../../Images/fried-chicken-bucket.png';

function ResMap({ center, zoom, data }) {

    const refResMap = useRef();

    useEffect(() => {
        var map = new window.google.maps.Map(refResMap.current, {center,zoom})

		const image = {
            url: ChickenBucket,
            size: new window.google.maps.Size(32,32),
            origin: new window.google.maps.Point(0,0),
            anchor: new window.google.maps.Point(16,16)
        }

        const shape = {
            coords: [1,32,32,1],
            type: "rect"
        };

		const marker = new window.google.maps.Marker({
			position: center,
			map,
			icon: image,
			shape: shape,
			title: data.name
		});
    }, [refResMap.current])

	return <>
		<div ref={refResMap} id="resMap" style={style}
	        />
	</>
}

export default ResMap