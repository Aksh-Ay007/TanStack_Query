import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import axios from "axios";
import BackUpUsers from "./components/BackUpUsers";

const App = () => {
  const [showUser, setShowUser] = useState(false);

  const { data, isError, isLoading, isSuccess } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:5000/users");
      return response.data; // now it's an array
    },
    enabled: showUser,
  });

  if (isError) {
    return <>❌ Error fetching users</>;
  }

  if (isLoading) {
    return <>⏳ Loading......</>;
  }

  return (
    <div>
      <button onClick={() => setShowUser(true)}>Load Users</button>
      <h3>List of users</h3>

      {isSuccess && (
        <ul>
          {data?.map((user) => (
            <li key={user.id}>{user?.name}</li>
          ))}
        </ul>
      )}

      <BackUpUsers />
    </div>
  );
};

export default App;
