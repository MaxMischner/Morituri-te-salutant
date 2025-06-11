let intervalIDs = [];
let i = 1;

function setStoppableInterval(fn,time){
    let id = setInterval(fn, time);
    intervalIDs.push(id);
}




console.log(intervalIDs)

function stopInterval() {
 intervalIDs.forEach(clearInterval);
}



function sayHallo() {
    console.log("Hallo " + i++)
}

function sayByeBye() {
    console.log("ByeBye " + i++)
}