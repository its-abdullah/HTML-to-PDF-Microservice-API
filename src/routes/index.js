const express = require('express');
const multer = require('multer');
const fs = require('node:fs');

const { isHtml, isJson } = require('../services/helperService');
const { Html2Pdf } = require('../services/puppeteerService');
const { renderMustache } = require('../services/mustacheService');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/AsFile/', upload.single('file'), async (req, res) => {  
  let { html } = req.body;
  const { file } = req;

  if (html === undefined && file === undefined)
    return res.status(400).send({
      message: 'HTML or file is required.'
    });

  if (html === undefined)
    html = fs.readFileSync(file.path, 'utf8');

  if (!isHtml(html))
    return res.status(400).send({
      message: 'Not a valid HTML.'
    });

  const { view } = req.body;
  let { fileName, paperSize } = req.body;

  if (fileName === undefined)
    fileName = 'document.pdf';

  if (paperSize === undefined)
    paperSize = 'A4';

  if (view !== undefined) {
    if (!isJson(view))
      return res.status(400).send({
        message: 'Not a valid Json View.'
      });

      html = renderMustache(html, view);
  }

  res.writeHead(200, {
    'Content-Type': 'application/pdf',
    'Content-Disposition': `attachment; filename="${fileName}"`
  });

  const download = Buffer.from(await Html2Pdf(html, paperSize), 'base64');

  res.end(download);

  return undefined;
});

router.post('/AsBase64/', upload.single('html'), async (req, res) => {
  let { html } = req.body;
  const { file } = req;

  if (html === undefined && file === undefined)
    return res.status(400).send({
      message: 'HTML or file is required.'
    });

  if (html === undefined)
    html = fs.readFileSync(file.path, 'utf8');

  if (!isHtml(html))
    return res.status(400).send({
      message: 'Not a valid HTML.'
    });

  const { view, paperSize } = req.body;

  if (paperSize === undefined)
    paperSize = 'A4';

  if (view !== undefined) {
    if (!isJson(view))
      return res.status(400).send({
        message: 'Not a valid Json View.'
      });

      html = renderMustache(html, view);
  }

  res.json({ base64: (await Html2Pdf(html, paperSize)).toString('base64') });

  return undefined;
});

module.exports = router;