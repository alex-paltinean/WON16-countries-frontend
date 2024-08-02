import { useEffect, useState } from 'react';
import './App.css';
import { Box } from '@mui/system';
import { Button, Card, CardActions, CardContent, Chip, FormControl, Grid, InputLabel, List, ListItem, MenuItem, Select, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { Country } from "./model/Country";
import Add from '@mui/icons-material/Add';
import { Cancel } from '@mui/icons-material';
import AddEditCountryForm from './components/AddEditCountryForm';
import ContinentSelect from './components/ContinentSelect';

function App() {

  const [countries, setCountries] = useState<Country[]>([]);
  const [continent, setContinent] = useState<string>('');
  const [newCityName, setNewCityName] = useState<string>('');
  const [addCityForCountryId, setAddCityForCountryId] = useState<number | null>(null);
  const [addCountryFormVisible, setAddCountryFormVisible] = useState<boolean>(false);
  const [editedCountry, setEditedCountry] = useState<Country | null>(null);

  const loadCountries = () => {
    axios.get("http://localhost:8080/countries?continent=" + continent).then((response) => setCountries(response.data));
  };

  useEffect(() => {
    loadCountries();
  }, [continent]);

  useEffect(() => {
    loadCountries();
  }, []);

  const deleteCountry = ((id: number) => {
    axios.delete("http://localhost:8080/countries/" + id).then((response) => loadCountries());
  });

  const addCityToCountry = ((id: number) => {
    axios.post("http://localhost:8080/countries/" + id + "/cities", { name: newCityName }).then((response) => {
      setNewCityName('');
      loadCountries();
    });
  });

  const closeCreateCountryForm = (reload: boolean) => {
    setAddCountryFormVisible(false);
    setEditedCountry(null);
    if (reload) {
      loadCountries();
    }
  }

  return (
    <Box>
      <Box id='header' sx={{ backgroundColor: 'black', height: 70, display: 'flex' }}>
        <Box sx={{ flexGrow: 1 }}></Box>
        <Button variant='contained' sx={{ margin: 1 }} onClick={() => setAddCountryFormVisible(true)}>Add country</Button>
        <Box sx={{ margin: 1 }}>
          <ContinentSelect valueChanged={setContinent}></ContinentSelect>
        </Box>
      </Box>
      <List sx={{ backgroundColor: 'lightgray', width: 1 }}>
        {addCountryFormVisible &&
          <ListItem>
            <AddEditCountryForm editedCountry={null} closeForm={closeCreateCountryForm}></AddEditCountryForm>
          </ListItem>
        }
        {countries.sort((a, b) => b.id - a.id).map((country) =>
          <ListItem id={country.name} sx={{ width: 1 }}>
            {(!editedCountry || editedCountry.id !== country.id) &&
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
                      {country.cities.map((city) => <Chip id={city.id + city.name} sx={{ marginRight: 1, marginBottom: 1 }} label={city.name} />)}
                      <Button startIcon={addCityForCountryId === country.id ? <Cancel /> : <Add />} onClick={() => addCityForCountryId === country.id ? setAddCityForCountryId(null) : setAddCityForCountryId(country.id)}>{addCityForCountryId === country.id ?'cancel':'add'}</Button>
                      {addCityForCountryId === country.id &&
                        <Box>
                          <TextField label='City name' variant='outlined' value={newCityName} onChange={(e) => setNewCityName(e.target.value)}></TextField>
                          <Button onClick={() => addCityToCountry(country.id)}>add new city</Button>
                        </Box>
                      }
                    </Grid>
                  </Grid>
                </CardContent>
                <CardActions>
                  <Button color='error' onClick={() => { deleteCountry(country.id) }}>delete</Button>
                  <Button onClick={() => { setEditedCountry(country) }}>edit</Button>
                </CardActions>
              </Card>
            }
            {editedCountry && editedCountry.id === country.id &&
              <AddEditCountryForm closeForm={closeCreateCountryForm} editedCountry={editedCountry}></AddEditCountryForm>
            }
          </ListItem>)}
      </List>
    </Box>
  );
}

export default App;
