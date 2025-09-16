# React Users App with TanStack Query (CRUD Ready)

A React project demonstrating **data fetching, caching, and mutations** using **TanStack Query (React Query)** with an Express backend.
Now includes **adding users** with `useMutation` and automatic cache updates.

---

## Table of Contents
- [Project Overview](#project-overview)
- [Features Implemented](#features-implemented)
- [Backend](#backend)
- [Frontend](#frontend)
- [Advantages of TanStack Query](#advantages-of-tanstack-query)
- [Installation](#installation)
- [Next Steps](#next-steps)

---

## Project Overview

This project is a **Users Management App** that:

- Fetches users from an Express backend using `useQuery`
- Allows **adding a new user** with `useMutation`
- Demonstrates **query caching**, **conditional fetching**, and **cache inspection**
- Updates UI **automatically** when new data is added

---

## Features Implemented

- Fetch users using `useQuery`
- Conditional fetching with `enabled`
- Display loading and error states
- Inspect cached queries with `useQueryClient`
- Add a new user using `useMutation` (with automatic cache update)
- Button to trigger fetching (`showUser` state)

---

## Backend

The backend is built with **Node.js + Express**.

```js
import express from "express";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let users = [
  { id: 1, name: 'Akshay' },
  { id: 2, name: 'Bibin' },
  { id: 3, name: 'Dipin' },
  { id: 4, name: 'Gokul' },
  { id: 5, name: 'Vivek' }
];

app.get("/users", (req, res) => res.json(users));

app.post("/users", (req, res) => {
  const newUser = { id: users.length + 1, ...req.body };
  users.push(newUser);
  res.status(201).json(newUser);
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});



Frontend
Fetch Users (useQuery) and Conditional Fetching
App.jsx


import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import axios from 'axios';
import BackUpUsers from './components/BackUpUsers';

const App = () => {
  const [showUser, setShowUser] = useState(false);
  const [name, setName] = useState("");
  const queryClient = useQueryClient();

  // Fetch users
  const { data, isError, isLoading, isSuccess } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/users");
      return res.data;
    },
    enabled: showUser,
  });

  // Add new user mutation
  const addUserMutation = useMutation({
    mutationFn: async (newUser) => {
      const res = await axios.post("http://localhost:5000/users", newUser);
      return res.data;
    },
    onSuccess: (data) => {
      // Update cached users after adding new user
      queryClient.setQueryData(['users'], (oldData) => [...oldData, data]);
    }
  });

  if (isError) return <>❌ Error fetching users</>;
  if (isLoading) return <>⏳ Loading...</>;

  return (
    <div>
      <button onClick={() => setShowUser(true)}>Load Users</button>

      <h3>Add New User</h3>
      <input
        type="text"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        onClick={() => {
          if (name.trim()) {
            addUserMutation.mutate({ name });
            setName("");
          }
        }}
      >
        Add User
      </button>

      <h3>List of users</h3>
      {isSuccess && (
        <ul>
          {data?.map(user => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      )}

      <BackUpUsers />
    </div>
  );
};

export default App;




Backup Users (useQueryClient)
BackUpUsers.jsx


import { useQueryClient } from '@tanstack/react-query';
import React from 'react';

const BackUpUsers = () => {
  const queryClient = useQueryClient();
  const users = queryClient.getQueryData(['users']);

  return (
    <div>
      <h4>BackUpUsers (from cache)</h4>
      <ul>
        {users?.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default BackUpUsers;
Advantages of TanStack Query
✅ Automatic Caching: Reuses data to reduce network requests

✅ Background Updates: Fetch fresh data automatically

✅ Optimistic Updates: UI updates immediately on mutation

✅ Error Handling: Built-in loading, error, success states

✅ Conditional Fetching: Fetch only when needed

✅ Cache Inspection: Read and update cached data (useQueryClient)

✅ Reduces Boilerplate: No need for Redux or manual global state

Installation


bash

cd backend
npm install
node index.js
Frontend:


cd frontend
npm install
npm start
Open browser:


http://localhost:3000
