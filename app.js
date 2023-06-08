import express from "express";
const app = express();
const port = 5000;

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile("index.html", {root: "public"});
});

app.listen(port, () => {
    console.log("The server is successfully listening");
});