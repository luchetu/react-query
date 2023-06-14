import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { Joke } from "../types";
import { URL } from "../constants";
import { notification } from 'antd';

const useUpdateJoke = () => {
    const queryClient = useQueryClient();
    return useMutation(
        (joke: Joke) =>
            axios.patch(`${URL}/jokes/${joke.id}`, joke).then((res) => res.data),
        {
            onMutate: async (newJoke: Joke) => {
                // Cancel outgoing refetches
                await queryClient.cancelQueries("jokes");

                const previousJokes = queryClient.getQueryData("jokes");

                queryClient.setQueryData<Joke[] | undefined>("jokes", (old) => {
                    const id = newJoke.id;
                    const data = old?.map((joke) => {
                        if (Number(joke.id) === Number(id)) {
                            return newJoke;
                        }
                        return joke;
                    });
                    return data;
                });

                // Return a context object with the snapshotted value
                return { previousJokes };
            },
            onError: (
                err,
                newJoke,
                context:
                    | {
                        previousJokes: unknown;
                    }
                    | undefined
            ) => {
                queryClient.setQueryData(
                    "jokes",
                    context ? context.previousJokes : context
                );
            },
            onSuccess: (data, variables) => {
                queryClient.setQueryData(["jokes", { id: variables.id }], data);
                notification.success({
                    message: 'Success',
                    description: `${data?.title} was succefully updated`
                });

            },
        }
    );
};

export { useUpdateJoke };