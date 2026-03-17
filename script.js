let balance = 0
let period = 1001
let time = 30

let betType = ""
let betValue = ""
let betAmount = 0

function openPage(p){

document.getElementById("gamePage").classList.add("hidden")
document.getElementById("supportPage").classList.add("hidden")
document.getElementById("accountPage").classList.add("hidden")

document.getElementById(p).classList.remove("hidden")

}

function recharge(){

let amt = prompt("Enter recharge amount")

if(!amt) return

balance += Number(amt)

updateBalance()

let li = document.createElement("li")
li.innerText = "₹"+amt

document.getElementById("depositHistory").appendChild(li)

}

function updateBalance(){

document.getElementById("balance").innerText = balance
document.getElementById("balance2").innerText = balance

}

function betColor(c){

let amt = prompt("Enter bet amount")

if(!amt) return

amt = Number(amt)

if(balance < amt){
alert("Not enough balance")
return
}

balance -= amt
updateBalance()

betType = "color"
betValue = c
betAmount = amt

addBet(c,amt)

}

function betNumber(n){

let amt = prompt("Enter bet amount")

if(!amt) return

amt = Number(amt)

if(balance < amt){
alert("Not enough balance")
return
}

balance -= amt
updateBalance()

betType = "number"
betValue = n
betAmount = amt

addBet("Number "+n,amt)

}

function addBet(type,amt){

let table = document.getElementById("betHistory")

let row = table.insertRow(1)

row.insertCell(0).innerText = type
row.insertCell(1).innerText = amt

}

setInterval(function(){

time--

document.getElementById("timer").innerText = time

if(time==0){

generateResult()

time = 30
period++

document.getElementById("period").innerText = period
document.getElementById("next").innerText = period+1

}

},1000)

function generateResult(){

let num = Math.floor(Math.random()*10)

let color=""

if(num==0){
color="red+violet"
}
else if(num==5){
color="green+violet"
}
else if(num%2==0){
color="red"
}
else{
color="green"
}

document.getElementById("result").innerText = num

checkWin(num,color)

addHistory(num,color)

betType=""
betValue=""
betAmount=0

}

function checkWin(num,color){

if(betType=="color"){

if(betValue=="red" && (color=="red" || color=="red+violet")){
balance += betAmount * 1.95
}

if(betValue=="green" && (color=="green" || color=="green+violet")){
balance += betAmount * 1.95
}

if(betValue=="violet" && (color=="red+violet" || color=="green+violet")){
balance += betAmount * 4.5
}

}

if(betType=="number"){

if(betValue==num){
balance += betAmount * 8
}

}

updateBalance()

}

function addHistory(num,color){

let table = document.getElementById("history")

let row = table.insertRow(1)

row.insertCell(0).innerText = period
row.insertCell(1).innerText = num
row.insertCell(2).innerText = color

}

function showReferral(){

let link="https://yourgame.com/ref123"

navigator.share({
title:"Join Game",
text:"Play and earn",
url:link
})

}