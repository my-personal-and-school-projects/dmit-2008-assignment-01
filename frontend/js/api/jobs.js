// your code goes here.

const BASE_URL = "http://localhost:3000/jobs";

export async function getJobs() {
  try {
    const response = await fetch(`${BASE_URL}`);

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
