// your code goes here.
import { getJobs } from "./api/jobs.js";
import { jobTemplate } from "./templates/job-templates.js";

const searchJobsForm = document.querySelector("#search-jobs-form");
const searchedJobsContainer = document.querySelector("#searched-jobs");
const queryInput = document.querySelector("#query-input");

const jobsList = await getJobs();
let myJobs = [];

searchJobsForm.addEventListener("submit", onSubmitSearchJobsForm);

async function onSubmitSearchJobsForm(e) {
  e.preventDefault();
  let jobTitle = queryInput.value.toLowerCase().trim();
  const searchResults = await searchJobs(jobTitle);
  displayJobs(searchResults);
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
}
displayAllJobs();
