import { Nunito } from "next/font/google";
import "./globals.css";
// import ClientOnly from "./components/ClientOnly";
import LoginModal from "@/components/Modal/LoginModal";
import RegisterModal from "@/components/Modal/RegisterModal";
import ToasterProvider from "@/components/Providers/ToasterProvider";
import Navbar from "@/components/Navbar/Navbar";
import { SessionProvider } from "next-auth/react";
import getCurentUser from "@/actions/getCurrentUser";
import RentModal from "@/components/Modal/RentModal";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Airbnb",
  description: "Airbnb clone",
};

const font = Nunito({
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}) {
  const currentUser = await getCurentUser();
  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <Navbar currentUser={currentUser} />
        <RentModal />
        <LoginModal />
        <RegisterModal />
        {/* <ClientOnly></ClientOnly> */}
        {children}
      </body>
    </html>
  );
}
