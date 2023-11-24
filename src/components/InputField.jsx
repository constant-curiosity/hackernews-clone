export const InputField = ({ register, name, placeholder, error }) => (
  <div>
    <input {...register(name)} placeholder={placeholder} />
    {error && <p>{error.message}</p>}
  </div>
);

export default InputField;
