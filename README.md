# html2pdf Microservice API
![example workflow](https://github.com/its-abdullah/Html2Pdf-Microservice-API/actions/workflows/node.js.yml/badge.svg)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

A Microservice REST API that uses MustacheJs for processing Html template and generate PDF from Html using Puppeteer. The project is based on NodeJs and ExpressJs.


## Tech Stack
* [ExpressJs](https://github.com/expressjs/expressjs.com) NodeJS Web Framework.
* [Multer](https://github.com/expressjs/multer) NodeJS middleware for handling `multipart/form-data`.
* [MustacheJs](https://github.com/janl/mustache.js) Templating HTML.
* [Puppeteer](https://github.com/puppeteer/puppeteer/) Generating PDF from HTML.
* [chromium](https://www.chromium.org) To make a Chromium instance for Puppeteer only when Docker-ed.
* [SuperTest](https://github.com/ladjs/supertest) For Unit-Test.


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
  POST /AsFile/
```
Enctype: `multipart/form-data` , and add the following:
| Part Type | Required | Type     | Description                |
| :-------- | :------- | :------- | :------------------------- |
| `html` | required, if no file was provided | string | will be the content for the generated PDF. Can contain Mustache braces. |
| `file` | required, if no html was provided | file | will be the content for the generated PDF. Can contain Mustache braces. |
| `view` | optional | json  | Mustache object. |
| `fileName` | optional | string  | will be the name of the generated file. Has to have a file extension. |

#### As Base64

```http
  POST /AsBase64/
```
Enctype: `multipart/form-data` ,  and add the following:
| Part Type | Required | Type     | Description                |
| :-------- | :------- | :------- | :------------------------- |
| `html` | required, if no file was provided | string | will be the content for the generated PDF. Can contain Mustache braces. |
| `file` | required, if no html was provided | file | will be the content for the generated PDF. Can contain Mustache braces. |
| `view` | optional | json  | Mustache object. |


## Html Examples

#### Using Mustache
Html:
```Html
<p>{{title}}</p>
<p>{{paragraph}}</p>
<a href="{{link}}">link</a>
```

View:
```Json
{
    "title": "عنوان عربي",
    "paragraph": "نص عربي طويل",
    "link": "https://github.com/"
}
```

#### With a custom font
custom font file has to be converted to Base64 and added to the html template.

Html:
```Html
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
```Json
{
    "title": "عنوان عربي",
    "paragraph": "نص عربي طويل",
    "link": "https://github.com/"
}
```

#### With CSS Colors
Make sure to add `-webkit-print-color-adjust: exact;` to the css block

Html:
```Html
<style>
  body {
    -webkit-print-color-adjust: exact;
  }

  #myDiv {
    display: grid;
    gap: 10px;
    background-color: #2196F3;
    padding: 10px;
    grid-template: 100px / auto auto auto;
  }

  #myDiv div {
    background-color: rgba(255, 255, 255, 0.8);
    text-align: center;
    padding: 20px 0;
    font-size: 30px;
  }
</style>

<body>
  <h1>Title</h1>

  <div id="myDiv">
    <div>Text 1</div>
    <div>Text 2</div>
    <div>Text 3</div>
  </div>
</body>
```




## License
[MIT](https://choosealicense.com/licenses/mit/)

## Acknowledgments
* [Express-REST-API-Template](https://github.com/rzgry/Express-REST-API-Template)