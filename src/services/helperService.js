const isHtml = (html) => html.indexOf("<html") !== -1;

const isJson = (json) => {
  try {
    JSON.parse(json);
  } catch (e) {
    return false;
  }
  return true;
};

const isPaperSize = (paperSize) => ["letter", "legal", "tabloid", "ledger", "a0", "a1", "a2", "a3", "a4", "a5", "a6"].includes(paperSize.toLowerCase());

module.exports = { isHtml, isJson, isPaperSize };