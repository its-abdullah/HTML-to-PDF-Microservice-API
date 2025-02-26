const express = require('express');
const multer = require('multer');
const fs = require('node:fs');

const { isHtml, isJson, isPaperSize } = require('../services/helperService');
const { Html2Pdf } = require('../services/puppeteerService');
const { renderMustache } = require('../services/mustacheService');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/html2pdf/', upload.single('file'), async (req, res) => {  
  const { file } = req;
  const { view, asBase64 } = req.body;
  let { html, fileName, paperSize } = req.body;

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

  if (paperSize === undefined)
    paperSize = 'A4';
  else if (!isPaperSize(paperSize))
    return res.status(400).send({
      message: 'Not a paper size.'
    });

  if (view !== undefined) {
    if (!isJson(view))
      return res.status(400).send({
        message: 'Not a valid Json View.'
      });

      html = renderMustache(html, view);
  }

  if (asBase64 === "true")
  {
    res.json({ base64: (await Html2Pdf(html, paperSize)).toString('base64') });
  }
  else {
    if (fileName === undefined)
      fileName = 'document.pdf';
  
    res.writeHead(200, {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${fileName}"`
    });
  
    const download = Buffer.from(await Html2Pdf(html, paperSize), 'base64');
  
    res.end(download);
  }

  return undefined;
});

module.exports = router;