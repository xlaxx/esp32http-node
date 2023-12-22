const express=require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));


let receivedString = null; // 将receivedString声明在外部，使其在整个应用程序中可访问

const http = require('http');
const server = http.createServer(app)

const PORT=3830;

server.listen(PORT,()=>{
    console.log('正在监听8080端口');
});

app.get('/',(req,res)=>{
    res.send('hello 32');
});


app.post('/sendString', (req, res) => {
    receivedString = req.body.string;

    // 在控制台上打印接收到的字符串
    console.log('Received String:', receivedString);

    // 在这里添加将字符串发送到ESP32的代码

    // 响应确认消息给网页
    res.json({ message: 'String received successfully' });
});

app.get('/show', (req, res) => {
    res.json({ receivedString });
});