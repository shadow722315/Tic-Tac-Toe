



const boxes = document.querySelectorAll('.box');
const Ximg = document.querySelector(".X");
const Oimg = document.querySelector(".O");
const Wintext = document.querySelector(".textWin");
const Drawtext = document.querySelector(".textDraw");
const Losttext = document.querySelector(".textLost");
const PlayButton = document.querySelector(".button");
const grids = document.querySelector(".grid");


const board = ["", "", "",
    "", "", "",
    "", "", ""];


let game = true
let NotDraw = true




let currentPlayer = "X";

boxes.forEach((div, idx) => {
    div.addEventListener("click", (e) => {

        if (game === false) return;

        if (div.classList.contains("Xcl") || div.classList.contains("Ocl")) {
            return
        };

        if (board[idx] !== "") {
            return
        };

        if (currentPlayer == "X") {
            let ClonedX = Ximg.cloneNode(true);
            ClonedX.style.visibility = "visible";
            ClonedX.classList.add("active");
            div.appendChild(ClonedX);

            div.classList.add("Xcl");
            board[idx] = "X";
            currentPlayer = "O";

            checkWin();

            if (game) {setTimeout(bot, 600)};

        }


    });
});



const winningcombinations = [[0, 1, 2], [3, 4, 5], [6, 7, 8],
[0, 3, 6], [1, 4, 7], [2, 5, 8],
[0, 4, 8], [2, 4, 6]];


function checkWin() {
    for (let i = 0; i < winningcombinations.length; i++) {
        let combo = winningcombinations[i];
        let a = combo[0];
        let b = combo[1];
        let c = combo[2];

        if (board[a] == "" || board[b] == "" || board[c] == "") {
            continue;
        }

        // Win Check
        if (board[a] == board[b] && board[b] == board[c]) {
            boxes[a].classList.add("winner");
            boxes[b].classList.add("winner");
            boxes[c].classList.add("winner");

            game = false;
            grids.classList.add("PlayAgain_SlideUp");

            if (board[a] === "X") {
                console.log("You won!");
                setTimeout(() => {
                    Wintext.classList.add("PlayAgain1");
                }, 300);
            } else if (board[a] === "O") {
                console.log("You lost!");
                setTimeout(() => {
                    document.querySelector(".textLost").classList.add("PlayAgain1");
                }, 300);
            }

            setTimeout(() => {
                PlayButton.classList.add("PlayAgain2");
            }, 500);

            return;
        }
    }

    // Draw Check
    if (!board.includes("") && game) {
        console.log("Draw!");
        game = false;
        grids.classList.add("PlayAgain_SlideUp");

        setTimeout(() => {
            Drawtext.classList.add("PlayAgain1");
        }, 300);

        setTimeout(() => {
            PlayButton.classList.add("PlayAgain2");
        }, 500);
    }
}



PlayButton.addEventListener("click", () => {

    for (let i = 0; i < board.length; i++) {
        board[i] = "";
    }


    boxes.forEach((div) => {
        div.innerHTML = ""; // remove X/O elements
        div.classList.remove("Xcl", "Ocl", "winner");
    });


    game = true;
    currentPlayer = "X";

    // hide texts and button
    Wintext.classList.remove("PlayAgain1");
    Drawtext.classList.remove("PlayAgain1");
    Losttext.classList.remove("PlayAgain1")

    PlayButton.classList.remove("PlayAgain2");

    // reset grid position
    setTimeout(() => {
        grids.classList.remove("PlayAgain_SlideUp");
    }, 200);

});






// Bot Normal Mode
function bot() {


    //1. Win
        for (let i = 0; i < winningcombinations.length; i++) {
        let combo = winningcombinations[i];
        let a = combo[0];
        let b = combo[1];
        let c = combo[2];

        
        if (board[a] === "O" && board[b] === "O" && board[c] === "") {
            placeO(c);
 
            return;
        }
        if (board[a] === "O" && board[c] === "O" && board[b] === "") {
            placeO(b);

            return;
        }
        if (board[b] === "O" && board[c] === "O" && board[a] === "") {
            placeO(a);

            return;
        }
    }


        // Block
        for (let i = 0; i < winningcombinations.length; i++) {
        let combo = winningcombinations[i];
        let a = combo[0];
        let b = combo[1];
        let c = combo[2];

        
        if (board[a] === "X" && board[b] === "X" && board[c] === "") {
            placeO(c);

            return;
        }
        if (board[a] === "X" && board[c] === "X" && board[b] === "") {
            placeO(b);

            return;
        }
        if (board[b] === "X" && board[c] === "X" && board[a] === "") {
            placeO(a);

            return;
        }
    }




    // 3. Center check
    if (board[4] === "") {
        placeO(4);
        console.log("Bot took the center!");
        return;
    }

    // 4. Corner check
    for (let i = 0; i < board.length; i++) {
        if (i === 0 || i === 2 || i === 6 || i === 8) {
            if (board[i] === "") {
                placeO(i);
                console.log("Bot took the corner");
                return;
            }
        }
    }
}

// place function to keep it clean
function placeO(idx) {
    let div = boxes[idx];
    let ClonedO = Oimg.cloneNode(true);
    ClonedO.style.visibility = "visible";
    ClonedO.classList.add("active");
    div.appendChild(ClonedO);

    div.classList.add("Ocl");
    board[idx] = "O";
    currentPlayer = "X";

    checkWin();

}


