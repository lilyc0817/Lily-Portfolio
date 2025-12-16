// Your job is to build a working movie review app where users can submit reviews
// — but only if the input is valid.
//
// You will validate:
// 1) Movie title must not be empty
// 2) Rating must be:
//    a) A number
//    b) Between 1 and 5 (inclusive)
// 3) Review text must:
//    a) Not be empty
//    b) Be at least 20 characters long
//
// You should:
// Show error messages under each input
// Add each valid review to the page
// Keep track of all ratings and update the average rating live
// Use preventDefault() to stop form submission if invalid

// Step 1 — Make sure your script loads
console.log("Movie review script loaded!");

// Step 2 — Select all DOM elements
// You need to grab:
// 1) form
// 2) title + rating + review inputs
// 3) error message <small> elements
// 4) reviews list
// 5) average rating span
// 6) form message area
const form = document.getElementById("review-form");
const titleInput = document.getElementById("movie-title");
const ratingInput = document.getElementById("movie-rating");
const reviewInput = document.getElementById("review-text");

const titleError = document.getElementById("title-error");
const ratingError = document.getElementById("rating-error");
const reviewError = document.getElementById("review-error");

const reviewsList = document.getElementById("reviews-list");
const averageRatingSpan = document.getElementById("average-rating");

const formMessage = document.getElementById("form-message");

// Step 3 — Build state for your reviews
// We'll store each review as an object with:
// { title: string, rating: number, text: string }
let reviews = [];

// Step 4 — Write validation helper functions
function isValidTitle() {
  if (titleInput.value.trim() === "") {
    titleError.textContent = "Movie title is required.";
    return false;
  }
  titleError.textContent = "";
  return true;
}

function isValidRating() {
  const rating = parseFloat(ratingInput.value);

  if (isNaN(rating)) {
    ratingError.textContent = "Rating is required.";
    return false;
  }

  if (rating < 1 || rating > 5) {
    ratingError.textContent = "Rating must be between 1 and 5.";
    return false;
  }

  ratingError.textContent = "";
  return true;
}

function isValidReviewText() {
  const text = reviewInput.value.trim();

  if (text === "") {
    reviewError.textContent = "Review text is required.";
    return false;
  }

  if (text.length < 20) {
    reviewError.textContent = "Review should be at least 20 characters long.";
    return false;
  }

  reviewError.textContent = "";
  return true;
}

// Step 5 — Update average rating
function updateAverageRating() {
  if (reviews.length === 0) {
    averageRatingSpan.textContent = "0.0";
    return;
  }

  let sum = 0;
  reviews.forEach(review => {
    sum += review.rating;
  });

  const average = sum / reviews.length;
  averageRatingSpan.textContent = average.toFixed(2);
}

// Step 6 — Add review to DOM
function addReviewToDOM(review) {
  const li = document.createElement("li");
  li.classList.add("review-item");
  li.innerHTML = `
    <h3>${review.title} <span class="rating">(${review.rating}/5)</span></h3>
    <p>${review.text}</p>
  `;
  reviewsList.appendChild(li);
}

// Step 7 — Helper to show a success or info message under the form
function showFormMessage(message) {
  formMessage.textContent = message;
}

// Step 8 — Handle form submission using e.preventDefault()
form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!isValidTitle() || !isValidRating() || !isValidReviewText()) {
    showFormMessage("Please fix the errors above before submitting.");
    return;
  }

  const newReview = {
    title: titleInput.value.trim(),
    rating: parseFloat(ratingInput.value),
    text: reviewInput.value.trim(),
  };

  reviews.push(newReview);
  addReviewToDOM(newReview);
  updateAverageRating();

  showFormMessage("Review submitted successfully! 🎬");

  form.reset();
});

// Initialize UI on first load
updateAverageRating();
showFormMessage("");