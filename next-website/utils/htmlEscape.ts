export const htmlEscape = (html: any) => {
  return html.replace(/[<>]/g, function (match: any) {
    switch (match) {
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
    }
  });
};
