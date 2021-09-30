<?php
  $servername = "127.0.0.1:3306"; 
  $username = "root";
  $password = "therookie49";
  $dbname = "mySchema";
  $conn = new mysqli($servername, $username, $password, $dbname); 
  if($conn-> connect_error){
  die("Connection failed" . $conn->connect_error); 
  }
?>
<!-- ----------------------------------------------------------------------------------------------------------------------------------------------------- -->
<!DOCTYPE html>
<html>
  <head>
    <title>Max Advanced Brakes</title>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0; user-scalable=0;" />
    <link rel="stylesheet" href="src/style.css" />
    <script src="https://rawgit.com/sitepoint-editors/jsqrcode/master/src/qr_packed.js"></script>
  </head>

  <body>
    <div id="container">
      <h1>QR Code Scanner</h1>
      <a id="btn-scan-qr"> <!--entry thing the portal -->
        <img src="https://dab1nmslvvntp.cloudfront.net/wp-content/uploads/2017/07/1499401426qr_icon.svg">
      </a>
      <canvas hidden="" id="qr-canvas"></canvas>
      <div id="qr-result" hidden="">
        <b>Data:</b> <span id="outputData"></span>
      </div>
      <br>
      <button id="btnData" hidden=""> Show Data </button>
      <br><br>      
      <textarea id="txt1" rows="4" cols="40">   </textarea>
    </div>    
    
    <!--  <script src="./src/app.js"></script> -->

    <script type="text/javascript">
      const qrCodeResults = []; 

      const video = document.createElement("video");
      const canvasElement = document.getElementById("qr-canvas");
      const canvas = canvasElement.getContext("2d");

      const qrResult = document.getElementById("qr-result");
      const outputData = document.getElementById("outputData");
      const btnScanQR = document.getElementById("btn-scan-qr");
      const btnData = document.getElementById("btnData"); 
      const txt1 = document.getElementById("txt1"); 

      var phpVar = ""; 

      let scanning = true;

      qrcode.callback = res => {
        if (res) {
          btnData.hidden = false; 
          outputData.innerText = res;
          scanning = false;          
          qrResult.hidden = false;
          //console.log(outputData.innerHTML); 
          qrCodeResults.push(outputData.innerHTML); 

          console.log("res = " + res); 
          console.log("outputData = " + outputData); 

          console.log("phpVar = " + phpVar); 

          <?php 
          
          
          ?>

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
        //console.log("qrCodeResults length is : " + qrCodeResults.length);
        for(let i = 0; i < qrCodeResults.length; i++){
          console.log(qrCodeResults[i]);
        }
      }

    </script>

<?php 
  
  

  



    //       $google2 = "Google"; 
    //       //
    //       //echo "phpVar = '" . $google2 . "';"; 

    // $domocument = new DOMDocument();
    // $oututData = $domDocument->getElementById('outputData').innerHTML;            
    // $google = "Google"; 
    // echo "google = " . $google . "<br>"; 
    //  echo "outputdata = " . $outputData; 
    // echo $outputData;
    // if (strcasecmp($outputData, $google) == 0){
    //   $sql = "SELECT * FROM Person WHERE PersonID='1'"; 
    //   $result = $conn->query($sql); 
    //   if($result->num_rows > 0) {
    //     //while($row = $result->fetch_assoc()) {
    //       echo "txt1.innerHTML = '" . $google ."';";
    //     //}
    //   }else{
    //   echo "0 results"; 
    //   }
    // }
    
    //"id: ". $row["PersonID"]. " - Name: ". $row["FirstName"]. " " . $row["LastName"] . ""
    //echo "txt1.innerHTML = '" . googleData() ."';"; 




    function googleData() {
   
    }

    $conn->close();
  ?>
  </body>
</html>

<!---$_COOKIE

- node js is not compatible with javascript 
 - it is capable of making a connection with the database 
 - but there is absolutely no communication between the node js and javascript 

- react js 
 - it doesn't work. 
 - not compatible with javascript first 
 - can't handle empty javascript variables 

- php 
 - again same thing
 - php is a server side lang; js is client side 
 - only one sided communication is possible. 
 - two sided communication reqd
 - as a result it fails 

- what else can we use ? 
ajax? django?  









->

