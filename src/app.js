let txt2 = "";
let txtx = "";
let txty = "";
let x = 0;
let y = 0;
let m = 0;
var scans = [];
var numProds = 0;
var numLocs = 0;
var scannedId;
var searchTimeout; //8032,4202,4809
const idScan = document.getElementById("idScan");
const labelHeading = document.getElementById("labelHeading");
var isLoading = false;


//********************************************************************************************************************************************************************************************************************************* */
//   Typing check function - check when the user has stopped typing in the input field and calls first function when the user stops 
//********************************************************************************************************************************************************************************************************************************* */


const typingCheck = function () {
  if (searchTimeout != undefined) clearTimeout(searchTimeout);
  searchTimeout = setTimeout(firstfunction, 1000);
}


//********************************************************************************************************************************************************************************************************************************* */
//    First Function - differs between the part id and location id and calls the respective functions 
//********************************************************************************************************************************************************************************************************************************* */


const firstfunction = function () {
  isLoading = true;
  if (isLoading == true)
    document.getElementById('loader').style.display = "block";
  var text = idScan.value;
  var varCheck = /[a-zA-z]/g; // using regex to compare strings and numbers in the string, won't work when scan location=recieving or shipping (location with any alphabets)
  if (varCheck.test(text)) {
    //call the parts functions through the product code 
    getPartFunctions();
  }
  else {
    if (text.length == 12) {
      //call the parts function through the UPC code. 
      getPartFunctionsUpc();
    }
    else {
      //call the location fucnctions
      getLocationFunctions();
    }
  }
}


//********************************************************************************************************************************************************************************************************************************* */
//    FIELD UPDATE WHEN SCAN PRODUCT ID - shows the locations where the products are available when the product id is scanned, when the UPC is scanned. 
//********************************************************************************************************************************************************************************************************************************* */


const getPartFunctionsUpc = function () {
  let text = idScan.value;
  localStorage.setItem("id", text);
  getLocationsUpc(text);
}

