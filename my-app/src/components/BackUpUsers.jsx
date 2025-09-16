import { useQueryClient } from "@tanstack/react-query";
import React from "react";

const BackUpUsers = () => {
  const queryClient = useQueryClient();

  // Use getQueryData if you only need the latest cached value
  const users = queryClient.getQueryData(["users"]);
  console.log(users, "from backup");

  return (
    <div>
      <h4>BackUpUsers (from cache)</h4>
      <ul>
        {users?.map((user) => (
          <li key={user.id}>{user?.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default BackUpUsers;
