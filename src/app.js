let txt2 = "";
var scans = [];
var numProds = 0;
var numLocs = 0;
var scannedId;
var searchTimeout;
const idScan = document.getElementById("idScan");
const labelHeading = document.getElementById("labelHeading");
localStorage.setItem("divNo", 0); 
console.log("localStorage - divNo : " + localStorage.getItem("divNo"));

//********************************************************************************************************************************************************************************************************************************* */
//   Typing check function - check when the user has stopped typing in the input field and calls first function when the user stops 
//********************************************************************************************************************************************************************************************************************************* */


const typingCheck = function () {
  if (searchTimeout != undefined) clearTimeout(searchTimeout);
  searchTimeout = setTimeout(firstfunction, 250);
}


//********************************************************************************************************************************************************************************************************************************* */
//    First Function - differs between the part id and location id and calls the respective functions 
//********************************************************************************************************************************************************************************************************************************* */


const firstfunction = function () {
  var text = idScan.value;
  var varCheck = /[a-zA-z]/g; // using regex to compare strings and numbers in the string, won't work when scan location=recieving or shipping (location with any alphabets)
  if (varCheck.test(text)) {
    getPartFunctions();
  }
  else {
    getLocationFunctions();
  }
}


//********************************************************************************************************************************************************************************************************************************* */
//    FIELD UPDATE WHEN SCAN PRODUCT ID - shows the locations where the products are available when the product id is scanned. 
//********************************************************************************************************************************************************************************************************************************* */


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
      txt1.innerHTML += "<button class='waves-effect waves-light btn' onclick='partUpdate()'> Update </button><br><br>";
      txt2 = ""; 
      txt2 += "<table><tr><th id='locationIdLbl'> Location ID </th> <th id='lgLbl'> Type </th> <th id='crntQtyLbl'> Quantity </th> <th id='totalPickedLbl'> New Qty </th> <th id='notPickedQuantityLbl'>  </th> <th id='newQuantityLbl'></th></tr>";
      var i = 0;
      var j = 0;
      numProds = 0;
      labelHeading.innerHTML = "Part ID : " + response.ex.num;
      let length = response.loc.length;
      while (i < length) {
        txt2 += "<tr><td><input class='locationIdClass' id='locid" + i + "' type='text' value='" + response.loc[i].loc + "' disabled></td>";
        txt2 += "<input id='partid" + i + "' type='text' value='" + response.ex.id + "' disabled hidden></td>";
        txt2 += "<td><input class='lgClass' value='" + response.loc[i].lg + "' disabled></td>";
        txt2 += "<td><input class='locationQuantityClass' id='locqty" + i + "' type'text' value='" + response.loc[i].qty + "' disabled></td>";                
        txt2 += "<td><input class='newQuantityClass' id='newqty" + i + "' type='number'></td>";
        txt2 += "<td><button class='waves-effect waves-light btn' onclick='getPickedUnpicked(" + i + ", " + i + ")'> More </button></td></tr>";
        txt2 += "<tr class='lastrow' id='lastrow" + i + "' style='display:none;'><td colspan='2'><div id='pickedId" + i + "'></div></td><td colspan='2'><div id='unpickedId" + i + "'></div></td><td></td><td></td></tr>"
        numProds++;
        i++;
      }
      document.getElementById("tableDiv").innerHTML = txt2;
      clearField();
    })
    .catch((error) => {
      console.log(error.message);
    });
}


//********************************************************************************************************************************************************************************************************************************* */
//   getPickedUnpicked function - shows the row, inserts the picked quantity and unpicked quantity
//********************************************************************************************************************************************************************************************************************************* */


