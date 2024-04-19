import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { useState, useCallback } from 'react';

export default function BasicSelect({ onChange }) {
    const [limit, setLimit] = useState(12)

    const handleChange = useCallback((e) => {
        const newLimit = e.target.value;
        setLimit(newLimit)
        onChange(newLimit)
    }, [onChange]);

    
    return (
        <Box sx={{ minWidth: 120, marginLeft: 1 }}>
            <FormControl fullWidth>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={limit}
                label=""
                onChange={handleChange}
                sx={{ height: 28 }}
            >
            <MenuItem value={12}>12 товаров</MenuItem>
            <MenuItem value={24}>24 товара</MenuItem>
            </Select>
        </FormControl>
        </Box>
    );
}