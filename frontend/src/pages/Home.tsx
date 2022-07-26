import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { errorToast, successToast } from "../utils/toast";
import axios from "axios";
import "react-toastify/dist/ReactToastify.min.css";
import { AiFillDelete } from "react-icons/ai";

interface Keys {
  id: number;
  key: string;
  value: string;
}

const Home = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Keys>();
  const [keys, setKeys] = useState<Keys[]>([]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      await axios.post("http://localhost:8000/secrets/", data);
      setKeys((prev) => [...prev, data]);
      successToast("Successfully added key");
    } catch (error) {
      console.error(error);
      errorToast("Failed to add key");
    }
  });

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("http://localhost:8000/secrets/");
        setKeys(response.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <section className="d-flex gap-3 p-5 justify-content-center align-items-start">
      <form
        className="d-flex flex-column shadow-sm mw-sm mt-5 w-100 p-5"
        onSubmit={onSubmit}
      >
        <h2>Create a Key</h2>
        <label htmlFor="key" className="form-label mt-4">
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
          id="key"
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
          {...register("value", {
            required: "Value is required",
            maxLength: {
              value: 100,
              message: "Only 100 characters is allowed",
            },
          })}
          className="form-control form-control-lg"
        />
        {typeof errors.value?.message === "string" && (
          <p className="text-danger m-0">{errors.value?.message}</p>
        )}
        <button className="btn btn-primary mt-5 btn-lg">Submit</button>
      </form>
      <div className="mw-md w-100 p-5 shadow-sm mt-5">
        <h2>Keys</h2>
        <div className="d-flex flex-column gap-4 mt-4">
          {keys.map((key) => (
            <div key={key.id}>
              <label htmlFor={`key-${key.id}`} className="form-label">
                {key.key}
              </label>
              <div className="d-flex gap-3 align-items-center">
                <input
                  className="form-control form-control-lg"
                  id={`key-${key.id}`}
                  value={key.value}
                  readOnly
                />
                <button>
                  <AiFillDelete size={30} color="rgb(220, 53, 69)" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Home;