function getPickedUnpicked(locid, partid){
  document.getElementById("pickedId" + localStorage.getItem("divNo")).innerHTML = "";  
  document.getElementById("unpickedId" + localStorage.getItem("divNo")).innerHTML = "";
  document.getElementById("lastrow" + localStorage.getItem("divNo")).style.display = "none"; 
  localStorage.setItem("divNo", locid); 
  document.getElementById("lastrow" + locid).style.display = "table-row"; 

  var locationid = document.getElementById('locid' + locid).value;
  var partsid = document.getElementById('partid' + partid).value;
  console.log("locid: " + locationid); 
  console.log("partid: " + partsid); 
  let txt3 = ""; 
  let txt4 = ""; 
  url = "https://namor.club/p.php?loc=" + locationid + "&part=" + partid; 
  fetch(url)
    .then((response) => {
      if (!response.ok) throw new Error("An error occured");
      return response.json();
    })
    .then((response) => {
      if(response.totalpicked != null){
      txt3 = "Picked : <input id='picked' type='number' value='" + response.totalpicked + "' style='width:70%;'>"; 
      txt4 = "Unpicked : <input id='picked' type='number' style='width:70%;'>"; 
    }
      else
      txt3 = "Picked : <input id='picked' type='number' value='0' style='width:70%;'>"; 
      txt4 += "Unpicked : <input id='picked' type='number' value='0' style='width:70%;'>"; 
      document.getElementById("pickedId" + locid).innerHTML = txt3; 
      document.getElementById("unpickedId" + locid).innerHTML = txt4; 
      clearField();
    })
    .catch((error) => {
      console.log(error.message);
    });

}


//********************************************************************************************************************************************************************************************************************************* */
//     FIELD UPDATE WHEN SCAN LOCATION ID - shows the details of the products which are available when you scan a location 
//********************************************************************************************************************************************************************************************************************************* */


const getLocationFunctions = function () {
  let text = idScan.value;
  localStorage.setItem("id2", text);
  getParts(text);
}


function getParts(abc) {
  let txt1 = document.getElementById("outputDiv");
  let txt2 = ""; 
  url = "https://namor.club/p.php?loc=" + abc;
  fetch(url)
    .then((response) => {
      if (!response.ok) throw new Error("An error occured");
      return response.json();
    })
    .then((response) => {
      txt1.innerHTML = "";
      txt2 = ""; 
      txt1.innerHTML += "<button class='waves-effect waves-light btn' onclick='locationUpdate()'> Update </button><br>";
      txt2 = "<table><th id='productIdLbl'> Product ID </th> <th id='currentQuantityLbl' style='width:100%;'> Current&nbsp;Quantity </th> <th id='quantityLbl'> Quantity </th>";
      var i = 0;
      numLocs = 0;
      labelHeading.innerHTML = "Location ID : " + response.name;
      let length = response.parts.length;
      while (i < length) {
        txt2 += "<tr><td><a class='partIdClass' id='partid" + i + "' type='text' onclick='getLocationsAgain(" + i + ");'>" + response.parts[i].num + "</a></td>";
        txt2 += "<input id='locid" + i + "' type='text' value='" + response.id + "' disabled hidden>";
        txt2 += "<td><input class='partQuantityClass' id='partqty" + i + "' type='text' value='" + response.parts[i].qty + "' disabled ></td>";
        txt2 += "<td><input class='newQuantityClass' id='newqty" + i + "' type='number'></td></tr>";
        numLocs++;
        i++;
      }
      document.getElementById("tableDiv").innerHTML = txt2; 
      clearField();
    })
    .catch((error) => {
      console.log(error);
    });
}


//********************************************************************************************************************************************************************************************************************************* */
//  function - GetPartsAgain - calls the getParts function again when you click the BACK button from the location page. 
//********************************************************************************************************************************************************************************************************************************* */


