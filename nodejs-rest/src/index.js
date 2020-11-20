const http = require('http');
const { bodyParser } = require('./lib/bodyParser');

let database = [];

function sendResponseMessage(res,status,type,message = ''){
    res.writeHead(status,{'Content-Type': type});
    if(typeof message == "object")
        res.write(JSON.stringify(message));
    else
        res.write(message);

    res.end();
}
function getTasksHandler(req,res) {
    sendResponseMessage(res,200,'application/json',database);    
}

async function getTasksHandlerById(req,res){
    let { url } = req;
    let idQuery = url.split('?')[1];    
    let idValue = idQuery.split('=')[1];

    sendResponseMessage(res,200,'application/json',database[idValue - 1]);  
}

async function createTaskHandler(req,res){
    try {
        await bodyParser(req);
        database.push(req.body);
        sendResponseMessage(res,200,'application/json',database);            
    } catch (error) {
        sendResponseMessage(res,500,'text/plain',"Internal error"+error.message);    
    }
    
}

async function updateTaskHandler(req,res){

    try {
        let { url }= req;    
        let idQuery = url.split('?')[1];
        let idKey = idQuery.split('=')[0];
        let idValue = idQuery.split('=')[1];
    
        if(idKey === "id") {
            await bodyParser(req);
            database[idValue - 1] = req.body;
            sendResponseMessage(res,200,'application/json',database);                         
        }else{
            sendResponseMessage(res,400,'text/plain','Invalid request query');                         
        }
        
    } catch (error) {
        sendResponseMessage(res,500,'text/plain',"Internal error"+error.message); 
    }
   
     
}

async function deleteTaskHandler(req,res){
    let { url } = req;

    try {
        let { url }= req;    
        let idQuery = url.split('?')[1];
        let idKey = idQuery.split('=')[0];
        let idValue = idQuery.split('=')[1];

        if(idKey === 'id'){
            database.splice(idValue - 1, 1);
            sendResponseMessage(res,200,'text/plain',"Deleted");             
        }else{
            sendResponseMessage(res,400,'text/plain','Invalid query');             
        }
    } catch (error) {
        sendResponseMessage(res,500,'text/plain',"Internal error"+error.message);         
    }
}

const server = http.createServer((req,res) => {

    const { url, method }  = req;

    // Logger
    console.log(`URL: ${url} - Method: ${method}`);

    

    switch(method){
        case "GET":
            if(url === "/" ){
                sendResponseMessage(res,200,'application/json',{message: 'Hello world'});                
            }  
            if(url === "/tasks"){                                
                getTasksHandler(req,res);
            } 
            if(/[?&]\w+=(\d+)/g.test(url)){
                getTasksHandlerById(req,res);
            }
            break;
        case "POST":            
            if(url === "/tasks"){
                createTaskHandler(req,res);
            } 
            break;           
        case "PUT":
            updateTaskHandler(req,res);
            break;
        case "DELETE":
            deleteTaskHandler(req,res);
            break;
        default:
            sendResponseMessage(res, 400,'text/plain',"404 NOT FOUND");            
    }

});

server.listen(3000);
console.log('Server on port: ',3000);
