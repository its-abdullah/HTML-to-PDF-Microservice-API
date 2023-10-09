const request = require('supertest');
const app = require('../app');

describe('app', () => {
  it('should export the express app correctly', () => {
    expect(app).toBeTruthy();
  });

  describe('POST /AsFile', () => {
    it('should respond to the post method with 400, missing Html', async () => {
      const response =
        await request(app)
          .post('/AsFile')
      expect(response.statusCode).toBe(400);
    });

    it('should respond to the post method with 200, good Html', async () => {
      const response =
        await request(app)
          .post('/AsFile')
          .field("html", "welp");
      expect(response.statusCode).toBe(200);
    });

    it('should respond to the post method with 400, bad Json view', async () => {
      const response =
        await request(app)
          .post('/AsFile')
          .field("html", "welp")
          .field("view", 'badJson { "name": "nothing" }');
      expect(response.statusCode).toBe(400);
    });

    it('should respond to the post method with 200, good Html and Json view', async () => {
      const response =
        await request(app)
          .post('/AsFile')
          .field("html", "welp")
          .field("view", '{ "name": "nothing" }');
      expect(response.statusCode).toBe(200);
    });

    it('should respond to the post method with 200, good Html and Json view and FileName', async () => {
      const response =
        await request(app)
          .post('/AsFile')
          .field("html", "welp")
          .field("view", '{ "name": "nothing" }')
          .field("fileName", 'file.pdf');
      expect(response.statusCode).toBe(200);
    });
  });

  describe('POST /AsBase64', () => {
    it('should respond to the post method with 400, missing html', async () => {
      const response =
        await request(app)
          .post('/AsBase64')
      expect(response.statusCode).toBe(400);
    });

    it('should respond to the post method with 200, good html', async () => {
      const response =
        await request(app)
          .post('/AsBase64')
          .field("html", "welp");
      expect(response.statusCode).toBe(200);
    });

    it('should respond to the post method with 400, bad json view', async () => {
      const response =
        await request(app)
          .post('/AsBase64')
          .field("html", "welp")
          .field("view", 'badJson { "name": "nothing" }');
      expect(response.statusCode).toBe(400);
    });

    it('should respond to the post method with 200, good html and view', async () => {
      const response =
        await request(app)
          .post('/AsBase64')
          .field("html", "welp")
          .field("view", '{ "name": "nothing" }');
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
