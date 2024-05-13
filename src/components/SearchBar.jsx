import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchBar() {
    const [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate();

    const handleChange = (event) => {
        setSearchValue(event.target.value);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        navigate(`/movie?path=${searchValue}`);
    };

    return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch', height: '1.5ch'},
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <div>
        <TextField
          id="standard-search"
          type="search"
          variant="standard"
          value={searchValue}
          onChange={handleChange}
        />
      </div>
    </Box>
  );
}

export default SearchBar;