// SEAT MATRIX
let SEATMATRIX = {
  chichore: [
    [1, 2, 3],
    [45, 23],
  ],
  extraction: [
    [2, 4, 5, 40],
    [22, 23],
  ],
  ludo: [
    [3, 4],
    [45, 71],
  ],
  godzilla: [
    [2, 4, 45],
    [3, 56],
  ],
  "bhaag-milkha-bhaag": [
    [3, 4, 5],
    [12, 25],
  ],
  "ms-dhoni-the-untold-story": [
    [1, 2, 20],
    [2, 5],
  ],
  "golmaal-again": [[4, 3], [7]],
};
if (localStorage.getItem("seatmatrix1")) {
  SEATMATRIX = JSON.parse(localStorage.getItem("seatmatrix1"));
} else {
  localStorage.setItem("seatmatrix1", JSON.stringify(SEATMATRIX));
}

/* ******************** */
/* hero carousel script */
/* ******************** */

const heroLeftArrow = document.querySelector("#hero__left-arrow");
const heroRightArrow = document.querySelector("#hero__right-arrow");
const heroContainer = document.querySelector("#hero__container");
const heroMovieName = document.querySelector("#hero__movie-name");

const heroMovieImages = [];
const fun = function(){
  for(var key in SEATMATRIX) {
    heroMovieImages.push(key);
  }
}();
let imageNumber = 0;

const changeHeroMovie = () => {
  imageNumber = (imageNumber + 7) % 7;
  // image css properties
  heroContainer.style.background = `url("https://masterpranay1.github.io/Movie-seat-booking/assets/images/${heroMovieImages[imageNumber]}.jpg")`;
  heroContainer.style.backgroundSize = "cover";
  heroContainer.style.backgroundRepeat = "no-repeat";
  heroContainer.style.backgroundPosition = "right";

  heroMovieName.textContent = heroMovieImages[imageNumber].split('-').join(' ');
};
heroLeftArrow.addEventListener("click", (e) => {
  imageNumber--;
  changeHeroMovie();
});
heroRightArrow.addEventListener("click", (e) => {
  imageNumber++;
  changeHeroMovie();
});

/* ****************************** */
/* Updating seat matrix and movie */
/* ****************************** */

const header = document.querySelector("#header");
const goBack = document.querySelector("#nav");
const hero = document.querySelector("#hero");
const category = document.querySelector("#category");
const movieList = document.querySelector("#movie-list");
const seatBook = document.querySelector("#seat-book");

// selections from seatBook component -> movie details
const seats = seatBook.querySelectorAll("li");
const movieName = document.querySelector("#seat-book__movie-name");
const description = document.querySelector("#seat-book__movie-description");
const image = document.querySelector("#seat-book__movie-image");
const price = document.querySelector("#seat-book__movie-price");

// selections from seatBook component -> quantity and total pricing details
const quantityElem = document.querySelector("#quantity");
const totalPriceElem = document.querySelector("#total-price");

// current selected movie name
let currMovieName = null;

const updateSeatBookMovieDom = (movie) => {
  movieName.textContent = movie.name.toUpperCase().split('-').join(' ');
  description.textContent = movie.description;
  image.src = movie.imageUrl;
  price.textContent = movie.price;
};
const updateSeatBookMatrixDom = (name = currMovieName) => {
  if (currMovieName == null) currMovieName = name;
  let cnt = 0;
  // console.log(SEATMATRIX[name]);
  seats.forEach((seat) => {
    // console.log(name);
    if (SEATMATRIX[name][0].includes(cnt)) {
      seat.classList.add("selected");
      seat.classList.remove("occupied");
    } else if (SEATMATRIX[name][1].includes(cnt)) {
      seat.classList.remove("selected");
      seat.classList.add("occupied");
    } else {
      seat.classList.remove("selected");
      seat.classList.remove("occupied");
    }
    cnt++;
  });
};
const updatePrice = (name) => {
  let quantity = SEATMATRIX[name][0].length;
  let totalPrice = +quantity * +price.textContent;
  quantityElem.textContent = quantity;
  totalPriceElem.textContent = totalPrice;
};

