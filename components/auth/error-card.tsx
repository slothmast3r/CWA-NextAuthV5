import { Header } from "@/components/auth/header";
import { Card, CardFooter, CardHeader } from "../ui/card";
import { BackButton } from "./back-button";
import { CardWrapper } from "./card-wrapper";
import { BsExclamationTriangle } from "react-icons/bs";

export function ErrorCard({}) {
  return (
    <CardWrapper
      headerLabel="Oops! something went wrong!"
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
    >
      <div className="w-full flex justify-center items-center">
        <BsExclamationTriangle className="text-destructive"></BsExclamationTriangle>
      </div>
    </CardWrapper>
  );
}
