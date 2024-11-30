let card  = new Audio("pokerCard.wav");
let buttonM  = new Audio("button.wav");
let blackjackM  = new Audio("blackjack.wav");
let loseM  = new Audio("lose.wav");
let winM  = new Audio("win.wav");


let naturalCount = 0;
let p2naturalCount = 0;
let p3naturalCount = 0;
let dlnaturalCount = 0;

function closeDiv() {
  const audio = document.getElementById("bgMusic");
  audio.volume = 0.5;
  audio.play()
  let welcomeDiv = document.getElementById("welcomeDiv");
  welcomeDiv.style.display = "none";
  document.getElementById("startBtn").style.display = "block";
}

function startGambling() {
  buttonM.play();
  document.getElementById("startBtn").style.display = "none";
  document.getElementById("dealer").style.display = "block";
  document.getElementById("player2").style.display = "block"; // Show player 2 div
  document.getElementById("player3").style.display = "block"; // Show player 3 div
  document.getElementById("player1").style.display = "block"; // Show player 3 div
  document.getElementById("betbox1").style.display = "block"; // Show player 2 div
  document.getElementById("betbox2").style.display = "block"; // Show player 3 div
  document.getElementById("betbox3").style.display = "block"; // Show player 3 div
  document.getElementById("betButton").style.display = "block"; // Show player 3 div
}

let bet = 0;

function placeBet() {
  let audio = new Audio("coin.wav");
  audio.play();
  document.getElementById("betButton").style.display = "none";
  document.getElementById("chipContainer").style.display = "block";
}

function playerBet() {
  let bet = [10, 50, 100, 500];
  let n = Math.floor(Math.random() * bet.length);

  return bet[n];
}

let p2bet = playerBet();
let p3bet = playerBet();

function setBet(value) {
  let audio = new Audio("coin.wav");
  audio.play();

  bet = value; // Assign the chip's value to the bet

  document.getElementById("chipContainer").style.display = "none";
  document.getElementById("betbox1").innerHTML = bet; // Show player 2 div
  document.getElementById("betbox2").innerHTML = p2bet; // Show player 2 div
  document.getElementById("betbox3").innerHTML = p3bet; // Show player 2 div

  document.getElementById("dealCardsBtn").style.display = "block";
}

let suits = ["Club", "Diamond", "Heart", "Spade"];
let ranks = [
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  "Jack",
  "Queen",
  "King",
  "Ace"
];

// Create the deck
let deck = [];
for (let suit of suits) {
  for (let rank of ranks) {
    deck.push(`${rank} of ${suit}`);
  }
}

// Shuffle the deck
function shuffleDeck(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[randomIndex]] = [deck[randomIndex], deck[i]];
  }
  return deck;
}
shuffleDeck(deck);

let dlCard = [];
let pl1Card = [];
let pl2Card = [];
let pl3Card = [];

function dealCard(playerCards, numCards) {
  if (deck.length < numCards) {
    console.error("Not enough cards left in the deck!");
    return;
  }
  for (let i = 0; i < numCards; i++) {
    const card = deck.pop(); // Remove a card from the deck
    playerCards.push(card);  // Add the card to the player's hand
  }
}

function displayCards(playerCards, playerDivId) {
  const playerCardsDiv = document.getElementById(playerDivId);
  playerCardsDiv.innerHTML = ""; // Clear previous cards

  playerCards.forEach((card, index) => {
    const [rank, , suit] = card.split(" "); // Split card into rank and suit

    const cardDiv = document.createElement("div");
    cardDiv.className = "card";
    cardDiv.style.left = `${index * 52}px`; // Slight overlap between cards

    // Create suit div
    const suitDiv = document.createElement("div");
    suitDiv.className = "card-suit";
    suitDiv.innerText = suit;

    // Create rank div
    const rankDiv = document.createElement("div");
    rankDiv.className = "card-rank";
    rankDiv.innerText = rank;

    // Append suit and rank to card
    cardDiv.appendChild(suitDiv);
    cardDiv.appendChild(rankDiv);

    // Append card to player div
    playerCardsDiv.appendChild(cardDiv);
  });
}

