import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  return (
    <>
      <div>Signup</div>
      <button onClick={() => navigate("/kanban-board")}>Board</button>
    </>
  );
};

export default Signup;
