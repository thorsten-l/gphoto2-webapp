var toastTrigger = document.getElementById('liveToastBtn')
var toastLiveExample = document.getElementById('liveToast')
var toastMessage = document.getElementById('toastMessage')
var lastJpegImagePath = "";

function clearTbody(elementId) {
  const curTbody = document.getElementById(elementId)
  const tbody = document.createElement('tbody');
  tbody.id = elementId;
  curTbody.parentNode.replaceChild(tbody, curTbody)
  return tbody;
}

function setGlobalJpegPath(images) {
  var exifJpegPath = document.getElementById('exifJpegPath')
  var gp2FileExifButton = document.getElementById('gp2FileExifButton')

  images.forEach(element => {
    let path = element.info.path.toUpperCase();
    if (path.endsWith(".JPG")) {
      lastJpegImagePath = element.info.path;
      exifJpegPath.innerHTML = " : " + lastJpegImagePath;
      gp2FileExifButton.disabled = false;
    }
  })
}

function gp2AutoDetect() {
  console.log("gp2AutoDetect");
  const tbody = clearTbody("gp2AutoDetectTableBody");
  var counter = 1;

  fetch(gphoto2_webapi_url + "/api/auto-detect").then((resp) => resp.json()).then(function (data) {
    if (data.return_code == 0) {
      data.result.forEach(element => {
        var row = tbody.insertRow();
        row.insertCell(0).innerHTML = (counter++).toString();
        row.insertCell(1).innerHTML = element.model;
        row.insertCell(2).innerHTML = element.port;
      });
    }
    else {
      var toast = new bootstrap.Toast(toastLiveExample);
      toastMessage.innerHTML = "return_code = " + data.return_code;
      toast.show();
    }
  });
}

function gp2Version() {
  console.log("gp2Version");
  const tbody = clearTbody("gp2VersionTableBody");

  fetch(gphoto2_webapi_url + "/api/version").then((resp) => resp.json()).then(function (data) {
    data.result.forEach(element => {
      var row = tbody.insertRow();
      row.insertCell(0).innerHTML = element.name;
      row.insertCell(1).innerHTML = element.version;
      row.insertCell(2).innerHTML = (element.libs === undefined) ? "-" : element.libs;
    });
  });
}

function gp2TriggerCapture() {
  console.log("gp2TriggerCapture");
  fetch(gphoto2_webapi_url + "/api/trigger-capture").then((resp) => resp.json()).then(function (data) {
    if (data.return_code == 0) {
      var toast = new bootstrap.Toast(toastLiveExample);
      toastMessage.innerHTML = "Trigger capture succeed!";
      toast.show();
    }
    else {
      var toast = new bootstrap.Toast(toastLiveExample);
      toastMessage.innerHTML = "return_code = " + data.return_code;
      toast.show();
    }
  });
}

function gp2Shutdown() {
  console.log("gp2Shutdown");
  fetch(gphoto2_webapi_url + "/api/server/shutdown").then((resp) => resp.json()).then(function (data) {
    if (data.return_code == 0) {
      var toast = new bootstrap.Toast(toastLiveExample);
      toastMessage.innerHTML = "Server shutdown succeed!";
      toast.show();
    }
    else {
      var toast = new bootstrap.Toast(toastLiveExample);
      toastMessage.innerHTML = "return_code = " + data.return_code;
      toast.show();
    }
  });
}

function gp2CaptureImage() {
  console.log("gp2CaptureImage");
  var button = document.getElementById("gp2CaptureImageButton");
  var loading = document.getElementById("gp2CaptureImageLoading");
  loading.style = "display: inline-block";
  button.disabled = true;
  fetch(gphoto2_webapi_url + "/api/capture-image").then((resp) => resp.json()).then(function (data) {
    button.disabled = false;
    loading.style = "display: none";
    if (data.return_code == 0) {
      setGlobalJpegPath(data.images);
      var toast = new bootstrap.Toast(toastLiveExample);
      toastMessage.innerHTML = "capture image succeed!";
      toast.show();
    }
    else {
      var toast = new bootstrap.Toast(toastLiveExample);
      toastMessage.innerHTML = "return_code = " + data.return_code;
      toast.show();
    }
  });
}

function gp2CaptureImageDownload() {
  console.log("gp2CaptureImageDownload");
  var button = document.getElementById("gp2CaptureImageDownloadButton");
  var loading = document.getElementById("gp2CaptureImageDownloadLoading");
  loading.style = "display: inline-block";
  button.disabled = true;
  fetch(gphoto2_webapi_url + "/api/capture-image-download").then((resp) => resp.json()).then(function (data) {
    button.disabled = false;
    loading.style = "display: none";
    if (data.return_code == 0) {
      setGlobalJpegPath(data.images);
      var toast = new bootstrap.Toast(toastLiveExample);
      toastMessage.innerHTML = "capture image and download succeed!";
      toast.show();
    }
    else {
      var toast = new bootstrap.Toast(toastLiveExample);
      toastMessage.innerHTML = "return_code = " + data.return_code;
      toast.show();
    }
  });
}

function gp2FileExif() {
  console.log("gp2FileExif");
  const tbody = clearTbody("gp2ExifTableBody");

  fetch(gphoto2_webapi_url + "/api/file/exif" + lastJpegImagePath).then((resp) => resp.json()).then(function (data) {
    Object.entries(data).forEach(
      ([k, v]) => {
        var row = tbody.insertRow();
        row.insertCell(0).innerHTML = k;
        row.insertCell(1).innerHTML = v;
      }
    );
  });
}

function gp2ShowPreview() {
  console.log("gp2ShowPreview");
  document.getElementById("previewImage").src=gphoto2_webapi_url+"/api/show-preview";
}


function gp2InputSelectIso(option) {
  console.log("gp2InputSelectIso -- " + option.value );

  fetch(gphoto2_webapi_url + "/api/config/set-index/main/imgsettings/iso?i=" 
             + option.value ).then((resp) => resp.json()).then(function (data) {
      if (data.return_code == 0) {
        var toast = new bootstrap.Toast(toastLiveExample);
        toastMessage.innerHTML = "Set ISO-Speed succeed!";
        toast.show();
      }
      else {
        var toast = new bootstrap.Toast(toastLiveExample);
        toastMessage.innerHTML = "return_code = " + data.return_code;
        toast.show();
      }
  });
}


function gp2PrepareConfigPage() {
  console.log("gp2PrepareConfigPage");

  fetch(gphoto2_webapi_url + "/api/config/get/main/imgsettings/iso" ).then((resp) => resp.json()).then(function (data) {
    document.getElementById("labelIso").innerHTML = data.label;
    const inputSelectIso = document.getElementById("inputSelectIso");
    inputSelectIso.innerHTML = "";

    Object.entries(data.choice).forEach(
      ( c ) => {
        option = document.createElement("option");
        option.text = c[1].value;
        option.value = c[1].index;
        if ( c[1].value === data.current )
        {
          option.selected = true;
        }
        inputSelectIso.add(option);
      }
    );

  });
}