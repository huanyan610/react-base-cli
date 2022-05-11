export const asyncHighlight = async () => {
  let Prism = await import('prismjs');
  await import('prismjs/components/prism-python');
  let pd = document.querySelectorAll('.highlight pre');
  pd.forEach((x) => {
    Prism.highlightElement(x);
  });
};

export const replaceBr = (str) => {
  try {
    // 兼容br \n
    return str.replace(/[<]br[/]?[>]/gi, '<br/>\n');
  } catch (e) {
    return '';
  }
};
