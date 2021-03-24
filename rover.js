class Rover {
  constructor(position) {
     if (!position) {
       throw Error("Postion required.");
     }
    this.position = position;
    this.mode = "NORMAL";
    this.generatorWatts = 110;
   }

receiveMessage(message) {
let result = {message:message.name,results:[]};

for (const command of message.commands)
 {
if (command.commandType == 'MOVE') {

if (this.mode == 'LOW_POWER'){
result.results.push({completed: false});
}
else {
  this.position = command.value;
  result.results.push({completed: true });}

}

else if (command.commandType == 'STATUS_CHECK') {
result.results.push(
{completed: true, roverStatus: {mode: this.mode, generatorWatts: this.generatorWatts, position: this.position}});

}

else if (command.commandType == 'MODE_CHANGE') {
  this.mode = command.value;
  result.results.push({completed: true});
}

else {
  result.results.push({completed: false}); 
} 
 }

return result;

}
}

module.exports = Rover;