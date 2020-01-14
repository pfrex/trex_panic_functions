"use strict";

//const functions = require("firebase-functions");
const randomString = require("crypto-random-string");
const mailgun = require("mailgun-js");
const DOMAIN = "";
const api_key = "";
const mg = mailgun({ apiKey: api_key, domain: DOMAIN });

const express = require("express");
const router = express.Router();
const redisClient = require("./redis_index");

function get_string(user, uKey, lang) {
  console.log(lang);
  switch (lang) {
    case "en": {
      return `Hello ${user},\n\nPlease enter the following id from within the T-rex Panic app to verify your email:\n\n${uKey}\n\nThank you,\nT-rex Panic`;
    }
    case "es": {
      return `Hola ${user},\n\nPor favor ingrese la siguiente identificación desde la aplicación T-rex Panic para verificar su correo electrónico:\n\n${uKey}\n\nGracias,\nT-rex Panic`;
    }
    case "fr": {
      return `Bonjour ${user},\n\nVeuillez entrer l'ID suivant dans l'application T-rex Panic pour vérifier votre courrier électronique:\n\n${uKey}\n\nMerci,\nT-rex Panic`;
    }
    case "de": {
      return `Hallo ${user},\n\nGeben Sie in der T-rex Panic-App die folgende ID ein, um Ihre E-Mail-Adresse zu bestätigen:\n\n${uKey}\n\nDanke,\nT-rex Panic`;
    }
    case "it": {
      return `Ciao ${user},\n\nInserisci il seguente ID dall'app Panic T-rex per verificare la tua email:\n\n${uKey}\n\nGrazie,\nT-rex Panic`;
    }
    case "ru": {
      return `Здравствуйте, ${user},\n\nВведите следующий идентификатор из приложения T-rex Panic, чтобы подтвердить свою электронную почту:\n\n${uKey}\n\nСпасибо,\nT-rex Panic`;
    }
    case "pt": {
      return `Olá, ${user},\n\nPor favor, insira o seguinte ID dentro do aplicativo T-rex Panic para verificar seu e-mail:\n\n${uKey}\n\nObrigado,\nT-rex Panic`;
    }
    case "ko": {
      return `${user} 님, 안녕하세요.\n\n이메일을 확인하려면 T-rex 패닉 앱에서 다음 ID를 입력하십시오.\n\n${uKey}\n\n감사합니다.\nT-rex`;
    }
    case "ja": {
      return `こんにちは${user}、\n\nあなたのEメールを確認するためにT-rex Panicアプリ内から以下のIDを入力してください：\n\n${uKey}\n\nありがとうございます、\nT-rex Panic`;
    }
    case "zhs": {
      return `您好${user}，\n\n请在T-rex Panic应用程序中输入以下ID以验证您的电子邮件：\n\n${uKey}\n\n谢谢，\nT-rex Panic`;
    }
    case "zht": {
      return `你好${user}，\n\n請在T-rex Panic應用程序中輸入以下ID以驗證你的電子郵件：\n\n${uKey}\n\n謝謝你，\nT-rex恐慌`;
    }
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

  async function keyUnique() {
    //console.log("KeyUnique has been invoked.");
    try {
      let email = req.body.email;
      let user = req.body.user;
      let lang = req.body.lang;
      let uKey = randomString({ length: 6 });
      //console.log("This is the email followed by the uKey:");
      //console.log(email);
      //console.log(uKey);

      let result = await redisClient.existsAsync(uKey);
      //console.log("This is the await result value.");
      //console.log(result);

      // the key does not exist so we can use it else try again
      if (result === 0) {
        // the user will have 10 minutes to verify their email
        redisClient.set(uKey, email, "EX", 600);

        // get the formatted string
        let submit = get_string(user, uKey, lang);
        let sendGood = format_data(email, submit);
        //console.log("The sendGood is below it looks good?");
        //console.log(sendGood);
        // send an email with the uKey send out the email here then wait for the players response
        mg.messages().send(sendGood, function(error, body) {
          //console.log(error);
          //console.log(body);// this is showing undefined, why?
          //res.end(JSON.stringify(body));
          res.end();
        });
      } else {
        keyUnique();
      }
    } catch (error) {
      //console.log("There was an error with the try and catch block.");
      res.end();
    }
  }

  // invoke the above function
  keyUnique();
});

module.exports = router;
