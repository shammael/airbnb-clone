import { useEffect, useState } from "react";
import { LocationData } from "../Location";
import getUserLocation from "@/helpers/getUserLocation";
import getCountry from "@/utils/getCountry";

let locationData: LocationData;

const useLocation = (loc: [number, number] | null) => {
  const [location, setLocation] = useState(locationData);
  useEffect(() => {
    if (!locationData && !loc) {
      getUserLocation().then((re) => {
        getCountry(re).then((res) => {
          locationData = {
            latlng: re,
            country: res.results[0].components.country,
            countryCode: res.results[0].components.country_code,
            continent: res.results[0].components.continent,
            flag: res.results[0].annotations.flag,
          };
        });
      });
    }

    if (loc && !locationData) {
      getCountry(loc).then((res) => {
        locationData = {
          latlng: loc,
          country: res.results[0].components.country,
          countryCode: res.results[0].components.country_code,
          continent: res.results[0].components.continent,
          flag: res.results[0].annotations.flag,
        };
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (locationData !== location) {
      locationData = location;
    }
  }, [location]);

  return { location, setLocation };
};

export default useLocation;
