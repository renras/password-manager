import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

interface FormData {
  username: string;
  password: string;
}

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <div>
      <form
        className="shadow-sm w-100 mw-sm m-auto mt-5 p-5 d-flex flex-column"
        onSubmit={onSubmit}
      >
        <h1>Login</h1>

        {/* username */}
        <label htmlFor="username" className="mt-4">
          Username
        </label>
        <input
          id="username"
          className="form-control form-control-lg mt-1"
          {...register("username", {
            required: "Username is required",
            maxLength: {
              value: 100,
              message: "Only 100 characters is allowed",
            },
          })}
        />
        {errors.username?.message && (
          <p className="text-danger m-0">{errors.username?.message}</p>
        )}

        {/* password */}
        <label htmlFor="password" className="mt-4">
          Password
        </label>
        <input
          id="password"
          type="password"
          className="form-control form-control-lg mt-1"
          {...register("password", {
            required: "Password is required",
            maxLength: {
              value: 100,
              message: "Only 100 characters is allowed",
            },
          })}
        />
        {errors.password?.message && (
          <p className="text-danger m-0">{errors.password?.message}</p>
        )}

        <button className="btn btn-primary btn-lg mt-5 w-100">LOGIN</button>
        <div className="mt-4 m-auto">
          Don&apos;t have an account yet?{" "}
          <Link to="/register">Create a new account</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
