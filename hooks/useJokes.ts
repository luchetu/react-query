import { useQuery } from "react-query";
import axios from "axios";
import { URL } from "../constants";

const useJokes = () => {
    return useQuery("jokes", () =>
        axios.get(`${URL}/jokes`).then((res) => res.data)
    );
};

export { useJokes };