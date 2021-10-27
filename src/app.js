
var scans = [];
var numProds = 0;
var numLocs = 0;
var scannedId;
var searchTimeout;
const idScan = document.getElementById("idScan");
const labelHeading = document.getElementById("labelHeading");


//************************************************************************************************************************************************************************************* */
//   Typing check function - check when the user has stopped typing in the input field and calls first function when the user stops 
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
    //testFunction(); 
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
      txt1.innerHTML += "<label id='locationIdLbl'> Location ID </label> <label id='crntQtyLbl'> Current Qty </label> <label id='totalPickedLbl'> Picked </label> <label id='notPickedQuantityLbl'> Allocated </label> <label id='newQuantityLbl'> Quantity </label><br><br>";
      var i = 0;
      var j = 0;
      numProds = 0;
      labelHeading.innerHTML = "Part ID : " + response.ex.num;
      let length = response.loc.length;
      while (i < length) {
        txt1.innerHTML += "<input id='locid" + i + "' type='text' value='" + response.loc[i].locationid + "' disabled style='font-size:25px; float:left; color:black' size='8'>";
        txt1.innerHTML += "<input id='partid" + i + "' type='text' value='" + response.ex.id + "' disabled style='font-size:25px; color:black' hidden>";
        txt1.innerHTML += "<input class='classLoc' id='locqty" + i + "' type'text' value='" + response.loc[i].qty + "' style='font-size:25px; float:left;' disabled size='8'>";

        //************************************************************************************************************************************************************************************* */
        // picked today
        if (response.pickedtoday.length != 0) {
          j = response.pickedtoday.length;
          let z = 0;
          for (let x = 0; x < j; x++) {
            if (response.loc[i].locationid == response.pickedtoday[x].locationid) {
              txt1.innerHTML += "<input id='pickedqty' type='text' value='" + response.pickedtoday[x].totalpicked + "' style='font-size:25px; color:black; float:left;' size='8' disabled>";
              z++;
            }
          }
          if (z == 0) {
            txt1.innerHTML += "<input id='pickedqty' type='text' style='font-size:25px; float:left;' size='8' disabled placeholder='0'>";
          }
        } else {
          txt1.innerHTML += "<input id='pickedqty' type='text' style='font-size:25px; float:left;' size='8' disabled placeholder='0'>";
        }

        //************************************************************************************************************************************************************************************* */
        // not picked today                
        if (response.notpickedtoday.length != 0) {
          j = response.pickedtoday.length;
          let z = 0;
          for (let x = 0; x < j; x++) {
            if (response.loc[i].locationid == response.notpickedtoday[x].locationid) {
              txt1.innerHTML += "<input id='notpickedqty' type='text' value='" + response.notpickedtoday[x].qty + "' style='font-size:25px; color:black; float:left;' size='8' disabled>";
              z++;
            }
          }
          if (z == 0) {
            txt1.innerHTML += "<input id='notpickedqty' type='text' style='font-size:25px; float:left;' size='8' disabled placeholder='0'>";
          }
        } else {
          txt1.innerHTML += "<input id='notpickedqty' type='text' style='font-size:25px; float:left;' size='8' disabled placeholder='0'>";
        }
        txt1.innerHTML += "<input id='newqty" + i + "' type='text' style='font-size:25px; float:right;' size='8'><br><br>";
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
//     FIELD UPDATE WHEN SCAN LOCATION ID - shows the details of the products which are available when you scan a location 
//************************************************************************************************************************************************************************************* */



//************************************************************************************************************************************************************************************* */


function alertingFunction(xyz) {
  var def = document.getElementById("partid" + xyz).innerHTML; 
  console.log("def " + def);
  let txt1 = document.getElementById("outputDiv");
  url = "https://namor.club/p.php?" + def;
  console.log("url " + url);
  fetch(url)
    .then((response) => {
      if (!response.ok) throw new Error("An error occured");
      return response.json();
    })
    .then((response) => {
      console.log("response : " + response); 
      txt1.innerHTML = "";
      txt1.innerHTML += "<button onclick='getPartsAgain()'> Back </button><br><br>"; 
      txt1.innerHTML += "<button onclick='partUpdate()'> Update </button><br><br>";
      txt1.innerHTML += "<label id='locationIdLbl'> Location ID </label> <label id='crntQtyLbl'> Current Qty </label> <label id='totalPickedLbl'> Picked </label> <label id='notPickedQuantityLbl'> Allocated </label> <label id='newQuantityLbl'> Quantity </label><br><br>";
      var i = 0;
      var j = 0;
      numProds = 0;
      labelHeading.innerHTML = "Part ID : " + response.ex.num;
      let length = response.loc.length;
      while (i < length) {
        txt1.innerHTML += "<input id='locid" + i + "' type='text' value='" + response.loc[i].locationid + "' disabled style='font-size:25px; float:left; color:black' size='8'>";
        txt1.innerHTML += "<input id='partid" + i + "' type='text' value='" + response.ex.id + "' disabled style='font-size:25px; color:black' hidden>";
        txt1.innerHTML += "<input class='classLoc' id='locqty" + i + "' type'text' value='" + response.loc[i].qty + "' style='font-size:25px; float:left;' disabled size='8'>";

        //************************************************************************************************************************************************************************************* */
        // picked today
        if (response.pickedtoday.length != 0) {
          j = response.pickedtoday.length;
          let z = 0;
          for (let x = 0; x < j; x++) {
            if (response.loc[i].locationid == response.pickedtoday[x].locationid) {
              txt1.innerHTML += "<input id='pickedqty' type='text' value='" + response.pickedtoday[x].totalpicked + "' style='font-size:25px; color:black; float:left;' size='8' disabled>";
              z++;
            }
          }
          if (z == 0) {
            txt1.innerHTML += "<input id='pickedqty' type='text' style='font-size:25px; float:left;' size='8' disabled placeholder='0'>";
          }
        } else {
          txt1.innerHTML += "<input id='pickedqty' type='text' style='font-size:25px; float:left;' size='8' disabled placeholder='0'>";
        }

        //************************************************************************************************************************************************************************************* */
        // not picked today                
        if (response.notpickedtoday.length != 0) {
          j = response.pickedtoday.length;
          let z = 0;
          for (let x = 0; x < j; x++) {
            if (response.loc[i].locationid == response.notpickedtoday[x].locationid) {
              txt1.innerHTML += "<input id='notpickedqty' type='text' value='" + response.notpickedtoday[x].qty + "' style='font-size:25px; color:black; float:left;' size='8' disabled>";
              z++;
            }
          }
          if (z == 0) {
            txt1.innerHTML += "<input id='notpickedqty' type='text' style='font-size:25px; float:left;' size='8' disabled placeholder='0'>";
          }
        } else {
          txt1.innerHTML += "<input id='notpickedqty' type='text' style='font-size:25px; float:left;' size='8' disabled placeholder='0'>";
        }
        txt1.innerHTML += "<input id='newqty" + i + "' type='text' style='font-size:25px; float:right;' size='8'><br><br>";
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
//************************************************************************************************************************************************************************************* */



function getPartsAgain() {
  let txt1 = document.getElementById("outputDiv");
  url = "https://namor.club/p.php?loc=" + localStorage.getItem("id2");
  fetch(url)
    .then((response) => {
      if (!response.ok) throw new Error("An error occured");
      return response.json();
    })
    .then((response) => {
      txt1.innerHTML = "";
      txt1.innerHTML += "<button onclick='locationUpdate()'> Update </button><br><br>";
      txt1.innerHTML += "<div id='lblContainer'><label id='productIdLbl'> Product ID </label> <label id='currentQuantityLbl'> Current&nbsp;Quantity </label> <label id='quantityLbl'> Quantity </label></div><br><br>";
      var i = 0;
      numLocs = 0;
      labelHeading.innerHTML = "Location ID : " + response.name;
      let length = response.parts.length;
      while (i < length) {
        txt1.innerHTML += "<a id='partid" + i + "' type='text' onclick='alertingFunction(" + i + ");' style='float:left;' >" + response.parts[i].num + "</a>"; //  disabled style='font-size:25px; float:left; color:black' size='12'
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
      txt1.innerHTML += "<div id='lblContainer'><label id='productIdLbl'> Product ID </label> <label id='currentQuantityLbl'> Current&nbsp;Quantity </label> <label id='quantityLbl'> Quantity </label></div><br><br>";
      var i = 0;
      numLocs = 0;
      labelHeading.innerHTML = "Location ID : " + response.name;
      let length = response.parts.length;
      while (i < length) {
        txt1.innerHTML += "<a id='partid" + i + "' type='text' onclick='alertingFunction(" + i + ");' style='float:left;' >" + response.parts[i].num + "</a>"; //  disabled style='font-size:25px; float:left; color:black' size='12'
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

// function testFunction() {
//   product = {
//     "status": "OK",
//     "ex": {
//       "id": 6670,
//       "num": "R54181ONZ",
//       "des": "Premium OE Rotor",
//       "variantid": 4,
//       "typeid": 1,
//       "vendorid": null,
//       "cost": null,
//       "deflocid": null,
//       "specialid": null,
//       "basenum": null,
//       "created": "2020-06-29 17:39:00",
//       "mavg": 0,
//       "deflocal": 5256,
//       "active": 1,
//       "weight_lbs": "14.33",
//       "origin": null,
//       "costid": 4430,
//       "name": "2610 : A12 : 03 : 4L",
//       "lgid": 3
//     },
//     "upc": [
//       {
//         "upc": "665083116576"
//       },
//       {
//         "upc": "702669007900"
//       },
//       {
//         "upc": "809225300373"
//       }
//     ],
//     "loc": [
//       {
//         "id": 149262,
//         "locationid": 286,
//         "qty": 0,
//         "loc": "1275 : A03 : 02 : 1L",
//         "lg": "RESTOCK"
//       },
//       {
//         "id": 77969,
//         "locationid": 292,
//         "qty": 0,
//         "loc": "1281 : A03 : 02 : 4R",
//         "lg": "RESTOCK"
//       },
//       {
//         "id": 99271,
//         "locationid": 3927,
//         "qty": 0,
//         "loc": "1281 : A03 : 02 : 4R",
//         "lg": "LOCAL PURCHASE"
//       },
//       {
//         "id": 77135,
//         "locationid": 334,
//         "qty": 0,
//         "loc": "1323 : A03 : 06 : 2R",
//         "lg": "RESTOCK"
//       },
//       {
//         "id": 99319,
//         "locationid": 3969,
//         "qty": 0,
//         "loc": "1323 : A03 : 06 : 2R",
//         "lg": "LOCAL PURCHASE"
//       },
//       {
//         "id": 78706,
//         "locationid": 420,
//         "qty": 0,
//         "loc": "1409 : A04 : 11 : 1L",
//         "lg": "RESTOCK"
//       },
//       {
//         "id": 101576,
//         "locationid": 4055,
//         "qty": 0,
//         "loc": "1409 : A04 : 11 : 1L",
//         "lg": "LOCAL PURCHASE"
//       },
//       {
//         "id": 169928,
//         "locationid": 499,
//         "qty": 78,
//         "loc": "1488 : A04 : 03 : 5R",
//         "lg": "RESTOCK"
//       },
//       {
//         "id": 151644,
//         "locationid": 511,
//         "qty": 0,
//         "loc": "1500 : A04 : 02 : 3R",
//         "lg": "RESTOCK"
//       },
//       {
//         "id": 150068,
//         "locationid": 624,
//         "qty": 0,
//         "loc": "1613 : A05 : 11 : 4R",
//         "lg": "RESTOCK"
//       },
//       {
//         "id": 157260,
//         "locationid": 632,
//         "qty": 60,
//         "loc": "1621 : A05 : 12 : 5L",
//         "lg": "RESTOCK"
//       },
//       {
//         "id": 154733,
//         "locationid": 821,
//         "qty": 156,
//         "loc": "1810 : A07 : 05 : 1R",
//         "lg": "RESTOCK"
//       },
//       {
//         "id": 2942,
//         "locationid": 1621,
//         "qty": 8,
//         "loc": "2610 : A12 : 03 : 4L",
//         "lg": "WAREHOUSE"
//       },
//       {
//         "id": 2943,
//         "locationid": 5256,
//         "qty": 0,
//         "loc": "2610 : A12 : 03 : 4L",
//         "lg": "LOCAL PURCHASE"
//       },
//       {
//         "id": 75789,
//         "locationid": 7267,
//         "qty": 0,
//         "loc": "cancelation",
//         "lg": "WAREHOUSE"
//       },
//       {
//         "id": 76831,
//         "locationid": 3,
//         "qty": 0,
//         "loc": "Receiving",
//         "lg": "WAREHOUSE"
//       }
//     ],
//     "landed": {
//       "costusd": "9.44",
//       "costcad": "11.05"
//     },
//     "partcat": false,
//     "fifo": {
//       "id": 4430,
//       "created": "2021-06-08 19:58:41",
//       "poitemid": null,
//       "updated": "2021-10-26 10:00:04",
//       "partid": 6670,
//       "qty": 64,
//       "qty_left": 0,
//       "finished": "2021-10-26 10:00:04",
//       "cost_cad_part": null,
//       "cost_cad_freight": "0.00",
//       "cost_cad_customs": "0.00",
//       "cost_cad_final_per": "12.27",
//       "cost_usd_final_per": "9.44",
//       "container": null,
//       "code": null,
//       "uploaded": null
//     },
//     "fifolist": [
//       {
//         "id": 10629,
//         "created": "2021-08-17 09:19:25",
//         "poitemid": 26416,
//         "updated": "2021-08-17 09:19:25",
//         "partid": 6670,
//         "qty": 156,
//         "qty_left": 156,
//         "finished": null,
//         "cost_cad_part": null,
//         "cost_cad_freight": "0.00",
//         "cost_cad_customs": "0.00",
//         "cost_cad_final_per": "15.71",
//         "cost_usd_final_per": "12.50",
//         "container": null,
//         "code": "HL06821",
//         "uploaded": null
//       },
//       {
//         "id": 10684,
//         "created": "2021-08-17 16:10:18",
//         "poitemid": 26534,
//         "updated": "2021-08-17 16:10:18",
//         "partid": 6670,
//         "qty": 156,
//         "qty_left": 156,
//         "finished": null,
//         "cost_cad_part": null,
//         "cost_cad_freight": "0.00",
//         "cost_cad_customs": "0.00",
//         "cost_cad_final_per": "14.67",
//         "cost_usd_final_per": "11.67",
//         "container": null,
//         "code": "HL07621",
//         "uploaded": null
//       },
//       {
//         "id": 11544,
//         "created": "2021-09-02 13:21:03",
//         "poitemid": 28308,
//         "updated": "2021-09-02 13:21:03",
//         "partid": 6670,
//         "qty": 78,
//         "qty_left": 78,
//         "finished": null,
//         "cost_cad_part": null,
//         "cost_cad_freight": "0.00",
//         "cost_cad_customs": "0.00",
//         "cost_cad_final_per": "16.39",
//         "cost_usd_final_per": "13.00",
//         "container": null,
//         "code": "210614",
//         "uploaded": null
//       },
//       {
//         "id": 11589,
//         "created": "2021-09-02 13:21:03",
//         "poitemid": 28353,
//         "updated": "2021-09-02 13:21:03",
//         "partid": 6670,
//         "qty": 156,
//         "qty_left": 156,
//         "finished": null,
//         "cost_cad_part": null,
//         "cost_cad_freight": "0.00",
//         "cost_cad_customs": "0.00",
//         "cost_cad_final_per": "17.22",
//         "cost_usd_final_per": "13.67",
//         "container": null,
//         "code": "HL11021",
//         "uploaded": null
//       }
//     ],
//     "cycle": [
//       {
//         "cycled": 0,
//         "partid": 6670,
//         "num": "R54181ONZ",
//         "inter": "",
//         "lgid": 2,
//         "qty": "60",
//         "locationid": 632
//       },
//       {
//         "cycled": 0,
//         "partid": 6670,
//         "num": "R54181ONZ",
//         "inter": "",
//         "lgid": 1,
//         "qty": "24",
//         "locationid": 1621
//       },
//       {
//         "cycled": 0,
//         "partid": 6670,
//         "num": "R54181ONZ",
//         "inter": "",
//         "lgid": 3,
//         "qty": "0",
//         "locationid": 3927
//       },
//       {
//         "cycled": 0,
//         "partid": 6670,
//         "num": "R54181ONZ",
//         "inter": "",
//         "lgid": 2,
//         "qty": "0",
//         "locationid": 292
//       },
//       {
//         "cycled": 0,
//         "partid": 6670,
//         "num": "R54181ONZ",
//         "inter": "",
//         "lgid": 2,
//         "qty": "78",
//         "locationid": 499
//       },
//       {
//         "cycled": 0,
//         "partid": 6670,
//         "num": "R54181ONZ",
//         "inter": "",
//         "lgid": 2,
//         "qty": "0",
//         "locationid": 420
//       },
//       {
//         "cycled": 0,
//         "partid": 6670,
//         "num": "R54181ONZ",
//         "inter": "",
//         "lgid": 3,
//         "qty": "0",
//         "locationid": 5256
//       },
//       {
//         "cycled": 0,
//         "partid": 6670,
//         "num": "R54181ONZ",
//         "inter": "",
//         "lgid": 3,
//         "qty": "0",
//         "locationid": 4055
//       },
//       {
//         "cycled": 0,
//         "partid": 6670,
//         "num": "R54181ONZ",
//         "inter": "",
//         "lgid": 1,
//         "qty": "0",
//         "locationid": 7267
//       },
//       {
//         "cycled": 0,
//         "partid": 6670,
//         "num": "R54181ONZ",
//         "inter": "",
//         "lgid": 2,
//         "qty": "0",
//         "locationid": 511
//       },
//       {
//         "cycled": 0,
//         "partid": 6670,
//         "num": "R54181ONZ",
//         "inter": "",
//         "lgid": 3,
//         "qty": "0",
//         "locationid": 3969
//       },
//       {
//         "cycled": 0,
//         "partid": 6670,
//         "num": "R54181ONZ",
//         "inter": "",
//         "lgid": 2,
//         "qty": "156",
//         "locationid": 821
//       },
//       {
//         "cycled": 0,
//         "partid": 6670,
//         "num": "R54181ONZ",
//         "inter": "",
//         "lgid": 2,
//         "qty": "0",
//         "locationid": 334
//       },
//       {
//         "cycled": 0,
//         "partid": 6670,
//         "num": "R54181ONZ",
//         "inter": "",
//         "lgid": 2,
//         "qty": "0",
//         "locationid": 286
//       },
//       {
//         "cycled": 0,
//         "partid": 6670,
//         "num": "R54181ONZ",
//         "inter": "",
//         "lgid": 1,
//         "qty": "0",
//         "locationid": 3
//       },
//       {
//         "cycled": 0,
//         "partid": 6670,
//         "num": "R54181ONZ",
//         "inter": "",
//         "lgid": 2,
//         "qty": "0",
//         "locationid": 624
//       }
//     ],
//     "cyclecheck": [],
//     "pickedtoday": [
//       {
//         "locationid": 1621,
//         "totalpicked": "8"
//       },
//       {
//         "locationid": 286,
//         "totalpicked": "5"
//       }
//     ],
//     "notpickedtoday": [
//       {
//         "locationid": 821,
//         "totalpicked": "10"
//       },
//       {
//         "locationid": 499,
//         "totalpicked": "23"
//       }
//     ]
//   }

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