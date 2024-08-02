import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { FC, useEffect, useState } from "react";
export type ContinentSelectProps = {
    initialValue?: string;
    valueChanged: (value: string) => void;
}

const ContinentSelect: FC<ContinentSelectProps> = ({ initialValue, valueChanged }) => {
    const [value, setValue] = useState<string>('');

    useEffect(() => {
        if (initialValue) {
            setValue(initialValue);
        }
    }, [initialValue])

    useEffect(() => {
        valueChanged(value);
    }, [value]);

    return <FormControl sx={{ backgroundColor: 'white', width: '200px' }}>
        <InputLabel>Continent</InputLabel>
        <Select
            value={value}
            label="Continent"
            onChange={(e) => setValue(e.target.value)}>
            <MenuItem value={''}>All</MenuItem>
            <MenuItem value={'Europe'}>Europe</MenuItem>
            <MenuItem value={'Oceania'}>Oceania</MenuItem>
            <MenuItem value={'Asia'}>Asia</MenuItem>
            <MenuItem value={'Americas'}>Americas</MenuItem>
            <MenuItem value={'Africa'}>Africa</MenuItem>
        </Select>
    </FormControl>;
}

export default ContinentSelect;