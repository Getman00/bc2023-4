const {XMLParser, XMLBuilder} = require("fast-xml-parser");
const fs = require("fs");
const http = require("http");
const port = 8000;

const xml = fs.readFileSync("data.xml", "utf-8");

const parser = new XMLParser();
const builder = new XMLBuilder({format: true});
let obj = parser.parse(xml);
const data = obj.exchange.currency;

const necessaryData = Array.isArray(data) ?
data.map(item => ({
    date: item.exchangedate,
    rate: item.rate
}))
: [{date: obj.exchange.currency.exchangedate, 
    rate: obj.exchange.currency.rate}];

const xmlObj = {
    data: {
        exchange: necessaryData
    }
};




const server = http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'application/xml; charset = utf-8'
    });

    const readlXml = builder.build(xmlObj);
    res.end(readlXml);
})

server.listen(port, (error) => {
    if(error) {
        console.log('Could start the server', error)
    }
    else {
        console.log('Server is listening on port:' + port)
    }
})



