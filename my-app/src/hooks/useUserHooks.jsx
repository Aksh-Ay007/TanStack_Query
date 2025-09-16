import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';



export const useUserList=()=>{



     return useQuery({
       queryKey: ["users"],
       queryFn: async () => {
         const response = await axios.get("http://localhost:5000/users");
         return response.data; // now it's an array
       },

       refetchOnWindowFocus: false,
     });
}


export const useUserListMutate=()=>{
  //for post data
    const query = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await axios.post("http://localhost:5000/users", {
        id: 9,
        name: "auto",
      });
      return response.data; // Remove the comma here
    },
    onSuccess: () => {
      query.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });
}
