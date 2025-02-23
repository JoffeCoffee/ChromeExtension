const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
let beanX, beanY, playerX, score, playerSpeed, level = 1, beanSpeed;
const playerWidth = 70;
let gameRunning = false;
const alertBox = document.getElementById("alert");

function initializeGame() {
    beanX = Math.random() * canvas.width;
    beanY = 0;
    playerX = canvas.width / 2;
    score = 0;
    playerSpeed = 50;
    beanSpeed = 3 + (level - 1);
    document.getElementById("score").innerText = score;
    document.getElementById("level").innerText = level;
    canvas.style.display = "block";
}

document.addEventListener("keydown", function(event) {
    if (!gameRunning) return;
    if (event.key === "ArrowLeft" && playerX > 0) {
        playerX -= playerSpeed;
    } else if (event.key === "ArrowRight" && playerX < canvas.width - playerWidth) {
        playerX += playerSpeed;
    }
});

function gameLoop() {
    if (!gameRunning) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = "brown";
    ctx.beginPath();
    ctx.arc(beanX, beanY, 10, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = "black";
    ctx.fillRect(playerX, canvas.height - 20, playerWidth, 10);
    
    beanY += beanSpeed;
    if (beanY > canvas.height - 20 && beanX > playerX && beanX < playerX + playerWidth) {
        beanY = 0;
        beanX = Math.random() * canvas.width;
        score++;
        document.getElementById("score").innerText = score;
        if (score >= 10) {
            level++;
            score = 0;
            document.getElementById("level").innerText = level;
            beanSpeed += 1;
            playerSpeed += 5;
        }
    } else if (beanY > canvas.height) {
        showAlert("Game over!\nYour final score: " + score);
        gameRunning = false;
        return;
    }
    requestAnimationFrame(gameLoop);
}

document.getElementById("startButton").addEventListener("click", function() {
    if (!gameRunning) {
        gameRunning = true;
        initializeGame();
        gameLoop();
    }
});

// Function to show alert box
function showAlert(text) {
    alertBox.classList.remove("hidden");
    document.getElementById("alertText").innerText = text
}

// Handle alert box close button event
document.getElementById("alertCloseBtn").addEventListener("click", function () {
    alertBox.classList.add("hidden");
});