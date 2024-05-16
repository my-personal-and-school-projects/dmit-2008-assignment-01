// your code goes here.
import { getJobs, postRequest } from "./api/jobs.js";
import {
  jobTemplate,
  jobDetailsCardTemplate,
} from "./templates/job-templates.js";

const searchJobsForm = document.querySelector("#search-jobs-form");
const searchedJobsContainer = document.querySelector("#searched-jobs");
const queryInput = document.querySelector("#query-input");
const jobDetailsCard = document.querySelector("#job-details-card");
const myJobsTab = document.querySelector("#my-jobs-tab");
const searchJobsTab = document.querySelector("#search-jobs-tab");
const toggleMyJobsTab = document.querySelector("#toggle-my-jobs-tab");
const toggleSearchJobsTab = document.querySelector("#toggle-search-jobs-tab");

const jobsList = await getJobs();
let myJobs = [];

searchJobsForm.addEventListener("submit", onSubmitSearchJobsForm);

async function onSubmitSearchJobsForm(e) {
  e.preventDefault();
  jobDetailsCard.innerHTML = "";
  let jobTitle = queryInput.value.toLowerCase().trim();
  const searchResults = await searchJobs(jobTitle);
  displayJobs(searchResults);
  addJobViewButtonEvents();
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
  addJobViewButtonEvents();
}
displayAllJobs();

async function viewJobDetails(jobId) {
  const jobDetails = jobsList.find((job) => String(job.id) === String(jobId));

  console.log(jobDetails);
  console.log(jobsList);

  if (jobDetails) {
    const {
      title,
      company,
      location,
      date_posted,
      description,
      qualifications,
    } = jobDetails;
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

function addJobViewButtonEvents() {
  document.querySelectorAll(".view-job-button").forEach((button) => {
    button.addEventListener("click", async (event) => {
      const jobId = event.target.dataset.jobId;
      console.log("Job ID:", jobId);
      await viewJobDetails(jobId);
    });
  });
}

//BONUS FUNCTIONALITY

toggleMyJobsTab.addEventListener("click", (event) => {
  event.preventDefault();
  switchTabs(myJobsTab);
});

toggleSearchJobsTab.addEventListener("click", (event) => {
  event.preventDefault();
  switchTabs(searchJobsTab);
});

function switchTabs(tab) {
  myJobsTab.classList.add("d-none");
  searchJobsTab.classList.add("d-none");
  tab.classList.remove("d-none");
}
