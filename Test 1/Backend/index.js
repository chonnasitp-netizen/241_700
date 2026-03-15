const app = require('./app')
const { getConnection } = require('./config/db')

const port = process.env.PORT || 8000

app.listen(port, async () => {
  try{
  await getConnection()

  console.log('Database connected')

  console.log('http server run at ' + port)
  } catch (error) {
  console.error('Connected failed')  
  
  console.error(error)
  }
})
