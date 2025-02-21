// slide puzzle 
var currentTile;
var blankTile;

var rows = 3;
var columns = 3;
var imageOrder = ["1", "2", "3", "4", "0", "5", "6", "7", "8"];

// window.onload = function() {
//     let bodyCover = document.getElementById("coverScreenBody");

//     setTimeout(() => {
//         bodyCover.classList.add("revealBodyCover");
//     }, 200); // Ensures fade-out effect works properly
// };





window.onload =function () {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString();
            tile.src = imageOrder.shift() + ".jpg";

            tile.addEventListener("dragstart", dragStart);
            tile.addEventListener("dragover", dragOver);
            tile.addEventListener("dragenter", dragEnter);
            tile.addEventListener("dragleave", dragLeave);
            tile.addEventListener("drop", drop);
            tile.addEventListener("dragend", dragEnd);
            document.getElementById("board").append(tile);
        }
    }
    
   
    
}



// Drag & Drop Functions
function dragStart() {
    currentTile = this;
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {}

function drop() {
    blankTile = this;
}

function dragEnd() {
    if (!blankTile.src.includes("0.jpg")) {
        return;
    }
    let currentCoordinates = currentTile.id.split("-");
    r = parseInt(currentCoordinates[0]);
    c = parseInt(currentCoordinates[1]);

    let blankCoordinates = blankTile.id.split("-");
    r2 = parseInt(blankCoordinates[0]);
    c2 = parseInt(blankCoordinates[1]);

    let leftSwitch = r == r2 && c2 == c - 1;
    let rightSwitch = r == r2 && c2 == c + 1;
    let upSwitch = c == c2 && r2 == r - 1;
    let downSwitch = c == c2 && r2 == r + 1;

    let switchPossible = leftSwitch || rightSwitch || upSwitch || downSwitch;
    if (switchPossible) {
        let currentImg = currentTile.src;
        let blankImg = blankTile.src;

        currentTile.src = blankImg;
        blankTile.src = currentImg;

        checkIfSolved();
    }
}

function checkIfSolved() {
    let tiles = document.querySelectorAll("#board img");
    let isSolved = true;

    for (let i = 0; i < tiles.length; i++) {
        let currentImage = tiles[i].src.split(/[\\/]/).pop().replace(".jpg", ""); // Extract only the number
        let expectedSrc = i.toString(); // Expected order (0, 1, 2, ... 8)

        console.log(`Checking tile ${i}: found ${currentImage}, expected ${expectedSrc}`); // Debugging log

        if (currentImage !== expectedSrc) {
            isSolved = false;
            break;
        }
    }

    if (isSolved) { 
        console.log("Puzzle solved!"); // Debugging log
        puzzleSolved();
    }
}



// Function triggered when the puzzle is solved
function puzzleSolved() {
    let wineButton=document.getElementById("winebutton");
    console.log("wine button acquired");

    wineButton.classList.add("revealWineButton");
    console.log("✅ Class 'revealWineButton' added!");

}



// checking riddle answer and giving clue
const riddleBtn = document.getElementById("riddleSubmit");
const riddleInput = document.getElementById("riddleanswer");
const coverScreen = document.getElementById("coverScreen");
const nextClue = document.getElementById("nextClue");

riddleBtn.addEventListener("click", () => {
    let answer = riddleInput.value.trim().toUpperCase();

    if (answer === "TATTOO") {
        console.log("Correct Answer!");

        // **Force a CSS recalculation before applying class**
        coverScreen.offsetHeight;  

        // Now, add class
        coverScreen.classList.add("revealRiddleCover");

        setTimeout(() => {
            nextClue.classList.add("showFirstClue");
            console.log("Next clue revealed!");
        }, 1000);
    }
});

let dateDigits = document.getElementsByClassName("dateSelector");
let dateScreen = document.getElementById("inputScreen");

for (let button of dateDigits) {
    button.addEventListener("click", function () {
        let value = this.innerText; // Get button text (number, hyphen, or "C")

        if (value === "C") {
            // Remove the last character (Backspace functionality)
            dateScreen.innerText = dateScreen.innerText.slice(0, -1);
        } else {
            // Add clicked number or hyphen to input screen
            dateScreen.innerText += value;
        }
        if(dateScreen.innerText==="08-11-2024"){
            firstDateCover();
        }
    });
    
}

function firstDateCover(){

        let coverScreenDate=document.getElementById("coverScreenDate");
        let nextClueDate=document.getElementById("nextClueDate");
        // **Force a CSS recalculation before applying class**
        coverScreenDate.offsetHeight;  

        // Now, add class
        coverScreenDate.classList.add("revealRiddleCover");

        setTimeout(() => {
            nextClueDate.classList.add("showFirstClue");
            console.log("Next clue revealed!");
        }, 1000);
    }   

// keyboard notes
// document.addEventListener("DOMContentLoaded", () => {
//     const synth = new Tone.Synth().toDestination(); // Create a Synth
//     const keys = document.querySelectorAll(".whitekeys, .blackkeys");

//     // Map key IDs to musical notes
//     const keyMap = {
//         "A": "A2",
//         "A-sharp": "A#2",
//         "B": "B2",
//         "C": "C2",
//         "C-sharp": "C#2",
//         "D": "D2",
//         "D-sharp": "D#2",
//         "E": "E2",
//         "F": "F2",
//         "F-sharp": "F#2",
//         "G": "G2",
//         "G-sharp": "G#2",
//         "A1": "A3"
//     };

//     // Play note when clicking a key
//     keys.forEach(key => {
//         key.addEventListener("click", () => {
//             const note = keyMap[key.id];
//             if (note) {
//                 synth.triggerAttackRelease(note, "8n");
//             }
//         });
//     });

//     // Play note when pressing the keyboard keys (A-G)
//     document.addEventListener("kewdown", (event) => {
//         const keyPressed = event.key.toUpperCase();
//         const note = keyMap[keyPressed];
//         if (note) {
//             synth.triggerAttackRelease(note, "8n");
//         }
//     });
// });


// blank cover
let blankCover = document.getElementById("coverScreenBlank");
let blankClue = document.getElementById("nextClueBlank");
let blankBtn = document.getElementById("blanksubmit");
let blankInput = document.getElementById("blanktext");

// Debugging: Check if elements exist
if (!blankCover || !blankClue || !blankBtn || !blankInput) {
    console.error("One or more elements were not found!");
}

blankBtn.addEventListener("click", () => {
    console.log("Button clicked!");

    let answer = blankInput.value.trim().toUpperCase();
    console.log("Input Value:", answer);

    if (answer === "CAN'T HELP FALLING IN LOVE" || answer === "CANT HELP FALLING IN LOVE") {
        console.log("Correct Answer!");

        blankCover.offsetHeight;  // **Force CSS recalculation**
        
        console.log("Applying class to blankCover:", blankCover);
        blankCover.classList.add("revealBlankCover");

        setTimeout(() => {
            console.log("Applying class to blankClue:", blankClue);
            blankClue.classList.add("showBlankClue");
            console.log("Next clue revealed!");
        }, 1000);
    } else {
        console.log("Wrong Answer! Try again.");
    }
});


// anagram animation
let anagramText=document.getElementById("anagramtext");
let anagramSubmit=document.getElementById("anagramsubmit");

anagramSubmit.addEventListener("click",()=>{
    let answer=anagramText.value.trim().toUpperCase();

    if(answer === "NOTTING-HILL" || answer === "NOTTING HILL"){
        handlePuzzleAnimation();
    }
    else{
        alert("Wrong answer");
    }
})

function handlePuzzleAnimation(){
    let coverScreenPuzzle=document.getElementById("coverScreenPuzzle");

    coverScreenPuzzle.classList.add("revealPuzzleCover");


}

// wine button
let wineBtn=document.getElementById("wine");
wineBtn.addEventListener("click",()=>{
    window.location.href = "finalpage.html"; 
});
