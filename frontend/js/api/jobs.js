// your code goes here.

const BASE_URL = "http://localhost:3000";
const JOBS_ENDPOINT = "/jobs";
const MY_JOBS_ENDPOINT = "/saved-jobs";

//Make a GET request to the API
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

//Make a POST request to the API
export async function postRequest(job) {
  //Create request header
  const requestHeader = new Headers();
  requestHeader.append("content-type", "application/json");

  //Format the object as JSON
  const payload = JSON.stringify(job);

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
