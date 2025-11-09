const projectData = require("../data/projectData");
const sectorData = require("../data/sectorData");

let projects = [];

function initialize() {
  return new Promise((resolve, reject) => {
    if (sectorData && projectData) {
      projectData.forEach((element) => {
        let found = sectorData.find((x) => x.id === element.sector_id);
        element.sector = found.sector_name;
        projects.push(element);
      });

      resolve();
    } else {
      reject("Error: Cannot initialize");
    }
  });
}

function getAllProjects() {
  return new Promise((resolve, reject) => {
    if (projects.length > 0) {
      resolve(projects);
    } else {
      reject("Error: No projects available");
    }
  });
}

function getProjectById(projectId) {
  return new Promise((resolve, reject) => {
    let found = projects.find((x) => x.id == projectId);
    if (found) {
      resolve(found);
    } else {
      reject("Error: Unable to find requested project");
    }
  });
}

function getProjectsBySector(sector) {
  return new Promise((resolve, reject) => {
    let found = projects.filter((x) =>
      x.sector.toLowerCase().includes(sector.toLowerCase())
    );
    if (found.length !== 0) {
      resolve(found);
    } else {
      reject("Error: Unable to find requested project");
    }
  });
}

module.exports = {
  initialize,
  getAllProjects,
  getProjectById,
  getProjectsBySector,
};
