const http = require('http');
const url = require('url');
const path = require ('path');
const fs= require ('fs');


const mimeTypes ={
    "html": 'text/html',
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "png": "image/png",
    "gif": "image/gif",
    "js": "text/javascript",
    "css": "text/css",
    "scss": 'text.scss'
}



http.createServer((req, res)=>{

    let uri = url.parse(req.url).pathname;
    let fileName = path.join(process.cwd(), unescape(uri));
    console.log('loading ' + uri);


    let stats;

    try{

        stats = fs.lstatSync(fileName);

    } catch(e){
        res.writeHead({'Content-type': 'text/plain'});
        res.write('Page Not Found');
        res.end();
        return;

    }


//read if it is file

if(stats.isFile()){

    let mimeType =mimeTypes[path.extname(fileName).split('.').reverse()[0]];
    res.writeHead(200, {'Content-Type': mimeType});
    let fileStream = fs.createReadStream(fileName);
    fileStream.pipe(res);

}else if(stats.isDirectory()){
    res.writeHead(302, {'location': 'index.html'});
    res.end();
}else{
    res.writeHead(500, {'Content-Type': 'text/plain'})
    res.write("Internal serval error");
    res.end();
}

}).listen(3000, ()=> console.log('app listen to server'));