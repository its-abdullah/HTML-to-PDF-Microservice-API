# html2pdf Microservice API
![example workflow](https://github.com/its-abdullah/Html2Pdf-Microservice-API/actions/workflows/node.js.yml/badge.svg)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

A Microservice REST API that uses MustacheJs for processing Html template and generate PDF from Html using Puppeteer. The project is based on NodeJs and ExpressJs.


## Tech Stack
* [ExpressJs](https://github.com/expressjs/expressjs.com)
* [Multer](https://github.com/expressjs/multer)
* [MustacheJs](https://github.com/janl/mustache.js)
* [Puppeteer](https://github.com/puppeteer/puppeteer/)
* [chromium](https://www.chromium.org) installed only when using Docker. Will be used as a browser instance for Puppeteer.
* [SuperTest](https://github.com/ladjs/supertest)


## Deployment
* For Development:
`npm install` then
`npm run dev`

* As Microservice, using Docker:
`docker build . -t html2pdf` then
`docker run -p 3000:3000 html2pdf`


## API Endpoints

#### As File

```http
  POST /
```
Enctype: `multipart/form-data` , and add the following:
| Part Type | Required | Type     | Description                |
| :-------- | :------- | :------- | :------------------------- |
| `html` | required | string | will be the content for the generated PDF. Can contain Mustache braces. |
| `view` | optional | json  | Mustache object. |
| `fileName` | optional | string  | will be the name of the generated file. Has to have a file extension. |

#### As Base64

```http
  POST /AsBase64/
```
Enctype: `multipart/form-data` ,  and add the following:
| Part Type | Required | Type     | Description                |
| :-------- | :------- | :------- | :------------------------- |
| `html` | required | string | will be the content for the generated PDF. Can contain Mustache braces. |
| `view` | optional | json  | Mustache object. |


## Html Examples

#### Using Mustache
Html:
```javascript
<p>{{title}}</p>
<p>{{paragraph}}</p>
<a href="{{link}}">link</a>
```

View:
```javascript
{
    "title": "عنوان عربي",
    "paragraph": "نص عربي طويل",
    "link": "https://github.com/"
}
```

#### With custom font
custom font file has to be converted to Base64 and added to the html template.

Html:
```javascript
<body>
  <style>
    body {
      font-family: "custom font";
      font-size: 13px;
      direction: rtl;
    }
    @font-face {
      font-family: "custom font";
      font-style: normal;
      font-weight: 400;
      src: url("data:font/woff;base64,d09GRgABAA/Rest of Base64/");
    }
  </style>
  <p>{{title}}</p>
  <p>{{paragraph}}</p>
  <a href="{{link}}">link</a>
</body>
```

View:
```javascript
{
    "title": "عنوان عربي",
    "paragraph": "نص عربي طويل",
    "link": "https://github.com/"
}
```


## License
[MIT](https://choosealicense.com/licenses/mit/)

## Acknowledgments
* [Express-REST-API-Template](https://github.com/rzgry/Express-REST-API-Template)