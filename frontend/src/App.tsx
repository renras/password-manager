import "./App.css";
import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit((data) => console.log(data));

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("http://localhost:8000/secrets/");
        console.log(response.data);
      } catch (error) {
        console.error();
      }
    })();
  }, []);

  return (
    <div className="mt-5">
      <form
        className="mx-auto d-flex flex-column shadow-sm mw-sm p-5"
        onSubmit={onSubmit}
      >
        <h1>Create a Secret</h1>
        <label htmlFor="key" className="form-label mt-3">
          Key
        </label>
        <input
          {...register("key", {
            required: "Key is required",
            maxLength: {
              value: 100,
              message: "Only 100 characters is allowed",
            },
          })}
          className="form-control form-control-lg"
        />
        {typeof errors.key?.message === "string" && (
          <p className="text-danger m-0">{errors.key?.message}</p>
        )}
        <label htmlFor="value" className="form-label mt-3">
          Value
        </label>
        <input
          id="value"
          type="text"
          className="form-control form-control-lg"
        />
        <button className="btn btn-primary mt-5 btn-lg">Submit</button>
      </form>
    </div>
  );
}

export default App;
