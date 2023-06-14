
import { useQuery, UseQueryResult } from "react-query";
import axios from "axios";
import { URL } from "../constants";
import { Joke } from "../types";

const useJoke = (id: any): UseQueryResult<Joke> => {
    return useQuery(["joke", id], () =>
        axios.get<Joke>(`${URL}/jokes/${id}`).then((res) => res.data)
    );
};

export { useJoke };