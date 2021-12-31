const request = require("supertest");
const app = require("../app");

describe("Post Endpoints", () => {
  it("throw error for blank req body", async (done) => {
    await request(app).post("/attr").send({}).expect(404);
    done();
  });
  it("throw error for blank req body", async (done) => {
    await request(app)
      .post("/attr")
      .send({
        id: "09016c75-9dfb-48a4-8b97-6d9f0059211b",
        ipClass: "test",
        ipId: "test",
        ipName: "test",
        ipSize: 10,
        ipType: "test",
        ipLabel: "test"
      })
      .expect(200);
    done();
  });
});
