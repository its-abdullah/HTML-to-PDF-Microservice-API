const Mustache = require('mustache');

const  renderMustache = (html, view) => {
    const jsonObj = JSON.parse(view);

    return Mustache.render(html, jsonObj);
}

module.exports = {renderMustache};