function calculatePoints(playerCards) {
  let total = 0;
  let aceCount = 0;

  // Calculate initial total and count Aces
  playerCards.forEach(card => {
    const [rank] = card.split(" "); // Extract the rank
    if (["Jack", "Queen", "King"].includes(rank)) {
      total += 10; // Face cards are worth 10 points
    } else if (rank === "Ace") {
      aceCount += 1; // Count Aces separately
      total += 11;   // Initially, Ace is worth 11 points
    } else {
      total += parseInt(rank, 10); // Numeric cards add their face value
    }
  });

  // Adjust Aces from 11 to 1 if total exceeds 21
  while (total > 21 && aceCount > 0) {
    total -= 10; // Adjust one Ace to be worth 1 point
    aceCount -= 1;
  }

  return total;
}


let ddCount = 0;
let p2ddCount = 0;
let p3ddCount = 0;

let insCount = 0;
let p2insCount = 0;
let p3insCount = 0;
let ins = 0;
let p2ins = 0;
let p3ins = 0;

// Double Down 按钮显示
function doubleDownBtn() {
  document.getElementById("ddBtn").style.display = "block";
  document.getElementById("ddnoBtn").style.display = "block";
}

// 不进行 Double Down
function nodd() {
  document.getElementById("ddBtn").style.display = "none"; // 隐藏按钮
  document.getElementById("ddnoBtn").style.display = "none"; // 隐藏按钮
}

// Double Down 操作
function doubleDown() {
  let audio = new Audio("coinNotification.wav");
  audio.play();
// 加倍下注金额
  ddCount += 1; // 增加玩家 Double Down 次数
  document.getElementById("betbox1").innerHTML = bet; // 更新显示的下注金额
  nodd();
}



// Insurance 按钮显示
function insuranceBtn() {
  document.getElementById("inBtn").style.display = "block";
  document.getElementById("innoBtn").style.display = "block";
}

function noin() {
  document.getElementById("inBtn").style.display = "none"; // 隐藏按钮
  document.getElementById("innoBtn").style.display = "none"; // 隐藏按钮
}
// Double Down 操作
function insurance() {
  let audio = new Audio("coinNotification.wav");
  audio.play();

  ins = bet / 2
  bet += ins; // 加倍下注金额
  insCount += 1; // 增加玩家 Double Down 次数
  document.getElementById("betbox1").innerHTML = bet; // 更新显示的下注金额
  noin();
}

function p2p3ins(){
  document.getElementById("load").style.display = "block";
  document.getElementById("status").style.display = "block";
  document.getElementById("status").textContent = "Waiting for other players...";

  let r1 = Math.floor(Math.random() * 4);
  let r2 = Math.floor(Math.random() * 4);

  if (r1 < 3) {
    let audio = new Audio("coinNotification.wav");
    audio.play();
    p2ins = p2bet / 2
    p2bet += p2ins; // 加倍下注金额
    p2insCount += 1; // 增加玩家 Double Down 次数
    document.getElementById("betbox2").innerHTML = p2bet; // 更新显示的下注金额
  }
  if (r2 < 3) {
    let audio = new Audio("coinNotification.wav");
    audio.play();
    p3ins = p3bet / 2
    p3bet += p3ins; // 加倍下注金额
    p3insCount += 1; // 增加玩家 Double Down 次数
    document.getElementById("betbox3").innerHTML = p3bet; // 更新显示的下注金额
  }

  setTimeout(() => {
        document.getElementById("load").style.display = "none";
        document.getElementById("status").style.display = "none";
        
  }, 3500); 
}

