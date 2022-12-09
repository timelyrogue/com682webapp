//The URIs of the REST endpoint


//Post video
IUPS = "https://prod-77.eastus.logic.azure.com:443/workflows/3cc14a35730a48e8bd42e431ab2d8d9c/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=S05C3mkNgiT5ZYt3RSOj8KS0tLYA-GHix4jscybdqH8";
//Retrieve video
RAI = "https://prod-38.eastus.logic.azure.com:443/workflows/b732587b062543dcb0395cf136c714cb/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=5a_ta0ulwFnPJp54nFY3i8w4OgTb1CMIJP0UwPBg6QA";


//Delete link part 1
DIAURI0 = "https://prod-41.eastus.logic.azure.com/workflows/a152422c46a5493fb0affe78d6a6579d/triggers/manual/paths/invoke/rest/v1/assets/"
//Delete link part 2
DIAURI1 = "?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=_8d4ZNnC4YIgXoJmn7KOnbe0TkLMJRVDEoM_aWouFp0"

//Checking Login
CLI = "https://prod-64.eastus.logic.azure.com:443/workflows/cb691725954f411296931ffab62e4c96/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=o2qk1GODsgWVCLqCA11g5mB8N4pKrkq0R43HQLj55Fg"


//Add user
ADDUSERCIA = "https://prod-57.eastus.logic.azure.com/workflows/bbc0c82d24ee4de8868b1d871e867f07/triggers/manual/paths/invoke/rest/v1/assets?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Z3nMlrxcyemeBDSzy-lSkxk5PWTTzIvBKzUtTV9ajUk"

//Retrieve user part 1
RUSER0 = "https://prod-20.centralus.logic.azure.com/workflows/4b46d01e4aee4395a2293ee6de38e8b5/triggers/manual/paths/invoke/rest/v1/assets/"
//Retrieve user part 2
RUSER1 = "?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=HIdrppcegFDFmu-3ab5WMQinII5SMQSgLN2FSnTnt6I"



BLOB_ACCOUNT = "https://blobstoragecom682dm.blob.core.windows.net";

//Handlers for button clicks
$(document).ready(function() {

 
  $("#retImages").click(function(){

      //Run the get asset list function
      retrieveVideos();

  }); 

   //Handler for the new asset submission button
  $("#subNewForm").click(function(){

    //Execute the submit new asset function
    submitNewAsset();
    
  }); 
});

//A function to submit a new asset to the REST endpoint 
function submitNewAsset(){

  //Createa form data object
  submitData = new FormData();

  //Get from variables and append them to the form data object
  submitData.append('FileName', $('#FileName').val());
  submitData.append('Title', $('#Title').val());
  submitData.append('Genre', $('#Genre').val());
  submitData.append('Publisher', $('#Publisher').val());
  submitData.append('Producer', $('#Producer').val());
  submitData.append('Age Rating', $('#Age Rating').val());
  submitData.append('userID', $('#userID').val());
  submitData.append('userName', $('#userName').val());
  submitData.append('File', $('#UpFile')[0].files[0]);

  //Post the form data to the endpoint, note the need to set the content type header
  $.ajax({
    url: IUPS,
    data: submitData,
    cache: false,
    enctype: 'multipart/form-data',
    contentType: false,
    processData: false,
    type: 'POST',
    success: function(data){

    }
  })
}


