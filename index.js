require('dotenv').config()
const mongoose = require("mongoose")
const express = require("express")

// const { json } = require("express")

const personRoutes = require("./Routes/personRoutes")

const App = express()

// App.use(express.urlencoded({
//     extended: json
// }))

App.use(express.json())

App.get( "/", (req, res) => {
    return res.status(200).json({message: "Ok!"})
})

App.use("/person", personRoutes)



// to supress warning
mongoose.set('strictQuery', true);
mongoose.connect(`mongodb+srv://${process.env.DBUSER}:${process.env.DBPASS}@cluster0.ry5ianr.mongodb.net/?retryWrites=true&w=majority`)
.then( () => {
    console.log("MongoDB is connected!")
    App.listen( 3000, () => {
        console.log("Server is up!", Date())
    })
})
.catch( (error) => {
    console.log(error)
})

