import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import React, { useState, useEffect, useRef } from 'react';

const center = {lat: 40.4923863, lng: -3.8670354 };

export default function RouteForm(){

    /**
     * https://www.npmjs.com/package/@react-google-maps/api
     * https://www.youtube.com/watch?v=iP3DnhCUIsE
     */
    
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string
      })

    const mapRef = useRef<HTMLDivElement>(null);
    const placeAutoCompleteRef = useRef<HTMLInputElement>(null);
    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [autoComplete, setAutoComplete] = useState<google.maps.places.Autocomplete | null>(null);




    return(
        <>
        <span>map form</span>
        {isLoaded ?
            <GoogleMap 
                center={center} 
                zoom={15} 
                mapContainerStyle={{width: '100%', height:'100%'}}
            />
            : <span>Loading</span>
        }
        </>
    )
}