function getLocationsUpc(abc) {
  isLoading = true;
  document.getElementById("tableDiv").innerHTML = "";
  labelHeading.innerHTML = "";
  if (isLoading == true)
    document.getElementById('loader').style.display = "block";
  y = 1;
  let txt1 = document.getElementById("outputDiv");
  url = "https://namor.club/p.php?" + abc;
  localStorage.setItem("abc", url);
  fetch(url)
    .then((response) => {
      if (!response.ok) throw new Error("An error occured");
      return response.json();
    })
    .then((response) => {
      txt1.innerHTML = "";
      txt1.innerHTML += "<button class='waves-effect waves-light btn' onclick='partUpdate()'> Update </button>";
      txt2 = "";
      txt2 += "<table><tr><th id='locationIdLbl'> Location ID </th>";
      txt2 += "<th id='lgLbl'> Type </th>";
      txt2 += "<th id='crntQtyLbl'> Quantity </th>";
      txt2 += "<th id='totalPickedLbl'> New Qty </th>";
      txt2 += "<th id='notPickedQuantityLbl'>";
      txt2 += "</th> <th id='newQuantityLbl'></th></tr>";
      var i = 0;
      var j = 0;
      numProds = 0;
      labelHeading.innerHTML = "Part ID : " + response.ex.num;
      let length = response.loc.length;
      while (i < length) {
        if (response.loc[i].qty != 0) {
          txt2 += "<tr><td><input class='locationIdClass' id='locid" + i + "' type='text' value='" + response.loc[i].loc + "' disabled></td>";
          txt2 += "<input id='partid" + i + "' type='text' value='" + response.ex.num + "' disabled hidden>";
          txt2 += "<input id='locationid" + i + "' type='text' value='" + response.loc[i].locationid + "' disabled hidden>";
          txt2 += "<td><input class='lgClass' value='" + response.loc[i].lg + "' disabled></td>";
          txt2 += "<td><input class='locationQuantityClass' id='locqty" + i + "' type'text' value='" + response.loc[i].qty + "' disabled></td>";
          txt2 += "<td><input class='newQuantityClass' id='newqty" + i + "' type='number'></td>";
        }
        numProds++;
        i++;
      }
      document.getElementById("tableDiv").innerHTML = txt2;
      isLoading = false;
      if (isLoading == false);
      document.getElementById('loader').style.display = "none";
      clearField();
      isLoading = false;
    })
    .catch((error) => {
      console.log(error.message);
    });
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
  isLoading = true;
  document.getElementById("tableDiv").innerHTML = "";
  labelHeading.innerHTML = "";
  if (isLoading == true)
    document.getElementById('loader').style.display = "block";
  y = 1;
  localStorage.setItem("abc", abc);
  let txt1 = document.getElementById("outputDiv");
  url = abc;
  fetch(url)
    .then((response) => {
      if (!response.ok) throw new Error("An error occured");
      return response.json();
    })
    .then((response) => {
      txt1.innerHTML = "";
      txt1.innerHTML += "<button class='waves-effect waves-light btn' onclick='partUpdate()'> Update </button>";
      txt2 = "";
      txtx = "";
      txt2 += "<table><tr><th id='locationIdLbl'> Location ID </th> ";
      txt2 += "<th id='lgLbl'> Type </th> ";
      txt2 += "<th id='crntQtyLbl'> Quantity </th> ";
      txt2 += "<th id='totalPickedLbl'> New Qty </th> ";
      txt2 += "<th id='notPickedQuantityLbl'>  </th> ";
      txt2 += "<th id='newQuantityLbl'></th></tr>";
      var i = 0;
      numProds = 0;
      labelHeading.innerHTML = "Part ID : " + response.ex.num;
      let length = response.loc.length;
      while (i < length) {        
        if (response.loc[i].qty != 0) {
          txt2 += "<tr><td><input class='locationIdClass' id='locid" + i + "' type='text' value='" + response.loc[i].loc + "' disabled></td>";
          txt2 += "<input id='partid" + i + "' type='text' value='" + response.ex.num + "' disabled hidden>";
          txt2 += "<input id='locationid" + i + "' type='text' value='" + response.loc[i].locationid + "' disabled hidden>";
          txt2 += "<td><input class='lgClass' value='" + response.loc[i].lg + "' disabled></td>";
          txt2 += "<td><input class='locationQuantityClass' id='locqty" + i + "' type'text' value='" + response.loc[i].qty + "' disabled></td>";
          txt2 += "<td><input class='newQuantityClass' id='newqty" + i + "' type='number'></td>";
        }
        numProds++;
        i++;
      }
      isLoading = false;
      if (isLoading == false);
      document.getElementById('loader').style.display = "none";
      document.getElementById("tableDiv").innerHTML = txt2;
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


function getParts() {
  scans = [];
  isLoading = true;
  document.getElementById("tableDiv").innerHTML = "";
  labelHeading.innerHTML = "";

  if (isLoading == true) {
    document.getElementById('loader').style.display = "block";
  }

  let txt1 = document.getElementById("outputDiv");
  txt2 = "";
  txtx = "";
  txty = "";
  url = "https://namor.club/p.php?loc=" + localStorage.getItem("id2");
  fetch(url)
    .then((response) => {
      if (!response.ok) throw new Error("An error occured");
      return response.json();
    })
    .then((response) => {
      txt1.innerHTML = "";
      txt2 = "";
      txtx = "";
      txt1.innerHTML += "<button class='waves-effect waves-light btn' onclick='locationUpdate()'> Update </button><br>";
      txt2 = "<table><th id='productIdLbl'> Product ID </th> ";
      txt2 += "<th id='currentQuantityLbl' style='width:100%;'> Current&nbsp;Quantity </th> ";
      txt2 += "<th id='quantityLbl'> Quantity </th>";
      var i = 0;
      numLocs = 0;
      labelHeading.innerHTML = "Location ID : " + response.name;
      let length = response.parts.length;
      while (i < length) {
        scans.push(response.parts[i].num);
        if (response.parts[i].qty != 0) { // shows the parts with quantity more than 0 first than shows the products with quantities 0 
          txt2 += "<tr><td><a class='partIdClass' id='partid" + i + "' type='text' onclick='getLocationsAgain(" + i + ");'>" + response.parts[i].num + "</a></td>";
          txt2 += "<input id='locid" + i + "' type='text' value='" + response.id + "' disabled hidden>";
          txt2 += "<td><input class='partQuantityClass' id='partqty" + i + "' type='text' value='" + response.parts[i].qty + "' disabled ></td>";
          txt2 += "<td><input class='newQuantityClass' id='newqty" + i + "' type='number'></td></tr>";
        }
        else {
          txtx += "<tr><td><a class='partIdClass' id='partid" + i + "' type='text' onclick='getLocationsAgain(" + i + ");'>" + response.parts[i].num + "</a></td>";
          txtx += "<input id='locid" + i + "' type='text' value='" + response.id + "' disabled hidden>";
          txtx += "<td><input class='partQuantityClass' id='partqty" + i + "' type='text' value='" + response.parts[i].qty + "' disabled ></td>";
          txtx += "<td><input class='newQuantityClass' id='newqty" + i + "' type='number'></td></tr>";
        }
        numLocs++;
        i++;
      }
      if (response.cycle.length > 0) {
        let z = 0;
        while (z < response.cycle.length) {
          scans.push(response.cycle[z].num);
          txt2 += "<tr><td><a class='partIdClass' id='partid" + (i + z) + "' type='text' onclick='getLocationsAgain(" + (i + z) + ");'>" + response.cycle[z].num + "</a></td>";
          txt2 += "<input id='locid" + (i + z) + "' type='text' value='" + response.id + "' disabled hidden>";
          txt2 += "<td><input class='partQuantityClass' id='partqty" + (i + z) + "' type='text' value='" + response.cycle[z].qty + "' disabled ></td>";
          txt2 += "<td><input class='newQuantityClass' id='newqty" + (i + z) + "' type='number'></td></tr>";
          z++;
        }
      }
      m = 0;
      txty = "<tr id='tr" + m + "'><td><input class='newProduct' id='newProduct' placeholder='Part ID'/></td>";
      txty += "<td><input class='newProductQty' id='newProductQty' placeholder='Quantity'  type='number'/></td>";
      txty += "<td><button id='addBtn'  class='waves-effect waves-light btn' onclick='addProduct()'> Add </button></td></tr></table>";
      m++;
      console.log("m : " + m);
      isLoading = false;
      if (isLoading == false);
      document.getElementById('loader').style.display = "none";
      document.getElementById("tableDiv").innerHTML = txt2 + txtx + txty;
      clearField();
    })
    .catch((error) => {
      console.log(error);
    });
}


//********************************************************************************************************************************************************************************************************************************* */
//   function - addProduct function to add a new product ot the location which wasn't there before. makes the initial adding row disappear and creates a new row to add another product if needed
//********************************************************************************************************************************************************************************************************************************* */

//it adds a new part to the location list 
// allows users to multiple products one by one. 
// updates the database with the new product details 

async function addProduct() {
  let txtz = "";
  let addProductOk = 1;
  console.log(addProductOk);
  var locationID = document.getElementById('locid1').value;
  var newPartID = document.getElementById('newProduct').value;
  var newPartQty = document.getElementById('newProductQty').value;
  var partNum = "";
  const url = "https://namor.club/p.php";
  if (newPartID.length == 0) {
    if (newPartQty.length == 0) {
      alert("Please enter valid details before adding.");
    }
  } else {
    let url2 = "https://namor.club/p.php?" + newPartID;
    await fetch(url2)
      .then((response) => {
        if (!response.ok) throw new Error("An error occured");
        return response.json();
      })
      .then((response) => {
        partNum = response.ex.num;
      })
      .catch((error) => {
        console.log(error.message);
      });

  }
  p = 0;
  q = 0;
  while (p < scans.length) {
    console.log(scans[p], partNum)
    if (scans[p].match(partNum) == partNum) {
      q = 2;      
      console.log("q : " + q);
      break; 
    } else {
      q = 1;
      console.log("q : " + q);      
    }
    p++;
  }
  
  if (q == 2) {
    alert("Product already exists!!!");
  } else if(q == 1) {
    let data = {
      cycle: 1,
      locationid: locationID,
      partid: partNum,
      qty: newPartQty
    }
    let fetchData = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers()
    }
    console.log(fetchData.body[0]);
    fetch(url, fetchData)
      .catch((error) => {
        alert("Add product unsuccessful!");
        addProductOk = 2;
        console.log(addProductOk);
      });
    console.log(addProductOk);
    if (addProductOk == 1) {
      document.getElementById("tr" + (m - 1)).outerHTML = "";
      txtz += "<tr id='tr" + (m - 1) + "'><td><a class='newProduct' id='partid'>" + newPartID + "</a></td>";
      txtz += "<td><input class='newProductQty' id='partqty' value='" + newPartQty + "' disabled/></td>";
      txtz += "<td><input class='newQuantityClass' id='newaddqty" + m + "' type='number'></td></tr>";
    }
    txtz += "<tr id='tr" + m + "'><td><input class='newProduct' id='newProduct' placeholder='Part ID'/></td>";
    txtz += "<td><input class='newProductQty' id='newProductQty' type='number' placeholder='Quantity'/></td>";
    txtz += "<td><button id='addBtn'  class='waves-effect waves-light btn' onclick='addProduct()'> Add </button></td></tr>";
    m++;
  }
  getParts();
}


//********************************************************************************************************************************************************************************************************************************* */
//   function - getLocationsAgain - calls the getLocations function when you click on the product links on the locations page, attached to locationFunction page. 
//********************************************************************************************************************************************************************************************************************************* */


function getLocationsAgain(xyz) {
  isLoading = true;
  if (isLoading == true)
    document.getElementById('loader').style.display = "block";
  localStorage.setItem("xyz", xyz);
  y = 2;
  var partid = document.getElementById("partid" + xyz).innerHTML;
  let txt1 = document.getElementById("outputDiv");
  url = "https://namor.club/p.php?" + partid;
  localStorage.setItem("abc", url);
  fetch(url)
    .then((response) => {
      if (!response.ok) throw new Error("An error occured");
      return response.json();
    })
    .then((response) => {
      txt1.innerHTML = "";
      txt1.innerHTML += "<button class='waves-effect waves-light btn' onclick='getParts()'> Back </button><br>";
      txt1.innerHTML += "<button class='waves-effect waves-light btn' onclick='partUpdate()'> Update </button>";
      txt2 = "";
      txt2 += "<table><tr><th id='locationIdLbl'> Location ID </th> ";
      txt2 += "<th id='lgLbl'> Type </th>";
      txt2 += "<th id='crntQtyLbl'> Quantity </th> ";
      txt2 += "<th id='totalPickedLbl'> New Qty </th> ";
      txt2 += "<th id='notPickedQuantityLbl'></th> ";
      txt2 += "<th id='newQuantityLbl'></th></tr>";
      var i = 0;
      var j = 0;
      numProds = 0;
      labelHeading.innerHTML = "Part ID : " + response.ex.num;
      let length = response.loc.length;
      while (i < length) {
        if (response.loc[i].qty != 0) {
          txt2 += "<tr><td><input class='locationIdClass' id='locid" + i + "' type='text' value='" + response.loc[i].loc + "' disabled></td>";
          txt2 += "<input id='partid" + i + "' type='text' value='" + response.ex.num + "' disabled hidden>";
          txt2 += "<input id='locationid" + i + "' type='text' value='" + response.loc[i].locationid + "' disabled hidden>";
          txt2 += "<td><input class='lgClass' value='" + response.loc[i].lg + "' disabled></td>";
          txt2 += "<td><input class='locationQuantityClass' id='locqty" + i + "' type'text' value='" + response.loc[i].qty + "' disabled></td>";
          txt2 += "<td><input class='newQuantityClass' id='newqty" + i + "' type='number'></td></tr>";
        }
        numProds++;
        i++;
      }
      isLoading = false;
      if (isLoading == false);
      document.getElementById('loader').style.display = "none";
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
      });
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
      });
    j++;
  }
}


