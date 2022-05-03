let url = "https://github.com/topics";
const cheerio = require("cheerio");
const request = require("request");
const getRepoPageHTML = require("./repoPage");
request(url, cb);
function cb(err, response, html){
    if(err){
        console.log(err);
    }else{
        getLink(html);       
    }
}
function getLink(html){
    let $ = cheerio.load(html);
    let linkElemArr = $(".no-underline.d-flex.flex-column.flex-justify-center");
    for(let i = 0; i<linkElemArr.length; ++i){
        let href = $(linkElemArr[i]).attr("href");
        let topic = href.split("/").pop();
        let fullLink = `https://github.com/${href}`;
        // console.log(fullLink);
        getRepoPageHTML(fullLink, topic)
    }
}

