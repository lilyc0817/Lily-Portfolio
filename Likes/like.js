console.log("likeScript loaded!")

// Step 2 – Grab the DOM elements
// You will need to access:
// The like button
let likeButton = document.getElementById("like-button");
// The heart icon
let heartIcon = document.getElementById("heart-icon");
// The like count
let likeCountSpan = document.getElementById("like-count");
// The status message
let statusMessage = document.getElementById("status-message");

// Step 3 – Track the like state
let isLiked = false;

// Step 4 – Add a click event listener
likeButton.addEventListener("click", () => {
// Step 5 – Toggle the liked state
// Inside the click handler, you will:
// 1) Flip isLiked (false → true, true → false)
// 2) Update the likeCount
// 3) Update the heart’s appearance
// 4) Update the text on the page
  isLiked = !isLiked
  if (isLiked){
    likeCount = 1;
  }
  else{
    likeCount = 0;
  }
  updateHeart();
  updateLikeCount();
  updateStatusMessage();
})


// Step 6 – Write helper functions to update the DOM
//   A. Update the heart icon
//   We want to:
//     1 )Add/remove the .liked CSS class
//     2 )Switch between ♡ (unliked) and ♥ (liked)
//   B. Update the like count text
//   C. Update the status message
function updateHeart(){
  if (isLiked){
    heartIcon.classList.add("liked");
    heartIcon.textContent = "♥︎";
  }
  else{
    heartIcon.classList.remove("liked");
    heartIcon.textContent = "♡"
  }

}
function updateLikeCount(){
  likeCountSpan.textContent = likeCount;
}
function updateStatusMessage(){
  if (isLiked){
    statusMessage.textContent = "You liked this post.";
  }
  else if(!isLiked){
    statusMessage.textContent = "Click the heart to like this post.";
  }
}