// First round: deal one card to the dealer and display it
async function firstDeal() {

  // Ensure all card display divs are visible
  document.getElementById("dealerCards").style.display = "block";
  document.getElementById("player1Card").style.display = "block";
  document.getElementById("player2Card").style.display = "block";
  document.getElementById("player3Card").style.display = "block";

  // Deal cards
  dealCard(dlCard, 1);   // Dealer gets 1 card
  dealCard(pl1Card, 2);  // Player 1 gets 1 card
  dealCard(pl2Card, 2);  // Player 2 gets 1 card
  dealCard(pl3Card, 2);  // Player 3 gets 1 card

  // Display cards
  displayCards(dlCard, "dealerCards");
  displayCards(pl1Card, "player1Card");
  displayCards(pl2Card, "player2Card");
  displayCards(pl3Card, "player3Card");

  dlPts = calculatePoints(dlCard);
  pl1Pts = calculatePoints(pl1Card);
  pl2Pts = calculatePoints(pl2Card);
  pl3Pts = calculatePoints(pl3Card);

  document.getElementById("dealCardsBtn").style.display = "none";


  if (pl1Pts === 11) {
  doubleDownBtn(); // Show Player 1's Double Down button

  // Add a delay before checking Player 2 and Player 3
  setTimeout(() => {
    if (pl2Pts === 11 || pl3Pts === 11) {
      pl23dd(); // Show Player 2 and Player 3's Double Down buttons
    }
  }, 4000); // Delay in milliseconds (2 seconds in this example)
  } 
  else if (pl2Pts === 11 || pl3Pts === 11) {
    pl23dd(); // If Player 1's condition is not met, directly check Player 2 and Player 3
  }

}
//???
async function firstRound() {
  let audio = new Audio("cardHit.wav");
  audio.play();

  await firstDeal(); // 等待 firstRound 完成

  // 在 firstDeal 执行后检查 dlCard 的第一张牌
  let card = dlCard[0];
  let [rank] = card.split(" "); 
 
  // 如果第一张牌是 Ace，则显示保险按钮
  if (rank === "Ace") {
    if (pl1Pts === 11 || pl2Pts === 11 || pl3Pts === 11) {
      // Delay only when there's Ace and a player's points equal 11
      setTimeout(() => {
        insuranceBtn();
        setTimeout(() => {
          p2p3ins();
        }, 4500);
      }, 6500);
    } else {
      // No delay for Ace alone
      insuranceBtn();
      setTimeout(() => {
        p2p3ins();
      }, 4500);

    }
  }
}


function pl23dd(){
  document.getElementById("load").style.display = "block";
  document.getElementById("status").style.display = "block";
  document.getElementById("status").textContent = "Waiting for other players...";
  let audio = new Audio("coinNotification.wav");

  // 玩家 2 和 玩家 3 的随机 Double Down 逻辑
  let r1 = Math.floor(Math.random() * 4);
  let r2 = Math.floor(Math.random() * 4);

  if (pl2Pts === 11) {
    if (r1 < 3) {
      audio.play();
      p2bet *= 2; // 玩家 2 加倍下注
      p2ddCount += 1; // 增加 Double Down 次数
    }
  }
  if (pl3Pts === 11) {
    if (r2 < 3) {
      audio.play();
      p3bet *= 2; // 玩家 3 加倍下注
      p3ddCount += 1; // 增加 Double Down 次数
    }
  }

  // 更新玩家 2 和 玩家 3 的下注金额显示
  document.getElementById("betbox2").innerHTML = p2bet;
  document.getElementById("betbox3").innerHTML = p3bet;

  setTimeout(() => {
        document.getElementById("load").style.display = "none";
        document.getElementById("status").style.display = "none";
        
  }, 3500); 
}
let pl1TurnDone = false; 
let pl2TurnDone = false; 
let pl3TurnDone = false; 

