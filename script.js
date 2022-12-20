// Assignment code here
function generatePassword() {
  var characters = ["abcdefghijklmnopqrstuvwxyz",
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  "0123456789",
  "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"];

  var passwordParameters = [];

  // Get number of characters, abort and alert if invalid input.
  passwordParameters.push(Number(prompt("How many characters? 8-128", "69")));
  if(!(passwordParameters[0] >= 8 && passwordParameters[0] <= 128)) {
    alert("Invalid input - must be a number between 8 and 128.");
    return "";
  }

  // Get types of characters.
  passwordParameters.push(confirm("Include lowercase letters?"));
  passwordParameters.push(confirm("Include uppercase letters?"));
  passwordParameters.push(confirm("Include numbers?"));
  passwordParameters.push(confirm("Include special characters?"));
  
  // Make sure at least one type of character has been selected.
  var atLeastOne = false;
  for(var i = 1; i < passwordParameters.length; i++)
  {
    if(passwordParameters[i]) {
      atLeastOne = true;
      break;
    }
  }
  // If one hasn't, alert and abort.
  if(!atLeastOne) {
    alert("You must select at least character type.");
    return "";
  }

  //mixin will have one of each type which we will distribute randomly later
  //this ensures password uses every character type available
  //I could add to the start and re-randomize entire string later
  //but this seems (mildly) more efficient at runtime
  var mixin = "";
  var password = "";
  var pool = "";
  for(var i = 0; i < characters.length; i++) {
    if(passwordParameters[i + 1]) {
      mixin += SelectRandomLetter(characters[i]);
      pool += characters[i];
    }
  }
  //create random string from pool, leaving room for the mixin characters
  for(var i = mixin.length; i < passwordParameters[0]; i++)
  {
    password += SelectRandomLetter(pool);
  }
  //mix in the mixin characters
  for(var i = 0; i < mixin.length; i++)
  {
    var index = Math.floor(Math.random() * password.length);
    password = password.substring(0,index) + 
      mixin[i] + 
      password.substring(index,password.length);
  }
  
  return password;
}

//returns a single letter randomly selected from a given string
function SelectRandomLetter(string)
{
  return string[Math.floor(Math.random() * string.length)];
}
// END OF MY ASSIGNMENT CODE

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
