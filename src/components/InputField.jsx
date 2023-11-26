export const InputField = ({
  register,
  name,
  placeholder,
  error,
  className,
}) => (
  <div>
    <input
      {...register(name)}
      className={className}
      placeholder={placeholder}
    />
    {error && <p>{error.message}</p>}
  </div>
);

export default InputField;
