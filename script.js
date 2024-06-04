
// A list of movies with their names and prices
const moviesList = [
    { movieName: "Flash", price: 7 },
    { movieName: "Spiderman", price: 5 },
    { movieName: "Batman", price: 4 },
  ];

  // Select element for movie selection
  const selectMovieEl = document.getElementById("selectMovie");

  // Get all the seat elements inside the container with id "seatCont"
  const allSeatCont = document.querySelectorAll("#seatCont .seat");
  console.log(allSeatCont)
  
  // Get the element where selected seats will be displayed
  const selectedSeatsHolderEl = document.getElementById("selectedSeatsHolder");
  
  // Get the element where movie price will be displayed
  const moviePriceEl = document.getElementById("moviePrice");
  
  // Get the cancel button element
  const cancelBtnEL = document.getElementById("cancelBtn");
  
  // Get the proceed button element
  const proceedBtnEl = document.getElementById("proceedBtn");
  
  // Populate the select element with movie options
  moviesList.forEach((movie) => {
    const optionEl = document.createElement("option");
    optionEl.innerHTML = `${movie.movieName} $${movie.price}`;
    selectMovieEl.appendChild(optionEl);
  });
  
  // Set initial movie price and name
  let moviePrice = 7;
  let currentMovieName = `Tom and Jerry 2021`;
  
  // Add event listener for movie selection change
  selectMovieEl.addEventListener("input", (e) => {
    let movieName = e.target.value.split("");
    let dollarIndex = movieName.indexOf("$");
    let movie = movieName.splice(0, dollarIndex - 1).join("");
    currentMovieName = movie;
    moviePrice = JSON.parse(movieName.splice(2, dollarIndex).join(""));
  
      // Update movie name and price display
    updatMovieName(movie, moviePrice);

    // Update total price based on selected seats
    updatePrice(moviePrice, takenSeats.length);
  });
  
  // Initialize seat IDs
  let initialSeatValue = 0;
  allSeatCont.forEach((seat) => {
    const attr = document.createAttribute("data-seatid");
    attr.value = ++initialSeatValue;
    seat.setAttributeNode(attr);
  });
  
  // Get all non-occupied seat elements
  let seatContEl = document.querySelectorAll("#seatCont .seat:not(.occupied)");
  // console.log(seatContEl);

  // Initialize an array to hold selected seat IDs
  let takenSeats = [];
  
  // Add event listener for seat selection
  seatContEl.forEach((seat) => {
    seat.addEventListener("click", (e) => {
      let isSelected = seat.classList.contains("selected");
  
      let seatId = JSON.parse(seat.dataset.seatid);
  
      if (!isSelected) {
          // Add seat to selection
        seat.classList.add("selected");
        takenSeats.push(seatId);
        takenSeats = [...new Set(takenSeats)];
      } else if (isSelected) {
         // Remove seat from selection
        seat.classList.remove("selected");
  
        takenSeats = takenSeats.filter((seat) => {
          // console.log(seat,seatId)
          if (seat !== seatId) {
            return seat;
          }
        });
      }

       // Update seat display and price
      updateSeats();
      updatePrice(moviePrice, takenSeats.length);
    },{ once: true });
  });
  
  // Update the display of selected seats
  function updateSeats() {
    selectedSeatsHolderEl.innerHTML = ``;
  
    takenSeats.forEach((seat) => {
      const seatHolder = document.createElement("div");
      seatHolder.classList.add("selectedSeat");
      selectedSeatsHolderEl.appendChild(seatHolder);
  
      seatHolder.innerHTML = seat;
    });
  
    if (!takenSeats.length) {
      const spanEl = document.createElement("span");
      spanEl.classList.add("noSelected");
      spanEl.innerHTML = `NO SEAT SELECTED`;
      selectedSeatsHolderEl.appendChild(spanEl);
    }
  
    seatCount();
  }
  
  // Update the seat count display
  function seatCount() {
    const numberOfSeatEl = document.getElementById("numberOfSeat");
    numberOfSeatEl.innerHTML = takenSeats.length;
  }
  
  // Update the movie name and price display
  function updatMovieName(movieName, price) {
    const movieNameEl = document.getElementById("movieName");
    const moviePriceEl = document.getElementById("moviePrice");
    movieNameEl.innerHTML = movieName;
    moviePriceEl.innerHTML = `$ ${price}`;
    
  }
  
  // Update the total price display based on selected seats
  function updatePrice(price, seats) {
    const totalPriceEl = document.getElementById("totalPrice");
    let total = seats * price;
    totalPriceEl.innerHTML = `$ ${total}`;
  }
  
  // Add event listener for the cancel button to reset selections
  cancelBtn.addEventListener("click", (e) => {
    cancelSeats();
  });
  
  // Reset seat selection
  function cancelSeats() {
    takenSeats = [];
    seatContEl.forEach((seat) => {
      seat.classList.remove("selected");
    });
    updatePrice(0, 0);
    updateSeats();
  }
  
  // Add event listener for the proceed button to confirm booking
  proceedBtnEl.addEventListener("click", (e) => {
    if (takenSeats.length) {
      alert("Yayy! Your Seats has been booked");
      uncancelSeats();
    } else {
      alert("Oops no seat Selected");
    }
  });
  
  // Mark selected seats as occupied
  function uncancelSeats() {
    takenSeats = [];
    console.log(seatContEl);
    seatContEl.forEach((seat) => {
      if(seat.classList.contains("selected")){
        console.log(seat);
      seat.classList.remove("selected");
        seat.classList.add("seat")
      seat.classList.add("occupied");
      }
    });
    updatePrice(0, 0);
    updateSeats();
  }
  