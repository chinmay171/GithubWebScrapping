const cheerio = require("cheerio");
const request = require("request");
const fs = require("fs");
const path = require("path")
const pdfkit = require("pdfkit");
function getIssuesPageHTML(url, topic, repoName){
    request(url, cb);
    function cb(err, response, html){
        if(err){
            console.log(err);
        }
        else{
            // console.log(html);
            getIssueLink(html)
        }
    }
    function getIssueLink(html){
        let $ = cheerio.load(html);
        let IssueElemArr = $(".Link--primary.v-align-middle.no-underline.h4.js-navigation-open.markdown-title");
        let arr = [];
        for(let i = 0; i<IssueElemArr.length; ++i){
            let link = $(IssueElemArr[i]).attr("href");
            // console.log(link);
            arr.push(link);
        }
        let folderPath = path.join(__dirname, topic);
        divCreater(folderPath);
        let filePath = path.join(folderPath, repoName+ ".pdf");
        // fs.writeFileSync(filePath, JSON.stringify(arr));
        let text = JSON.stringify(arr);
        let pdfDoc = new pdfkit();
        pdfDoc.pipe(fs.createWriteStream(filePath));
        pdfDoc.text(text);
        pdfDoc.end();
    }
}

module.exports = getIssuesPageHTML;
function divCreater(folderPath){
    if(fs.existsSync(folderPath) == false){
        fs.mkdirSync(folderPath);
    }
}