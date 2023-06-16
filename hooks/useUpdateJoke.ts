import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { Joke } from "../types";
import { URL } from "../constants";
import { notification } from "antd";
import { useRouter } from "next/router";


const useUpdateJoke = () => {

    const router = useRouter()

    const queryClient = useQueryClient();
    return useMutation(
        (joke: Joke) =>
            axios.patch(`${URL}/jokes/${joke.id}`, joke).then((res) => res.data),
        {
            onSuccess: (data, variables) => {
                queryClient.invalidateQueries("jokes");
                notification.success({
                    message: "Success",
                    description: `Joke was successfully updated.`,
                });
                router.push('/jokes/list')
            },
            onError: (error: string) => {
                notification.error({
                    message: "Error",
                    description: "An error occurred while updating the joke.",
                });
            },
        }
    );
};

export { useUpdateJoke };