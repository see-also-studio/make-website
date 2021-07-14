module.exports = {
  title(pageTitle, pageUrl) {
    const metadata = require('./metadata.json');
    const seperator = '—';
    let title = '';
    if (pageUrl === '/') {
      title = metadata.title + (metadata.tagline ? ' ' + seperator + ' ' + metadata.tagline : '');
    } else {
      title = pageTitle + (pageTitle !== metadata.title ? ' ' + seperator + ' ' + metadata.title : '');
    }
    return title;
  }
};
