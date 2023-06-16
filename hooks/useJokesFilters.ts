import { useQuery } from 'react-query';
import axios from 'axios';
import { URL } from '../constants';
import { Pagination } from '../types';

const useJokesFilters = (filters: { [key: string]: any }) => {
    const queryParams = new URLSearchParams();

    // Append filter parameters to the query string
    Object.keys(filters).forEach((key) => {
        queryParams.append(key, filters[key].toString());
    });

    return useQuery(['jokes-filters', filters], () =>
        axios.get(`${URL}/jokes/?${queryParams.toString()}`).then((res) => res.data)
    );
};

export { useJokesFilters };