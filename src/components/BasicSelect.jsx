import React from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { useState, useCallback } from 'react';

export default function BasicSelect({ value, onChange }) {
    const handleChange = useCallback((e) => {
        const newLimit = e.target.value;
        onChange(newLimit)
    }, [onChange]);


    return (
        <Box sx={{ minWidth: 120, marginLeft: 1 }}>
            <FormControl fullWidth>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={value}
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