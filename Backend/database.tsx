let { connection } = require("mongoose");
const mongoose = require('mongoose');
let graphql = require("graphql");
let express = require('express');
let { graphqlHTTP } = require('express-graphql');
let { buildSchema, GraphQLList } = require('graphql');
let { MongoStore } = require("mongodb");
const cors = require('cors')

mongoose.connect("mongodb://it2810:password@it2810-30.idi.ntnu.no:27017/?authSource=it2810", { useNewUrlParser: true, useUnifiedTopology: true },);
const db = mongoose.connection.useDb("it2810");

// Sets the review as a graphql type.
let wineReviews = new graphql.GraphQLObjectType({
    name: 'wineReview',
    fields: {
        points: { type: new graphql.GraphQLList(graphql.GraphQLString) },
        title: { type: graphql.GraphQLString },
    }
})

// Sets the wine as a graphql type.
let wineType = new graphql.GraphQLObjectType({
    name: 'Wine',
    fields: {
        id: { type: graphql.GraphQLID },
        title: { type: graphql.GraphQLString },
        price: { type: graphql.GraphQLInt },
        points: { type: graphql.GraphQLString },
        country: { type: graphql.GraphQLString },
        taster_name: { type: graphql.GraphQLString },
        description: { type: graphql.GraphQLString },
        user_reviews: { type: wineReviews },
    }
})

// The graphql queries that are possible to make
let queryType = new graphql.GraphQLObjectType({
    name: 'Query',
    fields: {
        getWines: {
            type: new GraphQLList(wineType),
            resolve: async () => {
                try {
                    return await getAll();
                } catch (error) {
                    console.log(error)
                }

            }
        },

        search: {
            type: new GraphQLList(wineType),
            args: {
                title: { type: graphql.GraphQLString }, 
            },
            resolve: async (_,{title}) => {
                try {
                    return await search(title);
                } catch (error) {
                    console.log(error)
                }
            }
        },
        searchPage: {
            type: new GraphQLList(wineType),
            args: {
                title: { type: graphql.GraphQLString },
                page: { type: graphql.GraphQLInt },
                sortByPrice: { type: graphql.GraphQLBoolean },
                lowToHigh: { type: graphql.GraphQLBoolean } 
            },
            resolve: async (_,{title, page, sortByPrice, lowToHigh}) => {
                try {
                    return await searchPage(title, page, sortByPrice, lowToHigh);
                } catch (error) {
                    console.log(error)
                }
            }
        },
        filterCountry: {
            type: new GraphQLList(wineType),
            args: {
                title: { type: graphql.GraphQLString },
                country: { type: graphql.GraphQLString },
                page: { type: graphql.GraphQLInt },
                sortByPrice: { type: graphql.GraphQLBoolean },
                lowToHigh: { type: graphql.GraphQLBoolean } 
            },
            resolve: async (_,{title, country, page, sortByPrice, lowToHigh}) => {
                try {
                    return await filterCountry(title, country, page, sortByPrice, lowToHigh);
                } catch (error) {
                    console.log(error)
                }
            }
        },
        filterPrice: {
            type: new GraphQLList(wineType),
            args: {
                title: { type: graphql.GraphQLString },
                price: { type: graphql.GraphQLInt },
                page: { type: graphql.GraphQLInt },
                increasing: { type: graphql.GraphQLBoolean },
                sortByPrice: { type: graphql.GraphQLBoolean },
                lowToHigh: { type: graphql.GraphQLBoolean } 
            },
            resolve: async (_,{title, price, page, increasing, sortByPrice, lowToHigh}) => {
                try {
                    return await filterPrice(title, price, page, increasing, sortByPrice, lowToHigh);
                } catch (error) {
                    console.log(error)
                }
            }
        },
        filterCountryAndPrice: {
            type: new GraphQLList(wineType),
            args: {
                title: { type: graphql.GraphQLString },
                country: { type: graphql.GraphQLString },
                price: { type: graphql.GraphQLInt },
                page: { type: graphql.GraphQLInt },
                increasing: { type: graphql.GraphQLBoolean },
                sortByPrice: { type: graphql.GraphQLBoolean },
                lowToHigh: { type: graphql.GraphQLBoolean } 
            },
            resolve: async (_,{title, country, price, page, increasing, sortByPrice, lowToHigh}) => {
                try {
                    return await filterCountryAndPrice(title, country, price, page, increasing, sortByPrice, lowToHigh);
                } catch (error) {
                    console.log(error)
                }
            }
        },
        filter: {
            type: new GraphQLList(wineType),
            args: {
                title: { type: graphql.GraphQLString },
                country: { type: graphql.GraphQLString },
                price: { type: graphql.GraphQLInt },
                page: { type: graphql.GraphQLInt },
                increasing: { type: graphql.GraphQLBoolean },
                sortByPrice: { type: graphql.GraphQLBoolean },
                lowToHigh: { type: graphql.GraphQLBoolean } 
            },
            resolve: async (_,{title, country, price, page, increasing, sortByPrice, lowToHigh}) => {
                try {
                    return await filter(title, country, price, page, increasing, sortByPrice, lowToHigh);
                } catch (error) {
                    console.log(error)
                }
            }
        },
        documentCount: {
            type: graphql.GraphQLInt,
            args: {
                title: {type: graphql.GraphQLString }
            },
            resolve: async (_,{title}) => {
                try {
                    return await documentCount(title);
                } catch (error) {
                    console.log(error)
                }
            }
        },
        filterDocumentCount: {
            type: graphql.GraphQLInt,
            args: {
                title: {type: graphql.GraphQLString },
                country: {type: graphql.GraphQLString},
                price: {type: graphql.GraphQLInt},
                increasing: {type: graphql.GraphQLBoolean}
            },
            resolve: async (_,{title, country, price, increasing}) => {
                try {
                    return await filterDocumentCount(title, country, price, increasing);
                } catch (error) {
                    console.log(error)
                }
            }
        },

    },
}
)
// The graphql mutations that are possible
let mutationType = new graphql.GraphQLObjectType({
    name: 'Mutation',
    fields: {
        giveReview: {
            type: new GraphQLList(graphql.GraphQLString),
            args: {
                title: { type: graphql.GraphQLString },
                points: { type: graphql.GraphQLString },
            },
            resolve: (_, { title, points }) => {
                return giveReview(title, points);
            }
        }
    }
})

