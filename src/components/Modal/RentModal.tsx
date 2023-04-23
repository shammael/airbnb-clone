/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import axios from "axios";
import { useFormik } from "formik";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { lazy, useCallback, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import CategoryInput from "../Category/CategoryInput";
import Counter from "../Counter";
import CountrySelect from "../CountrySelect";
import Currency from "../currency/Currency";
import Heading from "../Heading";
import useRentModal from "../hooks/useRentModal";
import ImageUpload from "../ImageUpload";
import Input from "../Input ";
import categories from "@/components/Category/data/categories";
import Modal from "./Modal";

const Map = lazy(() => import("../Map/Map"));

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {
  const rentModal = useRentModal();
  const [step, setStep] = useState(STEPS.CATEGORY);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // const setCustomValue = (id: string, value: any) => {
  //   setCustomValue(id, value, {

  //   })
  // }

  const {
    handleSubmit,
    resetForm,
    registerField,
    errors,
    setFieldValue,
    values,
  } = useFormik<{
    category: string;
    location: {
      flag: string;
      label: string;
      latlng: [number, number];
      region: string;
      value: string;
    } | null;
    guestCount: number;
    roomCount: number;
    bathroomCount: number;
    imageSrc: string;
    exchange: {
      currency: { value: string; label: string };
      price: "0.00";
    };
    description: string;
  }>({
    initialValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 0,
      imageSrc: "",
      exchange: {
        currency: { value: "US Dollar", label: "$" },
        price: "0.00",
      },
      description: "",
    },
    onSubmit: (values, actions) => {
      if (step !== STEPS.PRICE) {
        return onNext();
      }
      setIsLoading(true);
      axios
        .post("/api/listings", values)
        .then((resp) => {
          toast.success("Listing created");
          router.refresh();
          actions.resetForm();
          setStep(STEPS.CATEGORY);
          rentModal.close();
        })
        .catch((err) => {
          toast.error("An error have been occured");
        });
    },
  });

  const setCustomValue = (
    id:
      | "category"
      | "location"
      | "guestCount"
      | "roomCount"
      | "bathroomCount"
      | "imageSrc",
    value: any
  ) => {
    setFieldValue(id, value, true);
  };

  const onBack = useCallback(() => {
    setStep((value) => value - 1);
  }, []);

  const onNext = useCallback(() => {
    setStep((value) => value + 1);
  }, []);

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Create";
    }

    return "Next";
  }, [step]);

  const actionSecondaryLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }

    return "Back";
  }, [step]);

  // const Map = useMemo(
  //   () =>
  //     dynamic(() => import("../Map"), {
  //       ssr: false,
  //     }),
  //   [values.location]
  // );

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of these best describe your place?"
        subtitle="Pick a category"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {categories.map((category) => (
          <div className="col-span-1" key={category.label}>
            <CategoryInput
              icon={category.icon}
              label={category.label}
              onClick={(category) => setCustomValue("category", category)}
              selected={values.category === category.label}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where's your place location"
          subtitle="Help guest find you"
        />
        <CountrySelect
          value={values.location}
          onChange={(value) => {
            console.log(value);
            setCustomValue("location", value);
          }}
        />
        <Map
          onClick={(value) => {
            console.log({ val: value });
            setCustomValue("location", {
              flag: value.flag,
              label: value.country,
              latlng: value.latlng,
              region: value.continent,
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
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Share some basics about your place"
          subtitle="What aminities do you have ?"
        />
        <Counter
          title="Guest"
          subtitle="How many guest do you allow ?"
          onchange={(value) => {
            setCustomValue("guestCount", value);
          }}
          value={values.guestCount}
        />
        <hr />
        <Counter
          title="Rooms"
          subtitle="How many rooms do you have?"
          onchange={(value) => {
            setCustomValue("roomCount", value);
          }}
          value={values.roomCount}
        />
        <hr />
        <Counter
          title="Bathrooms"
          subtitle="How many bathrooms do you have?"
          onchange={(value) => {
            setCustomValue("bathroomCount", value);
          }}
          value={values.bathroomCount}
          flatReduce
        />
      </div>
    );
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Add photos of your place"
          subtitle="Show the world how's your place looks like"
        />
        <ImageUpload
          onChange={(value) => setCustomValue("imageSrc", value)}
          value={values.imageSrc}
        />
      </div>
    );
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="How would you describe your place"
          subtitle="Tell the world about your place"
        />
        <Input
          id="title"
          disabled={isLoading}
          placeholder={"Title"}
          name="hola"
        />
        <hr />
        <div>
          <label
            htmlFor="description"
            className="text-lg font-semibold text-neutral-500"
          >
            Description
          </label>
          <textarea
            id="description"
            cols={2}
            className="peer w-ful p-4 pt-3 text-lg text-neutral-600 bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed w-full border-neutral-300"
            placeholder="Write the description of your place"
            required
          ></textarea>
        </div>
      </div>
    );
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Now set your price"
          subtitle="How do you charge a night"
        />
        <Currency
          exchange={{
            value: values.exchange.currency,
            price: values.exchange.price,
          }}
          onChange={(value) => {}}
        />
      </div>
    );
  }

  return (
    <Modal
      isOpen={rentModal.isOpen}
      onClose={rentModal.close}
      title="Airbnb your home"
      onSubmit={handleSubmit}
      actionLabel={actionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      secondaryActionLabel={actionSecondaryLabel}
      body={bodyContent}
    />
  );
};

export default RentModal;
