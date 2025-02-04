import React, { useState } from "react";
import MetaData from "../layout/MetaData";
import "./Search.css";
import { useNavigate } from 'react-router-dom';

const Search = ({ history }) => {
  const [keyword, setKeyword] = useState("");

  const navigate = useNavigate();

  const searchSubmitHandler = (e) => {
    e.preventDefault();    //does not reload on submission of form
    //trim removes spaces from keyword
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate("/products");
    }
  };


  return (
    <>
      <MetaData title="Search A Product -- ECOMMERCE" />
      <form className="searchBox" onSubmit={searchSubmitHandler}>
        <input
          type="text"
          placeholder="Search a Product ..."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input type="submit" value="Search" />
      </form>
    </>
  );
};

export default Search;