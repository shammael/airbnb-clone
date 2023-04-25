/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import useRentModal from "../hooks/useRentModal";
import Modal from "../Modal/Modal";
import CategoryModal from "./CategoryModal";
import useCustomRentModal from "./hooks/useRentModal";
import { STEPS } from "./hooks/useRentModal";
import { lazy } from "react";

const ModalCounter = lazy(() => import("./ModalCounter"));
const DescriptionModal = lazy(() => import("./DescriptionModal"));
const ImageUploadModal = lazy(() => import("./ImageUpload"));
const LocationInfo = lazy(() => import("./Location"));
const Price = lazy(() => import("./Price"));

const RentModal = () => {
  const rentModal = useRentModal();
  const {
    actionLabel,
    actionSecondaryLabel,
    setCustomValue,
    values,
    step,
    isLoading,
    handleSubmit,
    onBack,
  } = useCustomRentModal(rentModal);

  let bodyContent = (
    <CategoryModal
      onChange={(property, value) => setCustomValue(property, value)}
      values={{ category: values.category }}
    />
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <LocationInfo
        onChange={(property, value) => setCustomValue(property, value)}
        values={{ location: values.location }}
      />
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <ModalCounter
        onChange={(property, value) => setCustomValue(property, value)}
        values={{
          bathroomCount: values.bathroomCount,
          guestCount: values.guestCount,
          roomCount: values.roomCount,
        }}
      />
    );
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <ImageUploadModal
        onChange={(property, value) => setCustomValue(property, value)}
        values={{ imageSrc: values.imageSrc }}
      />
    );
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <DescriptionModal
        isLoading={isLoading}
        onChange={(property, value) => setCustomValue(property, value)}
        values={{ presentation: values.presentation }}
      />
    );
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <Price
        onChange={(property, value) => {
          setCustomValue(property, value);
        }}
        values={{ exchange: values.exchange }}
      />
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
