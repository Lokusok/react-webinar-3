import { useNavigate } from "react-router-dom";

function LoginStatus() {
  const navigate = useNavigate();

  const callbacks = {
    onClick: () => navigate('/login'),
  };

  return (
    <button onClick={callbacks.onClick}>Вход</button>
  )
}

export default LoginStatus;