//********************************************************************************************************************************************************************************************************************************* */
//   CLEAR FIELDS AND EVERYTHING BUTTON 
//********************************************************************************************************************************************************************************************************************************* */

//executes when clear button is presses
function clearData() {
  let txt1 = document.getElementById("outputDiv");
  txt1.innerHTML = "";
  document.getElementById("tableDiv").innerHTML = "";
  idScan.value = "";
  labelHeading.innerHTML = "- - - - -";
  localStorage.clear();
}


//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
//  clearField: clears the idScan after every scan and after executing every function 
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */

// executes after inner functions execution 
const clearField = function () {
  idScan.value = "";
}


//********************************************************************************************************************************************************************************************************************************* */
//  changeCss function - change the theme to dark and reprogram the button to function to light mode 
//********************************************************************************************************************************************************************************************************************************* */

// changes the theme on the app from light to dark 
function changeCss(cssFile) {
  var stylesheet = document.getElementById("stylesheet");
  stylesheet.setAttribute('href', cssFile);
  document.getElementById("darkButton").setAttribute("onClick", "javascript: changeCssAgain('src/style.css');");
  document.getElementById("darkButton").innerHTML = "Light Theme";
}


//********************************************************************************************************************************************************************************************************************************* */
//  changeCssAgain function - change the theme back to light and start a looping function to change the theme light and dark 
//********************************************************************************************************************************************************************************************************************************* */

