
var scans = [];
var numProds = 0;
var numLocs = 0;
var scannedId;
const idScan = document.getElementById("idScan");
const labelHeading = document.getElementById("labelHeading");

//************************************************************************************************************************************************************************************* */
//************************************************************************************************************************************************************************************* */

const firstfunction = function () {
  var text = idScan.value;
  var varCheck = /[a-zA-z]/g;
  if (varCheck.test(text)) {
    //console.log("test: alphabets are present ");
    getPartFunctions();
  }
  else {
    //console.log("test: no alphabets are present");
    getLocationFunctions();
  }


  //url = "https://namnor.club/p.php?" + text;

  // fetch(url).then(function (response) {
  //   if (response.ok) {
  //     return response.json();
  //   } else {
  //     return Promise.reject(response);
  //   }
  // }).then(function (text) {
  //   scannedId = text;
  //   getLocationFunctions();
  // }).then(function (response) {
  //   if (response.ok) {
  //     return response.json();
  //   } else {
  //     return Promise.reject(response);
  //   }
  // }).then(function () {
  //   scannedId = text;
  //   getPartFunctions();

  // }).catch(function (error) {
  //   console.warn(error);
  // })
}


//************************************************************************************************************************************************************************************* */
//    FIELD UPDATE WHEN SCAN PRODUCT ID 
//************************************************************************************************************************************************************************************* */


const getPartFunctions = function () {
  let text = idScan.value;
  localStorage.setItem("id", text);
  getLocations(text);
  retrieveProdId();
}


function getLocations(abc) {
  let txt1 = document.getElementById("outputDiv");
  url = "https://namor.club/p.php?" + abc;
  fetch(url)
    .then((response) => {
      if (!response.ok) throw new Error("An error occured");
      return response.json();
    })
    .then((response) => {
      txt1.innerHTML = "";
      txt1.innerHTML += "<button onclick='partUpdate()'> Update </button><br><br>";
      txt1.innerHTML += "<label style='float:left'> Location ID </label> <label style='float:none'> Current Quantity </label> <label style='float:right'> New Quantity </label><br><br>";
      var i = 0;
      numProds = 0;
      while (response.loc[i].id != null) {
        txt1.innerHTML += "<input id='locid" + i + "' type='text' value='" + response.loc[i].locationid + "' disabled style='font-size:25px; float:left; color:black' size='15'>";
        txt1.innerHTML += "<input id='partid" + i + "' type='text' value='" + response.ex.id + "' disabled style='font-size:25px; float:left; color:black' hidden>";
        txt1.innerHTML += "<input id='locqty" + i + "' type'text' value='" + response.loc[i].qty + "' style='font-size:25px; float:none;' disabled size='15'>";
        txt1.innerHTML += "<input id='newqty" + i + "' type='number' style='font-size:25px; float:right;' size='15'><br><br>";
        numProds++;
        i++;
        clearField();
      }

    })
    .catch((error) => {
      console.log(error);
    });
}


const retrieveProdId = function () {
  var text = localStorage.getItem("id");
  labelHeading.innerHTML = "Part ID : " + text;
}


//************************************************************************************************************************************************************************************* */
//     FIELD UPDATE WHEN SCAN LOCATION ID 
//************************************************************************************************************************************************************************************* */


const getLocationFunctions = function () {
  let text = idScan.value;
  //console.log("text in getLocationFunctions: " + text);
  localStorage.setItem("id2", text);
  getParts(text);
  retrieveLocId();
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
      txt1.innerHTML += "<button onclick='locationUpdate()'> Update </button><br><br>"
      txt1.innerHTML += "<label style='float:left'> Product ID </label> <label style='float:none'> Current Quantity </label> <label style='float:right'> Quantity </label><br><br>";
      var i = 0;
      numLocs = 0;
      while (response.parts[i].partid != null) {
        txt1.innerHTML += "<input id='partid" + i + "' type='text' value='" + response.parts[i].num + "' disabled style='font-size:25px; float:left; color:black' size='15'>";
        txt1.innerHTML += "<input id='locid" + i + "' type='text' value='" + response.id + "' disabled style='font-size:25px; float:left; color:black' hidden>";
        txt1.innerHTML += "<input id='partqty" + i + "' type='text' value='" + response.parts[i].qty + "' style='font-size:25px; float:none;' size='15' disabled>";
        txt1.innerHTML += "<input id='newqty" + i + "' type='number' style='font-size:25px; float:right;' size='15'><br><br>";
        numLocs++;
        i++;
        clearField();
      }
    })
    .catch((error) => {
      console.log(error);
    });

}


const retrieveLocId = function () {
  var text = localStorage.getItem("id2");
  labelHeading.innerHTML = "Location ID : " + text;
}



//************************************************************************************************************************************************************************************* */
//    PARTS UPDATE BUTTON
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

    console.log(fetchData.body[0])

    fetch(url, fetchData)
      .catch((error) => {
        console.log(error);
      })


    j++;
  }

}

//************************************************************************************************************************************************************************************* */
//    LOCATION UPDATE BUTTON -->> WORK IN PROGRESS <<--
//************************************************************************************************************************************************************************************* */


function locationUpdate(locid, partid, newqty) {
  alert("Update coming soon !!!");


  // var j = 0;
  // while (j < numLocs) {
  //   var locationid = document.getElementById('locid' + j).value;
  //   var partid = document.getElementById('partid' + j).value;
  //   var newqty = document.getElementById('newqty' + j).value;
  //   console.log("locid: " + locationid);
  //   console.log("partid: " + partid);

  //   const url = "https://namor.club/p.php";
  //   let data = {
  //     locid: locationid,
  //     partid: partid,
  //     rawloc: 0,
  //     rawpart: newqty,
  //     ip: 0,
  //     user: 'test'
  //   }

  //   let fetchData = {
  //     method: 'POST',
  //     body: JSON.stringify(data),
  //     headers: new Headers()
  //   }

  //   console.log(fetchData.body[0])

  //   fetch(url, fetchData)
  //     .catch((error) => {
  //       console.log(error);
  //     })


  //   j++;
  // }

}

//************************************************************************************************************************************************************************************* */
//   CLEAR FIELDS AND EVERYTHING BUTTON 
//************************************************************************************************************************************************************************************* */

function clearData() {
  let txt1 = document.getElementById("outputDiv");
  txt1.innerHTML = "";
  idScan.value = "";
  idScan.value = "";
}

const clearField = function () {
  idScan.value = "";
}

//************************************************************************************************************************************************************************************* */
//************************************************************************************************************************************************************************************* */