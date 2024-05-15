// your code goes here.
import { getJobs } from "./api/jobs.js";
import {
  jobTemplate,
  jobDetailsCardTemplate,
} from "./templates/job-templates.js";

const searchJobsForm = document.querySelector("#search-jobs-form");
const searchedJobsContainer = document.querySelector("#searched-jobs");
const queryInput = document.querySelector("#query-input");
const jobDetailsCard = document.querySelector("#job-details-card");

const jobsList = await getJobs();
let myJobs = [];

searchJobsForm.addEventListener("submit", onSubmitSearchJobsForm);

async function onSubmitSearchJobsForm(e) {
  e.preventDefault();
  let jobTitle = queryInput.value.toLowerCase().trim();
  const searchResults = await searchJobs(jobTitle);
  displayJobs(searchResults);
  addButtonEvent();
}

//Display the job search results
function displayJobs(searchResults) {
  searchedJobsContainer.innerHTML = "";

  if (searchResults.length === 0) {
    searchedJobsContainer.innerHTML = `
    <div class="text-dark">No Results Found</div>
    `;
  } else {
    searchResults.forEach(({ company, title, location, date_posted, id }) => {
      searchedJobsContainer.insertAdjacentHTML(
        "beforeend",
        jobTemplate({
          company,
          title,
          location,
          date_posted,
          id,
        })
      );
    });
  }
}

//Search for jobs by title based on user input
async function searchJobs(jobTitle) {
  const query = jobTitle;
  return jobsList.filter((job) => job.title.toLowerCase().includes(query));
}

//Display all jobs on init
async function displayAllJobs() {
  searchedJobsContainer.innerHTML = "";

  if (jobsList.length === 0) {
    searchedJobsContainer.innerHTML = `
        <div class="text-dark">No Results Found</div>
        `;
  } else {
    jobsList.forEach(({ company, title, location, date_posted, id }) => {
      searchedJobsContainer.insertAdjacentHTML(
        "beforeend",
        jobTemplate({
          company,
          title,
          location,
          date_posted,
          id,
        })
      );
    });
  }
  addButtonEvent();
}
displayAllJobs();

async function viewJobDetails(jobId) {
  const jobDetails = jobsList.find((job) => job.id === jobId);

  if (jobDetails) {
    jobDetailsCard.innerHTML = jobDetailsCardTemplate({
      title,
      company,
      location,
      date_posted,
      description,
      qualifications,
    });
  }
}

const addButtonEvent = () => {
  document.querySelectorAll(".view-job-button").forEach((button) => {
    button.addEventListener("click", async (event) => {
      const jobId = event.target.dataset.id;
      console.log("Job ID:", jobId);
      await viewJobDetails(jobId);
    });
  });
};