function getPartsAgain() {
  let txt1 = document.getElementById("outputDiv");
  let txt2 = "";
  url = "https://namor.club/p.php?loc=" + localStorage.getItem("id2");
  fetch(url)
    .then((response) => {
      if (!response.ok) throw new Error("An error occured");
      return response.json();
    })
    .then((response) => {
      txt1.innerHTML = "";
      txt1.innerHTML += "<button class='waves-effect waves-light btn' onclick='locationUpdate()'> Update </button><br>";
      txt2 += "<table><th id='productIdLbl'> Product ID </th> <th id='currentQuantityLbl' style='width:100%;'> Current&nbsp;Quantity </th> <th id='quantityLbl'> Quantity </th>";
      var i = 0;
      numLocs = 0;
      labelHeading.innerHTML = "Location ID : " + response.name;
      let length = response.parts.length;
      while (i < length) {
        txt2 += "<tr><td><a class='partIdClass' id='partid" + i + "' type='text' onclick='getLocationsAgain(" + i + ");'>" + response.parts[i].num + "</a></td>";
        txt2 += "<input id='locid" + i + "' type='text' value='" + response.id + "' disabled hidden>";
        txt2 += "<td><input class='partQuantityClass' id='partqty" + i + "' type='text' value='" + response.parts[i].qty + "' disabled></td>";
        txt2 += "<td><input class='newQuantityClass' id='newqty" + i + "' type='number'></td></tr>";
        numLocs++;
        i++;
      }
      document.getElementById("tableDiv").innerHTML = txt2; 
      clearField();
    })
    .catch((error) => {
      console.log(error);
    });
}


//********************************************************************************************************************************************************************************************************************************* */
//   function - getLocationsAgain - calls the getLocations function when you click on the product links on the locations page, attached to locationFunction page. 
//********************************************************************************************************************************************************************************************************************************* */


function getLocationsAgain(xyz) {
  var def = document.getElementById("partid" + xyz).innerHTML;
  console.log("def " + def);
  let txt1 = document.getElementById("outputDiv");
  let txt2 = ""; 
  url = "https://namor.club/p.php?" + def;
  console.log("url " + url);
  fetch(url)
    .then((response) => {
      if (!response.ok) throw new Error("An error occured");
      return response.json();
    })
    .then((response) => {
      txt1.innerHTML = "";
      txt1.innerHTML += "<button class='waves-effect waves-light btn' onclick='getPartsAgain()'> Back </button><br>";
      txt1.innerHTML += "<button class='waves-effect waves-light btn' onclick='partUpdate()'> Update </button>";
      txt2 = ""; 
      txt2 += "<table><tr><th id='locationIdLbl'> Location ID </th> <th id='lgLbl'> Type </th> <th id='crntQtyLbl'> Quantity </th> <th id='totalPickedLbl'> New Qty </th> <th id='notPickedQuantityLbl'>  </th> <th id='newQuantityLbl'></th></tr>";
      var i = 0;
      var j = 0;
      numProds = 0;
      labelHeading.innerHTML = "Part ID : " + response.ex.num;
      let length = response.loc.length;
      while (i < length) {
        txt2 += "<tr><td><input class='locationIdClass' id='locid" + i + "' type='text' value='" + response.loc[i].loc + "' disabled></td>";
        txt2 += "<input id='partid" + i + "' type='text' value='" + response.ex.id + "' disabled hidden></td>";
        txt2 += "<td><input class='lgClass' value='" + response.loc[i].lg + "' disabled></td>";
        txt2 += "<td><input class='locationQuantityClass' id='locqty" + i + "' type'text' value='" + response.loc[i].qty + "' disabled></td>";                
        txt2 += "<td><input class='newQuantityClass' id='newqty" + i + "' type='number'></td>";
        txt2 += "<td><button class='waves-effect waves-light btn' onclick='getPickedUnpicked(" + i + ", " + i + ")'> More </button></td></tr>";
        txt2 += "<tr class='lastrow' id='lastrow" + i + "' style='display:none;'><td colspan='2'><div id='pickedId" + i + "'></div></td><td colspan='2'><div id='unpickedId" + i + "'></div></td><td></td><td></td></tr>"
        numProds++;
        i++;
      }
      document.getElementById("tableDiv").innerHTML = txt2; 
      clearField();
    })
    .catch((error) => {
      console.log(error.message);
    });
}


//********************************************************************************************************************************************************************************************************************************* */
//    PARTS UPDATE BUTTON - updates the database with updated quantities
//********************************************************************************************************************************************************************************************************************************* */


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


