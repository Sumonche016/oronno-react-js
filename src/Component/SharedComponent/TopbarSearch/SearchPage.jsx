import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getSearchProduct } from '../../../Services/apiServices';
import NurseryFilter from '../../Pages/Nursery/MIniComponent/NurseryFilter';
import TopbarSearch from './TopbarSearch';

const SearchPage = () => {
    const [searchResult, setSearchResult] = useState([]);
    const location = useLocation();
    const search = decodeURI(location.pathname).split("/")[2];

    // console.log(search)

    useEffect(() => {
        const response = getSearchProduct(search);
        setSearchResult(response.data);
    }, [])

    // console.log(searchResult)
    return (
        <div>
            <TopbarSearch />



        </div>
    );
};

export default SearchPage;