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
  },

  srcset(src, type) {
    let string = '';

    switch (type) {
      case 'single':
      case 'double':
      case 'full':
        string += src + '?nf_resize=fit&w=' + 320 + '&h=' + Math.ceil(320 * 0.64) + ' ' + 320 + 'w,';
        string += src + '?nf_resize=fit&w=' + 640 + '&h=' + Math.ceil(640 * 0.64) + ' ' + 640 + 'w,';
        string += src + '?nf_resize=fit&w=' + 768 + '&h=' + Math.ceil(768 * 0.64) + ' ' + 768 + 'w,';
        string += src + '?nf_resize=fit&w=' + 1024 + '&h=' + Math.ceil(1024 * 0.64) + ' ' + 1024 + 'w,';
        string += src + '?nf_resize=fit&w=' + 1366 + '&h=' + Math.ceil(1366 * 0.64) + ' ' + 1366 + 'w,';
        string += src + '?nf_resize=fit&w=' + 1600 + '&h=' + Math.ceil(1600 * 0.64) + ' ' + 1600 + 'w,';
        string += src + '?nf_resize=fit&w=' + 1920 + '&h=' + Math.ceil(1920 * 0.64) + ' ' + 1920 + 'w';
        break;
    }

    return string;
  },

  sizes(type) {
    let string = '';

    switch (type) {
      case 'single':
        string = '(max-width: 679px) 100vw, 75vw';
        break;
      case 'double':
        string = '50vw';
        break;
      case 'full':
        string = '(max-width: 679px) 100vw, 65vw';
        break;
    }

    return string;
  }
};
