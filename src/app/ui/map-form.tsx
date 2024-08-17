import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import React, { useState, useEffect, useRef } from 'react';
import { LatLong } from '../lib/definitions';

export default function MapForm(latlong: LatLong){

    /**
     * https://www.npmjs.com/package/@react-google-maps/api
     */
    
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string
      })

    const mapRef = useRef<HTMLDivElement>(null);
    const placeAutoCompleteRef = useRef<HTMLInputElement>(null);
    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [autoComplete, setAutoComplete] = useState<google.maps.places.Autocomplete | null>(null);

    useEffect(()=>{
        if (isLoaded){
            const mapOptions = {
                center: {
                    // lat: latlong.coordinates[0]
                }
            }
        }

    },[isLoaded])



    return(
        <>
        <span>map form</span>
        {isLoaded ?
            <div style={{height: '400px'}} ref={mapRef}/>
            : <span>Loading</span>
        }
        </>
    )
}