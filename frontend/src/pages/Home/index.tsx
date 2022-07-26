import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { errorToast, successToast } from "../../utils/toast";
import axios from "axios";
import "react-toastify/dist/ReactToastify.min.css";
import { AiFillDelete } from "react-icons/ai";
import { filter } from "lodash";
import { AiOutlinePlus } from "react-icons/ai";
import AddKeyForm from "./AddKeyForm/AddKeyForm";
import { Keys } from "../../types/keys";
import { FiEdit } from "react-icons/fi";

const Home = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Keys>();
  const [keys, setKeys] = useState<Keys[]>([]);
  const [isAddingKey, setIsAddingKey] = useState(false);
  const [isEditingKey, setIsEditingKey] = useState(false);

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

  const handleCancelAddKey = () => {
    setIsAddingKey(false);
    reset();
  };

  const handleCancelEditKey = () => {
    setIsEditingKey(false);
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
                <button onClick={() => setIsEditingKey(true)}>
                  <FiEdit size={30} color="rgb(25, 135, 84)" />
                </button>
                <button onClick={() => handleDeleteKey(key.id)}>
                  <AiFillDelete size={30} color="rgb(220, 53, 69)" />
                </button>
              </div>
            </div>
          ))}
          {!(isAddingKey || isEditingKey) && (
            <>
              <button
                className="btn btn-primary btn-lg"
                onClick={() => setIsAddingKey(true)}
              >
                <AiOutlinePlus size={30} />
              </button>
            </>
          )}
          {isAddingKey && (
            <AddKeyForm
              onSubmit={onSubmit}
              register={register}
              errors={errors}
              onCancel={handleCancelAddKey}
            />
          )}
          {isEditingKey && (
            <AddKeyForm
              onSubmit={onSubmit}
              register={register}
              errors={errors}
              onCancel={handleCancelEditKey}
              id={24}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default Home;
