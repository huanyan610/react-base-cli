export function ball() {
  var tagEle = 'querySelectorAll' in document ? document.querySelectorAll('.tag') : getClass('tag'),
    paper =
      'querySelectorAll' in document ? document.querySelector('.tagBall') : getClass('tagBall')[0],
    RADIUS = 260,
    fallLength = 1000,
    tags = [],
    angleX = Math.PI / 450,
    angleY = Math.PI / 450,
    CX = paper.offsetWidth / 2,
    CY = paper.offsetHeight / 2,
    EX = paper.offsetLeft + document.body.scrollLeft + document.documentElement.scrollLeft,
    EY = paper.offsetTop + document.body.scrollTop + document.documentElement.scrollTop;

  function getClass(className) {
    var ele = document.getElementsByTagName('*');
    var classEle = [];
    for (var i = 0; i < ele.length; i++) {
      var cn = ele[i].className;
      if (cn === className) {
        classEle.push(ele[i]);
      }
    }
    return classEle;
  }

  function innit() {
    for (var i = 0; i < tagEle.length; i++) {
      var a, b;
      var k = -1 + (2 * (i + 1) - 1) / tagEle.length;
      var a = Math.acos(k);
      var b = a * Math.sqrt(tagEle.length * Math.PI);
      var x = RADIUS * Math.sin(a) * Math.cos(b);
      var y = RADIUS * Math.sin(a) * Math.sin(b);
      var z = RADIUS * Math.cos(a);
      var t = new tag(tagEle[i], x, y, z);
      tags.push(t);
      t.move();
    }
  }

  function animate() {
    rotateX();
    rotateY();
    tags.forEach(function (item) {
      item.move();
    });
    if ('requestAnimationFrame' in window) {
      requestAnimationFrame(animate);
    } else if ('webkitRequestAnimationFrame' in window) {
      webkitRequestAnimationFrame(animate);
    } else if ('msRequestAnimationFrame' in window) {
      msRequestAnimationFrame(animate);
    } else if ('mozRequestAnimationFrame' in window) {
      mozRequestAnimationFrame(animate);
    }
  }

  if ('addEventListener' in window) {
    paper.addEventListener('mousemove', function (event) {
      var x = event.clientX - EX - CX;
      var y = event.clientY - EY - CY;
      angleY = x * 0.00001;
      angleX = y * 0.00001;
    });
  } else {
    paper.attachEvent('onmousemove', function (event) {
      var x = event.clientX - EX - CX;
      var y = event.clientY - EY - CY;
      angleY = x * 0.00001;
      angleX = y * 0.00001;
    });
  }

  function rotateX() {
    var cos = Math.cos(angleX / 2);
    var sin = Math.sin(angleX / 2);
    tags.forEach(function (item) {
      var y1 = item.y * cos - item.z * sin;
      var z1 = item.z * cos + item.y * sin;
      item.y = y1;
      item.z = z1;
    });
  }

  function rotateY() {
    var cos = Math.cos(angleY / 2);
    var sin = Math.sin(angleY / 2);
    tags.forEach(function (item) {
      var x1 = item.x * cos - item.z * sin;
      var z1 = item.z * cos + item.x * sin;
      item.x = x1;
      item.z = z1;
    });
  }

  var tag = function (ele, x, y, z) {
    this.ele = ele;
    this.x = x;
    this.y = y;
    this.z = z;
  };

  tag.prototype = {
    move: function () {
      var scale = fallLength / (fallLength - this.z);
      var alpha = (this.z + RADIUS) / (2 * RADIUS);
      var left = this.x + CX - this.ele.offsetWidth / 2 + 'px';
      var top = this.y + CY - this.ele.offsetHeight / 2 + 'px';
      // var transform = 'translate(' + left + ', ' + top + ') scale(' + scale + ')';
      var transform = 'translate(' + left + ', ' + top + ')';
      this.ele.style.opacity = alpha + 0.5;
      this.ele.style.zIndex = parseInt(scale * 100);
      this.ele.style.transform = transform;
      this.ele.style.webkitTransform = transform;
    },
  };

  innit();
  animate();
}
