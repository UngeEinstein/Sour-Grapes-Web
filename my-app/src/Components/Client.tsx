import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const httpLink = new HttpLink({ uri: 'http://localhost:4000/graphql' })

const client = new ApolloClient({
    //uri: '"mongodb://it2810:password@it2810-30.idi.ntnu.no:27017/?authSource=it2810"',
    link: httpLink,
    cache: new InMemoryCache(), 
});

export default client;