let seatNum = 0;
seats.forEach((seat) => {
  seat.num = seatNum;
  seat.addEventListener("click", (e) => {
    let selected = SEATMATRIX[currMovieName][0];
    let occupied = SEATMATRIX[currMovieName][1];
    if (selected.includes(seat.num)) {
      const index = selected.indexOf(seat.num);
      selected.splice(index, 1);
    } else if (!selected.includes(seat.num) && !occupied.includes(seat.num)) {
      selected.push(seat.num);
    }
    SEATMATRIX[currMovieName][0] = selected;
    SEATMATRIX[currMovieName][1] = occupied;
    updateSeatBookMatrixDom();
    updatePrice(currMovieName);
    localStorage.setItem("seatmatrix1", JSON.stringify(SEATMATRIX));
  });
  seatNum++;
});

/* ****************************** */
/* different state of application */
/* ****************************** */
let state = null;
const changeState = () => {
  if (state == "bookSeat") {
    goBack.classList.remove("hide");
    hero.classList.add("hide");
    category.classList.add("hide");
    movieList.classList.add("hide");
    seatBook.classList.remove("hide");
  }
  if (state == "back") {
    goBack.classList.add("hide");
    hero.classList.remove("hide");
    category.classList.remove("hide");
    movieList.classList.remove("hide");
    seatBook.classList.add("hide");
  }
  if (state == "category") {
    goBack.classList.remove("hide");
    hero.classList.add("hide");
    category.classList.add("hide");
    movieList.classList.remove("hide");
    seatBook.classList.add("hide");
  }
};

/* ********************************* */
/* Listing Movies and Filtering them */
/* ********************************* */

const movies = [
  {
    category: "comedy",
    name: "chichore",
    description: "Go back to your college days and relive those days",
    price: "200",
    imageUrl: "./assets/images/chichore.jpg",
  },
  {
    category: "comedy",
    name: "ludo",
    description: "Four different story and giving full dose of thrill and fun",
    price: "150",
    imageUrl: "./assets/images/ludo.jpg",
  },
  {
    category: "fiction",
    name: "godzilla",
    description: "A deadly fight between monsters of world",
    price: "100",
    imageUrl: "./assets/images/godzilla.jpg",
  },
  {
    category: "action",
    name: "extraction",
    description: "Get thrilled with the awesome action and fight",
    price: "200",
    imageUrl: "./assets/images/extraction.jpg",
  },
  {
    category: "biopic",
    name: "bhaag-milkha-bhaag",
    description: "This film chronicles Milkha singh aka Flying Singh",
    price: "300",
    imageUrl: "./assets/images/bhaag-milkha-bhaag.jpg",
  },
  {
    category: "biopic",
    name: "ms-dhoni-the-untold-story",
    description:
      "Know the story of Captain Cool. His journey from a ticket collector to World Cup",
    price: "200",
    imageUrl: "./assets/images/ms-dhoni-the-untold-story.jpg",
  },
  {
    category: "horror",
    name: "golmaal-again",
    description: "A horror movie will full dose of fun",
    price: "100",
    imageUrl: "./assets/images/golmaal-again.jpg",
  },
];
const newMovie = (movie) => {
  return `
  <div class="movie-wrapper clr-pri-bg">
          <img
            class="thumbnail"
            src="${movie.imageUrl}"
            alt="movie image"
          />
          <h2 class="fs-l mt fw-400 capitalize" style="--mt: 1rem">${movie.name.split('-').join(' ')}</h2>
          <p
            class="description mt mb clr-sec-xl-text fs-s"
            style="--mt: 0.5rem"
          >
            ${movie.description}
          </p>
          <div class="price-wrapper flex flex-row flex-ai-c">
            <img
              src="./assets/images/rupee-sign.svg"
              alt="rupee sign"
              class="rupee-icon mr"
              style="--mr: 1em"
            />
            <h3 class="price fs-mel clr-sec-text">${movie.price}</h3>
          </div>
        </div>
  `;
};
const movieContainer = document.querySelector("#movie-container");
const movieListName = document.querySelector("#movie-list__name");
const movieListDescription = document.querySelector("#movie-list__description");
const updateMovieListDom = (movies, name = null, description = null) => {
  movieListName.textContent = name;
  movieListDescription.textContent = description;
  movieContainer.setAttribute("style", "--mt:4em");
  movies.forEach((movie) => {
    movieContainer.innerHTML += newMovie(movie);
  });
  if (movies.length == 0) {
    const newElem = document.createElement("p");
    newElem.className = "text-align clr-sec-l-text fw-700 fs-xl";
    newElem.textContent = "No Movied Found";
    movieContainer.appendChild(newElem);
    movieContainer.setAttribute("style", "--mt:0em");
  }
};
updateMovieListDom(
  movies,
  "movie list",
  "We are providing you a collection which you will love to watch"
); // adding all to list

