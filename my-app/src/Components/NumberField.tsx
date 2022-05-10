import React from 'react';
import TextField from '@material-ui/core/TextField';
import { createMuiTheme, createStyles, makeStyles, Theme, ThemeProvider } from '@material-ui/core/styles';
import { RootStore } from "../Store";
import { GetInput } from "../actions/searchActions";
import { useSelector, useDispatch } from "react-redux";

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


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
        "& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
          display: "none"
        }
      },
    },
  }),
);

//Handles price-field input
export default function FormPropsTextFields() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const componentState = useSelector((state: RootStore) => state.search);

  return (
    <ThemeProvider theme={theme}>
      <form className={classes.root} noValidate autoComplete="off">

        <TextField
          id="outlined-number"
          label="Max price:"
          type="number"
          color={"secondary"}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            if (event.target.value !== null) {
              if (event.target.value !== "") {
                let newValue = parseInt(event.target.value);
                dispatch(GetInput(componentState.searchString, newValue, componentState.country, 0, componentState.lowToHigh));
              } else {
                dispatch(GetInput(componentState.searchString, -1, componentState.country, 0, componentState.lowToHigh));
              }
            } else {
              dispatch(GetInput(componentState.searchString, -1, componentState.country, 0, componentState.lowToHigh));
            }
          }}
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
      </form>
    </ThemeProvider>
  );
}