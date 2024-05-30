import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { FaSearch } from "react-icons/fa"; // react-icons 패키지 설치 필요
import styles from "../components/SearchBar.module.css";

function SearchBar() {
  const [searchValue, setSearchValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    window.location.href = `/movie?search=${searchValue}`;
  };

  const handleIconClick = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    if (searchValue === "") {
      setIsFocused(false);
    }
  };

  return (
    <Box
      className={styles.searchBar}
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 0.3, width: "20ch", height: "2ch" },
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <div className={styles.searchBar}>
        {!isFocused ? (
          <FaSearch className={styles.searchIcon} onClick={handleIconClick} />
        ) : (
          <TextField
            id="standard-search"
            type="search"
            variant="standard"
            value={searchValue}
            onChange={handleChange}
            onBlur={handleBlur}
            autoFocus
          />
        )}
      </div>
    </Box>
  );
}

export default SearchBar;
