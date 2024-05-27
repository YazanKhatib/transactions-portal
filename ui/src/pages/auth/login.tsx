import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../../utils";
import RoutePaths from "../../RoutePath";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = React.useState(isAuthenticated());
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = async () => {
    try {
      const { data } = await axios.post("http://localhost:3000/auth/login", {
        username,
        password,
      });

      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("accessToken", data.access_token);
      navigate(RoutePaths.Home);
      setIsLoggedIn(true);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      toast.error("Username or password are incorrect!");
      console.log(e.response.data.message);
    }
  };

  React.useEffect(() => {
    if (isLoggedIn) {
      navigate(RoutePaths.Home);
    }
  }, [navigate, isLoggedIn]);

  return (
    <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-20 w-auto"
          src="/darklogo.jpeg"
          alt="M2 logo"
        />
        <h2 className="mt-10 text-center text-3xl font-semibold leading-9 tracking-tight text-white">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="text-md block leading-6 text-white"
            >
              Username
            </label>
            <div className="mt-2">
              <input
                id="username"
                name="username"
                required
                onChange={(e) => setUsername(e.target.value)}
                className="block w-full rounded-md border-0 p-2 text-secondary shadow-sm outline-none placeholder:text-gray-400 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="text-md block leading-6 text-white"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-md border-0 p-2 text-secondary shadow-sm outline-none placeholder:text-gray-400 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="flex w-full justify-center rounded-md bg-primary p-2 text-lg leading-6 text-black shadow-sm"
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
