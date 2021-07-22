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
    const apiKeys = require('./settings/keys.json');
    mapData = JSON.parse(mapData);
    let string = 'https://maps.googleapis.com/maps/api/staticmap?autoscale=false&size=640x420&maptype=roadmap';
    string += '&key=' + apiKeys.maps;
    string += '&format=png&visual_refresh=true';
    string += '&markers=size:mid%7Ccolor:0xff8080%7Clabel:';
    string += '%7C' + mapData.coordinates[1] + ',' + mapData.coordinates[0];
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
