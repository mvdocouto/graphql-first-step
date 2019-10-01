const express = require('express');
const { 
  ApolloServer, 
  makeExecutableSchema,
  gql 
} = require('apollo-server-express');


const typeDefs = gql`
  type Book {
    title: String
    author: Author  
  }

  type Author {
    name: String
    books: [Book]
  }

  type Query {
    getBooks: [Book]
    getAuthors: [Author]
  }
`;


const books = [
    {
      title: 'Harry Potter and the Chamber of Secrets',
      author: 'J.K. Rowling',
    },
    {
      title: 'Jurassic Park',
      author: 'Michael Crichton',
    },
];


const authors = [
  {
    books: ['Harry Potter and the Chamber of Secrets'],
    name: 'J.K. Rowling',
  },
  {
    books: ['Jurassic Park'],
    name: 'Michael Crichton',
  },
];


const resolvers = {
    Query: {
      getBooks: () => books,
      getAuthors: () => authors,
    },
};


const server = new ApolloServer({
  typeDefs, resolvers
});

const app = express();
server.applyMiddleware({ app });
app.listen({ port: 4000 }, () => {
    console.log(`🚀 Server ready at http://localhost:4000`)
});
// server.listen().then(({ url }) => {
//     console.log(`🚀  Server ready at ${url}`);
//   });
