function getCss(curEle: any, attr: any) {
  let val: any = null,
    reg: any = null;
  if ('getComputedStyle' in window) {
    val = window.getComputedStyle(curEle, null)[attr];
  } else {
    //ie6~8不支持上面属性
    //不兼容
    if (attr === 'opacity') {
      val = curEle.currentStyle['filter']; //'alpha(opacity=12,345)'
      reg = /^alphaopacity=(\d+(?:\.\d+)?)opacity=(\d+(?:\.\d+)?)$/i;
      val = reg.test(val) ? reg.exec(val)[1] / 100 : 1;
    } else {
      val = curEle.currentStyle[attr];
    }
  }
  reg = /^(-?\d+(\.\d)?)(px|pt|em|rem)?$/i;
  return reg.test(val) ? parseFloat(val) : val;
}

const sliderDrag = function (cb: any) {
  let x = 0,
    isMove = false,
    _dragOk = false,
    drag: any = document.getElementById('drag'),
    handler = drag.querySelector('.handler'),
    drag_bg = drag.querySelector('.drag_bg'),
    text = drag.querySelector('.drag_text'),
    doc = document.body || document.documentElement,
    maxWidth = drag.offsetWidth - handler.offsetWidth - 2; //能滑动的最大间距

  function handlerMousedown(e: any) {
    e.preventDefault();
    isMove = true;
    let handlerLeft = getCss(handler, 'left');
    x = e.pageX - parseInt(handlerLeft, 10);
    doc.addEventListener('mousemove', handlerMousemove);
    doc.addEventListener('mouseup', handlerMouseup, false);
  }
  //鼠标指针在上下文移动时，移动距离大于0小于最大间距，滑块x轴位置等于鼠标移动距离
  function handlerMousemove(e: any) {
    e.preventDefault();
    let _x = e.pageX - x; // _x = e.pageX - (e.pageX - parseInt(handler.css('left'), 10)) = x
    if (isMove) {
      if (_x > 0 && _x <= maxWidth) {
        handler.style.left = _x + 'px';
        drag_bg.style.width = _x + 'px';
      } else if (_x > maxWidth) {
        //鼠标指针移动距离达到最大时清空事件
        dragOk();
      }
    } else {
      return false;
    }
  }

  function handlerMouseup(e: any) {
    e.preventDefault();
    isMove = false;
    let _x = e.pageX - x;
    if (_x < maxWidth) {
      //鼠标松开时，如果没有达到最大距离位置，滑块就返回初始位置
      handler.style.left = 0 + 'px';
      drag_bg.style.width = 0 + 'px';
    } else {
      handler.removeEventListener('mousedown', handlerMousedown);
      doc.removeEventListener('mousemove', handlerMousemove);
      doc.removeEventListener('mouseup', handlerMouseup);
    }
  }
  //鼠标按下时候的x轴的位置
  handler.addEventListener('mousedown', handlerMousedown, false);

  //清空事件
  function dragOk() {
    handler.classList.remove('handler_bg');
    handler.classList.add('handler_ok_bg');
    text.classList.remove('slidetounlock');
    text.innerText = '验证通过';
    text.style.cssText = 'color: rgba(0, 0, 0, 0.3)';
    handler.style.left = maxWidth + 'px';
    drag_bg.style.width = maxWidth + 'px';
    _dragOk = true;
    cb(_dragOk);
    handler.removeEventListener('mousedown', handlerMousedown);
    doc.removeEventListener('mousemove', handlerMousemove);
    doc.removeEventListener('mouseup', handlerMouseup);
  }
  return _dragOk;
};

export default sliderDrag;
