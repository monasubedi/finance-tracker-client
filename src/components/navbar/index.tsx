import { SignedIn, UserButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar-container">
      <Link to={"/"} style={{ paddingRight: "10px" }}>
        Dashboard
      </Link>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
};

export default Navbar;
