import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
} from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

const Auth = () => {
  return (
    <div>
      <SignedOut>
        <SignInButton />
        <SignUpButton />
      </SignedOut>
      <SignedIn>
        <Navigate to={"/"} />
      </SignedIn>
    </div>
  );
};

export default Auth;
