import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import Client from './Client';
import { gql } from '@apollo/client';
import StarRating from "./StarRating";
import {useSelector} from 'react-redux';
import {RootStore} from "../Store";


const httpLink = new HttpLink({ uri: 'http://localhost:4000/graphql' })

export const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(), 
});



export function getWineList() {
    let response = Client
        .query({
            query: gql`
      query Query {getWines {
        title
        points
        price
        description
        taster_name
        country
      }}
    `
        })
        .then(result => result.data.getWines);

    return response;
}



const getSearchedWineList =  gql`
    query Query($input: String!) {search(title: $input) {
      title
      points
      price
      description
      taster_name
      country
    }}
  `

export async function getSearchedWine(input:String){
    const responses = await client.query({
        query: getSearchedWineList,
        variables: {
            input: input
        }
    }).then(result => result.data.search);
    return responses;
}  

const getSearchedWinePageList =  gql`
    query Query($input: String!, $page: Int!) {searchPage(title: $input, page: $page) {
      title
      points
      price
      description
      taster_name
      country
    }}
  `

  export async function getSearchedWinePage(input:String, page:Number){
    const responses = await client.query({
        query: getSearchedWinePageList,
        variables: {
            input: input,
            page: page
        }
    }).then(result => result.data.searchPage);
    return responses;
}

const getFilteredList =  gql`
    query Query($input: String!, $country: String!, $price: Int!, $page: Int!, $increasing: Boolean!, $sortByPrice: Boolean!, $lowToHigh: Boolean!) {filter(title: $input, country: $country, price: $price, page: $page, increasing: $increasing, sortByPrice: $sortByPrice, lowToHigh: $lowToHigh) {
      title
      points
      price
      description
      taster_name
      country
    }}
  `
//Filtering
  export async function getFiltered(input:String, country:String, price:Number, page:Number, increasing:Boolean, sortByPrice:Boolean, lowToHigh:Boolean){
    const responses = await client.query({
        query: getFilteredList,
        variables: {
            input: input,
            country: country,
            price: price,
            page: page,
            increasing: increasing,
            sortByPrice: sortByPrice,
            lowToHigh: lowToHigh

        }
    }).then(result => result.data.filter);
    return responses;
}

//https://material-ui.com/components/accordion/#simple-accordion
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '60vw',
            textAlign: "left",
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
            fontWeight: theme.typography.fontWeightRegular,
        },
        typography: {
            margin: '10px',
        }
    }),
);
//Rendering of search-results
const WineAccordion = () => {
    const [wines, setWines] = React.useState<String[]>([]);
    const componentState = useSelector((state:RootStore) => state.search);
    let wineArray: any[] = []




    React.useEffect(() => {

        
        const wineList = async () => {
            const response = await getFiltered(componentState.searchString, componentState.country, componentState.price, componentState.page, false, true, componentState.lowToHigh);
            for (let wine in response) {
                wineArray.push([response[wine].title, response[wine].price, response[wine].points,
                response[wine].description, response[wine].taster_name, response[wine].country])
            }
            setWines(wineArray);
        };
        wineList();
    }, [componentState.searchString, componentState.country, componentState.price, componentState.page, componentState.lowToHigh]);

    
    const classes = useStyles();
    let counter:number = 1+componentState.page*50;

    

    return (
        <div className={classes.root}>
            {wines.map((wine) => {
                return <Accordion key={counter}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography className={classes.heading}>
                            <b>{counter++}. {wine[0]}</b>
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            {wine[3]}
                            <br />
                            <br />
                            <b> Price:  </b> ${wine[1]}
                            <br />
                            <b> Points: </b> {wine[2]}
                            <br />
                            <b> Country: </b> {wine[5]}
                            <br />
                            <b> Taster: </b> {wine[4]}
                        </Typography>
                    </AccordionDetails>
                    <Typography className={classes.typography}>
                        Give your review!
                    </Typography>
                    <StarRating title={wine[0]}/>
                </Accordion>
            })}

        </div>
    );
};




export default WineAccordion;
