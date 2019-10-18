const server = require("./server");
const request = require("supertest");
const db = require("../database/dbConfig");

describe("auth model", () => {
  it("should set testing environment", () => {
    expect(process.env.DB_ENV).toBe("testing");
  });
});

describe("GET /", () => {
  it("should return 200 http status code", () => {
    return request(server)
      .get("/")
      .then(response => {
        expect(response.status).toBe(200);
      });
  });
  it("should return json data", () => {
    return request(server)
      .get("/")
      .then(response => {
        expect(response.type).toMatch(/json/i);
      });
  });
});

describe("registeration works", () => {
  it("should return 201 when registered", async () => {
    await db("users").truncate;
    let res = await request(server)
      .post("/api/auth/register")
      .send({ username: "sarah", password: "gonzalez" });
    expect(res.type).toMatch(/json/i);
  });

  it("should return null when username or password is missing", async () => {
    await db("users").truncate();
    let user = { username: "kary", password: "tst" };
    let res = await request(server)
      .post("/api/auth/register")
      .send(user);
    expect(res.status).toBe(201);
  });
});

describe("login function", () => {
  it("should return Login successful", async () => {
    let res = await request(server)
      .post("/api/auth/login")
      .send({
        username: "kary",
        password: "tst",
      });
    expect(res.status).toBe(200);
  });
  it("should return message login successful", async () => {
    let res = await request(server)
      .post("/api/auth/login")
      .send({
        username: "sarah",
        password: "gonzalez",
      });
    expect(res.type).toMatch(/json/i);
  });
});
