const ejs = require("ejs");
const pdf = require("html-pdf");
const fs = require("fs");
const emailService = function(req, res, next) {
  fs.readFile("views/Signinform.ejs", "utf8", function(err, content) {
    if (err) {
      console.log(err);
      return err;
    }
    console.log(content);
    content = ejs.render(content, {
      student: {
        firstName: "srinivas",
        lastName: "yaganti",
        age: 28,
        ssn: 372227,
        profession: "Systems Engineer"
      }
    });
    pdf
      .create(content, { format: "Letter", orientation: "landscape" })
      .toFile("./signform.pdf", function(err, res) {
        if (err) return console.log(err);
        console.log(res);
        next();
      });
  });
};

module.exports = emailService;