const addEventOnMovieList = () => {
  // changing innerHtml removes all the events releated to the element
  movieList.querySelectorAll(".movie-wrapper").forEach((movieWrapper) => {
    movieWrapper.addEventListener("click", (e) => {
      let name = movieWrapper.querySelector("h2").textContent.toLowerCase();
      name = name.split(' ').join('-');
      movies.forEach((movie) => {
        if (movie.name == name) {
          updateSeatBookMovieDom(movie);
          updateSeatBookMatrixDom(movie.name);
          updatePrice(movie.name);
        }
      });
      state = "bookSeat";
      changeState();
    });
  });
};
addEventOnMovieList();

/* ************************************* */
/* category and filtering part continued */
/* ************************************* */

const categoryContainer = document.querySelector("#category-container");
const updateCategoryDom = () => {
  const categories = [];
  movies.forEach((movie) => {
    if (!categories.includes(movie.category)) {
      categories.push(movie.category);
    }
  });
  categories.forEach((category) => {
    categoryContainer.innerHTML += `
  <li class="movie clr-sec-l-bg clr-ter-text flex flex-jc-c flex-ai-c">
    <h2 class="fw-400 fs-med text-align">${category}</h2>
  </li>
  `;
  });
};
const addEventOnCategory = () => {
  categoryContainer.querySelectorAll("li").forEach((category) => {
    category.addEventListener("click", (e) => {
      // console.log(category.textContent);
      let categoryName = "";
      for (let i = 0; i < category.textContent.length; i++) {
        if (category.textContent[i] >= "a" && category.textContent[i] <= "z") {
          categoryName += category.textContent[i];
        }
      }
      const movieFiltered = movies.filter((movie) => {
        return categoryName == movie.category;
      });
      state = "category";
      changeState();
      movieContainer.innerHTML = "";
      updateMovieListDom(movieFiltered, categoryName);
      addEventOnMovieList();
    });
  });
};
updateCategoryDom();
addEventOnCategory();

/* ****************** */
/* going back to home */
/* ****************** */

goBack.addEventListener("click", (e) => {
  state = "back";
  movieContainer.innerHTML = "";
  updateMovieListDom(
    movies,
    "movie list",
    "We are providing you a collection which you will love to watch"
  );
  addEventOnMovieList();
  changeState();
  currMovieName = null;
});

/* ************** */
/* search feature */
/* ************** */

const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-button");

searchButton.addEventListener("click", (e) => {
  let searchTextTmp = searchInput.value.toLowerCase();
  let searchText = searchTextTmp.trim();
  searchText = searchText.split(' ').join('-');
  if (searchText.length == 0) return;
  let movieFiltered = movies.filter((movie) => {
    return movie.name == searchText;
  });
  state = "category";
  changeState();
  movieContainer.innerHTML = "";
  updateMovieListDom(movieFiltered);
  addEventOnMovieList();

  searchInput.value = "";
});
