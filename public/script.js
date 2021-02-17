searchUrl = (city) => `https://tripadvisor1.p.rapidapi.com/locations/search?query=${city}&location_id=1&limit=30&sort=relevance&offset=0&lang=en_US&currency=USD&units=km`;

hotelUrl = (id, date) => `https://tripadvisor1.p.rapidapi.com/hotels/list?location_id=${id}&adults=1&checkin=${date}&rooms=1&nights=2&offset=0&currency=USD&limit=30&order=asc&lang=en_US&sort=recommended`


const options ={
    "method": "GET",
	"headers": {
		"x-rapidapi-key": "17b855ee98mshc0176862117846ep146a41jsnf890bd4f02d6",
		"x-rapidapi-host": "tripadvisor1.p.rapidapi.com"
	}
}
const form = document.getElementById('form');
const main = document.getElementById('main');
const search = document.getElementById('search')
const searchHotel = document.getElementById('searchHotel')

const place = document.getElementById('place')
const hotelBtn = document.getElementById('hotelBtn')
const hotelSrch = document.getElementById('hotelSrch');
const hotelForm = document.getElementById('hotelForm')

async function getSearchLocation(city){
    const resp = await fetch(searchUrl(city), options);
    const respData = await resp.json();

    console.log(respData);
    locations(respData.data)
}


async function getHotels(id, date) {
    const resp = await fetch(hotelUrl(id, date) , options);
    const respData = await resp.json();
    console.log(respData);
}


function getHotelsId(id, date) {
    console.log('working');
}

const locations = function showDetails(datas) {
    main.innerHTML = '';
    datas.map(item =>{
        const loc_id = item.result_object.location_id
        const placesEl = document.createElement('div');
   
        
    placesEl.innerHTML = `
    <div class="overflow-hidden shadow-lg rounded-lg h-90 w-60 md:w-80 cursor-pointer m-auto">
    <a href="#" class="w-full block h-full">
        <img alt="blog photo" src="${item.result_object.photo.images.medium.url}" class="max-h-40 w-full object-cover"/>
        <div class="bg-white dark:bg-gray-800 w-full p-4">
          
            <p class="text-gray-800 capitalize dark:text-white text-xl font-medium mb-2">
                ${item.result_type}
            </p>
            <p class="text-gray-500 font-semibold dark:text-gray-300  text-md">
            ${item.result_object.name ? item.result_object.name  :"" }
           
    </p>
            <p class="text-gray-500 dark:text-gray-300 font-light text-md">
                    ${item.result_object.address ? item.result_object.address : " Not Available"}
            </p>
            <div class="flex items-center mt-4">
               
                <div class="flex flex-col justify-between ml-4 text-sm">
                    <p class="text-gray-800 dark:text-white">
                        ${item.result_object.location_id}
                    </p>
                    <p class="text-gray-400 dark:text-gray-300">
                        20 mars 2029 - 6 min read
                    </p>
                </div>
            </div>
        </div>
    </a>
</div>
    
    `
main.appendChild(placesEl)

})
}

form.addEventListener('submit', (e) =>{
    e.preventDefault();
    const location = search.value;

    if(location){
        getSearchLocation(location);
        console.log(location);
        search.value ='';
        place.innerText =location
    }
})

hotelBtn.addEventListener('click', ()=>{
    main.style.display ='none';
    hotelSrch.classList.toggle('hidden')
})

hotelForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const  date = searchHotel.value;
    const locId = locations.find(loc_id =>{
        if (loc_id) {
            return loc_id
        }
    })
    if(date && locId) {
console.log('working')
    }
})
getSearchLocation('lagos nigeria')


 //     const loc_id = item.result_object.location_id ;
    //     const date = '20201211'
        
    //     console.log(loc_id);
    //   console.log( getHotels(loc_id, date))
        // const date = document.getElementById('date');
        
        // getHotels(loc_id, date);