let schema = new graphql.GraphQLSchema({ query: queryType, mutation: mutationType })
// Runs the express server.
let app = express();

app.use(cors());

app.use('/graphql', graphqlHTTP({
    schema: schema,
    //rootValue: root,
    graphiql: true,
}))


app.listen(4000);
console.log("Running a GraphQL API server at http://localhost:4000/graphql")

// writes the review to the db.
async function giveReview(title, points) {
    try {
        let wines = db.useDb('it2810').collection('wines');
        wines.findOneAndUpdate({ title: title }, { $push: { user_reviews: points } });
        let review = "You gave " + title + " " + points + " points." + "\n" + "Thank you for your review!";

        let avgReviews = await getAverageReviews({ title }).then(response => response);

        let reviewResult = [];

        reviewResult.push(review);
        reviewResult.push(avgReviews[0]);
        reviewResult.push(avgReviews[1]);

        return reviewResult;

    } catch (error) {
        console.log(error);
    }

}

// calculates the average review of a wine.
async function getAverageReviews(title) {
    try {
        let wine = await getOne(title);

        let sum = 0;
        let avgWineRating = 0;
        for (let index in wine.user_reviews) {
            sum += parseInt(wine.user_reviews[index]);
        }

        avgWineRating = sum / wine.user_reviews.length;
        // Rounding to nearest 0.5.
        avgWineRating = Math.round(avgWineRating * 2) / 2;
        let ratingCount = wine.user_reviews.length + " reviews.";
        let avgAndCount = [];
        avgAndCount.push(avgWineRating);
        avgAndCount.push(ratingCount)

        return avgAndCount;
    } catch (error) {
        console.log(error);
    }

}


// Resets the database of user reviews.
function addUserReviews() {
    db.useDb('it2810').collection('wines').updateMany({}, { $set: { user_reviews: [] } });
}

//addUserReviews();

// gets one wine from db based on title.
async function getOne(title) {
    var res = null;

    return await db.useDb('it2810').collection('wines').findOne(title).then(
        function (doc) {
            res = doc;
            return res;
        }
    );
}

// Gets every wine in db but limits calls to 50 wines.
async function getAll() {
    let wines = null;
    let collection = db.useDb('it2810').collection('wines');
    wines = await collection.find().limit(50).toArray();
    return wines;
}



async function search(input){
    let wines = null;
    let collection = db.useDb('it2810').collection('wines');
    wines = await collection.find({title:{"$regex": input, "$options": "i"}}).limit(50).toArray();
    return wines;
}

async function searchPage(input, page, sortByPrice, lowToHigh){
    let wines = null;
    let collection = db.useDb('it2810').collection('wines');
    if(sortByPrice) {
        if(lowToHigh){
            wines = await collection.find({title:{"$regex": input, "$options": "i"}}).sort({price:1}).skip(page*50).limit(50).toArray();
        }else {
            wines = await collection.find({title:{"$regex": input, "$options": "i"}}).sort({price:-1}).skip(page*50).limit(50).toArray();
        }
    }else {
        wines = await collection.find({title:{"$regex": input, "$options": "i"}}).skip(page*50).limit(50).toArray();
    }
    return wines;
}

async function documentCount(input){
    let count = null;
    let collection = db.useDb('it2810').collection('wines');
    count = await collection.find({title:{"$regex": input, "$options": "i"}}).count();
    return count;
}

