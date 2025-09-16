# TanStack Query (React Query) Learning Project

A comprehensive React application demonstrating TanStack Query v5 features including data fetching, mutations, caching, and state management.

## 🚀 Features

- ✅ **Data Fetching** with `useQuery`
- ✅ **Mutations** with `useMutation`
- ✅ **Cache Management** and data sharing across components
- ✅ **Custom Hooks** for reusable query logic
- ✅ **Conditional Queries** with enabled/disabled states
- ✅ **Query Invalidation** after mutations
- ✅ **Error Handling** and Loading States
- ✅ **DevTools Integration** (React 18 compatible)

## 📁 Project Structure

```
src/
├── components/
│   ├── BackUpUsers.jsx      # Displays cached user data
│   └── ListUsers.jsx        # User list component
├── hooks/
│   └── useUserHooks.js      # Custom React Query hooks
├── App.jsx                  # Main app with query controls
└── main.jsx                 # App entry point with QueryClient setup
```

## 🛠 Technologies Used

- **React** 18.2.0
- **TanStack Query** v5.89.0
- **Axios** for HTTP requests
- **Vite** for development server

## 📦 Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd tanstack-query-project
```

2. Install dependencies:
```bash
npm install
```

3. Install required packages:
```bash
npm install @tanstack/react-query @tanstack/react-query-devtools axios
```

4. Start the development server:
```bash
npm run dev
```

5. Start your JSON server (for API):
```bash
# Create db.json file with users data
json-server --watch db.json --port 5000
```

## 🗄️ Database Setup

Create a `db.json` file in your project root:

```json
{
  "users": [
    { "id": 1, "name": "John Doe" },
    { "id": 2, "name": "Jane Smith" },
    { "id": 3, "name": "Bob Johnson" }
  ]
}
```

## 🔧 Configuration

### QueryClient Setup (`main.jsx`)

```jsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
```

### Custom Hooks (`hooks/useUserHooks.js`)

```jsx
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

// Fetch users query
export const useUserList = ({ showUser }) => {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:5000/users");
      return response.data;
    },
    refetchOnWindowFocus: false,
    enabled: showUser, // Conditional fetching
  });
};

// Create user mutation
export const useUserListMutate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userData) => {
      const response = await axios.post("http://localhost:5000/users", userData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
```

## 🎯 Key Concepts Demonstrated

### 1. **Conditional Queries**
```jsx
const [show, setShow] = useState(false);
const { data } = useUserList({ showUser: show });

// Query only runs when show is true
<button onClick={() => setShow(true)}>Load Users</button>
```

### 2. **Cache Sharing**
```jsx
// Multiple components can access the same cached data
const users = queryClient.getQueryData(["users"]);
```

### 3. **Automatic Refetching**
```jsx
// Query automatically refetches after successful mutation
onSuccess: () => {
  queryClient.invalidateQueries({ queryKey: ["users"] });
}
```

### 4. **Loading & Error States**
```jsx
const { data, isLoading, isError } = useUserList({ showUser: show });

if (isLoading) return <div>⏳ Loading...</div>;
if (isError) return <div>❌ Error loading users</div>;
```

## 🧩 Component Overview

### **App.jsx**
- Main component with query control buttons
- Manages global `show` state for conditional queries
- Displays user list and handles mutations

### **ListUsers.jsx**
- Reuses the same query hook
- Displays users in a separate component
- Demonstrates data sharing across components

### **BackUpUsers.jsx**
- Accesses cached data using `getQueryData`
- Shows how to read cache without triggering new requests
- Useful for displaying data in multiple places

## 🔍 DevTools

TanStack Query DevTools are integrated for development:

- View all queries and their states
- Monitor cache data
- Debug query behavior
- Track loading and error states

**Note**: DevTools work best with React 18. If using React 19, remove DevTools temporarily.

## 🚨 Common Issues & Solutions

### React 19 Compatibility
If using React 19, you might encounter DevTools issues:

```jsx
// Remove DevTools for React 19
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
```

### Hook Rules
Always call hooks at the top level of components:

```jsx
// ✅ Correct
const { data } = useUserList({ showUser: true });

// ❌ Wrong - Don't call hooks inside conditions
if (condition) {
  const { data } = useUserList({ showUser: true });
}
```

## 📚 Learning Resources

- [TanStack Query Documentation](https://tanstack.com/query/latest)
- [React Query DevTools](https://tanstack.com/query/latest/docs/react/devtools)
- [Query Keys Best Practices](https://tanstack.com/query/latest/docs/react/guides/query-keys)

## 🎓 What You'll Learn

- How to set up TanStack Query in a React application
- Creating custom hooks for queries and mutations
- Managing server state vs client state
- Implementing optimistic updates
- Cache invalidation strategies
- Error handling patterns
- Loading state management
- Data sharing between components

## 🤝 Contributing

Feel free to contribute to this learning project:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Happy Learning with TanStack Query! 🚀**