async function pl2(){
  alert('Player2 Turn')
  blackjack(pl2Pts,"player2",pl2Card,p2naturalCount)
  let startTime = Date.now(); // Record the start time
  let audio = new Audio("coinNotification.wav");

  document.getElementById("load").style.display = "block";
  document.getElementById("status").style.display = "block";
  document.getElementById("status").textContent = "Waiting for other players...";

  let r1 = Math.floor(Math.random() * 4);
  pl2Pts = calculatePoints(pl2Card);
  if (p2ddCount != 0){
    if(r1 < 3){
      card.play();
      p2ddCount -= 1;
      dealCard(pl2Card, 1);
      displayCards(pl2Card, "player2Card");
      pl2Pts = calculatePoints(pl2Card);
      pl2TurnDone = true;

    }
    else{
      card.play();
      p2ddCount -= 1;
      p2bet *= 2;
      dealCard(pl2Card, 1);
      displayCards(pl2Card, "player2Card");
      pl2Pts = calculatePoints(pl2Card);
      pl2TurnDone = true;
    }
  }
  else if(p2ddCount == 0 && p2ddCount <= 17){
    while(pl2Pts <= 17){
      card.play();
      dealCard(pl2Card, 1);
      displayCards(pl2Card, "player2Card");
      pl2Pts = calculatePoints(pl2Card);

    }
    pl2TurnDone = true;
  }
  else if(pl2Pts > 17 && pl2Pts < 21){
    if(r1 < 2){
      card.play();
      dealCard(pl2Card, 1);
      displayCards(pl2Card, "player2Card");
      pl2Pts = calculatePoints(pl2Card);
      pl2TurnDone = true;
    }
    else if(r1 == 0 || r1 == 3){
      audio.play();
      dealCard(pl2Card, 1);
      displayCards(pl2Card, "player2Card");
      pl2Pts = calculatePoints(pl2Card);
      pl2TurnDone = true;
      p2bet *= 2; // 玩家 2 加倍下注
      document.getElementById("betbox2").innerHTML = p2bet;
    }
    else{
      pl2TurnDone = true;
    }
  }
  else if(pl2Pts >= 21){
    pl2TurnDone = true;
  }
  else{
    pl2TurnDone = true;
  }
  let elapsedTime = Date.now() - startTime;
  let remainingTime = 4000 - elapsedTime;

  if (remainingTime > 0) {
    await new Promise(resolve => setTimeout(resolve, remainingTime));
  }

  // Wait for Player 2's turn to be marked as done
  await new Promise((resolve) => {
    const checkTurnInterval = setInterval(() => {
      if (pl2TurnDone) {
        clearInterval(checkTurnInterval); // Stop checking once Player 3 is done
        resolve(); // Allow the game to proceed
      }
    }, 100); // Check every 100ms
  });
  
  // Hide the loader and status after 4 seconds
  if(pl2TurnDone){
    document.getElementById("load").style.display = "none";
    document.getElementById("status").style.display = "none";

  }
  
}

async function pl3(){
  alert('Player3 Turn')
  blackjack(pl3Pts,"player3",pl3Card,p3naturalCount)
  let startTime = Date.now(); // Record the start time
  let audio = new Audio("coinNotification.wav");
  document.getElementById("load").style.display = "block";
  document.getElementById("status").style.display = "block";
  document.getElementById("status").textContent = "Waiting for other players...";

  let r1 = Math.floor(Math.random() * 4);
  pl3Pts = calculatePoints(pl3Card);
  if (p3ddCount != 0){
    if(r1 < 3){
      card.play();
      p3ddCount -= 1;
      dealCard(pl3Card, 1);
      displayCards(pl3Card, "player3Card");
      pl3Pts = calculatePoints(pl3Card);
      pl3TurnDone = true;

    }
    else{
      card.play();
      p3ddCount -= 1;
      p3bet *= 2;
      dealCard(pl3Card, 1);
      displayCards(pl3Card, "player3Card");
      pl3Pts = calculatePoints(pl3Card);
      pl3TurnDone = true;
    }
  }
  else if(p3ddCount == 0 && p3ddCount <= 17){
    while(pl3Pts <= 17){
      card.play();
      dealCard(pl3Card, 1);
      displayCards(pl3Card, "player3Card");
      pl3Pts = calculatePoints(pl3Card);

    }
    pl3TurnDone = true;
  }
  else if(pl3Pts > 17 && pl3Pts < 21){
    card.play();
    if(r1 < 2){
      dealCard(pl3Card, 1);
      displayCards(pl3Card, "player3Card");
      pl3Pts = calculatePoints(pl3Card);
      pl3TurnDone = true;
    }
    else if(r1 == 0 || r1 == 3){
      audio.play();
      dealCard(pl3Card, 1);
      displayCards(pl3Card, "player3Card");
      pl3Pts = calculatePoints(pl3Card);
      pl3TurnDone = true;
      p3bet *= 2; // 玩家 2 加倍下注
      document.getElementById("betbox3").innerHTML = p3bet;

    }
    else{
      pl3TurnDone = true;
    }
  }
  else if(pl3Pts >= 21){
    pl3TurnDone = true;
  }
  else{
    pl3TurnDone = true;
  }
  let elapsedTime = Date.now() - startTime;
  let remainingTime = 4000 - elapsedTime;

  if (remainingTime > 0) {
    await new Promise(resolve => setTimeout(resolve, remainingTime));
  }

  // Wait for Player 3's turn to be marked as done
  await new Promise((resolve) => {
    const checkTurnInterval = setInterval(() => {
      if (pl3TurnDone) {
        clearInterval(checkTurnInterval); // Stop checking once Player 3 is done
        resolve(); // Allow the game to proceed
      }
    }, 100); // Check every 100ms
  });

  // Hide the loader and status after 4 seconds
  if(pl3TurnDone){
    document.getElementById("load").style.display = "none";
    document.getElementById("status").style.display = "none";

  }
  
}

