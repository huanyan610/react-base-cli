/* 全局窗口滚动监听 */
export const bindHandleScroll = (event: any) => {
  let currentScroll: any = {
    scrollEnd: false,
    scrollTop: 0,
    scrollLeft: 0,
  };
  const target = event.srcElement || event.target;
  // console.log(event, target);
  // /* 可滚动高度 */
  const scrollHeight = target.documentElement.scrollHeight;
  // /* 当前窗口高度 */
  const clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
  // /*  滚动的高度 */
  const scrollTop =
    (target ? target.documentElement.scrollTop : false) ||
    window.pageYOffset ||
    (target ? target.body.scrollTop : 0);
  // /* 判断用户当前是否进行了横向滚动，如果用户发生了横向滚动 */
  const scrollLeft =
    (target ? target.documentElement.scrollLeft : false) ||
    window.pageXOffset ||
    (target ? target.body.scrollLeft : 0);

  if (clientHeight + scrollTop === scrollHeight) {
    currentScroll.scrollEnd = true;
  } else {
    currentScroll.scrollEnd = false;
  }
  currentScroll.scrollTop = scrollTop;
  currentScroll.scrollLeft = scrollLeft;
  return currentScroll;
};
