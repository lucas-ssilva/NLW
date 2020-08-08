//Servidor
const express = require('express')
const server = express()
const nunjucks = require('nunjucks')
const {pageLanding, pageStudy, pageGiveClasses, saveClasses} = require('./pages')

//configurar nunjucks
nunjucks.configure('src/views', {
    express: server,
    noCache: true,
})


//configuração do servidor
server
//receber os dados do req body
.use(express.urlencoded({extended: true}))
//configurar arquivos estativos (css scripts, images) 
.use(express.static("public"))
//rotas da aplicação
.get("/", pageLanding)
.get("/study",pageStudy)
.get("/give-classes", pageGiveClasses)
.post("/save-classes", saveClasses)
//iniciando servidor
.listen(5500)

//static está servindo para que os arquivos html possam achar as referencias na pasta public 
//__dirname trás o caminho ate o src 
//fazer um get pra cada rota da aplicação 