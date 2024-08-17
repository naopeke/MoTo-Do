"use client"

import React, { useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader"

export function Map(){

    useEffect(()=>{

        const initMap = async() =>{       
            const loader = new Loader({
                apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
                version: 'weekly',
            }
            );

            await loader.importLibrary('maps');

            const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
            const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;
            /** 
             * https://developers.google.com/maps/documentation/javascript/libraries?hl=ja
            https://stackoverflow.com/questions/77360272/namespace-google-maps-marker-has-no-exported-member-advancedmarkerview
             * 
            */
            
            const map = new Map(document.getElementById("map") as HTMLElement, {
                center: { lat: 40.4923863, lng: -3.8670354 },
                zoom: 15,
                mapId: 'MAPID'
              });


            const position = { lat: 40.4923863, lng: -3.8670354 }

            const marker = new AdvancedMarkerElement({
                map: map,
                position: position,
                title: 'Motomic'
              });
        }
        initMap();
    }, []);
    

    return (
        <>
            <div id="map" style={{height: '300px'}}></div>
        </>
    )
}