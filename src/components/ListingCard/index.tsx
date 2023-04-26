"use client";

import { Reservation, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { SafeListing } from "@/interfaces/Listings";
import useLocation from "./hooks/useLocation";
import React, { useCallback, useMemo } from "react";
import { format } from "date-fns";
import Image from "next/image";
import HeartButton from "../HeartButton";
import Button from "../Button";

interface Props {
  listing: SafeListing;
  reservation?: Reservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  user?: User | null;
}

const ListingCard = ({
  listing,
  actionId = "",
  actionLabel,
  disabled,
  onAction,
  reservation,
  user,
}: Props) => {
  const router = useRouter();
  const { location } = useLocation(listing.location.latlng as [number, number]);

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (disabled) {
        return;
      }

      onAction?.(actionId);
    },
    [actionId, disabled, onAction]
  );

  const price = useMemo(() => {
    if (reservation) {
      return reservation.price;
    }
    return listing.exchange.price;
  }, [listing.exchange.price, reservation]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }
    const startDate = new Date(reservation.startDate);
    const endDate = new Date(reservation.endDate);

    return `${format(startDate, "PP")} - ${format(endDate, "PP")}`;
  }, [reservation]);

  return (
    <div
      className="col-span-1 cursor-pointer group"
      onClick={() => router.push(`/listings/${listing.id}`)}
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="aspect-square w-full relative overflow-hidden rounded-xl">
          <Image
            fill
            alt="listing"
            src={listing.imageSrc}
            className="object-cover h-full w-full group-hover:scale-110 transition"
          />
          <div className="absolute top-3 right-3">
            <HeartButton id={listing.id} userId={user?.id} />
          </div>
        </div>
        <div className="flex flex-col -gap-2">
          <div className="font-semibold text-lg ">
            {location?.continent}, {location?.country}
          </div>
          <div className="font-light text-neutral-500">
            {reservationDate || listing.category}
          </div>
          <div className="flex flex-row items-center gap-1">
            <div className="font-semibold ">$ {price}</div>
            {!reservation && <div className="font-light ">/ night</div>}
          </div>
        </div>
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  );
};

export default ListingCard;
