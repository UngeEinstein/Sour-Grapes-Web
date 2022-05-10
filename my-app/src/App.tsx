import React from 'react';
import './App.css';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import WineAccordion from "./Components/WineAccordion";
import SearchBar from "./Components/SearchBar";
import { ApolloProvider } from '@apollo/client';
import Autocomplete from './Components/Autocomplete';
import Pagination from './Components/Pagination';
import NumberField from './Components/NumberField';
import ArrowButton from './Components/Button'


import FrontPageArt from "./Components/FrontpageArt";
import LocalBarIcon from '@material-ui/icons/LocalBar';


const client = new ApolloClient({
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <header className="App-header">
          <h1>Sour Grapes<LocalBarIcon fontSize={"large"} id="drinkLogo" /></h1>
        </header>
        <FrontPageArt />
        <div id="searchbarContainer">
          <SearchBar />
        </div>
        <div id="filterContainer">
          <Autocomplete />
          <NumberField />
          <ArrowButton />
        </div>
        <div id="dataContainer">
          <Pagination />
          <WineAccordion />
        </div>

      </div>
    </ApolloProvider>
  );
}

export default App;
