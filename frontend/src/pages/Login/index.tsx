import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div>
      <form className="shadow-sm w-100 mw-sm m-auto mt-5 p-5 d-flex flex-column">
        <h1>Login</h1>
        <label htmlFor="username" className="mt-4">
          Username
        </label>
        <input id="username" className="form-control form-control-lg mt-1" />
        <label htmlFor="password" className="mt-4">
          Password
        </label>
        <input
          id="password"
          type="password"
          className="form-control form-control-lg mt-1"
        />
        <button className="btn btn-primary mt-5 w-100">LOGIN</button>
        <div className="mt-4 m-auto">
          Don&apos;t have an account yet?{" "}
          <Link to="/register">Create a new account</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