async function filterDocumentCount(input, country, price, increasing){
    let count = null;
    let collection = db.useDb('it2810').collection('wines');
    if(country==="" && price===-1){
        count = await collection.find({title:{"$regex": input, "$options": "i"}}).count();
    } else if(country==="") {
        if(increasing){
            count = await collection.find({title: {"$regex": input, "$options": "i"}, price: {$gte:price}}).count();    
        } else{
            count = await collection.find({title: {"$regex": input, "$options": "i"}, price: {$lte:price}}).count();    
        }
    } else if(price === -1) {
        count = await collection.find({title: {"$regex": input, "$options": "i"}, country: country}).count();
    } else {
        if(increasing){
            count = await collection.find({title: {"$regex": input, "$options": "i"}, country: country, price: {$gte:price}}).count();
        }else{
            count = await collection.find({title: {"$regex": input, "$options": "i"}, country: country, price: {$lte:price}}).count();
        }
    }
    return count;
}

async function filterCountry(input, country, page, sortByPrice, lowToHigh){
    let wines = null;
    let collection = db.useDb('it2810').collection('wines');

    if(sortByPrice) {
        if(lowToHigh){
            wines = await collection.find({title: {"$regex": input, "$options": "i"}, country: country}).sort({price:1}).skip(page*50).limit(50).toArray();
        }else {
            wines = await collection.find({title: {"$regex": input, "$options": "i"}, country: country}).sort({price:-1}).skip(page*50).limit(50).toArray();
        }
    }else {
        wines = await collection.find({title: {"$regex": input, "$options": "i"}, country: country}).skip(page*50).limit(50).toArray();
    }
    return wines;
}

async function filterPrice(input, price, page, increasing, sortByPrice, lowToHigh){
    let wines = null;
    let collection = db.useDb('it2810').collection('wines');
    if(increasing){
        if(sortByPrice) {
            if(lowToHigh){
                wines = await collection.find({title: {"$regex": input, "$options": "i"}, price: {$gte:price}}).sort({price:1}).skip(page*50).limit(50).toArray();
            }else {
                wines = await collection.find({title: {"$regex": input, "$options": "i"}, price: {$gte:price}}).sort({price:-1}).skip(page*50).limit(50).toArray();
            }
        }else {
            wines = await collection.find({title: {"$regex": input, "$options": "i"}, price: {$gte:price}}).skip(page*50).limit(50).toArray();
        }
    }else{
        if(sortByPrice) {
            if(lowToHigh){
                wines = await collection.find({title: {"$regex": input, "$options": "i"}, price: {$lte:price}}).sort({price:1}).skip(page*50).limit(50).toArray();
            }else {
                wines = await collection.find({title: {"$regex": input, "$options": "i"}, price: {$lte:price}}).sort({price:-1}).skip(page*50).limit(50).toArray();
            }
        }else {
            wines = await collection.find({title: {"$regex": input, "$options": "i"}, price: {$lte:price}}).skip(page*50).limit(50).toArray();
        }
    }
    return wines;
}

async function filterCountryAndPrice(input, country, price, page, increasing, sortByPrice, lowToHigh){
    let wines = null;
    let collection = db.useDb('it2810').collection('wines');
    if(increasing){
        if(sortByPrice) {
            if(lowToHigh){
                wines = await collection.find({title: {"$regex": input, "$options": "i"}, country: country, price: {$gte:price}}).sort({price:1}).skip(page*50).limit(50).toArray();
            }else {
                wines = await collection.find({title: {"$regex": input, "$options": "i"}, country: country, price: {$gte:price}}).sort({price:-1}).skip(page*50).limit(50).toArray();
            }
        }else {
            wines = await collection.find({title: {"$regex": input, "$options": "i"}, country: country, price: {$gte:price}}).skip(page*50).limit(50).toArray();
        }
    }else{
        if(sortByPrice) {
            if(lowToHigh){
                wines = await collection.find({title: {"$regex": input, "$options": "i"}, country: country, price: {$lte:price}}).sort({price:1}).skip(page*50).limit(50).toArray();
            }else {
                wines = await collection.find({title: {"$regex": input, "$options": "i"}, country: country, price: {$lte:price}}).sort({price:-1}).skip(page*50).limit(50).toArray();
            }
        }else {
            wines = await collection.find({title: {"$regex": input, "$options": "i"}, country: country, price: {$lte:price}}).skip(page*50).limit(50).toArray();
        }
    }
    return wines;

}

async function filter(input, country, price, page, increasing, sortByPrice, lowToHigh){
    let wines = null;
    if(country==="" && price === -1){
        wines = await searchPage(input, page, sortByPrice, lowToHigh);
    }else if (country === "") {
        wines = await filterPrice(input, price, page, increasing, sortByPrice, lowToHigh);
    }else if (price === -1){
        wines = await filterCountry(input, country, page, sortByPrice, lowToHigh);
    }else {
        wines = await filterCountryAndPrice(input, country, price, page, increasing, sortByPrice, lowToHigh);
    }
    return wines;
}

