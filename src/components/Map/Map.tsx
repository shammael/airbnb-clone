"use client";
import leaflet from "leaflet";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { useEffect, useState } from "react";
import LocationMarker from "./LocationMarker";
import { MapData } from "./types";

leaflet.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
});

interface Props {
  location: MapData | null;
  onClick: (location: MapData) => void;
}

const Map = ({ location, onClick }: Props) => {
  const [position, setPosition] = useState<[number, number]>(
    (location?.latlng as [number, number]) || [11.404083, -69.679017]
  );

  useEffect(() => {
    if (location?.latlng) {
      setPosition(location?.latlng as [number, number]);
    }
  }, [location?.latlng]);

  return (
    <MapContainer
      center={position}
      zoom={position ? 4 : 2}
      scrollWheelZoom={true}
      className="h-[35vh] rounded-lg"
      maxZoom={13}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position as leaflet.LatLngExpression} />
      <LocationMarker onClick={onClick} location={position} />
    </MapContainer>
  );
};

export default Map;
