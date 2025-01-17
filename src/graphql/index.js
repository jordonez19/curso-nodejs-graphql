const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginLandingPageLocalDefault } = require('apollo-server-core');

const typeDefs = `
    type Query {
    hello: String
    getPerson(name:String!, age: Int): String
    getInt:Int
    getFloat(price:Float!):Float
    getBoolean:Boolean
    getID:ID
    getArray:[Int!]!
}	
`

const resolvers = {
    Query: {
        hello: () => 'Hola Xavi',
        getPerson: (_, args) => `Hello my name is ${args.name} and I have ${args.age} `,
        getInt: () => 5,
        getFloat: (_, args) => args.price,
        getBoolean: () => true,
        getID: () => '515asd41f65as1d685',
        getArray: () => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    }
}
/* 
    ! no puede retornar nulos
    post, put, delete = mutations
    get = querys
    todo retorna siempre 201 
    todo se maneja con tipados
*/

const useGraphql = async (app) => {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        playground: true,
        plugins: [
            ApolloServerPluginLandingPageLocalDefault()
        ]
    })
    await server.start();
    server.applyMiddleware({ app });
}


module.exports = useGraphql;
