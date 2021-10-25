
var scans = [];
var numProds = 0;
var numLocs = 0;
var scannedId;
var searchTimeout;
const idScan = document.getElementById("idScan");
const labelHeading = document.getElementById("labelHeading");


//************************************************************************************************************************************************************************************* */
//   typing check function - check when the user has stopped typing in the input field and calls first function when the user stops 
//************************************************************************************************************************************************************************************* */


const typingCheck = function () {
  if (searchTimeout != undefined) clearTimeout(searchTimeout);
  searchTimeout = setTimeout(firstfunction, 250);
}


//************************************************************************************************************************************************************************************* */
//    First Function - differs between the part id and location id and calls the respective functions 
//************************************************************************************************************************************************************************************* */


const firstfunction = function () {
  var text = idScan.value;
  var varCheck = /[a-zA-z]/g; // using regex to compare strings and numbers in the string
  if (varCheck.test(text)) {
    getPartFunctions();
  }
  else {
    getLocationFunctions();
  }
}


//************************************************************************************************************************************************************************************* */
//    FIELD UPDATE WHEN SCAN PRODUCT ID - shows the locations where the products are available when the product id is scanned. 
//************************************************************************************************************************************************************************************* */


const getPartFunctions = function () {
  let text = idScan.value;
  localStorage.setItem("id", text);
  getLocations(text);
}


function getLocations(abc) {
  let txt1 = document.getElementById("outputDiv");
  url = abc;
  fetch(url)
    .then((response) => {      
      if (!response.ok) throw new Error("An error occured");
      return response.json();
    })
    .then((response) => {
      txt1.innerHTML = "";
      txt1.innerHTML += "<button onclick='partUpdate()'> Update </button><br><br>";
      txt1.innerHTML += "<label style='float:left'> Location ID </label> <label style='float:left'> Current Quantity </label> <label style='float:left'> New Quantity </label><br><br>";
      var i = 0;
      numProds = 0;
      labelHeading.innerHTML = "Part ID : " + response.ex.num;
      let length = response.loc.length;
      while (i < length) {
        txt1.innerHTML += "<input id='locid" + i + "' type='text' value='" + response.loc[i].locationid + "' disabled style='font-size:25px; float:left; color:black' size='12'>";
        txt1.innerHTML += "<input id='partid" + i + "' type='text' value='" + response.ex.id + "' disabled style='font-size:25px; color:black' hidden>";
        txt1.innerHTML += "<input class='classLoc' id='locqty" + i + "' type'text' value='" + response.loc[i].qty + "' style='font-size:25px; float:left;' disabled size='10'>";
        txt1.innerHTML += "<input id='newqty" + i + "' type='number' style='font-size:25px; float:right;' size='12'><br><br>";
        numProds++;
        i++;
      }
      clearField();
    })
    .catch((error) => {
      console.log(error.message);
    });
}


//************************************************************************************************************************************************************************************* */
//     FIELD UPDATE WHEN SCAN LOCATION ID - shows the detials of the products which are available when you scan a location 
//************************************************************************************************************************************************************************************* */


const getLocationFunctions = function () {
  let text = idScan.value;
  localStorage.setItem("id2", text);
  getParts(text);
}


function getParts(abc) {
  let txt1 = document.getElementById("outputDiv");
  url = "https://namor.club/p.php?loc=" + abc;
  fetch(url)
    .then((response) => {
      if (!response.ok) throw new Error("An error occured");
      return response.json();
    })
    .then((response) => {
      txt1.innerHTML = "";
      txt1.innerHTML += "<button onclick='locationUpdate()'> Update </button><br><br>";
      txt1.innerHTML += "<label style='float:left'> Product ID </label> <label style='float:left'> Current Quantity </label> <label style='float:left'> Quantity </label><br><br>";
      var i = 0;
      numLocs = 0;
      labelHeading.innerHTML = "Location ID : " + response.name;
      let length = response.parts.length;
      while (i < length) {
        txt1.innerHTML += "<input id='partid" + i + "' type='text' value='" + response.parts[i].num + "' disabled style='font-size:25px; float:left; color:black' size='12'>";
        txt1.innerHTML += "<input id='locid" + i + "' type='text' value='" + response.id + "' disabled style='font-size:25px; float:left; color:black' hidden>";
        txt1.innerHTML += "<input class='classLoc' id='partqty" + i + "' type='text' value='" + response.parts[i].qty + "' style='font-size:25px; float:left;' size='15' disabled  size='10'>";
        txt1.innerHTML += "<input id='newqty" + i + "' type='number' style='font-size:25px; float:right;' size='12'><br><br>";
        numLocs++;
        i++;
      }
      clearField();
    })
    .catch((error) => {
      console.log(error);
    });
}


//************************************************************************************************************************************************************************************* */
//    PARTS UPDATE BUTTON - updates the database with updated quantities
//************************************************************************************************************************************************************************************* */


function partUpdate() {
  var j = 0;
  while (j < numProds) {
    var locationid = document.getElementById('locid' + j).value;
    var partid = document.getElementById('partid' + j).value;
    var newqty = document.getElementById('newqty' + j).value;
    console.log("locid: " + locationid);
    console.log("partid: " + partid);
    const url = "https://namor.club/p.php";
    let data = {
      locid: locationid,
      partid: partid,
      rawloc: 0,
      rawpart: newqty,
      ip: 0,
      user: 'test'
    }
    let fetchData = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers()
    }
    console.log(fetchData.body[0]);
    fetch(url, fetchData)
      .catch((error) => {
        console.log(error);
      })
    j++;
  }
}


//************************************************************************************************************************************************************************************* */
//    LOCATION UPDATE BUTTON - update the database with updated quantities
//************************************************************************************************************************************************************************************* */


function locationUpdate(locid, partid, newqty) {
  var j = 0;
  while (j < numLocs) {
    var locationid = document.getElementById('locid' + j).value;
    var partid = document.getElementById('partid' + j).value;
    var newqty = document.getElementById('newqty' + j).value;
    console.log("locid: " + locationid);
    console.log("partid: " + partid);
    const url = "https://namor.club/p.php";
    let data = {
      locid: locationid,
      partid: partid,
      rawloc: 0,
      rawpart: newqty,
      ip: 0,
      user: 'test'
    }
    let fetchData = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers()
    }
    console.log(fetchData.body[0])
    fetch(url, fetchData)
      .catch((error) => {
        console.log(error);
      })
    j++;
  }
}


//************************************************************************************************************************************************************************************* */
//   CLEAR FIELDS AND EVERYTHING BUTTON 
//************************************************************************************************************************************************************************************* */


function clearData() {
  let txt1 = document.getElementById("outputDiv");
  txt1.innerHTML = "";
  idScan.value = "";
  idScan.value = "";
  labelHeading.innerHTML = "- - - - -";
}


const clearField = function () {
  idScan.value = "";
}


//************************************************************************************************************************************************************************************* */
//  >>> END <<<
//************************************************************************************************************************************************************************************* */