
import { useUserList, useUserListMutate } from "../hooks/useUserHooks";

const ListUsers = () => {


  const { data, isSuccess } = useUserList();

  //for post data

  const { mutate } =useUserListMutate()




  return (
    <div>

      <button onClick={() => mutate()}>post</button>
      <h3>List of users</h3>



      {isSuccess && (
        <ul>
          {data?.map((user) => (
            <li key={user.id}>{user?.name}</li>
          ))}
        </ul>
      )}


    </div>
  );
};

export default ListUsers;
