import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { Joke } from "../types";
import { URL } from "../constants";
import { notification } from 'antd';

const useDeleteJoke = () => {
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
                        description: `${data?.title} was succefully deleted`
                    });
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