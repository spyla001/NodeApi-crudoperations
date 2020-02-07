const nodemailer = require("nodemailer");
const pdf = require("pdfkit");
const student = {
  firstName: "srinivas",
  lastName: "yaganti",
  age: 28,
  ssn: 372227,
  profession: "Systems Engineer"
};

function generateHeader(doc) {
  doc
    .image("./globby.jpg", 50, 45, { width: 50, borderRadius: 50 })
    .fillColor("#444444")
    .fontSize(20)
    .text("Tabner Inc.", 110, 57)
    .fontSize(10)
    .text("Taylor Durden", 200, 65, { align: "right" })
    .text("Charlotte, NC, 28262", 200, 80, { align: "right" })
    .moveDown();
}

function generatesubject(doc) {
  doc
    .fontSize(20)
    .text("Welcome to Tabner Inc.")
    .fontSize(10)
    .text("Please verify your details...")
    .moveDown();
}

function generateFooter(doc) {
  doc.fontSize(10).text("We appreciate your choice!", 50, 700, {
    align: "center",
    width: 500
  });
}

function generateCustomerInformation(doc, student) {
  doc
    .text(`Name: ${student.firstName + " " + student.lastName}`, 50, 200)
    .text(`age: ${student.age}`, 50, 215)
    .text(`SSN: ${student.ssn}`, 50, 230)
    .text(`Registered Date: ${new Date()}`, 300, 215)
    .moveDown();
}
const sendmail = function(req, res, next) {
  console.log("middleware");
  const pdfDocument = new pdf();
  let buffers = [];
  pdfDocument.on("data", buffers.push.bind(buffers));
  pdfDocument.on("end", () => {
    let pdfData = Buffer.concat(buffers);
    console.log(pdfData);
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "sunny.surya995@gmail.com",
        pass: ""
      }
    });
    const mailOptions = {
      from: "sunny.surya995@gmail.com",
      to: "spyla223@gmail.com",
      subject: "Subject of your email",
      html: "<p>Your html here</p>",
      attachments: [
        {
          filename: "test.pdf",
          content: pdfData,
          contentType: "application/pdf"
        }
      ]
    };

    transporter.sendMail(mailOptions, function(err, info) {
      if (err) {
        console.log(err);
      } else console.log(info);
    });
  });

  generateHeader(pdfDocument);
  // pdfDocument.text(`Welcome to tabner`, 100, 100);
  // pdfDocument.text(`name: ${student.firstName + " " + student.lastName}`);
  // pdfDocument.text(`age: ${student.age}`);
  // pdfDocument.text(`profession: ${student.profession}`);
  // pdfDocument.text(`ssn: ${student.ssn}`);
  generatesubject(pdfDocument);
  generateCustomerInformation(pdfDocument, student);
  generateFooter(pdfDocument);
  pdfDocument.end();
  next();
};

module.exports = sendmail;
