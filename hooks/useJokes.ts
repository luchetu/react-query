import { useQuery } from "react-query";
import axios from "axios";
import { URL } from "../constants";
import { Pagination } from "../types";


const useJokes = (pagination: Pagination) => {
    return useQuery("jokes", () =>
        axios.get(`${URL}/jokes/?\_page=${pagination.page}&\_limit=${pagination.limit}`).then((res) => res.data)
    );
};

export { useJokes };