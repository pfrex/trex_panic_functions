"use strict";


const news = {
    en: `Thank you for downloading T-Rex Panic! This is the first public launch and we plan on adding better social features and events, along with zen mode leaderboards and more items and taunts. Be sure to check back regularly for news on upcoming features.`,
    es: `¡Gracias por descargar T-Rex Panic! Este es el primer lanzamiento público y planeamos agregar mejores características sociales y eventos, junto con un modo zen y más elementos y burlas. Asegúrese de consultar regularmente las noticias sobre las próximas funciones.`,
    fr: `Merci d'avoir téléchargé T-Rex Panic! Il s'agit du premier lancement public et nous prévoyons d'ajouter de meilleures fonctionnalités et événements sociaux, ainsi qu'un mode zen et davantage d'éléments et de railleries. Assurez-vous de vérifier régulièrement les dernières nouveautés.`,
    it: `Grazie per aver scaricato T-Rex Panic! Questo è il primo lancio pubblico e prevediamo di aggiungere migliori funzionalità ed eventi sociali, oltre a una modalità zen e più elementi e provocazioni. Assicurati di controllare regolarmente le notizie sulle prossime funzionalità.`,
    de: `Vielen Dank, dass Sie T-Rex Panic heruntergeladen haben! Dies ist der erste öffentliche Start und wir planen, bessere soziale Funktionen und Ereignisse zusammen mit einem Zen-Modus und mehr Gegenständen und Verspottungen hinzuzufügen. Achten Sie darauf, regelmäßig nach Neuigkeiten zu kommenden Funktionen zu suchen.`,
    ru: `Спасибо за загрузку T-Rex Panic! Это первый публичный запуск, и мы планируем добавить лучшие социальные функции и события, а также режим дзен и больше предметов и насмешек. Не забывайте регулярно проверять наличие новостей о новых функциях.`,
    pt: `Muito obrigado por baixar o programa T-Rex Panic! Este é o primeiro lançamento público e planejamos adicionar melhores recursos e eventos sociais, juntamente com um modo zen e mais itens e provocações. Não se esqueça de verificar regularmente as novidades sobre os próximos recursos.`,
    ja: `T-Rex Panicをダウンロードしていただきありがとうございます。これは最初の公開であり、私たちは禅モードとより多くのアイテムと愚痴と一緒に、より良い社会的な特徴とイベントを加えることを計画します。今後の機能に関するニュースを定期的にチェックしてください。`,
    ko: `T-Rex Panic을 다운로드 해 주셔서 감사합니다! 이것은 최초의 공개 출시이며 우리는 선 (zen) 모드와 더 많은 항목 및 조롱과 함께보다 나은 소셜 기능 및 이벤트를 추가 할 계획입니다. 곧 출시 될 기능에 대한 뉴스를 정기적으로 확인하십시오.`,
    zht: `感謝您下載T-Rex Panic！這是第一次公開發布，我們計劃添加更好的社交功能和事件，以及禪模式和更多項目和嘲諷。請務必定期查看有關即將推出的功能的新聞。`,
    zhs: ` 感谢您下载T-Rex Panic！这是第一次公开发布，我们计划添加更好的社交功能和事件，以及禅模式和更多项目和嘲讽。请务必定期查看有关即将推出的功能的新闻。`
  };
  


  const express = require("express");
  const router = express.Router();
  
  
  router.all("/", (req,res) => {
    let agent = req.get("User-Agent");
    if (agent !== "TrexGM") {
      res.end();
    }
  
    let key = req.body.key;
    let pub_num = "1 ";// Be sure to add a space! And be sure to increment each news posting, before deploying or else the players won't get rewarded for checking the news.
  
    switch (key) {
      case "en":
        res.end(pub_num+news.en);
        break;
      case "es":
        res.end(news.es);
        break;
      case "fr":
        res.end(news.fr);
        break;
      case "it":
        res.end(news.it);
        break;
      case "de":
        res.end(news.de);
        break;
      case "ru":
        res.end(news.ru);
        break;
      case "pt":
        res.end(news.pt);
        break;
      case "ja":
        res.end(news.ja);
        break;
      case "ko":
        res.end(news.ko);
        break;
      case "zht":
        res.end(news.zht);
        break;
      case "zhs":
        res.end(news.zhs);
        break;
    }
  });
  
  module.exports = router;