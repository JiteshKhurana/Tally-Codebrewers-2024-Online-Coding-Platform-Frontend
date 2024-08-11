import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Cookies from "universal-cookie";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateContest: React.FC = () => {
  const [contestName, setContestName] = useState("");
  const cookies = new Cookies(null, { path: "/" });
  const token = cookies.get("token");
  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<addProblemFormFields>({
    resolver: zodResolver(addProblemSchema),
  });

  const fieldArray = useFieldArray({
    name: "test_cases",
    control,
  });

  const onSubmit: SubmitHandler<addProblemFormFields> = async (data) => {
    await axios
      .post(
        "https://worldwide-coders-production.up.railway.app/problems/upload",
        data,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        toast("Sucessfully Added!! 🥳");
      })
      .catch((error) =>
        setError("root", {
          message: error.message,
        })
      );
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Create a Contest</h2>
      <Input
        type="text"
        value={contestName}
        onChange={(e) => setContestName(e.target.value)}
        placeholder="Contest Name"
        className="p-2 border border-gray-400 rounded mb-2 w-full"
      />
      <Button onClick={handleCreateContest} className="p-2 rounded">
        Create Contest
      </Button>
    </div>
  );
};

export default CreateContest;
