import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import isEmail from "validator/lib/isEmail";
import { errorToast } from "utils/toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface FormData {
  username: string;
  name: string;
  email: string;
  password: string;
  "re-password": string;
}

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const navigate = useNavigate();
  const onSubmit = handleSubmit(async (data) => {
    try {
      await axios.post(`${process.env.REACT_APP_DOMAIN}/auth/users/`, data);
      navigate("/activate", { replace: true });
    } catch (error) {
      errorToast("Failed to create account. Please try again.");
    }
  });

  return (
    <div>
      <form
        className="shadow-sm w-100 mw-sm m-auto mt-5 p-5 d-flex flex-column"
        onSubmit={onSubmit}
      >
        <h1>Sign Up</h1>

        {/* username */}
        <label htmlFor="username" className="mt-4">
          Username*
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

        {/* username */}
        <label htmlFor="name" className="mt-4">
          Name*
        </label>
        <input
          id="name"
          className="form-control form-control-lg mt-1"
          {...register("name", {
            required: "Name is required",
            maxLength: {
              value: 100,
              message: "Only 100 characters is allowed",
            },
          })}
        />
        {errors.name?.message && (
          <p className="text-danger m-0">{errors.name?.message}</p>
        )}

        {/* email */}
        <label htmlFor="email" className="mt-4">
          Email*
        </label>
        <input
          id="email"
          className="form-control form-control-lg mt-1"
          {...register("email", {
            required: "Email is required",
            maxLength: {
              value: 100,
              message: "Only 100 characters is allowed",
            },
            validate: {
              isEmail: (v) => isEmail(v) || "Please enter a valid email",
            },
          })}
        />
        {errors.email?.message && (
          <p className="text-danger m-0">{errors.email?.message}</p>
        )}

        {/* password */}
        <label htmlFor="password" className="mt-4">
          Password*
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

        {/* confirm password */}
        <label htmlFor="re-password" className="mt-4">
          Confirm Password*
        </label>
        <input
          id="re-password"
          type="password"
          className="form-control form-control-lg mt-1"
          {...register("re-password", {
            required: "Re-type password",
            maxLength: {
              value: 100,
              message: "Only 100 characters is allowed",
            },
          })}
        />
        {errors["re-password"]?.message && (
          <p className="text-danger m-0">{errors["re-password"]?.message}</p>
        )}

        <button className="btn btn-primary btn-lg mt-5 w-100">SIGN UP</button>
        <div className="mt-4 m-auto">
          Already have an account? <Link to="/login">Log in</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
