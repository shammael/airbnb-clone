import getCountry from "@/utils/getCountry";
import { useEffect, useState } from "react";
import { Marker, Popup, useMapEvents } from "react-leaflet";
import { MapData } from "./types";

interface Props {
  onClick: (location: MapData) => void;
  location: [number, number];
}

const LocationMarker = ({ onClick, location }: Props) => {
  const [position, setPosition] = useState<[number, number]>(location);
  const map = useMapEvents({
    async click(e) {
      const res = await getCountry([e.latlng.lat, e.latlng.lng]);
      setPosition([e.latlng.lat, e.latlng.lng]);
      setPopup(
        res.results[0].components.county +
          ", " +
          res.results[0].components.country_code +
          " " +
          res.results[0].components.state
      );
      onClick({
        latlng: [e.latlng.lat, e.latlng.lng],
        country: res.results[0].components.country,
        countryCode: res.results[0].components.country_code,
        continent: res.results[0].components.continent,
        flag: res.results[0].annotations.flag,
      });
      map.flyTo([e.latlng.lat, e.latlng.lng], map.getZoom());
    },
  });

  const [popup, setPopup] = useState("");

  useEffect(() => {
    if (location) {
      setPosition(location);
      map.flyTo(location, map.getZoom());
    }
  }, [location, map]);

  return position === null ? null : (
    <Marker position={position}>{popup && <Popup>{popup}</Popup>}</Marker>
  );
};

export default LocationMarker;
