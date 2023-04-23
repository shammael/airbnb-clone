import { lazy } from "react";
import CountrySelect from "../CountrySelect";
import Heading from "../Heading";
import CommonProps from "./interface/CommonProps";

export type Location = {
  flag: string;
  label: string;
  latlng: [number, number];
  region: string;
  value?: string;
} | null;

interface Props extends CommonProps<"location", Location> {}

const Map = lazy(() => import("../Map/Map"));

const LocationInfo = ({ onChange, values }: Props) => {
  return (
    <div className="flex flex-col gap-8">
      <Heading
        title="Where's your place location"
        subtitle="Help guest find you"
      />
      <CountrySelect
        value={values.location}
        onChange={(value) =>
          onChange("location", {
            flag: value.flag,
            label: value.label,
            latlng: value.latlng as [number, number],
            region: value.region,
          })
        }
      />
      <Map
        onClick={(value) => {
          onChange("location", {
            flag: value.flag as string,
            label: value.country as string,
            latlng: value.latlng as [number, number],
            region: value.continent as string,
          });
        }}
        location={{
          continent: values.location?.region,
          country: values.location?.label,
          countryCode: values.location?.value,
          flag: values.location?.flag,
          latlng: values.location?.latlng,
        }}
      />
    </div>
  );
};

export default LocationInfo;
