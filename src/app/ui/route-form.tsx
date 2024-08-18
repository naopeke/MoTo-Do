"use client"

import { GoogleMap, useJsApiLoader, Marker, Autocomplete, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import React, { useState, useEffect, useRef } from 'react';

const center = {lat: 40.4923863, lng: -3.8670354 };

export default function RouteForm(){

    /**
     * https://www.npmjs.com/package/@react-google-maps/api
     * https://www.youtube.com/watch?v=iP3DnhCUIsE
     */
    
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
        libraries:['places'],
    })

    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [directionsResponse, setDirectionResponse] = useState<google.maps.DirectionsResult | null>(null); 
    const [distance, setDistance] = useState('');
    const [duration, setDuration] = useState('');

    const originRef = useRef<HTMLInputElement | null>(null);
    const destinationRef= useRef<HTMLInputElement | null>(null);

    async function calculateRoute (){
        if (originRef.current?.value === '' || destinationRef.current?.value === ''){ // is possibly null
            return 
        }

        const directionsService = new google.maps.DirectionsService();
        const result = await directionsService.route({
            origin: originRef.current?.value!,
            destination: destinationRef.current?.value!,
            travelMode: google.maps.TravelMode.DRIVING, 
        });
        console.log(result);
        setDirectionResponse(result); //Argument of type 'DirectionsResult' is not assignable to parameter of type 'SetStateAction<null>'. Type 'DirectionsResult' provides no match for the signature '(prevState: null): null'.ts(2345)

        const leg = result.routes[0].legs[0];
        if (leg?.distance?.text && leg?.duration?.text){
            // setDistance(result.routes[0].legs[0].distance.text) //Object is possibly 'undefined'.ts(2532)
            setDistance(leg.distance.text);
            setDuration(leg.duration.text);
        } else {
            console.log('Distance or duration is undefined');
        }
    }   
    
    function clearRoute (){
        setDirectionResponse(null);
        setDistance('');
        setDuration('');
        if (originRef.current && destinationRef.current){
            originRef.current.value = ''; //'destinationRef.current' is possibly 'null'.ts(18047)const destinationRef: React.MutableRefObject<HTMLInputElement | null>
            destinationRef.current.value = '';
        }
    }

    return(
        <>
        <div className="grid grid-cols-4">
        <div className="col-span-3">
        {isLoaded ? (
          <>
            <GoogleMap
                center={center} 
                zoom={15} 
                mapContainerStyle={{width: '100%', height:'100%'}}
                onLoad={(map)=> setMap(map)} //back to the first place
            >
                <Marker position={center} />
                {directionsResponse && <DirectionsRenderer directions={directionsResponse}></DirectionsRenderer>}
            </GoogleMap>
          </>
        ): (
            <span>Loading</span>
        )}
        </div>
        <div className="col-span-1 p-4">
            <form action="" className="flex flex-col">
            <Autocomplete>
                <input type="text" placeholder="Origin" ref={originRef} />
            </Autocomplete>
            <Autocomplete>
                <input type="text" placeholder="Destination" ref={destinationRef} />
            </Autocomplete>
            <button type="submit" onClick={calculateRoute}>Calculate Route</button>
            <button type="submit" onClick={clearRoute}>x</button>
            <button onClick={()=> map?.panTo(center)}>Arrow</button>
            <p>Distance: {distance}</p>
            <p>Duration: {duration}</p>
            </form>
            </div>
            </div>
         </>
    );
}