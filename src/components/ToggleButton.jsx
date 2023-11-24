export const ToggleButton = ({ isLogin, onClick }) => (
  <button type="button" className="pointer button" onClick={onClick}>
    {isLogin ? "need to create an account?" : "already have an account?"}
  </button>
);

export default ToggleButton;
