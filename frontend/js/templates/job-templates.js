export const jobTemplate = ({ company, title, location, date_posted, id }) => `
<li class="job-card card my-1" style="width: 18rem;">
<div class="card-header">${company}</div>
<div class="card-body">
<h5 class="card-title">${title}</h5>
<h6 class="card-subtitle mb-2 text-body-secondary">${location}</h6>
<h6 class="card-subtitle mb-2 text-body-secondary">
  Posted ${date_posted}
</h6>
<button class="btn btn-primary view-job-button" data-job-id="${id}">
  View Job
</button>
</div>
</li>`;

export const myJobsTemplate = ({
  company,
  title,
  location,
  date_posted,
  id,
}) => `
<li class="job-card card my-1" style="width: 18rem;" data-uid="${id}">
<div class="card-header">${company}</div>
<div class="card-body">
<h5 class="card-title">${title}</h5>
<h6 class="card-subtitle mb-2 text-body-secondary">${location}</h6>
<h6 class="card-subtitle mb-2 text-body-secondary">
  Posted ${date_posted}
</h6>
<button class="btn btn-primary delete-job" data-job-id="${id}">
  Delete Job
</button>
</div>
</li>`;

export const jobDetailsCardTemplate = ({
  title,
  company,
  location,
  date_posted,
  description,
  qualifications,
  id,
}) => `
<div class="card">
  <div class="card-body">
    <h3 class="card-title">${title}</h5>
    <h4 class="card-subtitle mb-2 text-body-secondary pb-3">${company}</h6>
    <h6 class="card-subtitle mb-2 text-body-secondary ">${location}</h6>
    <h6 class="card-subtitle mb-2 text-body-secondary pb-3">Posted: ${date_posted}</h6>

    <h5 class="card-subtitle mb-2">Description</h5>
    <p class="card-text">${description}</p>
    <h5 class="card-subtitle mb-2">Qualifications</h5>
    <p class="card-text">${qualifications}</p>
    <button class="btn btn-success save-job">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bookmark" viewBox="0 0 16 16">
        <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z" />
      </svg>
      Save Job
    </button>
  </div>
</div>`;
