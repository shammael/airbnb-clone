"use client";
import { lazy, useCallback, useState } from "react";
import Avatar from "../Avatar";
import useLoginModal from "../hooks/useLoginModal";
import useRegisterModal from "../hooks/useRegisterModal";
import MenuItem from "./MenuItem";
import { signOut } from "next-auth/react";
import TUser from "@/interfaces/user.interface";
import useRentModal from "../hooks/useRentModal";
import MenuIcon from "@/icons/Menu.icon";

interface Props {
  currentUser?: TUser | null;
}

const UserMenu = ({ currentUser }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    rentModal.open();
  }, [currentUser, loginModal, rentModal]);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onRent}
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
        >
          Airbnb your home
        </div>
        <div
          onClick={toggleOpen}
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-100 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <MenuIcon className="h-[18px] w-[18px]" />
          <div className="hidden md:block">
            <Avatar imageUrl={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[400vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem onClick={loginModal.onOpen} label="My trips" />
                <MenuItem onClick={registerModal.onOpen} label="My favorites" />
                <MenuItem
                  onClick={registerModal.onOpen}
                  label="My reservations"
                />
                <MenuItem
                  onClick={registerModal.onOpen}
                  label="My properties"
                />
                <MenuItem
                  onClick={registerModal.onOpen}
                  label="Airbnb my home"
                />
                <hr />
                <MenuItem onClick={signOut} label="Logout" />
              </>
            ) : (
              <>
                <MenuItem onClick={loginModal.onOpen} label="Login" />
                <MenuItem onClick={registerModal.onOpen} label="Signup" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
