import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import schema from './graphql/schema'

const PORT = 8081
const app = express()

app.use(cors())
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }))
app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

app.listen(PORT)

console.log(`Started on ${PORT}, graphql at /graphql, GraphiQL at /graphiql`)
