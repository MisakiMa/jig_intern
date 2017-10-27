
// console.clear();

var hour_diff = 0;
var second_diff = 0;
var minute_diff = 0;


var hour_now = 0;
var second_now = 0;
var minute_now = 0;



function Surface () {
  var now = new Date();
  this.accent = window.getComputedStyle(document.body.querySelector(".day")).color;
  // this.nightAccent = window.getComputedStyle(document.body.querySelector(".night")).color;
  this.nightStart = 18;
  this.fontWeight = 300;
  this.fontFamily = window.getComputedStyle(
    document.querySelector(".container")
  ).fontFamily.split(/\,\s/)[0].replace(/[\"|\']/g, "");
  this.nightEnd = 8;
  this.element = document.createElement("canvas");
  this.context = this.element.getContext("2d");
  this.rotationOffset = 0 - (Math.PI / 2);
  this.gauges = false;

  this.attach = function() {
    document.body.querySelector(".container").appendChild(this.element);
    window.addEventListener("resize", this.resize.bind(this));
    var s = this;
    // document.getElementById("night").addEventListener("change", function() {
    //   s.nightMode = this.checked;
    //   if(s.nightMode) {
    //     document.documentElement.classList.add("night");
    //   } else {
    //     document.documentElement.classList.remove("night");
    //   }
    //   document.body.scrollTop = window.innerHeight;
    // });
    // document.getElementById("gauges").addEventListener("change", function() {
    //   s.gauges = this.checked;
    //   document.body.scrollTop = window.innerHeight;
    // });
    if(s.nightMode) {
      document.getElementById("night").setAttribute("checked", "checked");
      document.documentElement.classList.add("night");
    }
  }
  this.hcenter = function() {
    return Math.round(this.element.width / 2);
  }
  this.vcenter = function(){
    return Math.round(this.element.height / 2);
  }
  this.fontSize = function() {
    return (Math.min(this.hcenter(), this.vcenter()) / 4);
  }
  this.runit = function() {
    return (Math.min(this.hcenter(), this.vcenter()) / 3);
  }
  this.isNight = function() {
    var now = new Date();
    return (
      now.getHours() < this.nightEnd ||
      now.getHours() >= this.nightStart
    );
  }
  this.nightMode = this.isNight();

  this.resize = function() {
    this.element.width = Math.min(
      this.element.parentNode.offsetWidth,
      this.element.parentNode.getBoundingClientRect().width
    ) * 1;
    this.element.height = Math.min(
      this.element.parentNode.offsetHeight,
      this.element.parentNode.getBoundingClientRect().height
    ) * 1;
  }
  this.init = function() {
    this.attach();
    this.resize();
    this.draw();
  };

  this.draw = function () {
    window.requestAnimationFrame(this.draw.bind(this));
    this.context.textAlign = "center";
    this.context.lineCap = "round";
    this.context.lineWidth = 1.333;
    this.context.font = this.fontWeight + " " + this.fontSize() + "px " + this.fontFamily;
    this.context.translate(this.hcenter(), this.vcenter());
    this.context.setTransform(1,0,0,1,this.hcenter(),this.vcenter());

    // console.log("hello index.js world");
    // console.log("busstop_time : " + busstop_time);
    // console.log("diff_time : " + diff_time);

    var now = new Now();

    // console.log("get time :" + now.getTime());

    diff_rial_time = (busstop_time + diff_time) - now.getTime();

    // console.log("diff_rial_time = " + diff_rial_time);
    second_diff = diff_rial_time/1000;
    //分
    minute_diff = diff_rial_time/(1000*60);

    //時
    hour_diff = diff_rial_time/(1000*60*60);
    // console.log(" hour_diff " + hour_diff);

    //日
    var day_diff = diff_rial_time/(1000*60*60*24);

    //年
    var day_diff = diff_rial_time/(1000*60*60*24*365);

    var hour_text = "00";
    var minute_text = "00";
    var second_text = "00";

    if (Math.floor(hour_diff) < 10){
      hour_text = "0" + Math.floor(hour_diff);
    }else{
      hour_text = Math.floor(hour_diff);
    }

    if (Math.floor(minute_diff % 60) < 10){
      minute_text = "0" + Math.floor(minute_diff % 60);
    }else{
      minute_text = Math.floor(minute_diff % 60);
    }

    if (Math.floor(second_diff % 60) < 10){
      second_text = "0" + Math.floor(second_diff % 60);
    }else{
      second_text = Math.floor(second_diff % 60);
    }





    if (busstop_time > 0){
      var displayText = [
         hour_text,
         minute_text,
         second_text
      ].join(".");
    }else{
      var displayText = "到着予想";
    }

    this.context.globalCompositeOperation = "source-over";
    this.context.fillStyle = "rgba(0, 0, 0, 1)";
    this.context.beginPath();
    this.context.moveTo(0, 0);
    this.context.arc(
      0,
      0,
      this.runit() * 3,
      this.rotationOffset + (Math.PI * 2 * now.hoursPrcnt()),
      this.rotationOffset + (Math.PI * 2 * now.dayPrcnt())
    );
    this.context.fill();

    this.context.globalCompositeOperation = "source-in";
    this.context.fillStyle = "rgba(0, 0, 0, .06125)";
    this.context.beginPath();
    this.context.arc(
      0, 0,
      this.runit() * 2.5,
      0, Math.PI * 2
    );
    this.context.fill();

    this.context.globalCompositeOperation = "destination-over";
    this.context.lineWidth = 1.125; //1.125
    this.context.strokeStyle = this.nightMode ? this.nightAccent : this.accent;
    this.context.beginPath();
    this.context.moveTo(0,0);
    this.context.arc(
      0, 0,
      this.runit() * 2.5,
      this.rotationOffset + (Math.PI * 2 * now.minsPrcnt()),
      this.rotationOffset + (Math.PI * 2 * now.hoursPrcnt())
    );
    this.context.lineTo(0,0);
    this.context.stroke();


    this.context.globalCompositeOperation = "destination-out";
    this.context.fillStyle = "rgba(0, 0, 0, 1)";
    this.context.beginPath();
    this.context.arc(0, 0, this.runit() * 2.25, 0, Math.PI * 2);
    this.context.fill();


    //長針
    this.context.globalCompositeOperation = "source-over";
    this.context.strokeStyle = "rgba(64, 64, 64, 1)";
    this.context.lineWidth = 6; // 2
    this.context.beginPath();
    this.context.moveTo(
      this.runit() * 1.75 * Math.sin(Math.PI * 2 * now.hoursPrcnt()),
      0 - this.runit() * 1.75 * Math.cos(Math.PI * 2 * now.hoursPrcnt())
    );
    this.context.lineTo(
      this.runit() * 2.7 * Math.sin(Math.PI * 2 * now.hoursPrcnt()),
      0 - this.runit() * 2.7 * Math.cos(Math.PI * 2 * now.hoursPrcnt()));
    this.context.stroke();


    this.context.globalCompositeOperation = "source-over";
    this.context.strokeStyle = "rgba(0, 0, 0, 1)";
    this.context.lineWidth = 8;
    this.context.beginPath();
    this.context.moveTo(
      this.runit() * 2.3333 * Math.sin(Math.PI * 2 * now.dayPrcnt()),
      0 - this.runit() * 2.3333 * Math.cos(Math.PI * 2 * now.dayPrcnt())
    );
    this.context.lineTo(
      this.runit() * 2.65 * Math.sin(Math.PI * 2 * now.dayPrcnt()), //2.65
      0 - this.runit() * 2.65 * Math.cos(Math.PI * 2 * now.dayPrcnt()));
    this.context.stroke();





    // 追加した
    this.context.globalCompositeOperation = "source-over";
    this.context.strokeStyle = "rgba(230,145,77,1)";
    this.context.lineWidth = 10; // 2
    this.context.beginPath();

    // console.log("arrive_time : " + arrive_time());
    this.context.moveTo(
      this.runit() * 1.75 * Math.sin(Math.PI * 2 * arrive_time()),
      0 - this.runit() * 1.75 * Math.cos(Math.PI * 2 * arrive_time())
    );
    this.context.lineTo(
      this.runit() * 2.7 * Math.sin(Math.PI * 2 * arrive_time()), // 2.85
      0 - this.runit() * 2.7 * Math.cos(Math.PI * 2 * arrive_time())
    );
    this.context.stroke();


    this.context.globalCompositeOperation = "destination-over";




    var prevFill = this.context.fillStyle;
    for(var minb = 0; minb < 60; minb++) {
      if(minb % 5 !== 0) {
        if(minb === now.now.getMinutes() || minb === now.now.getSeconds()) {
          this.context.fillStyle = this.nightMode ? this.nightAccent : this.accent;
        } else {
          this.context.fillStyle = prevFill;
        }
        this.context.beginPath();
        this.context.arc(
          Math.sin(Math.PI * 2 * minb/60) * this.runit()* 2.25,
          0-Math.cos(Math.PI * 2 * minb/60) * this.runit()* 2.25,
          (minb === now.now.getSeconds() || minb == now.now.getMinutes()) ?
            this.runit() / 48 :
            this.runit() / 96,
          0,
          Math.PI * 2
        );
        this.context.fill();
      }
    }
    this.context.fillStyle = prevFill;

    for(var hourb = 0; hourb < 12; hourb++) {
      if(
        hourb === now.now.getHours() % 12 ||
        hourb === now.now.getSeconds() / 60 * 12
      ) {
        this.context.fillStyle = this.nightMode ? this.nightAccent : this.accent;
      } else {
        this.context.fillStyle = prevFill;
      }
      this.context.beginPath();
      this.context.arc(
        Math.sin(Math.PI * 2 * hourb/12) * this.runit()* 2.25,
        0-Math.cos(Math.PI * 2 * hourb/12) * this.runit()* 2.25,
        (hourb === now.now.getSeconds() / 60 * 12) ?
          this.runit() / 48:
          this.runit() / 24,
        0,
        Math.PI * 2
      );
      this.context.fill();
    }
    this.context.fillStyle = prevFill;

    this.context.globalCompositeOperation = "source-over";

    this.context.fillText(
      displayText,
      0,
      0 + (this.fontSize() / 3)
    );

    if(this.gauges) {
      var digits = parseInt(this.fontSize() / 30);
      this.context.font =
        this.fontWeight + " " +
        (this.fontSize()/3) + "px " +
        this.fontFamily;
      this.context.fillText(
        [
          now.dayPrcnt().toFixed(digits).substr(2),
          now.hoursPrcnt().toFixed(digits).substr(2),
          now.minsPrcnt().toFixed(digits).substr(2),
          now.secsPrcnt().toFixed(digits).substr(2)
        ].join("  "),
        0,
        0 + (this.runit()/1.75)
      );
    }
  };

}


function now_arrive_time() {
    return (
      (minute_diff / 60) +
      (second_diff / 60 / 60)
    );
};


function arrive_time(){

  second_now = (busstop_time/1000)%60;
  //分
  minute_now = (busstop_time/(1000*60))%60;

  return ((minute_now / 60) +
          (second_now / 60 / 60)
         );
}


function Now() {
  this.now = new Date();
  // console.log("hello index.js wo");

  // console.log("diff now time = " + diff_now_time);
  this.getTime = function() {
    return (this.now.getTime());
  }

  this.hoursText = function() {
    return zeroPad(this.now.getHours(), 2);
  };
  this.minsText = function() {
    return zeroPad(this.now.getMinutes(), 2);
  };
  this.secsText = function() {
    return zeroPad(this.now.getSeconds(), 2);
  };
  this.dayPrcnt = function() {
    return (
      (this.now.getHours() / 12) +
      (this.now.getMinutes() / 60 / 12) +
      (this.now.getSeconds() / 60 / 60 / 12) +
      (this.now.getMilliseconds() / 1000 / 60 / 60 / 12)
    );
  }
  this.hoursPrcnt = function() {
    return (
      (this.now.getMinutes() / 60) +
      (this.now.getSeconds() / 60 / 60) +
      (this.now.getMilliseconds() / 1000 / 60 / 60)
    );
  };
  this.minsPrcnt = function() {
    return (
      (this.now.getSeconds() / 60) +
      (this.now.getMilliseconds() / 1000 / 60)
    );
  };
  this.secsPrcnt = function() {
    return (
      (this.now.getMilliseconds() / 1000)
    );
  }
  return this;
}

function zeroPad (num, width) {
  return (new Array(width).fill("0").join("") + num).substr(0-width)
}

var s = new Surface();
// var helpEl = document.querySelector(".help");
s.init();

setTimeout(function() {
  document.body.scrollTop = document.body.querySelector(".container").offsetTop;
}, 5);


setTimeout(function(){
  if(document.body.scrollTop >= document.body.querySelector(".container").offsetTop) {
    // showHelp();
    // window.addEventListener("scroll", hideHelp);
    // setTimeout(hideHelp, 7500);
  }
}, 1000);

// function showHelp() {
//   helpEl.classList.remove("hidden");
// }

// function hideHelp() {
//   helpEl.classList.add("hidden");
// }





/*
<!--
Copyright (c) 2017 by Moses Holmström (https://codepen.io/thykka/pen/xgOqbM)


Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
-->
*/
