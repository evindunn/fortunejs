const assert = require("chai").assert;
const fortune = require("../dist/index").fortune;

describe("#fortune()", () => {
  it("works with no args", (done) => {
    fortune()
      .then((result) => {
        assert.isString(result);
        console.log(result);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it("works when 'topic' is specified", (done) => {
    fortune({ topic: "ascii-art" })
      .then((result) => {
        assert.isString(result);
        console.log(result);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it("works when 'dirty' is true", (done) => {
    fortune({ dirty: true })
      .then((result) => {
        assert.isString(result);
        console.log(result);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it("works when 'dirty' is false", (done) => {
    fortune({ dirty: false })
      .then((result) => {
        assert.isString(result);
        console.log(result);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it("works when 'topic' is specified and 'dirty' is true", (done) => {
    fortune({ topic: "astrology", dirty: true })
      .then((result) => {
        assert.isString(result);
        console.log(result);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it("works when 'topic' is specified and 'dirty' is false", (done) => {
    fortune({ topic: "law", dirty: false })
      .then((result) => {
        assert.isString(result);
        console.log(result);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
