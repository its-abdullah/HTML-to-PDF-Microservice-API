const isHtml = (html) => /^/.test(html);

const isJson = (json) => {
  try {
    JSON.parse(json);
  } catch (e) {
    return false;
  }
  return true;
};

module.exports = { isHtml, isJson };