function hit(){
  card.play();
  dealCard(pl1Card, 1);
  displayCards(pl1Card, "player1Card");
  pl1Pts = calculatePoints(pl1Card);

  if (pl1Pts >= 21) {
    document.getElementById('hit').style.display = 'none'; // Show "stand" button
    document.getElementById('double').style.display = 'none'; // Show "stand" button
  }
}

function stand(){
  buttonM.play();
  pl1TurnDone = true; // Mark Player 1's turn as done
  document.getElementById("choices").style.display = "none"; // Hide choices
}

function double(){
  let audio = new Audio("coinNotification.wav");
  audio.play();
  card.play();
  dealCard(pl1Card, 1);
  bet *= 2;
  displayCards(pl1Card, "player1Card");
  pl1Pts = calculatePoints(pl1Card);
  document.getElementById("betbox1").innerHTML = bet;
  document.getElementById('hit').style.display = 'none'; // Show "stand" button
  document.getElementById('double').style.display = 'none'; // Show "stand" button

}
async function pl1() {
  alert('Your Turn')
  // If Player 1 has Double Down activated (ddCount == 1), show only the "hit" option
  if (pl1Pts == 21){
    pl1TurnDone = true;
    blackjack(pl1Pts,"player1",pl1Card,naturalCount)
  }
  if (ddCount == 1) {
    ddCount -= 1;
    document.getElementById('choices').style.display = 'block'; 
    document.getElementById('hit').style.display = 'none'; // 

  } 
  else {
    document.getElementById("choices").style.display = "block"; // Show both "hit" and "stand" options
  }

  // Wait for Player 1's turn to finish before continuing
  await new Promise((resolve) => {
    const checkTurnInterval = setInterval(() => {
      if (pl1TurnDone) {
        clearInterval(checkTurnInterval); // Stop checking once Player 1 is done
        resolve(); // Allow the game to proceed
      }
    }, 100); // Check every 100ms
  });

  // Player 1's points calculation (done after they have finished their turn)
  pl1Pts = calculatePoints(pl1Card);
}


async function playerChoice() {
  // Store function references (not their results)
  let allPlayers = [pl1, pl2, pl3];
  allPlayers.sort(() => Math.random() - 0.5);

  // Randomize the order
  document.getElementById("choices").style.display = "none"; // Hide choices

  for (let playerFunc of allPlayers) {
    if (playerFunc === pl1) {
      // Wait for Player 1 to finish before continuing
      await playerFunc(); // Ensures that Player 1's turn is done before moving to the next player
    } else {
      // For other players, proceed normally
      await playerFunc();
    }
  }
}

async function dealOneCard() {
  alert("Dealer deals one card")
  card.play();
  dealCard(dlCard, 1); // Deal a new card to the dealer

  displayCards(dlCard, "dealerCards");
  dlPts = calculatePoints(dlCard);
  natural(dlCard, dlnaturalCount)
}

async function checkOut(){
  alert("Check Out")
  dlPts = calculatePoints(dlCard);
  pl1Pts = calculatePoints(pl1Card);
  pl2Pts = calculatePoints(pl2Card);
  pl3Pts = calculatePoints(pl3Card);

  out(pl1Pts,"player1",pl1Card,naturalCount)
  out(pl2Pts,"player2",pl2Card,p2naturalCount)
  out(pl3Pts,"player3",pl3Card,p3naturalCount)
  out(dlPts,"dealer",dlCard,dlnaturalCount)
}