//********************************************************************************************************************************************************************************************************************************* */
//    LOCATION UPDATE BUTTON - update the database with updated quantities
//********************************************************************************************************************************************************************************************************************************* */


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


//********************************************************************************************************************************************************************************************************************************* */
//   CLEAR FIELDS AND EVERYTHING BUTTON 
//********************************************************************************************************************************************************************************************************************************* */


function clearData() {
  let txt1 = document.getElementById("outputDiv");
  txt1.innerHTML = "";
  document.getElementById("tableDiv").innerHTML = "";
  idScan.value = "";
  idScan.value = "";
  labelHeading.innerHTML = "- - - - -";
}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
//  clearField: clears the idScan after every scan and after executing every function 
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */

const clearField = function () {
  idScan.value = "";
}


//********************************************************************************************************************************************************************************************************************************* */
//  changeCss function - change the theme to dark and reprogram the button to function to light mode 
//********************************************************************************************************************************************************************************************************************************* */


function changeCss(cssFile) {
  console.log("cssfile : " + cssFile); 
  //console.log("csslinkindex : " + cssLinkIndex); 
  console.log("darkTheme was toggled");

  var stylesheet = document.getElementById("stylesheet"); 
  stylesheet.setAttribute('href', cssFile); 
  document.getElementById("darkButton").setAttribute("onClick", "javascript: changeCssAgain('src/style.css');");
  document.getElementById("darkButton").innerHTML = "Light Theme"; 
}


//********************************************************************************************************************************************************************************************************************************* */
//  changeCssAgain function - change the theme back to light and start a looping function to change the theme light and dark 
//********************************************************************************************************************************************************************************************************************************* */


function changeCssAgain(cssFile) {
  console.log("cssfile : " + cssFile); 
  //console.log("csslinkindex : " + cssLinkIndex); 
  console.log("darkTheme was toggled");

  var stylesheet = document.getElementById("stylesheet"); 
  stylesheet.setAttribute('href', cssFile); 
  document.getElementById("darkButton").setAttribute("onClick", "javascript: changeCss('src/darkThemeStyle.css');");
  document.getElementById("darkButton").innerHTML = "Dark Theme"; 
}


//********************************************************************************************************************************************************************************************************************************* */
//  >>> END <<<
//********************************************************************************************************************************************************************************************************************************* */



// *-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-* */
//   comments : how the program works - a brief introduction 
// *-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-* */

/*

  - if you scan a product ID: it calls the partFunctions. which in turn calls the getLocationFunction. it doesn't goes anywhere after that. 
  - if you scan a location ID: it calls the locationFunctions, which in turns the calls the getPartsfunctions. 
   - you can select the part num and see its details. 
   - you can also go back and forth.
  
  - clear button calls the clearData function. which clears all of the details, all the fields. 
   - makes the app like new. 

  - things to add:- 
   - dark mode
   - better colours for the light mode. 
   - 

*/



// *-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-* */
//  ROUGH WORK - TESTING AREA 
// *-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-* */

