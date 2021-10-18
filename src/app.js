//alert("Welcome!!!")
const prodScan = document.getElementById("prodScan");
const locScan = document.getElementById("locScan");


function getData() {    
  let txt1 = document.getElementById("outputDiv");
  url = "https://namor.club/p.php?" + prodScan.value;
  
  fetch(url)
    .then((response) => {
      if (!response.ok) throw new Error("An error occured");
      return response.json();
    })
    .then((response) => {      
      txt1.innerHTML = "";
      txt1.innerHTML = "<label style='float:left'> Location ID </label> <label style='float:right'> Location Quantity </label><br><br>";
      var i = 0;
      while (response.loc[i].id != null) {
        txt1.innerHTML += "<input id='locid" + i + "' type='text' value='" + response.loc[i].id + "' disabled style='font-size:25px; float:left; color:black'>";
        txt1.innerHTML += "<button onclick='handleUpdate(locid" + i + ", locqty" + i + ")' align-items='center'>Update</button>"
        txt1.innerHTML += "<input id='locqty" + i + "' type='number' value='" + response.loc[i].qty + "' style='font-size:25px; float:right;'><br><br>";
        i++;
      }
    })
    .catch((error) => {
      console.log(error)
    });

    document.getElementById('prodScan').focus(); 
}

function getData2() {    
  let txt1 = document.getElementById("outputDiv");
  url = "https://namor.club/p.php?loc=" + locScan.value;
  
  fetch(url)
    .then((response) => {
      if (!response.ok) throw new Error("An error occured");
      return response.json();
    })
    .then((response) => {      
      txt1.innerHTML = "";
      locScan.value = response.name; 
      txt1.innerHTML = "<label style='float:left'> Product ID </label> <label style='float:right'> Quantity </label><br><br>";
      var i = 0;
      while (response.parts[i].partid != null) {
        txt1.innerHTML += "<input id='locid" + i + "' type='text' value='" + response.parts[i].partid + "' disabled style='font-size:25px; float:left; color:black'>";
        txt1.innerHTML += "<button onclick='handleUpdate(locid" + i + ", locqty" + i + ")' align-items='center'>Update</button>"
        txt1.innerHTML += "<input id='locqty" + i + "' type='number' value='" + response.parts[i].qty + "' style='font-size:25px; float:right;'><br><br>";
        i++;
      }
    })
    .catch((error) => {
      console.log(error)
    });

}

function handleUpdate(id, locqty) {
  let locationid = id.value;
  let locationqty = locqty.value;
  console.log(locationid, locationqty)
  const url = "https://namor.club/p.php";
  let data = {
    locid: locationid,
    partid: 'partid',
    rawloc: 'rawlocid',
    rawpart: 'rawpartid',
    ip: 'ip',
    user: 'user'
  }

}

function postData() {
  const url = "https://namor.club/p.php";

  let data = {
    locid: 'locationid',
    partid: 'partid',
    rawloc: 'rawlocid',
    rawpart: 'rawpartid',
    ip: 'ip',
    user: 'user'
  }

  let fetchData = {
    method: 'POST',
    body: data,
    headers: new Headers()
  }

  fetch(url, fetchData)
    .then(function () {
      console.log("post request was successful");
    });


}

function clearData() {
  let txt1 = document.getElementById("outputDiv");
  txt1.innerHTML = "";
  prodScan.value = "";
  locScan.value = "";
}



// qrcode.callback = res => {
//   //txt1.innerHTML = "Scanning...";
//   //res in the qr code of the product gives the https://namor.club/p.php?<product number>
//   //console.log("here")
//   if (res) {
//     //txt1.innerHTML = "Scanning...";
//     //console.log(res); 

//     btnData.hidden = false;
//     //outputData.innerText = res;
//     scanning = false;
//     var res2 = res;
//     //if()
//     url = "https://namor.club/p.php?" + res;
//     //console.log(res); 

//     fetch(res)
//       .then((response) => {
//         if (!response.ok) throw new Error("An error occured");
//         return response.json();
//       })
//       .then((response) => {
//         //console.log(response);
//         outputData.innerHTML = response.inter[0].inter;
//         //txt1.innerHTML = ""; 
//         txt1.innerHTML += "****************************************\n";
//         txt1.innerHTML += "Product number      * " + response.ex.num + "\n";
//         txt1.innerHTML += "Product description * " + response.ex.des + "\n";

//         var i = 0;
//         while (response.loc[i].id != null) {
//           //console.log(response.loc[i].id);
//           txt1.innerHTML += "Location ID         * " + response.loc[i].id + " \n";
//           txt1.innerHTML += "Location quantity   * " + response.loc[i].qty + "\n";
//           i++;
//         }
//       })
//       .catch((error) => {
//         console.log(error)
//       });

//     qrResult.hidden = false;
//     qrCodeResults.push(res);
//     btnScanQR.hidden = false;
//     navigator.mediaDevices
//       .getUserMedia({ video: { facingMode: "environment" } })
//       .then(function (stream) {
//         scanning = true;
//         //qrResult.hidden = true;
//         btnScanQR.hidden = true;
//         canvasElement.hidden = false;
//         video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
//         video.srcObject = stream;
//         video.play();
//         tick();
//         scan();
//       });
//   }
// };

// //    if (err) throw err; 

// btnScanQR.addEventListener("click", function () {
//   //alert("Hey this is working!!")
//   //txt1.innerHTML = "Scanning...";
//   navigator.mediaDevices
//     .getUserMedia({ video: { facingMode: "environment" } })
//     .then(function (stream) {
//       scanning = true;
//       qrResult.hidden = true;
//       btnScanQR.hidden = true;

//       canvasElement.hidden = false;
//       video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
//       video.srcObject = stream;
//       video.play();
//       tick();
//       scan();
//     });
// });

// function tick() {
//   canvasElement.height = video.videoHeight;
//   canvasElement.width = video.videoWidth;
//   canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);

//   scanning && requestAnimationFrame(tick);
// }

// function scan() {
//   try {
//     qrcode.decode();
//   } catch (e) {
//     setTimeout(scan, 300);
//   }
// }


