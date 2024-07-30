import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Box } from '@mui/system';
import { Button, Card, CardActionArea, CardActions, CardContent, CardHeader, Chip, Grid, List, ListItem, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { Country } from "./model/Country";

function App() {

  const [countries, setCountries] = useState<Country[]>([]);
  const [continent, setContinent] = useState<string>('');

  const loadCountries = () => {
    axios.get("http://localhost:8080/countries").then((response) => setCountries(response.data));
  };

  useEffect(() => {
    axios.get("http://localhost:8080/countries?continent=" + continent).then((response) => setCountries(response.data));
  }, [continent]);

  useEffect(() => {
    loadCountries();
  }, []);

  const deleteCountry = ((id: number) => {
    axios.delete("http://localhost:8080/countries/" + id).then((response) => loadCountries());
  });


  return (
    <Box >
      <Box sx={{ backgroundColor: 'black', height: 50 }}>
        <TextField label='Continent' sx={{ backgroundColor: 'white', margin: 1 }} variant='outlined' value={continent} onChange={(e) => setContinent(e.target.value)}></TextField>
      </Box>
      <List sx={{ backgroundColor: 'lightgray', width: 1 }}>
        {countries.map((country) =>
          <ListItem id={country.name} sx={{ width: 1 }}>
            <Card sx={{ margin: 1, padding: 1, width: 1 }} variant='outlined'>
              <Typography variant='h5'>{country.name}</Typography>
              <CardContent>
                <Grid container>
                  <Grid item xs={12} sm={6}>
                    <Typography>Population: {country.population}</Typography>
                    <Typography>Area: {country.area}</Typography>
                    <Typography>Continent: {country.continent}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {country.cities.map((city) => <Chip sx={{ marginRight: 1, marginBottom: 1 }} label={city.name} />)}
                  </Grid>
                </Grid>
              </CardContent>
              <CardActions>
                <Button color='error' onClick={() => { deleteCountry(country.id) }}>delete</Button>
              </CardActions>
            </Card>
          </ListItem>)}
      </List>
    </Box>
  );
}

export default App;
