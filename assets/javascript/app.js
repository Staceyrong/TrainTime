
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBiJvNaNjAEQQpoIQHgl-W3lNTXY7tkdSI",
    authDomain: "train-time-e6876.firebaseapp.com",
    databaseURL: "https://train-time-e6876.firebaseio.com",
    projectId: "train-time-e6876",
    storageBucket: "train-time-e6876.appspot.com",
    messagingSenderId: "797816630728"
  };
  firebase.initializeApp(config);

  var database = firebase.database();
  // Button for adding trains
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
// Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTime = moment($("#first-input").val().trim(), 'HH:mm A');
    var frequency = $("#frequency-input").val().trim();
 
      // Creates local "temporary" object for holding employee data
    var newTrain = {
        name: trainName,
        destination: destination,
        frequency: frequency,
        firstTime: firstTime,
    };
    // Uploads employee data to the database
    database.ref().push(newTrain);
    // Logs everything to console
    console.log(newTrain.trainName);
    console.log(newTrain.destination);
    console.log(newTrain.firstTime);
    console.log(newTrain.frequency);
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-input").val("");
    $("#frequency-input").val("");

  });
  // 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
    database.ref().on("child_added", function(childSnapshot, prevChildKey) {
    console.log(childSnapshot.val());   
     // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var firstTime = childSnapshot.val().firstTime;
    var frequency = childSnapshot.val().frequency;
      // train Info
    console.log(trainName);
    console.log(destination);
    console.log(firstTime);
    console.log(frequency);

    
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm A"));
    var diffTime = moment().diff(moment(firstTime), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);
      // Time apart (remainder)
    var tRemainder = diffTime % frequency;
    console.log(tRemainder);
     // Minute Until Train
    var tMinutesTillTrain = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm A");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm A"));
      // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
  frequency + "</td><td>" + nextTrain + "</td><td>" + tMinutesTillTrain + "</td></tr>");

    });