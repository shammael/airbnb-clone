/* eslint-disable react/no-unescaped-entities */
"use client";
import { useCallback, useState } from "react";
import { useFormik } from "formik";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../Input ";
import { toast } from "react-hot-toast";
import * as yup from "yup";
import Button from "../Button";
import useLoginModal from "../hooks/useLoginModal";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import useRegisterModal from "../hooks/useRegisterModal";
import GoogleIcon from "@/icons/Google.icon";
import GithubIcon from "@/icons/Github.icon";

const LoginModal = () => {
  const { isOpen: isOpenLogin, onClose: onCloseLogin } = useLoginModal();
  const { onOpen: onOpenRegister } = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object().shape({
      email: yup.string().email().required(),
      password: yup.string().required(),
    }),
    onSubmit: (values, actions) => {
      setIsLoading(true);

      signIn("credentials", { ...values, redirect: false })
        .then((resp) => {
          setIsLoading(false);
          if (resp?.ok) {
            toast.success("Logged In");
            router.refresh();
            onCloseLogin();
          }

          if (resp?.error) {
            toast.error(resp.error);
          }
        })
        .catch((err) => {});
    },
  });

  const toggle = useCallback(() => {
    onCloseLogin();
    onOpenRegister();
  }, [onCloseLogin, onOpenRegister]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome back" subtitle="Login to your account" />
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
          <div>Don't have an account?</div>
          <div
            onClick={toggle}
            className="text-blue-500 cursor-pointer hover:underline"
          >
            Sign Up
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={isOpenLogin}
      title="Login"
      actionLabel="Continue"
      onClose={onCloseLogin}
      onSubmit={formik.handleSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
