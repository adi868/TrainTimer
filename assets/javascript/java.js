 // Web app's Firebase configuration
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
   //  var trainName = $("#train-name-input").val();
   //  var trainDestination = $("#location-input").val();
   //  var trainFirst = $("#start-input").val();
   //  var trainFrequency = $("#frequency-input").val();

   var trainName = childSnapshot.val().name;
   var trainDestination = childSnapshot.val().location;
   var trainFirst = childSnapshot.val().first;
   var trainFrequency = childSnapshot.val().frequency;

   console.log(trainName);
   console.log(trainDestination);
   console.log(trainFirst);
   console.log(trainFrequency);

   //create the new row
   var newRow = $("<tr>").append(
     $("<td>").html(trainName),
     $("<td>").html(trainDestination),
     $("<td>").html(trainFirst),
     $("<td>").html(trainFrequency),
   );

   // Append the new row to the table
   $("#train-scheduler").append(newRow);
 });

 //  var now = moment();
 //  console.log(now);
 //  var difference = moment().diff(moment(firstTrain), "minutes");
 //  console.log("Difference: ", difference);
 //  var remainder = difference % trainInfo.trainFrequency;
 //  console.log(remainder);
 //  var minutes = trainInfo.trainFrequency - remainder;

 //  var minutesCol = $("<td>").attr("class", "minutes-away");
 //  $(minutesCol).html(minutes);

 //  var newTrain = moment().add(minutes, "minutes");
 //  var newTrainFormat = moment(newTrain).format("HH:mm");
 //  console.log("NEW TIME FORMAT!!", newTrainFormat);
 //  var newTrainCol = $("<td>").attr("class", "train-next");
 //  newTrainCol.html(newTrainFormat);


 //date code

 // date = "03/12/2019";
 // format = "MM/DD/YYYY";
 // convertedDate = moment(date, "MM/DD/YYYY");

 // convertedDate.diff(moment(), "days");
 //timeNow = moment().format("MMM Do, YYYY hh:mm:ss");