import useRentModal, { RentModalStore } from "@/components/hooks/useRentModal";
import axios from "axios";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import toast from "react-hot-toast";

type Location = {
  flag: string;
  label: string;
  latlng: [number, number];
  region: string;
  value: string;
} | null;

export enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const useCustomRentModal = (modalStore: RentModalStore) => {
  const [step, setStep] = useState(STEPS.CATEGORY);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const formik = useFormik<{
    category: string;
    location: Location;
    guestCount: number;
    roomCount: number;
    bathroomCount: number;
    imageSrc: string;
    exchange: {
      currency: { value: string; label: string };
      price: string;
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
          modalStore.close();
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
      | "imageSrc"
      | "description"
      | "exchange",
    value: any
  ) => {
    formik.setFieldValue(id, value, true);
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

  return {
    actionSecondaryLabel,
    actionLabel,
    setCustomValue,
    values: formik.values,
    step,
    isLoading,
    handleSubmit: formik.handleSubmit,
    onBack,
  };
};

export default useCustomRentModal;
