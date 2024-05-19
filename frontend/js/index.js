// your code goes here.
import { getJobs, postRequest, getJobById, deleteRequest } from "./api/jobs.js";
import {
  jobTemplate,
  jobDetailsCardTemplate,
  myJobsTemplate,
} from "./templates/job-templates.js";

const JOBS_ENDPOINT = "/jobs";
const MY_JOBS_ENDPOINT = "/saved-jobs";

const searchJobsForm = document.querySelector("#search-jobs-form");
const searchedJobsContainer = document.querySelector("#searched-jobs");
const myJobsContainer = document.querySelector("#my-jobs");
const queryInput = document.querySelector("#query-input");
const jobDetailsCard = document.querySelector("#job-details-card");
const myJobsTab = document.querySelector("#my-jobs-tab");
const searchJobsTab = document.querySelector("#search-jobs-tab");
const toggleMyJobsTab = document.querySelector("#toggle-my-jobs-tab");
const toggleSearchJobsTab = document.querySelector("#toggle-search-jobs-tab");
const saveFeedbackContainer = document.querySelector(
  "#save-feedback-container"
);
const deleteFeedbackContainer = document.querySelector(
  "#delete-feedback-container"
);

const feedbackMessage = document.querySelector("#feedback-message");

//Get the jobs data
const jobsList = await getJobs(JOBS_ENDPOINT);

//Get the saved-jobs data
const savedJobsList = await getJobs(MY_JOBS_ENDPOINT);

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

//Get job details by the id
async function viewJobDetails(jobId) {
  saveFeedbackContainer.classList.add("d-none");

  const jobDetails = await getJobById(jobId);

  console.log(jobDetails);

  if (jobDetails) {
    const {
      title,
      company,
      location,
      date_posted,
      description,
      qualifications,
      id,
    } = jobDetails;
    jobDetailsCard.innerHTML = jobDetailsCardTemplate({
      title,
      company,
      location,
      date_posted,
      description,
      qualifications,
      id,
    });
  }
  addSaveJobButtonEvents(jobId);
}

//Add addEventListener to the view-job-buttons on rendering
function addJobViewButtonEvents() {
  document.querySelectorAll(".view-job-button").forEach((button) => {
    button.addEventListener("click", async (event) => {
      event.preventDefault();
      const jobId = event.target.dataset.jobId;
      console.log("Job ID:", jobId);
      await viewJobDetails(jobId);
    });
  });
}

//Switch between tabs
function switchTabs(tab) {
  myJobsTab.classList.add("d-none");
  searchJobsTab.classList.add("d-none");
  tab.classList.remove("d-none");
}

toggleMyJobsTab.addEventListener("click", (event) => {
  event.preventDefault();
  switchTabs(myJobsTab);
  renderMyJobs(myJobs);
});

toggleSearchJobsTab.addEventListener("click", (event) => {
  event.preventDefault();
  switchTabs(searchJobsTab);
});

//Make a store to contain the bookmarked jobs
let myJobs = [];

//Add the selected job to the bookmarked jobs store
async function addMyJobs(jobId) {
  const myJob = jobsList.find((job) => String(job.id) === String(jobId));

  if (myJob && !myJobs.some((favJob) => String(favJob.id) === String(jobId))) {
    myJobsContainer.innerHTML = "";

    myJobs.push(myJob);
    console.log("Added to bookmarked jobs:", myJob);
    console.log(myJobs);

    //saveJob(jobId); //call POST request
  } else {
    feedbackMessage.textContent = "Job already in bookmarks";
    console.log(myJob, "already exists");
  }
}

//Add addEventListener to the save-job buttons on rendering
function addSaveJobButtonEvents(jobId) {
  document.querySelectorAll(".save-job").forEach((button) => {
    button.addEventListener("click", async (event) => {
      event.preventDefault();
      console.log("Job ID:", jobId);
      await addMyJobs(jobId);
      saveFeedbackContainer.classList.remove("d-none");
    });
  });
}

//Render bookmarked when changing tabs
function renderMyJobs(listOfJobs) {
  myJobsContainer.innerHTML = ""; //Clear container

  if (listOfJobs.length > 0) {
    listOfJobs.forEach(({ company, title, location, date_posted, id }) => {
      myJobsContainer.insertAdjacentHTML(
        "beforeend",
        myJobsTemplate({
          company,
          title,
          location,
          date_posted,
          id,
        })
      );
    });
  }
  addDeleteJobButtonEvents();
}

//BONUS FUNCTIONALITY
function saveJob(jobId) {
  postRequest(jobId);
}

//FUNCTIONALITY CHALLENGES

function deleteJob(jobId) {
  deleteRequest(jobId);
}

//Remove the selected job from the bookmarked jobs store
async function removeMyJob(jobId) {
  const jobIndex = myJobs.findIndex((job) => String(job.id) === String(jobId));

  //Find saved-job id
  const savedJobId = savedJobsList.find(
    (job) => String(job.jobId) === String(jobId)
  );
  console.log("job to remove", savedJobId.id);

  if (jobIndex !== -1) {
    const removedJob = myJobs.splice(jobIndex, 1)[0];

    // Remove the job from the DOM
    const jobElement = myJobsContainer.querySelector(`[data-uid="${jobId}"]`);

    if (jobElement) {
      jobElement.remove();
    }

    deleteJob(String(savedJobId.id));
    console.log("Removed Job:", removedJob.title);
    console.log(myJobs);
  }
}

//Add addEventListener to the delete-job buttons on rendering
function addDeleteJobButtonEvents() {
  document.querySelectorAll(".delete-job").forEach((button) => {
    button.addEventListener("click", async (event) => {
      event.preventDefault();
      const jobId = event.target.dataset.jobId;
      console.log("Job ID:", jobId);
      removeMyJob(jobId);
      deleteFeedbackContainer.classList.remove("d-none");
    });
  });
}
