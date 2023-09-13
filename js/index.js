const { createApp } = Vue

const app = createApp({
    data(){
        return {
            dataEvents: [],
            currentdate: '',
            renderCards: [],
            filterCategories: [],
            checked: [],
            searchInput: '',
            favorites: JSON.parse(localStorage.getItem("favorites")) || [],
            stateEvent: '',
        }
    },

    created(){
        fetchData()
        .then(res => res)
        .then(data => {
            this.dataEvents = data.events;
            // console.log('dataEvents :>> ', this.dataEvents);
            this.currentDate = data.currentDate;

            this.renderCards = this.dataEvents;

            this.filterCategories = [...new Set(this.dataEvents.map((item) => item.category))].sort();

        })
        .catch((err) => console.log('err >> ', err));
    },

    methods: {
        checksFilter() {
            if (this.checked.length === 0) {
                return this.dataEvents;
            } else {
                return this.dataEvents.filter(item => this.checked.includes(item.category));
            }
        },

        searchFilter() {
            if (this.searchInput === '' || this.searchInput === null) {
                return this.dataEvents;
            } else {
                return this.dataEvents.filter(item => item.name.toLowerCase().includes(this.searchInput.toLowerCase()));
            }
        },

        combineFilters() {
            let checksFilterResults = this.checksFilter();
            let searchFilterResult = this.searchFilter();
        
            if (!checksFilterResults.length) {
                return this.dataEvents;
            } else {
                return checksFilterResults.filter((item) => searchFilterResult.includes(item));
            }
        },
        

        performSearch() {
            this.renderCards = this.combineFilters() 
            if (this.renderCards.length === 0) {
                swal('Not found any events that match the selected filters.');
            }
        },

        handlerChange() {
            this.performSearch(); 
        },

        handlerSubmit(e) {
            e.preventDefault(); 
            this.performSearch(); 
        },

        toggleFavorite(item) {
            item.isFavorite = !item.isFavorite;
            this.updateLocalStorageFavorites();
        },
        
        updateLocalStorageFavorites() {
            const favorites = this.renderCards.filter(item => item.isFavorite);
            localStorage.setItem("favorites", JSON.stringify(favorites));
        }
    },
    
    computed: {
    },
})
app.mount("#app");




//             //* Aside Favorites
//             function asideToggleOpen(elementHTML) {
//                 let isOpen = false;

//                 const toggleOpen = () => {
//                     isOpen = !isOpen;
//                     elementHTML.classList.toggle("open", isOpen);
//                     elementHTML.classList.toggle("closed", !isOpen);
//                 };
//                 return toggleOpen;
//             }

//             function showFavoriteAside() {
//                 const asideFavorite = document.getElementById("fav-aside");
//                 const showAside = document.getElementById("show-fav");
//                 const favEvent = document.getElementById("fav-cards");
//                 let toggleAside = asideToggleOpen(asideFavorite);

//                 if (favorites.length > 0) {
//                     asideFavorite.classList.add("open");
//                     renderCardsFavorite(favorites, favEvent);
//                 }

//                 showAside.addEventListener("click", toggleAside);
//             }

//             showFavoriteAside();

//             function classFavoriteHome() {
//                 const favEvent = document.getElementById('fav-cards');
//                 const cards = colCard.querySelectorAll('.card');
            
//                 cards.forEach((card) => {
//                     const eventId = card.getAttribute('key');
//                     const isFavorite = favorites.some((fav) => fav._id === Number(eventId));
//                     const heartIcon = card.querySelector('.biFavorite');
            
//                     if (isFavorite) {
//                         heartIcon.classList.add('biFavRed');
//                     } else {
//                         heartIcon.classList.remove('biFavRed');
//                     }
//                 })

//                 renderCardsFavorite(favorites, favEvent);
//             }
//             classFavoriteHome()

//             //* Events Lengths
//             let dataLength = data.length;
//             cardsLength.innerHTML = dataLength;
//         })
//         .catch((err) => console.log(err));
// };

// datos();


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