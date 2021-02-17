const searchUrl = `https://remotive.io/api/remote-jobs?search=`
const categoryUrl = `https://remotive.io/api/remote-jobs?category=`
const categoriesUrl = `https://remotive.io/api/remote-jobs/categories`

const main = document.getElementById('main');
const pagination = document.getElementById('pagination');
const form = document.getElementById('form');
const selectform = document.getElementById('selectForm');
const select = document.getElementById('select');
const search = document.getElementById('search');
const jobPopup = document.getElementById('job-popup');
const jobInfoEl =document.getElementById('job-info')
const bodyEl = document.getElementById('body');
const categoryBtn = document.getElementById('categoryBtn')
const categoryMenu = document.getElementById('categoryMenu')

getJobs('json.json');



let jobs = []
let jobsPerPage = 12;
let currentPage = 1;

async function getCategories(url) {
    const resp = await fetch(url);
    const respData = await resp.json();
    console.log(" category:" + respData.jobs);
}

async function getJobs(url){
    const resp = await fetch(url);
    const respData = await resp.json();
    console.log(respData.jobs)
showJobs(respData.jobs)
jobs = respData.jobs
// document.write(respData.jobs)
}
function showCategories(categories) {
    categories.map(catgory => {

    })
}

function showJobs(jobs) {

  
    main.innerHTML = '';
   
        jobs.slice(0,jobsPerPage).map(job =>{
          
            const Job = document.createElement('div');
       Job.classList.add('jobCard')
            
        Job.innerHTML = `
        <div id="" class="card overflow-hidden shadow-lg rounded-lg h-90 w-60 md:w-80  m-auto">
        <div class="w-full block h-full">
            <div class="bg-white dark:bg-gray-800 w-full p-4">
              
                <p class="cursor-pointer text-gray-800 title capitalize dark:text-white text-xl font-medium mb-2">
                    ${job.title}
                </p>
                <p class="text-gray-500 font-semibold dark:text-gray-300  text-md">
               ${job.category}
        </p>
        <p class="text-gray-500 font-semibold dark:text-gray-300  text-md">
        ${job.company_name}
 </p>
                <p class="text-gray-500 dark:text-gray-300 font-light text-md">
               ${job.job_type}
                </p>
                <div class="flex items-center mt-4">
                   
                    <div class="flex flex-col justify-between  text-sm">
                        <p class="text-gray-800 dark:text-white">
                        </p>
                        <p class="text-gray-400 dark:text-gray-300 date">
                       
                        </p>
                       

                    </div>
                </div>
            </div>
        </div>
    </div>
        
        `;

    const getInfo = Job.querySelector('.card .title');

    getInfo.addEventListener('click', () =>{
        showJobDetails(job);

        console.log('show info');
    })
      
    main.appendChild(Job)
    
    })
}
        
