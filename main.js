const API_BASE = "https://resource-ghibli-api.onrender.com";

const selectMenuBtn = document.getElementById("titles");

// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function
let filmData;
function run() {
const selectMenu = document.querySelector("select");

    selectMenu.addEventListener("change",(event) => {
        const filmId = event.target.value;
        filmData.find((film) => {
            return film.id === filmId;
        });
          document.querySelector("#date").textContent = film.release_date;
          document.querySelector("#description").textContent = film.description;  
          document.querySelector("#title").textContent = film.title; 
    });
 fetch(`${API_BASE}/films`)
    .then((res) => {
        return res.json();
})
    .then((films) => {
        filmData = films;
        for(let film of films){
        const filmOption = document.createElement("option");
        filmOption.textContent =film.title;
        selectMenu.appendChild(filmOption);
        filmOption.value = film.id
        }
    })
 const peopleButton = document.querySelector("#show-people");
 peopleButton.addEventListener("click", () => {
    const currentMovieById = document.querySelector("select").value;
fetch(`${API_BASE}/people`)
    .then((res) => res.json())
    .then((actors) => {
        const actorsFiltered =   actors.filter((actors) =>{
        const finishedUrl = `/films/${currentMovieById}`;
                return actors.films.includes(finishedUrl);
            });
    })
 })
}

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
