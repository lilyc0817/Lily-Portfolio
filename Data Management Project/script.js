//make sure script loaded
console.log("script loaded")

//get start and end button elements from html
const startButton = document.getElementById("startButton");
const lastResultDiv = document.getElementById("lastResult");
const resultDiv = document.getElementById("result");
const resultTitle = document.getElementById("resultTitle");
const restartButton = document.getElementById("restartButton");
const previousResultsButton = document.getElementById("previousResultsButton");
const previousResultsDiv = document.getElementById("previousResultsDiv");
const clearResultsButton = document.getElementById("clearResultsButton")
//hide the restart button at the start
restartButton.style.display = "none";
previousResultsButton.style.display = "none";
clearResultsButton.style.display = "none";

//get quiz answer elements from html
const questionIds = ["q1", "q2", "q3", "q4", "q5", "q6"];
const questions = questionIds.map(id => document.getElementById(id));

//keep track of current question
let currentQuestionIndex = 0;

//keep track of the user's score
const scores = {
  "Minerva McGonagall": 0,
  "Severus Snape": 0,
  "Sybill Trelawney": 0,
  "Rubeus Hagrid": 0
};

//map question options to each professor
const answerMap = {
  // q1
  q11: "Minerva McGonagall",  
  q12: "Severus Snape",        
  q13: "Sybill Trelawney",    
  q14: "Rubeus Hagrid",       

  // q2
  q21: "Minerva McGonagall",   
  q22: "Severus Snape",      
  q23: "Sybill Trelawney",    
  q24: "Rubeus Hagrid",       

  // q3
  q31: "Minerva McGonagall",   
  q32: "Severus Snape",        
  q33: "Sybill Trelawney",     
  q34: "Rubeus Hagrid",        
  // q4
  q41: "Minerva McGonagall",   
  q42: "Severus Snape",        
  q43: "Sybill Trelawney",     
  q44: "Rubeus Hagrid",        

  // q5
  q51: "Minerva McGonagall",   
  q52: "Severus Snape",        
  q53: "Sybill Trelawney",     
  q54: "Rubeus Hagrid",        

  // q6
  q61: "Minerva McGonagall",   
  q62: "Severus Snape",        
  q63: "Sybill Trelawney",     
  q64: "Rubeus Hagrid"         
};
//HELPER FUNCTIONS


function showQuestion(index){

    //hide all questions at the start
    questions.forEach(question =>{
        question.style.display = "none";
    })
    

    //only show question at specified index
    if (index < questions.length){
        questions[index].style.display = "block";
    }

}

startButton.addEventListener("click", () => {
    //hide the start button
    startButton.style.display = "none"; 
    currentQuestionIndex = 0;           // start at first question
    showQuestion(currentQuestionIndex); // show q1
});

function answerClick(professorName){
    //add one point to that professor after clicking on option
    scores[professorName] += 1;
    //move onto the next question
    currentQuestionIndex += 1;
    //show that next question
    if (currentQuestionIndex < questions.length) {
        showQuestion(currentQuestionIndex);
    } 
    //if there are no more questions, go to the end
    else {
        displayResult();
    }
}

for (const buttonId in answerMap) {
    //get the button
    const btn = document.getElementById(buttonId);
    btn.addEventListener("click", () => {
        //map the button to the professor it represents
        const professorName = answerMap[buttonId];
        answerClick(professorName);
    });
}


//get the professor with the greatest number of points
function getTopProfessor(){
    let topProfessor = null;
    let topScore = -1;
    for (const professor in scores){
        if (scores[professor] > topScore){
            topScore = scores[professor];
            topProfessor = professor;
        }
    }
    return topProfessor;
}

async function displayResult(){
    //rehide all the questions again
    questions.forEach(q => {
        q.style.display = "none";
    })
    //retrieve the winning professor
    const winner = getTopProfessor();
    //save the winner to a running list of results and local storage
    let pastResults = JSON.parse(localStorage.getItem("pastResults")) || [];
    pastResults.push(winner);
    localStorage.setItem("pastResults", JSON.stringify(pastResults));
    try{
        //fetch entire api
        const response = await fetch(`https://hp-api.onrender.com/api/characters/staff`);
        const professors = await response.json();
        console.log(professors);
        
        //display house, wand, and patronus to the user
        resultDiv.style.display = "block";
        resultTitle.textContent = `You are most like: ${winner}!`;
        
        const prof = professors.find(professor => professor.name === winner);

        if (prof.house){
            resultHouse.textContent = `House: ${prof.house}`;
        }
        if (prof.wand.wood && prof.wand.core && prof.wand.length){
            resultWand.textContent = `Wand: ${prof.wand.wood}, ${prof.wand.core}, ${prof.wand.length} inches`;
        }
        if (prof.patronus){
            resultPatronus.textContent = `Patronus: ${prof.patronus}`;
        }
        
    }
    catch(error){
        console.log("API Request Failed", error)
    }
    restartButton.style.display = "block";
    previousResultsButton.style.display = "block";
    clearResultsButton.style.display = "block"

    
}
restartButton.addEventListener("click", () => {
    //clear the screen
    resultDiv.style.display = "none";
    resultTitle.textContent = "none";
    resultHouse.textContent = null;
    resultWand.textContent = null;
    resultPatronus.textContent = null;
    restartButton.style.display = "none";
    previousResultsButton.style.display = "none";
    previousResultsDiv.textContent = null;
    clearResultsButton.style.display = "none";
    currentQuestionIndex = 0;

    //3. display the first question again
    showQuestion(currentQuestionIndex);

    //2. display the previous results (make a list that stores the previous result)
})



//IN-PROGRESS IDEAS

//local storage: the user can see their past results 
//local storage: the user can come back to their previous question if they exit the page and continue the quiz without restarting

function loadResults(){
    const storedResults = localStorage.getItem("pastResults");
    if (!storedResults){
        previousResultsDiv.style.display = "block";
        previousResultsDiv.textContent = "No Results Yet!";
    }
    if (storedResults){
        previousResultsDiv.style.display = "block"
        const results = JSON.parse(storedResults);
        previousResultsDiv.textContent = results.join(", ")
    }
} 
previousResultsButton.addEventListener("click", () => {
    loadResults();
})
clearResultsButton.addEventListener("click", () => {
    localStorage.removeItem("pastResults");
    previousResultsDiv.textContent = null;
})
