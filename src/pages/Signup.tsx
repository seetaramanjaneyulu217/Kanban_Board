import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createUser, makeUserLogIn } from "../store/Slices/usersSlice";
import { changeFormType } from "../store/Slices/signupFormSlice";

const Signup = () => {
  interface FormDetails {
    name: string;
    email: string;
    password: string;
  }

  const [formDetails, setFormDetails] = useState<FormDetails>({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formType = useSelector((state: any) => state.formType.formType);
  const users = useSelector((state: any) => state.users.users);
  const userNames = users.map((user: User) => user.name);
  const userEmails = users.map((user: User) => user.email);

  const handleSignupSubmission = (e: React.FormEvent) => {
    e.preventDefault();

    if(!formDetails.email || !formDetails.name || !formDetails.password) {
      toast.error('Fill all the details')
      return
    }

    if (formDetails.name.length < 5) {
      toast.error("Username should be of length > 5");
      return;
    }

    if (userNames.includes(formDetails.name)) {
      toast.error("Username already present");
      return;
    }

    if (
      !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(formDetails.email)
    ) {
      toast.error("Enter valid email");
      return;
    }

    if (userEmails.includes(formDetails.email)) {
      toast.error("Email already taken");
      return;
    }

    if (formDetails.password.length < 5) {
      toast.error("Password should be of length > 5");
      return;
    }

    dispatch(createUser(formDetails));
    dispatch(makeUserLogIn({ loggedIn: true, loggedInUsername: formDetails.name }))
    navigate("/kanban-board");
  };

  const handleLoginSubmission = (e: React.FormEvent) => {
    e.preventDefault();

    if(!formDetails.email || !formDetails.password) {
      toast.error('Fill all the details')
      return
    }

    if (
      !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(formDetails.email)
    ) {
      toast.error("Enter valid email");
      return;
    }

    if (userEmails.includes(formDetails.email)) {
      const index = userEmails.indexOf(formDetails.email)
      if(users[index].email === formDetails.email && users[index].password === formDetails.password) {
        dispatch(makeUserLogIn({ loggedIn: true, loggedInUsername: formDetails.name }));
        navigate("/kanban-board");
        return;
      }
    }

    toast.error('Enter valid credentials')
  };

  return (
    <div className="flex justify-center items-center mt-44">
      <form
        onSubmit={
          formType === "signup" ? handleSignupSubmission : handleLoginSubmission
        }
      >
        <div>
          <h1 className="text-3xl font-semibold mb-5">
            {formType === "signup" ? "Signup" : "Login"} to access the board
          </h1>
        </div>
        <div className={`${formType === "login" ? "hidden" : "block"}`}>
          <input
            onChange={(e) =>
              setFormDetails({ ...formDetails, name: e.target.value })
            }
            type="text"
            placeholder="Enter your name"
            className="border border-gray-400 px-4 py-1 rounded-lg outline-none mb-5 w-full"
          />
        </div>
        <div>
          <input
            onChange={(e) =>
              setFormDetails({ ...formDetails, email: e.target.value })
            }
            type="email"
            placeholder="Enter your email"
            className="border border-gray-400 px-4 py-1 rounded-lg outline-none mb-5 w-full"
          />
        </div>

        <div>
          <input
            onChange={(e) =>
              setFormDetails({ ...formDetails, password: e.target.value })
            }
            type="password"
            placeholder="Enter your password"
            className="border border-gray-400 px-4 py-1 rounded-lg outline-none mb-5 w-full"
          />
        </div>

        <button className="border border-blue-400 bg-blue-400 text-white px-4 py-1 rounded-lg w-full mb-2">
          {formType === "signup" ? "Signup" : "Login"}
        </button>

        <div>
          {formType === "signup" ? (
            <p>
              Already have an account?{" "}
              <span
                className="cursor-pointer text-blue-300"
                onClick={() => dispatch(changeFormType({ formType: "login" }))}
              >
                Login
              </span>
            </p>
          ) : (
            <p>
              Don't have an account?{" "}
              <span
                className="cursor-pointer text-blue-300"
                onClick={() => dispatch(changeFormType({ formType: "signup" }))}
              >
                Signup
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Signup;
