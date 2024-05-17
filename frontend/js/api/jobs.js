// your code goes here.

const BASE_URL = "http://localhost:3000";
const JOBS_ENDPOINT = "/jobs";
const MY_JOBS_ENDPOINT = "/saved-jobs";

//Make a GET request to the API to get all jobs
export async function getJobs() {
  try {
    const response = await fetch(`${BASE_URL}${JOBS_ENDPOINT}`);

    if (!response.ok) {
      throw new Error("No data found");
    }
    const data = await response.json();

    //console.table(data); //Log Data for verification purposes
    return data;
  } catch (error) {
    throw error;
  }
}

//Make a GET request to the API to get jobs by the Id
export async function getJobById(jobId) {
  try {
    const response = await fetch(`${BASE_URL}${JOBS_ENDPOINT}/${jobId}`);

    if (!response.ok) {
      throw new Error("No data found");
    }
    const data = await response.json();

    //console.table(data); //Log Data for verification purposes
    return data;
  } catch (error) {
    throw error;
  }
}
//Make a post request to the API
export async function postRequest(jobId) {
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
}

//Make a DELETE request to the API
export async function deleteRequest(jobId) {
  const res = await fetch(`${BASE_URL}${MY_JOBS_ENDPOINT}${jobId}`, {
    method: "DELETE",
  });
  return await res.json();
}
