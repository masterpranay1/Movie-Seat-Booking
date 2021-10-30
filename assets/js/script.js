const heroLeftArrow = document.querySelector("#hero__left-arrow");
const heroRightArrow = document.querySelector("#hero__right-arrow");
const heroContainer = document.querySelector("#hero__container");
const heroMovieName = document.querySelector("#hero__movie-name");

const heroMovieImages = ["extraction", "ludo", "godzilla", "chichore"];
let imageNumber = 0;

const changeHeroMovie = () => {
  imageNumber = (imageNumber + 4) % 4;
  // image css properties
  heroContainer.style.background = `url(/assets/images/${heroMovieImages[imageNumber]}.jpg)`;
  heroContainer.style.backgroundSize = "cover";
  heroContainer.style.backgroundRepeat = "no-repeat";
  heroContainer.style.backgroundPosition = "right";

  heroMovieName.textContent = heroMovieImages[imageNumber];
};
heroLeftArrow.addEventListener("click", (e) => {
  imageNumber--;
  changeHeroMovie();
});
heroRightArrow.addEventListener("click", (e) => {
  imageNumber++;
  changeHeroMovie();
});

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
];
const newMovie = (movie) => {
  return `
  <div class="movie-wrapper clr-pri-bg">
          <img
            class="thumbnail"
            src="${movie.imageUrl}"
            alt="movie image"
          />
          <h2 class="fs-l mt fw-400 capitalize" style="--mt: 1rem">${movie.name}</h2>
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
movies.forEach((movie) => {
  movieContainer.innerHTML += newMovie(movie);
});

/* ********************** */
/* selecting DOM elements */
/* ********************** */

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
const quantityElem = document.querySelector('#quantity');
const totalPriceElem = document.querySelector('#total-price');

// current selected movie name
let currMovieName = null;

// SEAT MATRIX
const SEATMATRIX = {
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
};

const updateSeatBookMovieDom = (movie) => {
  movieName.textContent = movie.name.toUpperCase();
  description.textContent = movie.description;
  image.src = movie.imageUrl;
  price.textContent = movie.price;
};
const updateSeatBookMatrixDom = (name = currMovieName) => {
  if (currMovieName == null) currMovieName = name;
  let cnt = 0;
  seats.forEach((seat) => {
    if (SEATMATRIX[name][0].includes(cnt)) {
      seat.classList.add("selected");
    } else if (SEATMATRIX[name][1].includes(cnt)) {
      seat.classList.add("occupied");
    } else {
      seat.classList.remove("selected");
      seat.classList.remove("occupied");
    }
    cnt++;
  });
};
const updatePrice = name => {
  let quantity = SEATMATRIX[name][0].length;
  let totalPrice = +quantity * +price.textContent;
  quantityElem.textContent = quantity;
  totalPriceElem.textContent = totalPrice;
};
const changeState = () => {
    goBack.classList.toggle('hide');
    hero.classList.toggle('hide');
    category.classList.toggle('hide');
    movieList.classList.toggle('hide');
    seatBook.classList.toggle('hide');
};

movieList.querySelectorAll(".movie-wrapper").forEach((movieWrapper) => {
  movieWrapper.addEventListener("click", (e) => {
    let name = movieWrapper.querySelector("h2").textContent.toLowerCase();
    movies.forEach((movie) => {
      if (movie.name == name) {
        updateSeatBookMovieDom(movie);
        updateSeatBookMatrixDom(movie.name);
        updatePrice(movie.name);  
      }
    });
    changeState();
  });
});
goBack.addEventListener('click', e => {
  changeState();
  currMovieName = null;
});
let seatNum = 0;
seats.forEach(seat => {
  seat.num = seatNum;
  seat.addEventListener('click', e => {
    let selected = SEATMATRIX[currMovieName][0];
    let occupied = SEATMATRIX[currMovieName][1];
    if(selected.includes(seat.num)) {
      const index = selected.indexOf(seat.num);
      selected.splice(index, 1);
    } else if(!selected.includes(seat.num) && !occupied.includes(seat.num)) {
      selected.push(seat.num);
    } 
    SEATMATRIX[currMovieName][0] = selected;
    SEATMATRIX[currMovieName][1] = occupied;
    updateSeatBookMatrixDom();
    updatePrice(currMovieName);
  });
  seatNum++;
})