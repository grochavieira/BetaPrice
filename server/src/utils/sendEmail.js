const { exec } = require("child_process");

function sendEmail(name) {
  exec(`echo '${name}.txt'`, (err, stdout, stderr) => {
    if (err) {
      console.error(err);
    } else {
      console.log("email enviado com sucesso!");
    }
  });
}

export default sendEmail;
