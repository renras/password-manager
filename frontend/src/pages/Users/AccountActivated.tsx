import { useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";

const AccountActivated = () => {
  const { uid, token } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  if (isLoading) {
    (async () => {
      try {
        await axios.post(
          `${process.env.REACT_APP_DOMAIN}/auth/users/activation/`,
          {
            uid: uid,
            token: token,
          }
        );
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    })();

    return <div>Loading...</div>;
  }

  if (isError) {
    return (
      <div>
        <div className="mw-sm m-auto mt-5 p-5 shadow-sm text-center">
          <h1>Something went wrong</h1>
          <p className="fs-5 mt-4">
            Either the token has expired or the account is already activated.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mw-sm m-auto mt-5 p-5 shadow-sm text-center">
      <h1>Your account has been successfully activated!</h1>
      <p className="fs-5 mt-4">
        You may now{" "}
        <Link to="/login" className="link" replace={true}>
          login
        </Link>{" "}
        to access your account
      </p>
    </div>
  );
};

export default AccountActivated;
