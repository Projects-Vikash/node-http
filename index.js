const http = require('http');
const path = require('path')
const fs = require('fs')

const port = 3000 ;
const hostname = 'localhost' ;

const server = http.createServer(function(req , res){
    //console.log(req.headers); // req.headers contains all info of request 
    console.log('Request for url : ' + req.url + 'by method' + req.method);

    if(req.method == 'GET'){
        var fileUrl;
        if(req.url == '/'){
            fileUrl = '/index.html'
        }else{
            fileUrl = req.url ;
        }

        var filePath = path.resolve('./public' + fileUrl); //we have kept the pages in public folder
        var fileExt = path.extname(filePath);
        if(fileExt == '.html' ){
            
            fs.exists(filePath , function (exists){
                if(!exists){
                    res.statusCode = 404 ;
                    res.setHeader('Content-Type' , 'text/html');
                    res.end(`<html><body><h1>Error 404 : Page ${fileUrl} Not Found </h1> </body> </html> ` );
                }else{
                    res.statusCode = 200 ;
                    res.setHeader('Content-Type' , 'text/html');
                    fs.createReadStream(filePath).pipe(res);
                }
            });
        }else{
            res.statusCode = 404 ;
            res.setHeader('Content-Type' , 'text/html');
            res.end(`<html><body><h1>Error 404 : Ext ${fileExt} Not Available </h1> </body> </html>`);
        }
    }else{
        res.statusCode = 404 ;
        res.setHeader('Content-Type' , 'text/html');
        res.end(`<html><body><h1>Error 404 : Method ${req.method} Not Supported </h1> </body> </html>`);
    }
    // res.statusCode = 200 ;
    // res.setHeader('Content-type' , 'text/html');
    // res.end('<html> <body><h1> Hi vikash </h1> </body> </html>');
})


server.listen(port, hostname , () => {
    console.log(`Server running at http://${hostname}:${port}`);
})