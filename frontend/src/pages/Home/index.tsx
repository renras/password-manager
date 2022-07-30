import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { errorToast, successToast } from "../../utils/toast";
import axios from "axios";
import "react-toastify/dist/ReactToastify.min.css";
import { AiFillDelete } from "react-icons/ai";
import { filter, find, findIndex } from "lodash";
import { AiOutlinePlus } from "react-icons/ai";
import AddKeyForm from "./AddKeyForm/AddKeyForm";
import { Key } from "../../types/keys";
import { FiEdit } from "react-icons/fi";
import { v4 as uuidv4 } from "uuid";

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
        const response = await axios.get("http://localhost:8000/keys/");
        setKeys(response.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const handleAddKey = handleSubmit(async (data) => {
    try {
      const response = await axios.post("http://localhost:8000/keys/", data);
      setKeys((prev) => [...prev, response.data]);
      setIsAddingKey(false);
      successToast("Successfully added key");
    } catch (error) {
      console.error(error);
      errorToast("Failed to add key");
    }
  });

  const handleEditKey = handleSubmit(async (data) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/keys/${editKeyId}/`,
        data
      );
      const index = findIndex(keys, (key) => key.id === response.data.id);
      const newArr = keys;
      newArr[index] = response.data;
      setKeys(newArr);
      setEditKeyId(null);
      reset();
      successToast("Successfully edited key");
    } catch (error) {
      console.error(error);
      errorToast("Failed to add key");
    }
  });

  const handleDeleteKey = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8000/keys/${id}/`);
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
    <section className="w-100 d-flex gap-3 p-5 justify-content-center align-items-start">
      <div className="mw-md w-100 p-5 shadow-sm mt-5">
        <h2>Keys</h2>

        {/* keys */}
        <div className="d-flex flex-column gap-4 mt-4">
          {keys.map((key) => {
            {
              /* render an edit form if edit button is clicked */
            }
            if (editKeyId === key.id)
              return (
                <AddKeyForm
                  key={uuidv4()}
                  onSubmit={handleEditKey}
                  register={register}
                  errors={errors}
                  onCancel={handleCancelEditKey}
                  _key={find(keys, (key) => key.id === editKeyId)}
                />
              );

            {
              /* render the key if not editing */
            }
            return (
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
            );
          })}

          {/* hide add key button while adding or editing a key */}
          {!(isAddingKey || editKeyId) && (
            <>
              <button
                className="btn btn-primary btn-lg mt-5"
                onClick={() => setIsAddingKey(true)}
              >
                <AiOutlinePlus size={30} />
              </button>
            </>
          )}

          {/* render add key form if add key button is clicked */}
          {isAddingKey && (
            <AddKeyForm
              onSubmit={handleAddKey}
              register={register}
              errors={errors}
              onCancel={handleCancelAddKey}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default Home;
