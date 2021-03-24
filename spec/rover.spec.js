const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {



  // 7 tests here!
it('constructor sets position and default values for mode and generatorWatts',function(){
  let rover = new Rover(87382098);
expect(rover.position).toEqual(87382098)
expect(rover.generatorWatts).toEqual(110)
expect(rover.mode).toEqual('NORMAL')

  });


it('response returned by receiveMessage contains name of message',function(){
let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
let message = new Message('Test message with two commands', commands);
let rover = new Rover(98382);   
let response = rover.receiveMessage(message);
expect (response.message).toEqual('Test message with two commands')


});


it('response returned by receiveMessage includes two results if two commands are sent in the message',function(){
let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')]; 
let message = new Message('Two commands sent', commands);
let rover = new Rover(98382); 
let response = rover.receiveMessage(message);
expect (response.message).toEqual('Two commands sent')

});

it('responds correctly to status check command',function(){

  let commands = [new Command('STATUS_CHECK')]; 
let message = new Message('Commands sent', commands);
let rover = new Rover(98382); 
let response = rover.receiveMessage(message);
expect(response.results[0].completed).toEqual(true)
});

it('responds correctly to mode change command',function(){

  let commands = [new Command('MODE_CHANGE')]; 
let message = new Message('Commands sent', commands);
let rover = new Rover(98382); 
let response = rover.receiveMessage(message);
expect(response.results[0].completed).toEqual(true)

});


it('responds with false completed value when attempting to move in LOW_POWER mode',function(){
 


let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', 1)]; 
let message = new Message('Two commands sent', commands);
let rover = new Rover(98382); 
let response = rover.receiveMessage(message);
expect(response.results[1].completed).toEqual(false)
   

});

it('responds with position for move command',function(){


  let commands = [new Command('MOVE',2),new Command('STATUS_CHECK')]; 
let message = new Message('Commands sent', commands);
let rover = new Rover(98382); 
let response = rover.receiveMessage(message);
expect(response.results[1].roverStatus.position).toEqual(2)


});

});













