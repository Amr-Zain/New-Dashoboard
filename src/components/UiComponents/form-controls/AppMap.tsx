"use client";

import {
  Autocomplete,
  GoogleMap,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import { Skeleton } from "../ui/skeleton";
import useWindowWidth from "@/utils/hooks/useWindowWidth";
import React, { useRef, useState } from "react";
import { IoIosSearch } from "react-icons/io";

export interface Position {
  lat: number;
  lng: number;
}

export interface GoogleMapProps {
  className?: string;
  height?: number;
  locations?: Position[];
  value?: Position; // Add value prop
  onChange?: (position: Position) => void; // Add onChange prop
}

const AppMap: React.FC<GoogleMapProps> = ({
  className,
  value, // Destructure value
  onChange, // Destructure onChange
}) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const [markerPosition, setMarkerPosition] = useState<Position | null>(
    value || { lat: 10.2, lng: 10.3 } // Use value if provided
  );

  // Update internal state when value prop changes
  React.useEffect(() => {
    if (value) {
      setMarkerPosition(value);
    }
  }, [value]);

  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const windowWidth = useWindowWidth();

  const containerStyle = {
    width: "100%",
    height: "100%",
    minHeight: "500px",
  };

  const handlePlaceSelect = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (place.geometry && place.geometry.location) {
        const newPosition = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        setMarkerPosition(newPosition);
        onChange?.(newPosition); 
      }
    }
  };

  if (!isLoaded) return <Skeleton className="h-full" />;
  return (
    <div className={`w-full h-full ${className}`}>
      <div className="relative z-10 w-3/4 md:w-1/2 lg:w-[35%] bg-transparent mb-4">
        <Autocomplete
          onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
          onPlaceChanged={handlePlaceSelect}
        >
          <>
            <IoIosSearch className="text-primary size-5 bg-transparent absolute start-3 top-1/2 -translate-y-1/2" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Enter location"
              className="w-full p-2 ps-10 focus:outline-none border border-solid rounded-[4px_20px_20px_4px] border-[#ececec]"
            />
          </>
        </Autocomplete>
      </div>

      <div className="relative w-full h-full min-h-[500px] rounded-lg overflow-hidden">
        <GoogleMap
          options={{
            zoomControl: true,
            streetViewControl: false,
            mapTypeControl: true,
            fullscreenControl: true,
          }}
          mapContainerStyle={containerStyle}
          zoom={14}
          center={markerPosition || { lat: 30.9585477, lng: 31.1613696 }}
          onClick={(e) => {
            const lat = e.latLng?.lat();
            const lng = e.latLng?.lng();
            if (lat && lng) {
              const newPosition = { lat, lng };
              setMarkerPosition(newPosition);
              onChange?.(newPosition);
            }
          }}
        >
          {markerPosition && <Marker position={markerPosition} />}
        </GoogleMap>
      </div>
    </div>
  );
};

export default AppMap;
