export const macOrWin = () => {
  const agent = navigator.userAgent.toLowerCase();
  const isMac = /macintosh|mac os x/i.test(agent);
  let doc = document.body || document.documentElement;
  !isMac && doc.classList.add('notMac');
};
