/*********************************************************************************
* WEB322 – Assignment 1
* Name: Aashrawat Shrestha
* Student ID: 179413232
* Email: ashrestha73@myseneca.ca
*********************************************************************************/

const express = require("express");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");

const app = express();
const PORT = 8080;

const mealKitUtil = require("./modules/mealkit-util");


app.use(express.static("public"));
app.use(expressLayouts);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set("layout", "layouts/main");


// ROUTES

// HOME
app.get("/", (req, res) => {

    const allMealKits = mealKitUtil.getAllMealKits();
    const featured = mealKitUtil.getFeaturedMealKits(allMealKits);

    res.render("home", {
        featuredMealKits: featured
    });
});


// ON THE MENU
app.get("/on-the-menu", (req, res) => {

    const allMealKits = mealKitUtil.getAllMealKits();
    const categories = mealKitUtil.getMealKitsByCategory(allMealKits);

    res.render("on-the-menu", {
        categories: categories
    });

});


// SIGN UP
app.get("/sign-up", (req, res) => {

    res.render("sign-up");

});


// LOG IN
app.get("/log-in", (req, res) => {

    res.render("log-in");

});


// This use() will add an error handler function to
// catch all errors.
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send("Something broke!")
});


// *** DO NOT MODIFY THE LINES BELOW ***

// Define a port to listen to requests on.
const HTTP_PORT = process.env.PORT || 8080;

// Call this function after the http server starts listening for requests.
function onHttpStart() {
    console.log("Express http server listening on: " + HTTP_PORT);
}
  
// Listen on port 8080. The default port for http is 80, https is 443. We use 8080 here
// because sometimes port 80 is in use by other applications on the machine
app.listen(HTTP_PORT, onHttpStart);