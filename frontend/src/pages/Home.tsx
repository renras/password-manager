import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { errorToast, successToast } from "../utils/toast";
import axios from "axios";
import "react-toastify/dist/ReactToastify.min.css";
import { AiFillDelete } from "react-icons/ai";
import { filter } from "lodash";

interface Keys {
  id: number;
  key: string;
  value: string;
}

const Home = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Keys>();
  const [keys, setKeys] = useState<Keys[]>([]);
  const [isAddingKey, setIsAddingKey] = useState(false);

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

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await axios.post("http://localhost:8000/secrets/", data);
      setKeys((prev) => [...prev, response.data]);
      setIsAddingKey(false);
      successToast("Successfully added key");
    } catch (error) {
      console.error(error);
      errorToast("Failed to add key");
    }
  });

  const handleDeleteKey = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8000/secrets/${id}/`);
      const filteredArr = filter(keys, (key) => key.id !== id);
      setKeys(filteredArr);
      successToast("Successfuly deleted key");
    } catch (error) {
      console.error(error);
      errorToast("Failed to delete key");
    }
  };

  const handleCancelisAddingKey = () => {
    setIsAddingKey(false);
    reset();
  };

  return (
    <section className="d-flex gap-3 p-5 justify-content-center align-items-start">
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
                <button onClick={() => handleDeleteKey(key.id)}>
                  <AiFillDelete size={30} color="rgb(220, 53, 69)" />
                </button>
              </div>
            </div>
          ))}
          {!isAddingKey && (
            <button
              className="btn btn-primary btn-lg"
              onClick={() => setIsAddingKey(true)}
            >
              New Key
            </button>
          )}
          {isAddingKey && (
            <form
              className="d-flex flex-column shadow-sm mt-5 w-100 p-5"
              onSubmit={onSubmit}
            >
              <label htmlFor="key" className="form-label  ">
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
              <div className="d-flex gap-2 mt-5">
                <button
                  type="button"
                  className="btn btn-outline-primary btn-lg w-100"
                  onClick={handleCancelisAddingKey}
                >
                  Cancel
                </button>
                <button className="btn btn-primary btn-lg w-100">Submit</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default Home;
