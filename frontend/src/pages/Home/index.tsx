import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { errorToast, successToast } from "../../utils/toast";
import axios from "axios";
import "react-toastify/dist/ReactToastify.min.css";
import { AiFillDelete } from "react-icons/ai";
import { filter, find } from "lodash";
import { AiOutlinePlus } from "react-icons/ai";
import AddKeyForm from "./AddKeyForm/AddKeyForm";
import { Key } from "../../types/keys";
import { FiEdit } from "react-icons/fi";

const Home = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Key>();
  const [keys, setKeys] = useState<Key[]>([]);
  const [isAddingKey, setIsAddingKey] = useState(false);
  const [editKeyId, setEditKeyId] = useState<number | null>(null);

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
    setEditKeyId(null);
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
                <button onClick={() => setEditKeyId(key.id)}>
                  <FiEdit size={30} color="rgb(25, 135, 84)" />
                </button>
                <button onClick={() => handleDeleteKey(key.id)}>
                  <AiFillDelete size={30} color="rgb(220, 53, 69)" />
                </button>
              </div>
            </div>
          ))}
          {!(isAddingKey || editKeyId) && (
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
          {editKeyId && (
            <AddKeyForm
              onSubmit={onSubmit}
              register={register}
              errors={errors}
              onCancel={handleCancelEditKey}
              _key={find(keys, (key) => key.id === editKeyId)}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default Home;
