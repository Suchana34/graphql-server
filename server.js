'use strict'

//using Apollo server
const {ApolloServer,gql} = require('apollo-server');

//gql is a template which is used to build the type definition object

const port = process.env.PORT || 8080;


const typeDefs = gql`
    type Query{
        hellopeople: String
        listAccounts(status:Status): [Account!]!
    }

    type Account{
        name: String!
        status: Status
        
    }
     
    enum Status {
        ACTIVE
        INACTIVE
    }
`;

//we dont have a data source here, basically the data source is created by us. So let us define a data source let an array
const accounts = [
    {
        name: `Arjun`,
        status: `ACTIVE`
        
    },
    {
        name: `Bheem`,
        status: `INACTIVE`
    }
];

const resolvers = {
    //define the various methods on objects
    Query :{
        hellopeople(){
            return "hello from graphql";
        },
        listAccounts(_, args){
            const {status} = args;

            if(!status) return accounts
            
            return accounts.filter(a => a.status === status);
        }
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground: true, //it is a web app where we will test our graphql api
    tracing: true
});

server.listen(port).then(({url})=>{
    console.log(`listening on ${url}`);
});