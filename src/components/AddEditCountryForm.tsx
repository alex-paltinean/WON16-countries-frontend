import { Box, Button, Card, CardActions, CardContent, ListItem, TextField, Typography } from "@mui/material"
import axios from "axios";
import { FC, useEffect, useState } from "react";
import { Country } from "../model/Country";
import ContinentSelect from "./ContinentSelect";

export type AddEditCountryFormProps = {
    editedCountry: Country | null;
    closeForm: (reload: boolean) => void;
}

const AddEditCountryForm: FC<AddEditCountryFormProps> = ({ editedCountry, closeForm }) => {

    const [name, setName] = useState<string>('');
    const [population, setPopulation] = useState<number>(0);
    const [area, setArea] = useState<number>(0);
    const [continent, setContinent] = useState<string>('');

    useEffect(() => {
        if (editedCountry !== null) {
            setContinent(editedCountry.continent);
            setName(editedCountry.name);
            setArea(editedCountry.area);
            setPopulation(editedCountry.population);
        }
    }, [editedCountry]);

    const saveCountry = () => {
        if (editedCountry) {
            axios.put('http://localhost:8080/countries/' + editedCountry.id, { id: editedCountry.id, name, population, area, continent }).then(() => closeForm(true));
        } else
            axios.post('http://localhost:8080/countries', { name, population, area, continent }).then(() => closeForm(true));
    }


    return <Card sx={{ margin: 1, padding: 1, width: 1 }} variant='outlined'>
        <Typography variant='h5'>Add new country</Typography>
        <CardContent>
            <TextField label='Name' value={name} onChange={(e) => setName(e.target.value)} sx={{marginRight: 1}}></TextField>
            <TextField label='Population' type='number' value={population} onChange={(e) => setPopulation(e.target.value as any as number)} sx={{marginRight: 1}}></TextField>
            <TextField label='Area' value={area} onChange={(e) => setArea(e.target.value as any as number)} sx={{marginRight: 1}}></TextField>
            <ContinentSelect initialValue={continent} valueChanged={setContinent}></ContinentSelect>
        </CardContent>
        <CardActions>
            <Button variant='contained' onClick={saveCountry}>Save</Button>
            <Button color='error' variant='contained' onClick={() => closeForm(false)}>Cancel</Button>
        </CardActions>
    </Card>;
}

export default AddEditCountryForm;