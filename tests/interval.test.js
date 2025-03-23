const request = require("supertest");
const app = require("../src/app");

describe("GET /api/producers/intervals", () => {
  beforeAll((done) => {
    setTimeout(() => {
      done();
    }, 300);
  });

  it("It should compare the data returned by the API with the expected data.", async () => {
    const expectedOutput = {
      min: [
        {
          producer: "Joel Silver",
          interval: 1,
          previousWin: 1990,
          followingWin: 1991,
        },
      ],
      max: [
        {
          producer: "Matthew Vaughn",
          interval: 13,
          previousWin: 2002,
          followingWin: 2015,
        },
      ],
    };

    const response = await request(app).get("/api/producers/intervals");

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(expectedOutput);
  });

  it("should fail when comparing API response with incorrect expected data (and pass the test)", async () => {
    const incorrectExpectedOutput = {
      min: [
        {
          producer: "Wrong Producer",
          interval: 99,
          previousWin: 1900,
          followingWin: 1999,
        },
      ],
      max: [
        {
          producer: "Wrong Producer",
          interval: 50,
          previousWin: 1950,
          followingWin: 2000,
        },
      ],
    };

    const response = await request(app).get("/api/producers/intervals");

    let failedAsExpected = false;

    try {
      expect(response.body).toEqual(incorrectExpectedOutput);
    } catch (err) {
      failedAsExpected = true;
    }

    expect(failedAsExpected).toBe(true);
  });
});
