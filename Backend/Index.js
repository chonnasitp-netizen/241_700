//ทำการ import โมดูล HTTP
const http = require('http');
const host = 'localhost';
const port = 8000;


const reqestlistener  = function(req,res){
    res.writeHead(200);
    res.end('Hello, World! This is my first server.');
}


const server = http.createServer(reqestlistener);
server.listen(port,host,() => {
    console.log(`Server is running on http://${host}:${port}`);
});