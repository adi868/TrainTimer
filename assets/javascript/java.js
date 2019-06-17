

   // Your web app's Firebase configuration
   var firebaseConfig = {
    apiKey: "AIzaSyD28uSCKgqakhIMx7QbRGh467YgPV7eU3I",
    authDomain: "trainschedule-bcb72.firebaseapp.com",
    databaseURL: "https://trainschedule-bcb72.firebaseio.com",
    projectId: "trainschedule-bcb72",
    storageBucket: "trainschedule-bcb72.appspot.com",
    messagingSenderId: "681248701692",
    appId: "1:681248701692:web:e67e6af0d9b25ff0"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  // Create a variable to reference the database.
  var database = firebase.database();

  database.ref("/train_schedule").on(
    "child_added",
    function(snapshot) {
      var trainInfo = snapshot.val();
      console.log(trainInfo);

      var newRow = $("<tr>");
      var nameCol = $("<td>").attr("class", "train-name");
      var destinationCol = $("<td>").attr("class", "train-destination");
      var frequencyCol = $("<td>").attr("class", "train-frequency");
      var firstTrain = moment(trainInfo.trainFirst, "HH:mm").subtract(
        1,
        "months",
        console.log("FIRST TRAIN", firstTrain)
      );

      $(nameCol).html(trainInfo.trainName);
      $(destinationCol).html(trainInfo.trainDestination);
      $(frequencyCol).html(trainInfo.trainFrequency);

      
      var now = moment();
      console.log(now);
      var difference = moment().diff(moment(firstTrain), "minutes");
      console.log("Difference: ", difference);
      var remainder = difference % trainInfo.trainFrequency;
      console.log(remainder);
      var minutes = trainInfo.trainFrequency - remainder;

      var minutesCol = $("<td>").attr("class", "minutes-away");
      $(minutesCol).html(minutes);

      var newTrain = moment().add(minutes, "minutes");
      var newTrainFormat = moment(newTrain).format("HH:mm");
      console.log("NEW TIME FORMAT!!", newTrainFormat);
      var newTrainCol = $("<td>").attr("class", "train-next");
      newTrainCol.html(newTrainFormat);
      

      newRow.append(
        nameCol,
        destinationCol,
        frequencyCol,
        minutesCol,
        newTrainCol
      );

      $("#train-scheduler").append(newRow);
    },
    function(errorObject) {
      console.log("The read failed: " + errorObject.code);
    }
  );

  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
    console.log("button clicked ayy!");

    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#location-input").val().trim();
    var trainFrequency = $("#frequency-input").val().trim();
    var trainFirst = $("#start-input").val().trim();
    console.log("FIRST RUN: ", trainFirst);

    console.log("ONCLICK TRAIN FREQUENCY!", trainFrequency);

    database.ref("/train_schedule").push({
      trainName: trainName,
      trainDestination: trainDestination,
      trainFrequency: trainFrequency,
      trainFirst: trainFirst
    });
  });

//date code

// date = "03/12/2019";
// format = "MM/DD/YYYY";
// convertedDate = moment(date, "MM/DD/YYYY");

// convertedDate.diff(moment(), "days");
//timeNow = moment().format("MMM Do, YYYY hh:mm:ss");