// function testFunction() {
// 
//   let txt1 = document.getElementById("outputDiv");
//   txt1.innerHTML = "";
//   txt1.innerHTML += "<button onclick='partUpdate()'> Update </button><br><br>";
//   txt1.innerHTML += "<label style='float:left'> Location ID </label> <label style='float:left'> Current Qty </label> <label style='float:left'> Total Picked </label> <label style='float:left'> Not Picked </label> <label style='float:left'> New Qty </label><br><br><br>";
//   var i = 0;
//   var j = 0;
//   numProds = 0;
//   labelHeading.innerHTML = "Part ID : " + product.ex.num;
//   let length = product.loc.length;
//   while (i < length) {
//     txt1.innerHTML += "<input id='locid" + i + "' type='text' value='" + product.loc[i].locationid + "' disabled style='font-size:25px; float:left; color:black' size='8'>";
//     txt1.innerHTML += "<input id='partid" + i + "' type='text' value='" + product.ex.id + "' disabled style='font-size:25px; color:black' hidden>";
//     txt1.innerHTML += "<input class='classLoc' id='locqty" + i + "' type'text' value='" + product.loc[i].qty + "' style='font-size:25px; float:left;' disabled size='8'>";
//     if (product.pickedtoday.length != 0) {
//       j = product.pickedtoday.length;
//       let z = 0;
//       for (let x = 0; x < j; x++) {
//         if (product.loc[i].locationid == product.pickedtoday[x].locationid) {
//           txt1.innerHTML += "<input id='pickedqty' type='text' value='" + product.pickedtoday[x].totalpicked + "' style='font-size:25px; color:black; float:left;' size='8' disabled>";
//           z++;
//         }
//       }
//       if (z == 0) {
//         txt1.innerHTML += "<input id='pickedqty' type='text' style='font-size:25px; float:left;' size='8' disabled placeholder='0'>";
//       }
//     } else {
//       txt1.innerHTML += "<input id='pickedqty' type='text' style='font-size:25px; float:left;' size='8' disabled placeholder='0'>";
//     }
//     //not pickedtoday
//     if (product.notpickedtoday.length != 0) {
//       j = product.pickedtoday.length;
//       let z = 0;
//       for (let x = 0; x < j; x++) {
//         if (product.loc[i].locationid == product.notpickedtoday[x].locationid) {
//           txt1.innerHTML += "<input id='pickedqty' type='text' value='" + product.notpickedtoday[x].totalpicked + "' style='font-size:25px; color:black; float:left;' size='8' disabled>";
//           z++;
//         }
//       }
//       if (z == 0) {
//         txt1.innerHTML += "<input id='pickedqty' type='text' style='font-size:25px; float:left;' size='8' disabled placeholder='0'>";
//       }
//     } else {
//       txt1.innerHTML += "<input id='pickedqty' type='text' style='font-size:25px; float:left;' size='8' disabled placeholder='0'>";
//     }
//     txt1.innerHTML += "<input id='newqty" + i + "' type='text' style='font-size:25px; float:right;' size='8'><br><br>";        
//     numProds++;
//     i++;
//   }
//   clearField();


// }








// *-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-* */






// txt1.innerHTML = "";
//       txt1.innerHTML += "<button onclick='partUpdate()'> Update </button><br><br>";
//       txt2 += "<label id='locationIdLbl'> Location ID </label> <label id='lgLbl'> Type </label> <label id='crntQtyLbl'> Quantity </label> <label id='totalPickedLbl'> Picked </label> <label id='notPickedQuantityLbl'> Allocated </label> <label id='newQuantityLbl'> New Qty </label><br><br>";
//       var i = 0;
//       var j = 0;
//       numProds = 0;
//       labelHeading.innerHTML = "Part ID : " + response.ex.num;
//       let length = response.loc.length;
//       while (i < length) {
//         txt2 += "<input class='locationIdClass' id='locid" + i + "' type='text' value='" + response.loc[i].loc + "' disabled style='font-size:16px; float:left; color:black; padding:7px;'>";
//         txt2 += "<input id='partid" + i + "' type='text' value='" + response.ex.id + "' disabled style='font-size:25px; color:black' hidden>";
//         txt2 += "<input class='lgClass' value='" + response.loc[i].lg + "' disabled style='font-size:15px; float:left; padding:7px; color:black;'>";
//         txt2 += "<input class='locationQuantityClass' id='locqty" + i + "' type'text' value='" + response.loc[i].qty + "' style='font-size:25px; float:left;' disabled>";

//         //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
//         // picked today / have been picked / deducted from the current quantity
//         //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */

//         if (response.pickedtoday.length != 0) {
//           j = response.pickedtoday.length;
//           let z = 0;
//           for (let x = 0; x < j; x++) {
//             if (response.loc[i].locationid == response.pickedtoday[x].locationid) {
//               txt2 += "<input class='pickedQuantityClass' id='pickedqty' type='text' value='" + response.pickedtoday[x].totalpicked + "' style='font-size:25px; color:black; float:left;' disabled>";
//               z++;
//             }
//           }
//           if (z == 0) {
//             txt2 += "<input class='pickedQuantityClass' id='pickedqty' type='text' style='font-size:25px; float:left;' disabled placeholder='0'>";
//           }
//         } else {
//           txt2 += "<input class='pickedQuantityClass' id='pickedqty' type='text' style='font-size:25px; float:left;' disabled placeholder='0'>";
//         }

