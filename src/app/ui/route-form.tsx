// "use client"

// import { GoogleMap, useJsApiLoader, Marker, Autocomplete, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
// import React, { useState, useEffect, useRef } from 'react';

// const center = {lat: 40.4923863, lng: -3.8670354 };
// const libraries: ("drawing" | "geometry" | "places" | "visualization")[] = ["places"];

// export default function RouteForm(){

//     /**
//      * https://www.npmjs.com/package/@react-google-maps/api
//      * https://www.youtube.com/watch?v=iP3DnhCUIsE
//      * https://developers.google.com/maps/documentation/javascript/examples/event-click-latlng
//      */
    
//     const { isLoaded, loadError } = useJsApiLoader({
//         id: 'google-map-script',
//         googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
//         libraries,
//     })


//     const [map, setMap] = useState<google.maps.Map | null>(null);
//     const [latLng, setLatLng] = useState<google.maps.LatLng | null>(null);
//     const [favorites, setFavorites] = useState<google.maps.LatLng[]>([]);

//     const favoritePlaceRef = useRef<HTMLInputElement | null>(null);

//     if (loadError) {
//         return <div>Error loading maps</div>;
//     }

//     if (!isLoaded) {
//         return <div>Loading...</div>;
//     }

//     const handleMapClick = (event: google.maps.MapMouseEvent) => {
//         if (event.latLng) {
//             setLatLng(event.latLng);
//             const latLngJson = event.latLng.toJSON();
//             console.log("LatLng:", latLngJson);
//         }
//     };


//     const handleButtonClick = () => {
//         if (latLng) {
//             const latLngJson = latLng.toJSON();
//             console.log("Button Click LatLng:", latLngJson);
//         } else {
//             console.log("No location selected");
//         }
//     };


//     return(
//         <>
//         <div className="grid grid-cols-4">
//         <div className="col-span-3">
//         {isLoaded ? (
//           <>
//             <GoogleMap
//                 center={center} 
//                 zoom={15} 
//                 mapContainerStyle={{width: '100%', height:'100%'}}
//                 onLoad={(map)=> setMap(map)} //back to the first place
//             >
//                 <Marker position={center} />
//                 {/* {directionsResponse && <DirectionsRenderer directions={directionsResponse}></DirectionsRenderer>} */}
//             </GoogleMap>
//           </>
//         ): (
//             <span>Loading</span>
//         )}
//         </div>
//         <div className="col-span-1 p-4">
//             <form action="" className="flex flex-col">
//             <Autocomplete>
//                 <input type="text" placeholder="Favorite place"  ref={favoritePlaceRef}/>
//             </Autocomplete>
            
//             <button type="submit" onClick={handleButtonClick}>Console the latLong</button>
//             <button onClick={()=> map?.panTo(center)}>Arrow</button>
  
//             </form>
//             </div>
//             </div>
//          </>
//     );
// }

"use client";

import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import React, { useState, useRef, useEffect } from 'react';

const center = { lat: -25.363, lng: 131.044 }; // Initial center of the map

export default function MapWithInfoWindow() {
    const { isLoaded, loadError } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
    });

    const mapRef = useRef<google.maps.Map | null>(null);
    const [infoWindow, setInfoWindow] = useState<google.maps.InfoWindow | null>(null);

    useEffect(() => {
        if (isLoaded && mapRef.current) {
            // Initialize InfoWindow
            const initialInfoWindow = new google.maps.InfoWindow({
                content: "Click the map to get Lat/Lng!",
                position: center,
            });

            initialInfoWindow.open(mapRef.current);
            setInfoWindow(initialInfoWindow);

            // Add click event listener
            mapRef.current.addListener("click", (mapsMouseEvent: google.maps.MapMouseEvent) => {
                if (infoWindow) {
                    infoWindow.close();
                }

                const newInfoWindow = new google.maps.InfoWindow({
                    position: mapsMouseEvent.latLng!,
                });

                newInfoWindow.setContent(
                    JSON.stringify(mapsMouseEvent.latLng!.toJSON(), null, 2)
                );
                newInfoWindow.open(mapRef.current!);
                setInfoWindow(newInfoWindow);
            });
        }
    }, [isLoaded, infoWindow]);

    if (loadError) {
        return <div>Error loading maps</div>;
    }

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ height: '100vh', width: '100%' }}>
            <GoogleMap
                center={center}
                zoom={4}
                mapContainerStyle={{ width: '100%', height: '100%' }}
                onLoad={(map: google.maps.Map) => {
                    mapRef.current = map;
                }}
            />
        </div>
    );
}
