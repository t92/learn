const ws = require('nodejs-websocket');
const port = 3000

let currentServe

const server = ws.createServer(function (conn) {
    //受到连接触发//
    //在服务端cmd安装npm install nodejs-websocket//

    const flag = conn.path.split('/')[1]

    conn.flag = flag

    conn.on("text", function (str) {
        // 收到信息触发
        console.log("received" + str)

        

        try{
            const msgObj = JSON.parse(str)

            console.log('pares----', msgObj)

            const {
                command,
                from,
                info
            } = msgObj

            switch(command) {
                case 'select': 
                    //若为select info为接受消息的用户标识
                    currentServe = matchServe(info)
                    if(!currentServe) {
                        //用户未登录
                    }
                    break
                case 'send':
                    const message = {
                        from,
                        message: info
                    }
                    currentServe.sendText(JSON.stringify(message))
                    break
            }

        }catch{
            throw 'message type error'
        }
    })
    conn.on("close", function (code, reason) {
        // 断开连接触发 //
        console.log("connection closed")
    })
    conn.on("error", function (err) {
        // 出错触发 //
        console.log("header err")
        console.log(err)
    })
    function boardcast(str) {
        // server.connections  保存每个连接进来的用户 //
        server.connections.forEach(function (conn) {
            conn.sendText(str)
        })
    }

    function matchServe(tag) {
        return server.connections.filter( item => tag == item.flag)[0]
    }

}).listen(port)

console.log("websocket server listen port is" + port)