async function insCheck() {
  let audio = new Audio("coinNotification.wav");
  let lose = new Audio("loseMoney.wav");
  if (dlPts === 21) { // Dealer hits Blackjack
    if (insCount === 1) {
      audio.play(); // Play audio for winning insurance
      bet += ins;  // Add insurance payout to the bet
      ins *= 2;    // Double insurance
      insCount -= 1; // Reset insurance flag
    }
    if (p2insCount === 1) {
      audio.play();
      p2bet += p2ins;
      p2ins *= 2;
      p2insCount -= 1;
    }
    if (p3insCount === 1) {
      audio.play();
      p3bet += p3ins;
      p3ins *= 2;
      p3insCount -= 1;
    }
  } else { // Dealer does not hit Blackjack
    if (insCount === 1) {
      lose.play(); // Play audio for losing insurance
      bet -= ins;  // Deduct insurance amount
      ins = 0;     // Reset insurance
      insCount -= 1;
    }
    if (p2insCount === 1) {
      lose.play();
      p2bet -= p2ins;
      p2ins = 0;
      p2insCount -= 1;
    }
    if (p3insCount === 1) {
      lose.play();
      p3bet -= p3ins;
      p3ins = 0;
      p3insCount -= 1;
    }
  }
  document.getElementById("betbox1").innerHTML = bet;
  document.getElementById("betbox2").innerHTML = p2bet;
  document.getElementById("betbox3").innerHTML = p3bet;
}
async function win() {
  let total = 0;

  // 庄家爆牌
  if (dlPts > 21) {
    alert("Dealer is busted!");
    let survivingPlayers = [pl1Pts, pl2Pts, pl3Pts].filter(pts => pts <= 21);
    
    if (survivingPlayers.length === 0) {
      alert("No player survives! No one wins.");
      return;
    }

    // 收集所有失败玩家的筹码
    if (pl1Pts > 21) {
      total += bet;
      bet = 0;
    }
    if (pl2Pts > 21) {
      total += p2bet;
      p2bet = 0;
    }
    if (pl3Pts > 21) {
      total += p3bet;
      p3bet = 0;
    }

    // 平分筹码给所有未爆牌的玩家
    total = total / survivingPlayers.length;
    if (pl1Pts <= 21) bet += total;
    if (pl2Pts <= 21) p2bet += total;
    if (pl3Pts <= 21) p3bet += total;
  } 

  // 庄家未爆牌
  else {
    let n = 3; // 参与比较的玩家数量
    if (pl1Pts < dlPts || pl1Pts > 21) {
      total += bet;
      bet = 0;
      n--;
    }
    if (pl2Pts < dlPts || pl2Pts > 21) {
      total += p2bet;
      p2bet = 0;
      n--;
    }
    if (pl3Pts < dlPts || pl3Pts > 21) {
      total += p3bet;
      p3bet = 0;
      n--;
    }

    // 平分赢家筹码
    if (n > 0) {
      total = total / n;
      if (pl1Pts >= dlPts && pl1Pts <= 21) bet += total;
      if (pl2Pts >= dlPts && pl2Pts <= 21) p2bet += total;
      if (pl3Pts >= dlPts && pl3Pts <= 21) p3bet += total;
    }
  }

  // 处理 Natural Blackjack 的情况
  let naturalCountArray = [naturalCount, p2naturalCount, p3naturalCount, dlnaturalCount];
  let totalNaturalCount = naturalCountArray.filter(count => count === 1).length;
  if (totalNaturalCount > 0) {
    if (totalNaturalCount === 1) {
      // 如果只有一个 naturalCount
      let winningBet = bet + p2bet + p3bet;
      if (naturalCount === 1) {
        p1bet = winningBet;
        p2bet = p3bet = 0;
      }
      if (p2naturalCount === 1) {
        p2bet = winningBet;
        bet = p3bet = 0;
      }
      if (p3naturalCount === 1) {
        p3bet = winningBet;
        bet = p2bet = 0;
      }
      if (dlnaturalCount === 1) {
        bet = p2bet = p3bet = 0;
      }
    } else {
      // 如果有多个 naturalCount 平分筹码
      let winners = [];
      if (naturalCount === 1) winners.push("player1");
      if (p2naturalCount === 1) winners.push("player2");
      if (p3naturalCount === 1) winners.push("player3");
      if (dlnaturalCount === 1) winners.push("dealer");

      let totalBet = bet + p2bet + p3bet;
      let share = totalBet / winners.length;

      if (naturalCount === 1) bet += share;
      if (p2naturalCount === 1) p2bet += share;
      if (p3naturalCount === 1) p3bet += share;
    }
  } else {
    // 没有 natural blackjack 的情况下，检查是否有玩家点数为 21
    let playersWith21 = [pl1Pts, pl2Pts, pl3Pts].filter(pts => pts === 21);
    if (playersWith21.length === 1) {
      // 如果只有一个点数为 21 的玩家
      let winningBet = (bet - ins) + (p2bet - p2ins) + (p3bet - p3ins);
      if (pl1Pts === 21) {
        bet = winningBet;
        p2bet = p3bet = 0;
      } else if (pl2Pts === 21) {
        p2bet = winningBet;
        bet = p3bet = 0;
      } else if (pl3Pts === 21) {
        p3bet = winningBet;
        bet = p2bet = 0;
      }
    } else if (playersWith21.length > 1) {
      // 平分筹码
      let totalBet = bet + p2bet + p3bet;
      let share = totalBet / playersWith21.length;

      if (pl1Pts === 21) bet += share;
      if (pl2Pts === 21) p2bet += share;
      if (pl3Pts === 21) p3bet += share;
    }
  }

  // 更新界面
  document.getElementById("betbox1").innerHTML = bet;
  document.getElementById("betbox2").innerHTML = p2bet;
  document.getElementById("betbox3").innerHTML = p3bet;
}

