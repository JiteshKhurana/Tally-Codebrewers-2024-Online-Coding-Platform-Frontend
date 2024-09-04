import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import CardShimmer from "./CardShimmer";
import axios from "axios";
import Cookies from "universal-cookie";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Superadmin = () => {
  const navigate = useNavigate();
  const cookies = new Cookies(null, { path: "/" });
  const token = cookies.get("token");
  const [user, setUser] = useState(null);
  const email = localStorage.getItem("email");
  console.log(user);
  const fetchUser = async () => {
    const response = await axios.get(
      import.meta.env.VITE_API_ENDPOINT + "users/get?email=" + email,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setUser(response.data);
  };
  useEffect(() => {
    fetchUser();
  }, []);
  if (!user) return <CardShimmer />;

  return (
    <div className="flex flex-col items-center p-4 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">User Profile</h1>
      <Avatar className="h-24 w-24 mb-4">
        {user.image ? (
          <AvatarImage src={user.image} />
        ) : (
          <AvatarImage src="https://github.com/shadcn.png" />
        )}
        <AvatarFallback>Profile Pic</AvatarFallback>
      </Avatar>
      <h2 className="text-2xl font-semibold mb-2">{user.name}</h2>
      <h3 className="text-xl text-gray-400 mb-1">{user.email}</h3>
      <h3 className="text-xl text-gray-400 mb-4">{user.phone}</h3>
      <div className="flex flex-row space-x-5">
        <Button
          onClick={() => {
            navigate("uploadproblem");
          }}
        >
          Upload Problem
        </Button>
        <Button
          onClick={() => {
            navigate("reviewproblems");
          }}
        >
          Review Problems
        </Button>
      </div>
    </div>
  );
};

export default Superadmin;
