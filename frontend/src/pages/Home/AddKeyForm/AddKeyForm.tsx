import {
  UseFormRegister,
  FieldErrorsImpl,
  DeepRequired,
} from "react-hook-form";
import { Key } from "../../../types/keys";

interface Props {
  onSubmit: (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    e?: React.BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>;
  register: UseFormRegister<Key>;
  errors: FieldErrorsImpl<DeepRequired<Key>>;
  onCancel: () => void;
  _key?: Key;
}

const AddKeyForm = ({ onSubmit, register, errors, onCancel, _key }: Props) => {
  return (
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
        defaultValue={_key?.key}
      />
      {errors.key?.message && (
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
        defaultValue={_key?.value}
      />
      {errors.value?.message && (
        <p className="text-danger m-0">{errors.value?.message}</p>
      )}
      <div className="d-flex gap-2 mt-5">
        <button
          type="button"
          className="btn btn-outline-primary btn-lg w-100"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button className="btn btn-primary btn-lg w-100">Submit</button>
      </div>
    </form>
  );
};

export default AddKeyForm;
