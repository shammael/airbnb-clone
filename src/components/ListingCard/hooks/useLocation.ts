import getCountry from "@/utils/getCountry";
import { useEffect, useState } from "react";

const useLocation = (coords: [number, number]) => {
  const [location, setLocation] = useState<{
    latlng: [number, number];
    country: string;
    countryCode: string;
    continent: string;
    flag: string;
  }>();
  useEffect(() => {
    getCountry(coords).then((res) => {
      setLocation({
        latlng: coords,
        country: res.results[0].components.country,
        countryCode: res.results[0].components.country_code,
        continent: res.results[0].components.continent,
        flag: res.results[0].annotations.flag,
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { location };
};

export default useLocation;