//changes the theme on the app from dark to light 
function changeCssAgain(cssFile) {
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

// the quick brown fox jumped over the little lazy dog 
// the quick brown fox jumped over the little lazy dog 
// the quick brown fox jumped over the little lazy dog 
// the quick brown fox jumped over the little lazy dog 
// the quick brown fox jumped over the little lazy dog 
// the quick brown fox jumped over the little lazy dog 
// the quick brown fox jumped over the little lazy dog 
// the quick brown fox jumped over the little lazy dog 
// the quick brown fox jumped over the little lazy dog. 
// the quick brown fox jumped over the little lazy dog. 
// the quick brown fox jumped over the little lazy dog. 
// the quick brown fox jumped over the little lazy dog. 
// the quick brown foc jumped over the little lazy dog. 
// the quick brown fox jumped over the little lazy dog. 
// the quick brown fox jumped over the little lazy dog. 
// the quick brown fox jumped over the little lazy dog. 






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



//********************************************************************************************************************************************************************************************************************************* */
//   getPickedUnpicked function - shows the row, inserts the picked quantity and unpicked quantity
//********************************************************************************************************************************************************************************************************************************* */


// function getPickedUnpicked(locid, partid) {
//   document.getElementById("pickedId" + localStorage.getItem("divNo")).innerHTML = "";
//   document.getElementById("unpickedId" + localStorage.getItem("divNo")).innerHTML = "";
//   document.getElementById("lastrow" + localStorage.getItem("divNo")).style.display = "none";
//   localStorage.setItem("divNo", locid);
//   document.getElementById("lastrow" + locid).style.display = "table-row";

//   var locationid = document.getElementById('locationid' + locid).value;
//   var partsid = document.getElementById('partid' + partid).value;
//   console.log("locid : " + locationid);
//   console.log("partid : " + partsid);
//   let txt3 = "";
//   let txt4 = "";
//   let txt5 = "";
//   url = "https://namor.club/p.php?loc=" + locationid + "&part=" + partsid;
//   //console.log("url: " + url)
//   fetch(url)
//     .then((response) => {
//       if (!response.ok) throw new Error("An error occured");
//       return response.json();
//     })
//     .then((response) => {
//       if (response.totalpicked != null) {
//         txt3 = "Picked : <input id='picked' type='number' value='" + response.totalpicked + "' style='width:40%;' disabled>";
//       }
//       else {
//         txt3 = "Picked : <input id='picked' type='number' value='0' style='width:40%;' disabled>";
//       }
//       if (response.totalnotpicked != null) {
//         txt4 = "Unpicked : <input id='unpicked' type='number' value='" + response.totalnotpicked + "' style='width:40%;' disabled>";
//       }
//       else {
//         txt4 = "Unpicked : <input id='unpicked' type='number' value='0' style='width:40%;' disabled>";
//       }
//       if (response.totalnotpickedwh != null) {
//         txt5 = "Unpicked WH : <input id='unpicked' type='number' value='" + response.totalnotpickedwh + "' style='width:40%;' disabled>";
//       }
//       else {
//         txt5 = "Unpicked WH : <input id='unpicked' type='number' value='0' style='width:40%;' disabled>";
//       }
//       document.getElementById("pickedId" + locid).innerHTML = txt3;
//       document.getElementById("unpickedId" + locid).innerHTML = txt4;
//       document.getElementById("unpickedIdWh" + locid).innerHTML = txt5;
//       //totalnotpickedwh: not picked quantity of the products in the wholesale orders 

//       clearField();
//     })
//     .catch((error) => {
//       console.log(error.message);
//     });
// }