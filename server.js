const express = require('express')
const path = require ('path')
const fs = require('fs')

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'views')))
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')))

//CODIGO REFERENTE A SUGESTÃO DE CARDÁPIO -- INICIO

let sugestao = null

app.post('/' , (req, res)=>{
    sugestao = req.body
    res.redirect('/sugestao')
    console.log(sugestao)
})

app.get('/sugestao' , (req, res)=>{
    const {namef, igredientes} = sugestao

    res.send(`
        <h1> Muito obrigado pela sugestão </h1>
        <p> ${namef} </p>
        <p> ${igredientes} </p>

        <a href="http://localhost:3000/index.html">
            <div> voltar </div>
        </a>
    `)
})

//CODIGO REFERENTE A SUGESTÃO DE CARDÁPIO -- FIM

//CODIGO REFERENTE AOS CONTATOS -- INICIO
let contato = null

app.post('/contato', (req,res) =>{
    contato = req.body
    res.redirect('/cont_recebido')
})

app.get('/cont_recebido' , (req, res)=>{

    const {nome, email, assunto, mensagem} = contato
    res.send(`
        <h2> Mensagem enviada com sucesso! Obrigado.</h2>
        <p>${nome}</p>
        <p>${email}</p>
        <p>${assunto}</p>
        <p>${mensagem}</p>

        <a href="http://localhost:3000/index.html">
            <div> voltar </div>
        </a>
    `)
})

//CODIGO REFERENTE AOS CONTATOS -- FIM

//CODIGO REFERENTE A API -- INICIO

const lanches = null

app.get('/api/lanches', (req, res) => {

    fs.readFile(path.join(__dirname, 'public', 'data', 'lanches.json'), 'utf8', (data) => {

        lanches = JSON.parse(data); // Converte para objeto JavaScript

        // Envia os dados para o HTML (pode ser via template engine ou API)
        //res.sendFile(path.join(__dirname, 'public', 'index.html'));

        let l = res.json(lanches)
        res.send(l)
    });
});


//CODIGO REFERENTE A API -- FIM

app.listen(PORT, () => {
    console.log(`Servidor da DevBurger rodando em http://localhost:${PORT}`);
});