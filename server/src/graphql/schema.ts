import { makeExecutableSchema } from 'graphql-tools';
import typeDefs from './typedefs'
import resolvers from './resolvers'

export default makeExecutableSchema({ typeDefs, resolvers })
