//const qrcode = window.qrcode;
import { test } from "./context/model";
//array for the scanned codes
const qrCodeResults = []; 

const video = document.createElement("video");
const canvasElement = document.getElementById("qr-canvas");
const canvas = canvasElement.getContext("2d");

const qrResult = document.getElementById("qr-result");
const outputData = document.getElementById("outputData");
const btnScanQR = document.getElementById("btn-scan-qr");
const btnData = document.getElementById("btnData"); 
const txt1 = document.getElementById("txt1"); 

let scanning = true;

qrcode.callback = res => {
  if (res) {

    btnData.hidden = false; 
    outputData.innerText = res;
    scanning = false;
    txt1.innerHTML = "Product details "; 
    
    qrResult.hidden = false;
    //console.log(outputData.innerHTML); 
    qrCodeResults.push(outputData.innerHTML); 
    // canvasElement.hidden = true;
    btnScanQR.hidden = false;
    navigator.mediaDevices
    .getUserMedia({ video: { facingMode: "environment" } })
    .then(function(stream) {
      scanning = true;
      //qrResult.hidden = true;
      btnScanQR.hidden = true;
      canvasElement.hidden = false;
      video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
      video.srcObject = stream;
      video.play();
      tick();
      scan();
    });
  }
};

btnScanQR.onclick = () => {
  navigator.mediaDevices
    .getUserMedia({ video: { facingMode: "environment" } })
    .then(function(stream) {
      scanning = true;
      qrResult.hidden = true;
      btnScanQR.hidden = true;
      
      canvasElement.hidden = false;
      video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
      video.srcObject = stream;
      video.play();
      tick();
      scan();
    });
};

function tick() {
  canvasElement.height = video.videoHeight;
  canvasElement.width = video.videoWidth;
  canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);

  scanning && requestAnimationFrame(tick);
}

function scan() {
  try {
    qrcode.decode();
  } catch (e) {
    setTimeout(scan, 300);
  }
}

btnData.onclick = () =>{
  console.log("qrCodeResults length is : " + qrCodeResults.length);
  for(let i = 0; i < qrCodeResults.length; i++){
    console.log(qrCodeResults[i]);
  }
}


/*

  requirements: 
   - ability to scan at any angle 
   - have an history - store qr codes, the time they were scanned, the number of times they were scanned - done 
    - history is provided in the console for now 
   
  - only thing left is to connect to the database and get the results from the database abotut he products and display  

  
*/

//keep a back log of all the qr codes scanned
//create a table with user id
 //store the item no 
 //item location 
 //time/date it was stored 
 //who stored it 
 //all in the backlog, only the admin has the control 
//connect the database to the database 
// make it more cool 


// data output required: 
 // from multiple tables
 // using joins 
 // display on th screen 
 // 

 // improving the senstivity of the scanner 
// making the scanner better, to make it able to scan even at different angles

