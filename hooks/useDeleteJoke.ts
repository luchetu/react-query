import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { Joke } from "../types";
import { URL } from "../constants";
import { notification } from 'antd';
import { useRouter } from "next/router";


const useDeleteJoke = () => {

    const router = useRouter()

    const queryClient = useQueryClient();
    return useMutation(
        (joke: Joke) =>
            axios.delete(`${URL}/jokes/${joke.id}`).then((res) => res.data),
        {
            onSuccess: (data: Joke) => {
                queryClient.invalidateQueries("jokes"),
                    queryClient.invalidateQueries("joke"),
                    notification.success({
                        message: 'Success',
                        description: `Successfully Deleted`
                    });
                router.push('/jokes/list')
            },
            onError: (error: any) => {
                notification.error({
                    message: 'Error!',
                    description: `${JSON.parse(error)}`
                });
            }
        }
    );
};

export { useDeleteJoke };