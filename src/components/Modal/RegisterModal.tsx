"use client";
import { signIn } from "next-auth/react";
import axios from "axios";
import { useCallback, useState } from "react";
import useRegisterModal from "../hooks/useRegisterModal";
import { useFormik } from "formik";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../Input ";
import { toast } from "react-hot-toast";
import * as yup from "yup";
import Button from "../Button";
import useLoginModal from "../hooks/useLoginModal";
import GoogleIcon from "@/icons/Google.icon";
import GithubIcon from "@/icons/Github.icon";

const RegisterModal = () => {
  const { isOpen: isOpenRegister, onClose: onCloseRegister } =
    useRegisterModal();
  const { onOpen: onOpenLogin } = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: yup.object().shape({
      email: yup.string().email().required(),
      name: yup.string().required(),
      password: yup.string().required(),
    }),
    onSubmit: (values, actions) => {
      setIsLoading(true);
      axios
        .post("/api/register", values)
        .then(() => {
          onCloseRegister();
        })
        .catch((err) => toast.error("something wrong"))
        .finally(() => {
          setIsLoading(false);
        });
    },
  });

  const toggle = useCallback(() => {
    onCloseRegister();
    onOpenLogin();
  }, [onCloseRegister, onOpenLogin]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to Airbnb" subtitle="Create an account" />
      <form onSubmit={formik.handleSubmit}>
        <Input
          placeholder="Your Email"
          type="email"
          id="email"
          disabled={isLoading}
          name="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <Input
          placeholder="Your name"
          type="text"
          id="name"
          disabled={isLoading}
          name="name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <Input
          name="password"
          placeholder="Your password"
          type="password"
          id="password"
          disabled={isLoading}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </form>
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Continue with Google"
        icon={{ element: GoogleIcon, properties: { viewBox: "0 0 600 600" } }}
        onClick={() => signIn("google")}
      />
      <Button
        outline
        label="Continue with Github"
        icon={{ element: GithubIcon, properties: {} }}
        onClick={() => signIn("github")}
      />
      <div className="text-neutral-500 justify-center mt-4">
        <div className="flex flex-row items-center gap-2">
          <div>First time using airbnb?</div>
          <div
            onClick={toggle}
            className="text-blue-500 cursor-pointer hover:underline"
          >
            Login
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={isOpenRegister}
      title="Register"
      actionLabel="Continue"
      onClose={onCloseRegister}
      onSubmit={formik.handleSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
