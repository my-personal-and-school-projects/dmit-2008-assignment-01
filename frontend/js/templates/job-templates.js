export const jobTemplate = ({ company, title, location, date_posted, id }) => `
<li class="job-card card my-1" style="width: 18rem;">
<div class="card-header">${company}</div>
<div class="card-body">
<h5 class="card-title">${title}</h5>
<h6 class="card-subtitle mb-2 text-body-secondary">${location}</h6>
<h6 class="card-subtitle mb-2 text-body-secondary">
  Posted ${date_posted}
</h6>
<button class="btn btn-primary view-job-button" job-data-id="${id}">
  View Job
</button>
</div>
</li>`;
