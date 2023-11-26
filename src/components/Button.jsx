export const Button = ({ buttonText, type, onClick }) => (
  <button type={type} className="pointer mr2 button" onClick={onClick}>
    {buttonText}
  </button>
);

export default Button;
