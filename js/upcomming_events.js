const { createApp } = Vue 

const app = createApp({
    data(){
        return{
            dataEvents: [],
            currentDate: '',
            arrComing: [],
            filterCategories:[],
            filtered: [],
            inputSearch: '',
            inputCheck:[],
        }
    },
    created(){
        fetchData()
        .then(res => res)
        .then(data => {
            this.dataEvents = data.events
            this.currentDate = data.currentDate

            this.filtered = this.arrComing

            this.arrComing = this.dataEvents.filter((item) => item.date >= this.currentDate);

            this.filterCategories = [...new Set(this.dataEvents.map((item) => item.category))].sort();

        })
        .catch(err => console.log('err >> ', err))

        
    },
    methods: {
        filterPerSearch(){
            this.filtered = this.arrComing.filter(item => (item.name).toLowerCase().includes(this.inputSearch.toLowerCase()))
            console.log('this.filtered :>> ', this.filtered);
        },

        filterPerChecks(){
            if(this.inputCheck.length > 0){
                this.filtered = this.filtered.filter(item => this.inputCheck.includes(item.category))
            }
        }
    },
    computed: {
        filterCombined(){
            this.filterPerSearch()
            this.filterPerChecks()
        }
    }
})

app.mount('#app')





//         //! Favorites
//         let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
//         function saveFavoritesToLocalStorage(favorites) {
//             localStorage.setItem('favorites', JSON.stringify(favorites));
//         }

//         function favoriteToggleColor(biClassFav, data) {
//             const toggleColor = biClassFav.classList.toggle('biFavRed');
//             const cardItem = biClassFav.closest('.card');
//             const favEvent = document.getElementById('fav-cards');

//             if (!cardItem) return; // Si no hay una tarjeta me voy

//             const eventId = cardItem.getAttribute('key');
//             const eventItem = data.find(ev => ev._id === Number(eventId));
//             const isFavorite = favorites.some(fav => fav._id === Number(eventId));

//             if (toggleColor && eventItem && !isFavorite) {
//                 favorites.push(eventItem);
//             } else if (!toggleColor && isFavorite) {
//                 favorites = favorites.filter(fav => fav._id !== Number(eventId));
//             }

//             saveFavoritesToLocalStorage();
//             //renderCardsFavorite(favorites, favEvent);

//             if (favorites.length === 0) {
//                 const asideFavorite = document.getElementById("fav-aside");
//                 asideFavorite.classList.remove("open");
//             }
//             return favorites;
//         }

//         function saveFavoritesToLocalStorage() {
//             localStorage.setItem("favorites", JSON.stringify(favorites));
//         }

//         function addCardFavoriteEvent() {
//             document.addEventListener('click', (e) => {
//                 if (e.target.classList.contains('biFavorite')) {
//                     favoriteToggleColor(e.target, dataEvents);
//                 }
//             });
//         }
//         addCardFavoriteEvent();

//         let dataLength = filterComing.length;
//         cardsLength.innerHTML = dataLength;
//     })
//     .catch(err => console.log('err >> ', err))
// }
// datos()








// //! Filters & Listeners
// // me creo las funciones de filtrado
// function checksFilter(arrCom) {
//     // checks seleccionados
//     const nodeListChecks = document.querySelectorAll('input[type="checkbox"]:checked');

//     let arrChecks = Array.from(nodeListChecks).map((input) => input.value);

//     let itemFiltered = arrChecks.length > 0
//             ? arrCom.filter((item) => arrChecks.includes(item.category))
//             : arrCom;

//     return itemFiltered;
// }

// function searchFilter(arrCom) {
//     const inputValue = document.querySelector('input[type="search"]');
//     const valueSearch = inputValue.value.toLowerCase();
//     const normalizedValue = valueSearch.charAt(0).toUpperCase() + valueSearch.slice(1) || valueSearch;

//     let inputSearch = normalizedValue !== ''? 
//         arrCom.filter(item => (item.name).includes(normalizedValue))
//         : arrCom;

//     return inputSearch
// }

// function combineFilters (arrCom){
//     let checksFilterResults = checksFilter(arrCom)
//     let searchFilterResult = searchFilter(arrCom)

//     let combined = checksFilterResults.filter(item => searchFilterResult.includes(item))

//     let dataLength = combined.length;
//     cardsLength.innerHTML = dataLength;

//     return combined
// }

// const handlerChange = (arrCom, elementHTML) => {
//     let combineResults = combineFilters(arrCom)
//         if(combineResults.length === 0){
//             swal("Event is not found, try with other name...");
//         }
//     renderCards(combineResults, elementHTML)
// }

//*--------------------------------------------
// //! Favorite
// function createTemplateFavorite(item) {
//     const template = `
//         <li>
//             <div class="card h-100" key=${item._id} data-favorite="true">
//                 <img src=${item.image} class="card-img-top" alt="imagen 2">
//                 <i class="bi bi-heart-fill biFavorite biFavRed" id="iconfav"></i>
//                 <div class="card-body">
//                     <h5 class="card-title">${item.name}</h5>
//                     <p class="card-text">
//                         ${item.description}
//                     </p>
//                 </div>
//                 <div class="hstack gap-3 text-center px-2 py-3">
//                     <div class="p-2 fw-bold">$ ${item.price}</div>
//                     <div class="p-2 ms-auto">
//                         <a href="../details.html?id=${item._id}">Details</a>      
//                     </div>
//                 </div>
//             </div>
//         </li>
//     `;
//     return template;
// }

// function renderCardsFavorite(array, elementHTML) {
//     let structure = "";
//     array?.forEach((item) => {
//         structure += createTemplateFavorite(item);
//     });
//     elementHTML.innerHTML = structure;
//     return structure
// }



