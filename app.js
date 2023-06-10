import express from "express";
import {} from "dotenv/config";
import routes from "./routes/routes.js"
// import {} from "./db/connect.js"
import connectDB from "./db/connect.js"; 
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json())
app.use("/api/v1/employees", routes);

const PORT = process.env.PORT || 5000
// app.listen(PORT, () => console.log(`Currently listeing on port: ${PORT}`));

const init = async () => {
    try {
        await connectDB(process.env.DB)
        console.log("Connected to the database...")
        app.listen(PORT, () => console.log(`It's listening on port: ${PORT}`))
    } catch (err) {
        console.log(err)
    }
}
init()