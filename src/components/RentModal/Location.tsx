import { lazy } from "react";
import CountrySelect from "../CountrySelect";
import Heading from "../Heading";
import CommonProps from "./interface/CommonProps";
import useLocation from "./hooks/useLocation";

interface Props extends CommonProps<"location", [number, number] | null> {}

export interface LocationData {
  latlng?: [number, number];
  country: string;
  countryCode: string;
  continent: string;
  flag: string;
}

const Map = lazy(() => import("../Map/Map"));

const LocationInfo = ({ onChange, values }: Props) => {
  const { location, setLocation } = useLocation(values.location);

  return (
    <div className="flex flex-col gap-8">
      <Heading
        title="Where's your place location"
        subtitle="Help guest find you"
      />
      <CountrySelect
        value={location}
        onChange={(value) => {
          setLocation({
            flag: value.flag as string,
            continent: value.continent as string,
            country: value.country as string,
            countryCode: value.countryCode,
            latlng: value.latlng,
          });
        }}
      />
      <Map
        onClick={(value) => {
          onChange("location", value.latlng as [number, number]);
          setLocation({
            continent: value.continent as string,
            country: value.country as string,
            countryCode: value.countryCode as string,
            flag: value.flag as string,
            latlng: value.latlng,
          });
        }}
        location={{
          continent: location?.continent,
          country: location?.country,
          countryCode: location?.countryCode,
          flag: location?.flag,
          latlng: location?.latlng,
        }}
      />
    </div>
  );
};

export default LocationInfo;
