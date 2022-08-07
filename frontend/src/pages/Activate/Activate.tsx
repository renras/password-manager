import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

const Activate = () => {
  const { uid, token } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
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
        console.error(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return (
      <div>
        <div className="mw-sm m-auto mt-5 p-5 shadow-sm text-center">
          <h1>Something went wrong</h1>
          <p className="fs-5 mt-4">
            Sorry something went wrong. Please try again.
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

export default Activate;
