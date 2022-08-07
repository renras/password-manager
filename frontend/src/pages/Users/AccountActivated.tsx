import { Link } from "react-router-dom";

const AccountActivated = () => {
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