//         //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
//         // not picked today / allocated / ordered but not yet picked
//         //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
        
//         if (response.notpickedtoday.length != 0) {
//           j = response.pickedtoday.length;
//           let z = 0;
//           for (let x = 0; x < j; x++) {
//             if (response.loc[i].locationid == response.notpickedtoday[x].locationid) {
//               txt2 += "<input class='notPickedQuantityClass' id='notpickedqty' type='text' value='" + response.notpickedtoday[x].qty + "' style='font-size:25px; color:black; float:left;' size='8' disabled>";
//               z++;
//             }
//           }
//           if (z == 0) {
//             txt2 += "<input class='notPickedQuantityClass' id='notpickedqty' type='text' style='font-size:25px; float:left;' size='8' disabled placeholder='0'>";
//           }
//         } else {
//           txt2 += "<input class='notPickedQuantityClass' id='notpickedqty' type='text' style='font-size:25px; float:left;' size='8' disabled placeholder='0'>";
//         }
//         txt2 += "<input class='newQuantityClass' id='newqty" + i + "' type='text' style='font-size:25px; float:left;' size='8'><br><br>";
//         numProds++;
//         i++;
//       }
//       document.getElementById("tableDiv").innerHTML = txt2; 
//       clearField();

// *-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-* */

// "namor.club/p.php?loc=xxxx&part=xxxx" - the link to get the qty that has been picked but not packed. total qty for last three months, that was picked from the loc and the part was picked. 
// different url - different response: can we call two fetches at the same time? yeah we can call another function maybe? make the txt2 global so that it will be updated irrespective of the update. 
// boring 



// *-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-* */

// old picked and unpicked link function parts 

        //getPickedUnpicked(document.getElementById()); 
        //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
        // picked today / have been picked / deducted from the current quantity
        //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
        // console.log("pickedtoday : " + response.pickedtoday.length);
        // console.log("notpickedtoday : "+response.notpickedtoday.length);
        // if (response.pickedtoday.length != 0) {
        //   j = response.pickedtoday.length;
        //   let z = 0;
        //   for (let x = 0; x < j; x++) {
        //     if (response.loc[i].locationid == response.pickedtoday[x].locationid) {
        //       txt2 += "<td><input class='pickedQuantityClass' id='pickedqty' type='text' value='" + response.pickedtoday[x].totalpicked + "' disabled></td>";
        //       z++;
        //     }
        //   }
        //   if (z == 0) {
        //     txt2 += "<td><input class='pickedQuantityClass' id='pickedqty' type='text' disabled placeholder='0'></td>";
        //   }
        // } else {
        //   txt2 += "<td><input class='pickedQuantityClass' id='pickedqty' type='text' disabled placeholder='0'></td>";
        // }

        // //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
        // // not picked today / allocated / ordered but not yet picked
        // //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
        
        // if (response.notpickedtoday.length != 0) {
        //   j = response.pickedtoday.length;
        //   let z = 0;
        //   for (let x = 0; x < j; x++) {
        //     if (response.loc[i].locationid == response.notpickedtoday[x].locationid) {
        //       txt2 += "<td><input class='notPickedQuantityClass' id='notpickedqty' type='text' value='" + response.notpickedtoday[x].qty + "' disabled></td>";
        //       z++;
        //     }
        //   }
        //   if (z == 0) {
        //     txt2 += "<td><input class='notPickedQuantityClass' id='notpickedqty' type='text' disabled placeholder='0'></td>";
        //   }
        // } else {
        //   txt2 += "<td><input class='notPickedQuantityClass' id='notpickedqty' type='text' disabled placeholder='0'></td>";
        // }
        


      // *-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-* */




