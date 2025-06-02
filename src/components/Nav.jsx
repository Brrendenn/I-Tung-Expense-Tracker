// rrd imports
import { Form, NavLink } from "react-router-dom";

// Assets
import logomark from "../assets/logomark.svg";

// Library
import { TrashIcon } from "@heroicons/react/24/solid";

// Clerk Authentication
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/clerk-react";

const Nav = () => {
  const { isSignedIn, user } = useUser();
  const userName = localStorage.getItem('userName');

  return (
    <nav className="flex items-center justify-between p-4 bg-white shadow">
      {/* Logo */}
      <NavLink to="/" aria-label="Go to home" className="flex items-center gap-2">
        <img src={logomark} alt="Logo" height={30} />
        <span className="font-bold">I-Tung</span>
      </NavLink>

      {/* Auth Buttons */}
      <div className="flex items-center gap-4">
        {!isSignedIn ? (
          <>
            <SignInButton mode="modal">
              <button type="button" className="btn btn--warning transform active:scale-95 transition duration-150 ease-in-out">
                <span>Sign In</span>
              </button>
            </SignInButton>

            <SignUpButton mode="modal">
              <button type="button" className="btn btn--warning transform active:scale-95 transition duration-150 ease-in-out">
                <span>Sign Up</span>
              </button>
            </SignUpButton>
          </>
        ) : (
          <div className="flex items-center gap-4">
            {userName && (
              <Form
                method="post"
                action="/logout" 
                onSubmit={(event) => {
                  if (!confirm("Delete user and all data?")) {
                    event.preventDefault();
                  } else {
                    localStorage.removeItem('userName')
                  }
                }}
              >
                <button type="submit" className="btn btn--warning transform active:scale-95 transition duration-150 ease-in-out">
                  <span>Delete User</span>
                  <TrashIcon width={20} />
                </button>
              </Form>
            )}

            <UserButton />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;