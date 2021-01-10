const { GraphQLServer } = require("graphql-yoga");
const fetch = require("node-fetch");

const typeDefs = `
  type Query {
    getUsers: [User]
  }
 
  type Mutation {
    createUser(input: Input_Create_User): String!
  }
  
  input Input_Create_User {
    name: String,
    email: String,
    mobile: String,
    city: String
  }

  type User {
    id: String,
    name: String,
    email: String,
    mobile: String,
    city: String,
    login_time: Int
  }
`;

const resolveUsers = users => {
    const promises = users.map( user => {
        return url;
    });
    return Promise.all(promises);
};

const resolvers = {
    User : resolveUsers,
    Query: {
        getUsers: async() => {
            const response = await fetch(`http://localhost:3000/users`);
            return response.json();
        },
    },
    Mutation : {
        createUser : async (__,{input}) => {
            const body = {"name" : input.name,
            "email" : input.email,
            "mobile" : input.mobile,
            "city" : input.city };

           console.log("Body : " + JSON.stringify(body));
           console.log("Body : " + input.name);

            const response=   await fetch('http://localhost:3000/users', {
                    method: 'post',
                    body:    JSON.stringify(body),
                    headers: { 'Content-Type': 'application/json' },
                })
                
                return "Success" ;

           
        }
    }
};


const server = new GraphQLServer({ typeDefs, resolvers });
server.start(() => console.log("Server is running on localhost:4000"));