async function end(playerPts, dlPts, bet, ins, player) {
  if (bet === 0 || playerPts > 21) {
    loseM.play();
    document.getElementById(player).innerHTML = "LOSE";
    document.getElementById(player).style.backgroundColor = "#494753";
  } else if (playerPts < dlPts && dlPts <= 21) {
    loseM.play();
    document.getElementById(player).innerHTML = "LOSE";
    document.getElementById(player).style.backgroundColor = "#494753";
  } else if (dlPts > 21 && playerPts <= 21){
    win.play();
    document.getElementById(player).innerHTML = "WIN";
    document.getElementById(player).style.backgroundColor = "#ff456f";
  } else if (playerPts > dlPts && playerPts <= 21){
    win.play();
    document.getElementById(player).innerHTML = "WIN";
    document.getElementById(player).style.backgroundColor = "#ff456f";
  }
}
async function out(playerPts,player,playerCard,count){
  blackjack(playerPts,player,playerCard,count)

  if (playerPts > 21){
    document.getElementById(player).style.backgroundColor = "#494753";
    document.getElementById(player).innerHTML = "Bust";
    loseM.play();
  }
}

async function runFunctions() {
  await playerChoice();

  if (dlPts === 11) {
    await dealOneCard();
  } else {
    while (dlPts < 17) {
      await dealOneCard();
    }
  }

  await insCheck();
  await win();
}
async function blackjack(playerPts,player,playerCard,count){
  if (playerPts == 21){
    blackjackM.play();
    natural(playerCard, count)
    document.getElementById('choices').style.display = "none";
    document.getElementById(player).style.backgroundColor = "#4677c8";
    document.getElementById(player).innerHTML = "Blackjack";
  }
}

function natural(playerCard, count) {
  let hasAce = playerCard.some(card => card.startsWith("Ace"));
  if (hasAce) {
    count += 0.5;
  }

  // 检查是否有Jack, Queen, 或 King
  let hasFaceCard = playerCard.some(card =>
    card.startsWith("Jack") || card.startsWith("Queen") || card.startsWith("King")
  );
  if (hasFaceCard) {
    count += 0.5;
  }

}

async function pp(){
  await runFunctions();
  await end(pl1Pts, dlPts, bet, ins, "player1");
  await end(pl2Pts, dlPts, p2bet, p2ins, "player2");
  await end(pl3Pts, dlPts, p3bet, p3ins, "player3");
}

window.onload = function() {
  const currentUser = sessionStorage.getItem('currentUser');
  // 检查是否有用户登录
  if (!currentUser) {
    window.location.href = 'login.html'; // 自动跳转到登录页面
    return; // 防止后续代码继续执行
  }

  // 获取用户数据
  const userData = JSON.parse(localStorage.getItem(currentUser));
  const username = currentUser;
  let score = userData ? userData.score : 0;

  console.log(`Welcome ${username}, your score is ${score}`);
};
