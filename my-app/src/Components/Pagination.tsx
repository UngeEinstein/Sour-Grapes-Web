import React from 'react';
import { makeStyles, createStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import { client } from "./WineAccordion";
import { gql } from '@apollo/client';
import { RootStore } from "../Store";
import { GetInput } from "../actions/searchActions";
import { useSelector, useDispatch } from "react-redux";
import { useState } from 'react';


const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      '& > *': {
        marginTop: theme.spacing(2),
      },
    }
  }),
);

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



const getFilterDocumentCountNumber = gql`
query Query($input: String!, $country: String!, $price: Int!, $increasing: Boolean!) {filterDocumentCount(title: $input, country: $country, price: $price, increasing: $increasing)}
`
//Handles pages
async function getFilterDocumentCount(input: String, country: String, price: Number, increasing: Boolean) {
  const responses = await client.query({
    query: getFilterDocumentCountNumber,
    variables: {
      input: input,
      country: country,
      price: price,
      increasing: increasing
    }
  }).then(result => result.data.filterDocumentCount);
  return responses;
}




export default function PaginationRanges() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const componentState = useSelector((state: RootStore) => state.search);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(GetInput(componentState.searchString, componentState.price, componentState.country, value - 1, componentState.lowToHigh));
  };
  const [state, setState] = useState<number>(128871);

  React.useEffect(() => {

    const getCount = async () => {
      const count = await getFilterDocumentCount(componentState.searchString, componentState.country, componentState.price, false);
      if (state !== count) {
        setState(count);
      }
    };
    getCount();
  }, [componentState.searchString, componentState.price, componentState.country]);


  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <Pagination color="secondary" count={Math.ceil(state / 50)} defaultPage={componentState.page} boundaryCount={2} onChange={handleChange} />
      </div>
    </ThemeProvider>
  );
}