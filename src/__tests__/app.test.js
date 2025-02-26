const request = require('supertest');
const fs = require('fs');
const path = require('path');
const app = require('../app');

describe('app', () => {
  it('should export the express app correctly', () => {
    expect(app).toBeTruthy();
  });

  const goodHtmlFilePath = path.join(__dirname, 'files', 'good-html.html');
  const badHtmlFilePath = path.join(__dirname, 'files', 'bad-html.html');
  
  expect(fs.existsSync(goodHtmlFilePath)).toBe(true);
  expect(fs.existsSync(badHtmlFilePath)).toBe(true);

  describe('POST /html2pdf', () => {
    it('Passing no HTML, expected response status is 400', async () => {
      const response =
        await request(app)
          .post('/html2pdf');
      expect(response.statusCode).toBe(400);
    });

    it('Passing HTML, expected response status is 200', async () => {
      const response =
        await request(app)
          .post('/html2pdf')
          .field("html", "<!DOCTYPE html><html><head></head><body><h1>Hello, World!</h1></body></html>");
      expect(response.statusCode).toBe(200);
    });

    it('Passing invalid HTML file, expected response status is 400', async () => {
      const response =
        await request(app)
          .post('/html2pdf')
          .attach('file', badHtmlFilePath);
      expect(response.statusCode).toBe(400);
    });

    it('requesting it asBase64, expected response status is 200', async () => {
      const response =
        await request(app)
          .post('/html2pdf')
          .attach('file', goodHtmlFilePath)
          .field("asBase64", true);
      expect(response.statusCode).toBe(200);
    });

    it('Passing invalid HTML file, expected response status is 400', async () => {
      const response =
        await request(app)
          .post('/html2pdf')
          .attach('file', badHtmlFilePath);
      expect(response.statusCode).toBe(400);
    });

    it('Passing valid HTML file, expected response status is 200', async () => {
      const response =
        await request(app)
          .post('/html2pdf')
          .attach('file', goodHtmlFilePath);
      expect(response.statusCode).toBe(200);
    });

    it('Passing invalid json, expected response status is 400', async () => {
      const response =
        await request(app)
          .post('/html2pdf')
          .attach('file', goodHtmlFilePath)
          .field("view", 'badJson { "name": "nothing" }');
      expect(response.statusCode).toBe(400);
    });

    it('Passing valid json, expected response status is 200', async () => {
      const response =
        await request(app)
          .post('/html2pdf')
          .attach('file', goodHtmlFilePath)
          .field("view", '{ "name": "abdullah" }');
      expect(response.statusCode).toBe(200);
    });

    it('Passing invalid paper size, expected response status is 400', async () => {
      const response =
        await request(app)
          .post('/html2pdf')
          .attach('file', goodHtmlFilePath)
          .field("paperSize", 'NotA4');
      expect(response.statusCode).toBe(400);
    });

    it('Passing valid paper size, expected response status is 200', async () => {
      const response =
        await request(app)
          .post('/html2pdf')
          .attach('file', goodHtmlFilePath)
          .field("paperSize", 'A4');
      expect(response.statusCode).toBe(200);
    });
  });

  describe('GET /404', () => {
    beforeEach(() => {
      // Avoid polluting the test output with 404 error messages
      jest.spyOn(console, 'error').mockImplementation(() => { });
    });

    it('should respond to the GET method with a 404 for a route that does not exist', async () => {
      const response = await request(app).get('/404');
      expect(response.statusCode).toBe(404);
      expect(response.text).toBe('{"message":"Not Found"}');
    });

    it('should respond to the POST method with a 404 for a route that does not exist', async () => {
      const response = await request(app).post('/404');
      expect(response.statusCode).toBe(404);
      expect(response.text).toBe('{"message":"Not Found"}');
    });
  });
});
