import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { RootStore } from "../Store";
import { GetInput } from "../actions/searchActions";
import { useSelector, useDispatch } from "react-redux";
import { createMuiTheme, ThemeProvider } from '@material-ui/core';


const theme = createMuiTheme({
  palette: {
    primary: {
      main: 'rgb(42, 83, 73)',
    },
    secondary: {
      main: '#F87060',
    },
  },
});

//Handles countryInput
export default function ControllableStates() {
  const dispatch = useDispatch();
  const componentState = useSelector((state: RootStore) => state.search);

  return (
    <ThemeProvider theme={theme}>
      <div>
        <br />
        <Autocomplete
          onChange={(event: any, newValue: string | null) => {
            if (newValue != null) {

              dispatch(GetInput(componentState.searchString, componentState.price, newValue === 'United States' ? "US" : newValue!, 0, componentState.lowToHigh));
            } else {
              dispatch(GetInput(componentState.searchString, componentState.price, "", 0, componentState.lowToHigh));
            }
          }}

          id="controllable-states-demo"
          options={countries}
          autoHighlight
          style={{ width: 300 }}
          renderInput={(params) => <TextField color="secondary" {...params} label="Country" variant="outlined" />}
        />
      </div>
    </ThemeProvider>
  );
}
const countries = ['United States', 'Italy', 'France', 'Portugal', 'Spain'];