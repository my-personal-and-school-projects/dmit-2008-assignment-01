// your code goes here.

const BASE_URL = "http://localhost:3000";
const JOBS_ENDPOINT = "/jobs";
const MY_JOBS_ENDPOINT = "/saved-jobs";
//const MOCKAPI_URL = "https://660f5012356b87a55c512819.mockapi.io/api/v1";

//Make a GET request to the API to get all jobs
export async function getJobs(endpoint) {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`);

    if (!response.ok) {
      throw new Error("No jobs found");
    }
    const data = await response.json();

    //console.table(data); //Log Data for verification purposes
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getJobSearch(query) {
  try {
    const response = await fetch(`${BASE_URL}${JOBS_ENDPOINT}?q=${query}`);

    if (!response.ok) {
      throw new Error("No jobs found");
    }
    const data = await response.json();

    console.table(data); //Log Data for verification purposes
    return data;
  } catch (error) {
    throw error;
  }
}

getJobSearch("software");

//Make a GET request to the API to get jobs by the Id
export async function getJobById(jobId) {
  try {
    const response = await fetch(`${BASE_URL}${JOBS_ENDPOINT}/${jobId}`);

    if (!response.ok) {
      throw new Error("No jobs found");
    }
    const data = await response.json();

    //console.table(data); //Log Data for verification purposes
    return data;
  } catch (error) {
    throw error;
  }
}

//Make a post request to the API using Async
/* export async function postRequest(jobId) {
  //Create request header
  const requestHeader = new Headers();
  requestHeader.append("content-type", "application/json");

  //Format the object as JSON
  const payload = JSON.stringify({ jobId });

  //Request object
  const requestObject = {
    method: "POST",
    headers: requestHeader,
    body: payload,
    redirect: "follow",
  };

  const res = await fetch(`${BASE_URL}${MY_JOBS_ENDPOINT}`, requestObject);
  console.log("fav", await res.json());
} */

//Make a post request to the API using fetch

export async function postRequest(jobId) {
  const newJob = { jobId };

  fetch(`${BASE_URL}${MY_JOBS_ENDPOINT}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newJob),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error("Failed to save job");
    })
    .then((savedJob) => {
      console.log("Saved Job:", savedJob);
      // Do something with the saved job if necessary
    })
    .catch((error) => {
      console.error("Error:", error);
      // Handle error
    });
}

//Make a DELETE request to the API
export async function deleteRequest(jobId) {
  const res = await fetch(`${BASE_URL}${MY_JOBS_ENDPOINT}/${jobId}`, {
    method: "DELETE",
  });
  return await res.json();
}
