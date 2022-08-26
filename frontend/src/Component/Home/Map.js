import React, { Component } from 'react'
import GoogleMapReact from "google-map-react"
import styleMap from "./styleMap.json"
import { useEffect } from 'react';
import { reactLocalStorage } from 'reactjs-localstorage';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const Map = () => {
    const localisation = reactLocalStorage.getObject("localisation")
    let latitude = localisation.latitude !== "undefined" ? localisation.latitude : 49
    let longitude = localisation.longitude !== "undefined" ? localisation.longitude : 6

    let defaultProps = {
        center: {
            lat: latitude,
            lng: longitude
        },
        zoom: 12
    }

    useEffect(() => {

    }, [])



    return (
        <div className="boxed">
            <div className="columns">
                <div className="column has-text-centered">
                    <p className="title has-text-weight-bold  has-text-white  anirm">Carte de {localisation.name}</p>
                </div>
            </div>
            <div style={{ height: '50vh', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyB4aTtY_--LaxDHIy26pU2b2LgRI6KBRQc" }}
                    defaultCenter={defaultProps.center}
                    defaultZoom={defaultProps.zoom}
                    options={{
                        styles: styleMap,
                        zoomControl: true,
                        mapTypeControl: false,
                        scaleControl: false,
                        streetViewControl: false,
                        rotateControl: false,
                        fullscreenControl: false,
                        disableDoubleClickZoom: true,
                        draggable: true,
                        draggableCursor: false,
                        draggableCursor: false,


                    }}


                >
                    <AnyReactComponent
                        lat={46.1049442}
                        lng={46.1263661}
                        text="My Marker"
                    />
                </GoogleMapReact>
            </div>
        </div>
    )
}

export default Map;