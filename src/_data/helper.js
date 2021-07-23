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
  },

  mapStatic(mapData) {
    mapData = JSON.parse(mapData);
    let string = "";
    string += "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d379.7704046114002!2d";
    string += mapData.coordinates[0] + "!3d" + mapData.coordinates[1];
    string += "!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2suk!4v1627035212276!5m2!1sen!2suk";
    return string;
  },

  mapLink(mapData) {
    mapData = JSON.parse(mapData);
    let string = 'https://www.google.com/maps/place/@';
    string += mapData.coordinates[1] + ',' + mapData.coordinates[0];
    string += ',18z';
    return string;
  },

  galleryType(length) {
    string ='';
    if (length === 1) {
      string = 'single';
    } else if (length === 2) {
      string = 'double';
    } else if (length >= 3) {
      string = 'full';
    }
    return string;
  }
};
