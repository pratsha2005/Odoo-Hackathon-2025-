import dotenv from 'dotenv'
import { app } from './app.js'
import connectDB from './db/db.js'

dotenv.config({
    path: './.env'
})

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is listening on port: ${process.env.PORT || 8000}`)
    })
})
.catch((err) => {
    console.log("Error in connecting database: ", err)
})