//A function to get a list of all the assets and write them to the Div with the AssetList Div
function retrieveVideos(){

 //Replace the current HTML in that div with a loading message
 $('#ImageList').html('<div class="spinner-border" role="status"><span class="sr-only"> &nbsp;</span>');
 
 $.getJSON(RAI, function( data ) {

  //Create an array to hold all retriecved assets
  var items = [];

  //Iterate through the returned records and build HTML, incorporating the key values of the record in the data
  $.each( data, function( key, val){

    items.push("<hr />");
    items.push("<video controls width='420' height='240' controls src='"+BLOB_ACCOUNT + val["filePath"] +"'type='video/mp4'/></video> <br />");
    items.push("File:"+ val["fileName"]+"<br/>");
    items.push("Genre:"+ val["Genre"]+"<br/>")
    items.push("Uploaded by: " + val["userName"] + " (user id: "+val["userID"]+")<br />");
    items.push("<hr />");
    items.push('<button type="button" id="deleteButton" class="btn btn-primary" onclick="deleteVideo(\'' + val["id"] + '\')">Delete</button>');

  });

  //Clear the assetlist div
  $('#ImageList').empty();
  
  //Append the contents of the items array to the ImageList Div
  $( "<ul/>", {
   "class": "my-new-list",
   html: items.join( "" )
  }).appendTo( "#ImageList" );
});
}

//A function to get a list of all the assets and write them to the Div with the AssetList Div
function retrieveVideosUsers(){

  //Replace the current HTML in that div with a loading message
  $('#ImageList').html('<div class="spinner-border" role="status"><span class="sr-only"> &nbsp;</span>');
  
  $.getJSON(RAI, function( data ) {
 
   //Create an array to hold all retriecved assets
   var items = [];
 
   //Iterate through the returned records and build HTML, incorporating the key values of the record in the data
   $.each( data, function( key, val){
 
     items.push("<hr />");
     items.push("<video controls width='420' height='240' controls src='"+BLOB_ACCOUNT + val["filePath"] +"'type='video/mp4'/></video> <br />");
     items.push("File:"+ val["fileName"]+"<br/>");
     items.push("Genre:"+ val["Genre"]+"<br/>")
     items.push("Uploaded by: " + val["userName"] + " (user id: "+val["userID"]+")<br />");
     items.push("<hr />");
 
   });
 
   //Clear the assetlist div
   $('#ImageList').empty();
   
   //Append the contents of the items array to the ImageList Div
   $( "<ul/>", {
    "class": "my-new-list",
    html: items.join( "" )
   }).appendTo( "#ImageList" );
 });
 }


function deleteVideo(id){

  $.ajax({

    type: "DELETE",
    //Note the need to concatenate the
    url: DIAURI0 + id + DIAURI1,
  
  }).done(function(  ) {
    //On success, update the assetlist.
    retrieveVideos();
  });
}



function validateLoginData(){
  var unameBeingValidated = document.getElementById("enteredun").value;
  var pwordBeingValidated = document.getElementById("enteredpw").value;

  console.log(unameBeingValidated)
  console.log(pwordBeingValidated)

  enteredUserDataValidationForm = new FormData();

  enteredUserDataValidationForm.append('userName', unameBeingValidated)
  enteredUserDataValidationForm.append('password', pwordBeingValidated)

  $.ajax({
    url: CLI,
    type: "POST",
    data: enteredUserDataValidationForm,
    cache: false,
    contentType: false,
    processData: false,
    success: function(userValidation){
      console.log(userValidation)
      console.log(userValidation[0])

      userName = userValidation[0].userName;
      password = userValidation[0].password;
      admin = userValidation[0].admin;
     
      alert('Login Succesful')
      if (admin) {
        window.location = "./adminpage.html"
      } else{
        window.location = "./viewerpage.html"
      }
    }
  });

}

function moveToSignUp() {
  window.location = "./signuppage.html";
}



function signupNewUser(){
  signupUser = new FormData();
    signupUser.append('userName', $('#signUname').val());
    signupUser.append('emailAddress', $('#signEmail').val());
    signupUser.append('firstName', $('#signFname').val());
    signupUser.append('lastName', $('#signLname').val());
    signupUser.append('password', $('#signPword').val());

    $.ajax({
      url: ADDUSERCIA,
      data: signupUser,
      cache: false,
      enctype: 'multipart/form-data',
      contentType: false,
      processData: false,
      type: 'POST',
      success: function(works){
        alert('Sign up succesful. Please Login')
        window.location="./loginpage.html";
      }

    });
}