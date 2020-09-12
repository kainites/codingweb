let images = {morning:'img/morning.jpg', lunch:'img/lunch.jpg', afternoon:'img/afternoon.jpg', evening:'img/evening.jpg', night:'img/night.jpg'};

function currentPicture(time, type){
  if (type != 'hours') {
    time = Math.round(time/2.5);
  }
  time = String(time);
  time = '0' + time;
  time = time.slice(-2);
  switch (time) {
    case '01':
    case '02':
    case '03':
    case '04':
      return images.night;
    case '05':
    case '06':
    case '07':
    case '08':
    case '09':
    case '10':
      return images.morning;
    case '11':
    case '12':
    case '13':
    case '14':
      return images.lunch;
    case '15':
    case '16':
    case '17':
      return images.afternoon;
    case '18':
    case '19':
    case '20':
      return images.evening;
    case '21':
    case '22':
    case '23':
    default:
      return images.night;
  }
}

var lastImage = currentPicture(00, 'seconds');

function date(){
  let d = new Date();
  let mil = `00${d.getMilliseconds()}`
  let sec = `00${d.getSeconds()}`
  let min = `00${d.getMinutes()}`
  let hrs = `00${d.getHours()}`
  var hrmnsc = `${hrs.slice(-2)} : ${min.slice(-2)} : ${sec.slice(-2)} : ${mil.slice(-3)}`;
  document.getElementById('hms').innerHTML = hrmnsc;
  var currentImage = currentPicture(sec, 'seconds');
  if (lastImage != currentImage) {
    lastImage = currentImage;
    console.log(currentImage);
    document.body.style.backgroundImage = `url(${currentImage})`;
  }
}

setInterval(date, 1)
