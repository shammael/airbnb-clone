"use client";
import { LocationData } from "./RentModal/Location";
import useCountries from "./hooks/useCountry";
import Select from "react-select";

interface Props {
  value: LocationData | null;
  onChange: (value: LocationData) => void;
}

const CountrySelect = ({ onChange, value }: Props) => {
  const { getAll } = useCountries();
  return (
    <div>
      <Select
        placeholder="Anywhere"
        options={getAll()}
        value={{
          flag: value?.flag,
          label: value?.countryCode,
          region: value?.continent,
          value: value?.country,
          latlng: value?.latlng,
        }}
        onChange={(value) =>
          onChange({
            continent: value?.region as string,
            country: value?.value as string,
            countryCode: value?.label as string,
            flag: value?.flag as string,
            latlng: value?.latlng,
          })
        }
        formatOptionLabel={(option) => (
          <div className="flex flex-row items-center gap-3">
            <div>{option.flag}</div>
            <div>{option.value}</div>

            <div>
              <span className="text-neutral-500">{option.region}</span>
            </div>
          </div>
        )}
        classNames={{
          control: () => "p-3 border-2",
          input: () => "text-lg",
          option: () => "text-lg",
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: "black",
            primary25: "#ffe4e6",
          },
        })}
      />
    </div>
  );
};
export default CountrySelect;