function changeData(index) {
    let showData = jobs.slice((index - 1)* jobsPerPage , index * jobsPerPage)
    document.getElementById('main').innerHTML = ''
    showData.map((job) =>{
        const JobEl = document.createElement('div');
        JobEl.classList.add('jobCard')
             
         JobEl.innerHTML = `
         <div id="" class="card overflow-hidden shadow-lg rounded-lg h-90 w-60 md:w-80  m-auto">
         <div class="w-full block h-full">
             <div class="bg-white dark:bg-gray-800 w-full p-4">
               
                 <p class="cursor-pointer text-gray-800 title capitalize dark:text-white text-xl font-medium mb-2">
                     ${job.title}
                 </p>
                 <p class="text-gray-500 font-semibold dark:text-gray-300  text-md">
                ${job.category}
         </p>
         <p class="text-gray-500 font-semibold dark:text-gray-300  text-md">
         ${job.company_name}
  </p>
                 <p class="text-gray-500 dark:text-gray-300 font-light text-md">
                ${job.job_type}
                 </p>
                 <div class="flex items-center mt-4">
                    
                     <div class="flex flex-col justify-between  text-sm">
                         <p class="text-gray-800 dark:text-white">
                         </p>
                         <p class="text-gray-400 dark:text-gray-300 date">
                        
                         </p>
                        
 
                     </div>
                 </div>
             </div>
         </div>
     </div>
         
         `;
         
    const getInfo = JobEl.querySelector('.card .title');

    getInfo.addEventListener('click', () =>{
        showJobDetails(job);

        console.log('show info');
    })
      
    main.appendChild(JobEl);
    });
    currentPage = index
   
}

  function next() {
      if (currentPage < 10) {
changeData(currentPage + 1)
          console.log('working');
      }
  }

  function prev() {
      if (currentPage > 1) {
          changeData(currentPage - 1)
      }
  }


  function showJobDetails(job) {

    jobInfoEl.innerHTML =""
      const jobEl = document.createElement('div')
    jobEl.innerHTML =`
    <div class="info bg-white dark:bg-gray-800 max-w-7xl m-auto px-8 mt-4">
    <div class="relative w-full overflow-hidden mx-auto py-6 px-4 sm:px-6 lg:py-6 lg:px-8 z-20">
    <button class="close-popup underline cursor-pointer bg-transparent text-xl top-4 right-8 focus:outline-none ">
    
  Back to home
    
    </i></button>
    <div class="mt-3">
    <div class="company-logo bg-gray-200 h-60 flex justify-center items-center rounded-md">
        <img src='${job.company_logo_url ? job.company_logo_url : "https://via.placeholder.com/150/?text=company logo"}' class="rounded-full" />

         
    </div>
  </div>
       
  <div class="details mt-3 flex flex-wrap lg:flex-nowrap">
  
  <div class="w-full lg:w-3/6">
  <h2 class=" mb-3 text-lg font-bold  text-black dark:text-white sm:text-3xl">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-8 inline-flex">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
</svg> Job description
              
             
          </h2>
         
        <p class="text-base my-3">
        <span class="block">
              ${job.description}
              </span>
        </p>


  </div>
 
        <div class="overview  max-h-80 w-full lg:w-2/5 mt-3 lg:mt-0 lg:ml-4">
            <div class="border rounded-md p-6">
                <h2 class="text-xl font-semibold ">Job Overview</h2>
                
    
        <ul class="divide-y divide-gray-200">
        <li>
               
        <div class="flex items-center py-4 justify-between">
            <p class="text-lg capitalize font-medium text-gray-700 dark:text-white md:truncate">
                title
            </p>
            <div class="ml-2 flex-shrink-0 flex">
                <p class="px-2 inline-flex capitalize font-medium text-lg rounded-full ">
                ${job.title}
                </p>
            </div>
        </div>
        
  

        </li>
            <li>
               
                        <div class="flex items-center py-4 justify-between">
                            <p class="text-lg capitalize font-medium text-gray-700 dark:text-white md:truncate">
                                Job type
                            </p>
                            <div class="ml-2 flex-shrink-0 flex">
                                <p class="px-2 inline-flex capitalize font-medium text-lg text-indigo-400 rounded-full ">
                                ${job.job_type}
                                </p>
                            </div>
                        </div>
                        
                  
            
            </li>
            <li>
               
            <div class="flex items-center py-4 justify-between">
                <p class="text-lg capitalize font-medium text-gray-700 dark:text-white md:truncate">
                    Job Category
                </p>
                <div class="ml-2 flex-shrink-0 flex">
                    <p class="px-2 inline-flex capitalize font-medium text-lg rounded-full ">
                    ${job.category}
                    </p>
                </div>
            </div>
            
      

            </li>
            <li>
               
            <div class="flex items-center py-4 justify-between">
                <p class="text-lg capitalize font-medium text-gray-700 dark:text-white md:truncate">
                   Salary
                </p>
                <div class="ml-2 flex-shrink-0 flex">
                    <p class="px-2 inline-flex capitalize font-medium text-lg rounded-full ">
                    ${job.salary ? job.salary : "Not available"}
                    </p>
                </div>
            </div>
            
      

            </li>
            <li>
               
            <div class="flex items-center py-4 justify-between">
                <p class="text-lg capitalize font-medium text-gray-700 dark:text-white md:truncate">
                   posted
                </p>
                <div class="ml-2 flex-shrink-0 flex">
                    <p class="px-2 inline-flex capitalize font-medium text-lg rounded-full ">
                    ${job.publication_date}
                    </p>
                </div>
            </div>
            
      

            </li>
           
            <li>
               
            <div class="flex items-center py-4 justify-between">
                <p class="text-lg capitalize font-medium text-gray-700 dark:text-white md:truncate">
                    location
                </p>
                <div class="ml-2 flex-shrink-0 flex">
                    <p class="px-2 inline-flex capitalize font-medium text-lg rounded-full ">
                    ${job.candidate_required_location}
                    </p>
                </div>
            </div>
            
      

            </li>
            <li>
               
            <div class="flex  py-4 justify-between">
               
            <div class="p-4 w-full mx-auto">
            <a href="${job.url}" target="_blank" class="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
              Apply here
            </a>
        </div>
            </div>
            
      

            </li>
          
        </ul>
       
  

            
            </div>
         
        </div>
         </div>
      </div>
      </div
      </div>
    
    
    `;

    const closePop = jobEl.querySelector('.info .close-popup');

    closePop.addEventListener('click', () =>{
        jobPopup.classList.add('hide')
        bodyEl.classList.remove('hide')
        console.log('close');
    })
    // closePop.classList.add('hide');
    // console.log('close');
jobInfoEl.appendChild(jobEl);
jobPopup.classList.remove('hide')
bodyEl.classList.add('hide')
  }

form.addEventListener('submit', (e) =>{
    e.preventDefault();
    const searchTerm = search.value;

    if (searchTerm) {
        getJobs(searchUrl + searchTerm)
        search.value = '';
      
    }
})

selectform.addEventListener('click', () =>{
   
    const categoryTerm = select.value;
    console.log(categoryTerm);
if (categoryTerm) {
    getJobs(categoryUrl + categoryTerm);
}

})

getCategories(categoriesUrl);