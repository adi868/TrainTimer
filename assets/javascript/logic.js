 // Web app's Firebase configuration
 //this is the personal firebase link
 var config = {
   apiKey: "AIzaSyD28uSCKgqakhIMx7QbRGh467YgPV7eU3I",
   authDomain: "trainschedule-bcb72.firebaseapp.com",
   databaseURL: "https://trainschedule-bcb72.firebaseio.com",
   projectId: "trainschedule-bcb72",
   storageBucket: "trainschedule-bcb72.appspot.com",
   messagingSenderId: "681248701692",
   appId: "1:681248701692:web:e67e6af0d9b25ff0"
 };
 // Initialize Firebase
 firebase.initializeApp(config);

 // Create a variable to reference the database.
 var database = firebase.database();

 ///////////////////////////////////////////////////////////////////
 //add new information with button
 $("#add-train-btn").on("click", function (event) {
   event.preventDefault();
   console.log("button clicked ayy!");

   var trainName = $("#train-name-input").val().trim();
   var trainDestination = $("#location-input").val().trim();
   var trainFrequency = $("#frequency-input").val().trim();
   var trainFirst = $("#start-input").val().trim();

   // Creates local "temporary" object for holding data
   var newInfo = {
     name: trainName,
     location: trainDestination,
     first: trainFirst,
     frequency: trainFrequency
   };

   //uploads new info train data to the database
   database.ref().push(newInfo);

   console.log(newInfo.name);
   console.log(newInfo.frequency);
   console.log(newInfo.location);
   console.log(newInfo.first);

   alert("New train successfully added!");

   // Clears all of the text-boxes
   $("#train-name-input").val("");
   $("#location-input").val("");
   $("#frequency-input").val("");
   $("#start-input").val("");
 });
 ////////////////////////////////////////////////////////////////////


 // Create Firebase event for adding train to the database and a row in the html when a user adds an entry
 database.ref().on("child_added", function (childSnapshot) {
   var trainInfo = childSnapshot.val();
   console.log(trainInfo);
   //removes the stored data
   database.ref().remove()
    var trainName = $("#train-name-input").val();
    var trainDestination = $("#location-input").val();
    var trainFirst = $("#start-input").val();
    var trainFrequency = $("#frequency-input").val();

   var trainName = childSnapshot.val().name;
   var trainDestination = childSnapshot.val().location;
   var trainFirst = childSnapshot.val().first;
   var trainFrequency = childSnapshot.val().frequency;

   console.log(trainName);
   console.log(trainDestination);
   console.log(trainFirst);
   console.log(trainFrequency);
//calculate the next time for the train to arrive
var initialCalcArrive = moment(trainFirst, "HH:mm").subtract(1, "years");
console.log(initialCalcArrive)
//get the current time
var currentTime = moment();
console.log("Current time is: "+ currentTime.format("hh:mm"));

//gets the difference between the minutes
var diffTime = currentTime.diff(initialCalcArrive, "minutes");
console.log("Difference in time: " + diffTime);

//calculates the time apart(the remainder)
var tRemainder = diffTime % trainFrequency;
console.log (tRemainder);

//the number of minutes until the next train
var minAway = trainFrequency - tRemainder;
console.log("Train minutes away: " + minAway)

//time that the next train arrives
var nextArrive = moment().add(minAway, "minutes");
var nextTrainFormat = moment(nextArrive).format("hh:mm");
console.log("Arrival time for the next train is: " + moment(nextArrive).format("hh:mm"));

   //create the new row
   var newRow = $("<tr>").append(
     $("<td>").html(trainName),
     $("<td>").html(trainDestination),
     $("<td>").html(trainFrequency),
     $("<td>").html(nextTrainFormat),
     $("<td>").html(minAway),
   );

   // Append the new row to the table
   $("#train-scheduler").append(newRow);
   
 });
