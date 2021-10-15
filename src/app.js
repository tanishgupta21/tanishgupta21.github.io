const qrCodeResults = [];  // array for the scanned codes
const testButton = document.getElementById("test");

const video = document.createElement("video");
const canvasElement = document.getElementById("qr-canvas");
const canvas = canvasElement.getContext("2d");

const qrResult = document.getElementById("qr-result");
const outputData = document.getElementById("outputData");
const btnScanQR = document.getElementById("btn-scan-qr");
const btnData = document.getElementById("btnData");
const txt1 = document.getElementById("txt1");
let prodScan = document.getElementById("prodScan");
const locScan = document.getElementById("locScan");


function getData() {
  //alert("function called");
  url = "https://namor.club/p.php?" + prodScan.value;
  console.log("prodScan : " + prodScan.value)
  console.log("url : " + url);
  fetch(url)
    .then((response) => {
      if (!response.ok) throw new Error("An error occured");
      return response.json();
    })
    .then((response) => {
      console.log(response);
      outputData.innerHTML = response.inter[0].inter;
      //txt1.innerHTML = ""; 
      txt1.innerHTML += "****************************************\n";
      txt1.innerHTML += "Product number      * " + response.ex.num + "\n";
      txt1.innerHTML += "Product description * " + response.ex.des + "\n";
      var i = 0;
      while (response.loc[i].id != null) {
        //console.log(response.loc[i].id);
        txt1.innerHTML += "Location ID         * " + response.loc[i].id + " \n";
        txt1.innerHTML += "Location quantity   * " + response.loc[i].qty + "\n";
        i++;
      }
    })
    .catch((error) => {
      console.log(error)
    });

}


function createTxtArea() {

  var x = document.createElement("textarea");
  var t = document.createTextNode("Test textarea");
  x.appendChild(t);
  document.body.appendChild(x);
  
}

function postData() {
  const url = "https://namor.club/p.php";

  let data = {
    "locid": 'locationid',
    "partid": 'partid',
    "rawloc": 'rawlocid',
    "rawpart": 'rawpartid',
    "ip": 'ip',
    "user": 'user',
  }

  let fetchData = {
    method : 'POST', 
    body : data, 
    headers : new Headers()
  }

  fetch(url, fetchData)
  .then(function() {
    console.log("post request was successful"); 
  });


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

btnData.onclick = () => {
  //console.log("qrCodeResults length is : " + qrCodeResults.length);
  for (let i = 0; i < qrCodeResults.length; i++) {
    console.log(qrCodeResults[i]);
  }
}


