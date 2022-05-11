export const navScroll = (navDom: any, activeDom: any) => {
  let navLen = navDom.length;
  let len = navLen - 1;
  let scrollY = window.scrollY || window.pageYOffset;
  for (; len > -1; len--) {
    let that: any = activeDom[len];
    if (Math.abs(scrollY - that.offsetTop) <= 50) {
      for (let j = 0; j < navLen; j++) {
        navDom[j].classList.remove('active');
      }
      navDom[len].classList.add('active');
      break;
    }
  }
};
