"use strict";

const randomString = require("crypto-random-string");
const mailgun = require("mailgun-js");
const DOMAIN = "";
const api_key = "";
const mg = mailgun({ apiKey: api_key, domain: DOMAIN });

const express = require("express");
const router = express.Router();
const redisClient = require("./redis_index");

function get_string(user, uKey, lang) {
  switch (lang) {
    case "en":
      return `Hello ${user},\n\nPlease enter the following id from within the T-rex Panic app to recover or transfer your data:\n\n${uKey}\n\nThank you,\nT-rex Panic`;

    case "es":
      return `Hola ${user},\n\nPor favor ingrese la siguiente identificación desde la aplicación T-rex Panic para recuperar o transferir sus datos:\n\n${uKey}\n\nGracias,\nT-rex Panic`;

    case "fr":
      return `Bonjour ${user},\n\nVeuillez entrer l’ID suivant dans l’application T-rex Panic pour récupérer ou transférer vos données:\n\n${uKey}\n\nMerci,\nT-rex Panic`;

    case "de":
      return `Hallo ${user},\n\nGeben Sie in der T-Rex Panic-App die folgende ID ein, um Ihre Daten wiederherzustellen oder zu übertragen:\n\n${uKey}\n\nDanke,\nT-Rex Panic`;

    case "it":
      return `Ciao ${user},\n\nInserisci il seguente ID dall'app Panic T-rex per recuperare o trasferire i tuoi dati:\n\n${uKey}\n\nGrazie,\nT-rex Panic`;

    case "ru":
      return `Здравствуйте, ${user},\n\nВведите следующий идентификатор из приложения T-rex Panic для восстановления или передачи ваших данных:\n\n${uKey}\n\nСпасибо,\nT-rex Panic`;

    case "pt":
      return `Olá, ${user},\n\nPor favor, insira o seguinte ID dentro do aplicativo T-rex Panic para recuperar ou transferir seus dados:\n\n${uKey}\n\nObrigado,\nT-rex Panic`;

    case "ko":
      return `안녕하세요 ${user}님,\n\n데이터를 복구하거나 전송하려면 T-rex 패닉 앱에서 다음 ID를 입력하십시오.\n\n${uKey}\n\n감사합니다.\nT-rex 패닉`;

    case "ja":
      return `こんにちは${user}、\n\nT-rex Panicアプリ内から次のIDを入力してデータを回復または転送してください：\n\n${uKey}\n\nありがとうございます、\nT-rex Panic`;

    case "zhs":
      return `您好${user}，\n\n请在T-rex Panic应用程序中输入以下ID以恢复或传输您的数据：\n\n${uKey}\n\n谢谢\nT-rex Panic`;

    case "zht":
      return `你好${user}，\n\n請在T-rex Panic應用程序中輸入以下ID以恢復或傳輸您的數據：\n\n${uKey}\n\n謝謝，\nT-rex Panic`;
  }
}

// test this thoroughly with the different languages
function format_data(email, mail) {
  const data = {
    from: "",
    to: email,
    subject: "Progress Recovery",
    text: mail
  };

  return data;
}

router.all("/", (req, res) => {
  let agent = req.get("User-Agent");
  if (agent !== "TrexGM") {
    res.end();
  }

  // check that the email exists
  async function emailExists() {
    //console.log("KeyUnique has been invoked.");
    try {
      let email = req.body.email;
      // get the users data under the key of email
      let userData = await redisClient.getAsync(email);
      // if that email is not in our database they must not have previously signed up
      if (userData === null) {
        res.end("noone");
      } else {
        // invoke keyUnique
        keyUnique(userData);
      }
    } catch (error) {
      //console.log("There was an error with the try and catch block.");
      res.end();
    }
  }

  async function keyUnique(userData) {
    //console.log("KeyUnique has been invoked.");
    try {
      let email = req.body.email;
      let user = req.body.user;
      let lang = req.body.lang;
      let uKey = randomString({ length: 6 });

      // write the data under this unique key
      let result = await redisClient.existsAsync(uKey);

      // the key does not exist so we can use it else try again
      if (result === 0) {
        // the user will have 10 minutes to verify their email
        redisClient.set(uKey, userData, "EX", 600);

        // get the formatted string
        let submit = get_string(user, uKey, lang);
        let sendGood = format_data(email, submit);

        // send an email with the uKey send out the email here then wait for the players response
        mg.messages().send(sendGood, function(error, body) {
          res.end("good");
        });
      } else {
        keyUnique(userData);
      }
    } catch (error) {
      //console.log("There was an error with the try and catch block.");
      res.end();
    }
  }

  // invoke the emailExists function
  //keyUnique();
  emailExists();
});

module.exports = router;
