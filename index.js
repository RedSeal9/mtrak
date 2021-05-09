const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 8094;
//let servers = [];
let servers = [{"game":"srcTest","hostname":"127.0.0.1","port":"69","title":"redSrv"}];
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    res.append('Server','MatchTrak (https://github.com/RedSeal9/mtrak)');
    next();
});
app.use('/static',express.static("static"));

app.get('/',(req,res)=>{
res.sendFile(__dirname+"/static/main.html"); // send main.html (title page) when visited on '/'
});

app.get('/api/list',(req,res)=>{
res.json(servers);
});

app.post('/api/srv',(req,res)=>{
/*
add/update server format example:
{
    "game": "tf",
    "hostname": 127.0.0.1,
    "port": 27000,
    "title": "example server"
}
*/
let n = Object.keys(servers).length + 1;
let conf = ['game','hostname','port','title'];
const c = new Object();
conf.forEach((key)=>{
    if(req.body[key] !== undefined){
        c[key] = req.body[key];
    }
    else{
        res.write(`${key} is undefined!  Request is invalid.\n`);
    };
});
if(Object.keys(req.body).length == conf.length){
    servers.push(c);
};
res.end();
});

app.listen(port, "0.0.0.0", ()=>{console.log(`MatchTrak server listening on 0.0.0.0:${port}`)});