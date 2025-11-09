/********************************************************************************
 * WEB322 – Assignment 02
 *
 * I declare that this assignment is my own work in accordance with Seneca's
 * Academic Integrity Policy:
 *
 * https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
 *
 * Name: Dorothy Yu Student ID: 036534154 Date: November 8, 2025
 *
 ********************************************************************************/

const express = require("express");
const path = require("path");
const projectData = require("./modules/projects");

const app = express();
const port = 3000;

// gives server access to ejs
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// gives /css/main.css
app.use(express.static(__dirname + '/public'));

// initializes projectData
projectData
  .initialize()
  .catch((err) => res.send(err));

// routes
app.get("/", (req, res) => {
  res.render("home");
});

// about
app.get("/about", (req, res) => {
  res.render("about");
});

// projects
app.get("/solutions/projects", (req, res) => {
  if (req.query.sector) {
    projectData
      .getProjectsBySector(req.query.sector)
      .then((data) => res.render("projects", {projects: data}))
      .catch((err) => res.status(404).render("404", {message: "No projects found for sector: " + req.query.sector}));
  }
  else {
    projectData
      .getAllProjects()
      .then((data) => res.render("projects", {projects: data}))
      .catch((err) => res.status(404).render("404", {message: "No projects found."}));
  }
});

// id
app.get("/solutions/projects/:id", (req, res) => {
  projectData
    .getProjectById(req.params.id)
    .then((data) => res.render("project", {project: data}))
    .catch((err) => res.status(404).render("404", {message: "Unable to find requested project."}));
});

// 404
app.use((req, res, next) => {
  res.status(404).render("404", {message: "I'm sorry, we're unable to find what you're looking for"});
});

app.listen(port, () => {
  console.log(`server listening on: ${port}`);
});