
import BackUpUsers from "./components/BackUpUsers";
import ListUsers from './components/ListUsers';
import { useUserList, useUserListMutate } from './hooks/useUserHooks';

const App = () => {


  const { data} = useUserList();
    const { mutate } =useUserListMutate()





  return (
    <div>
      <div>
        <h1>Main</h1>

        <ul>
          {data?.map((user) => (
            <li key={user.id}>{user?.name}</li>
          ))}
        </ul>


      </div>

      <ListUsers />

      <BackUpUsers />
    </div>
  );
};

export default App;
