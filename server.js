const express = require('express')
const path = require ('path')
const fs = require('fs')

const app = express();
const PORT = 3000;


app.use(express.urlencoded({extended: true}))


//CODIGO REFERENTE A SUGESTÃO DE CARDÁPIO -- INICIO

let sugestao = null
let query = null
let itens = null

app.get('/' , (req, res)=>{
    
    res.send(`
        <div>
            <h3>Dê uma sugestão para o nosso cardapio</h3>
            <form action="/" method="POST">

                <label for="namef">Insira o nome da comida :</label>
                <input type="text" id="namef" name="namef">
                <label for="igredientes">Insira os igredientes dessa comida</label>
                <input type="text" id="igredientes" name="igredientes">

                <button type="submit">Enviar</button>
            </form>
        </div>
        <a href="http://localhost:3000/contato">
            <div> Contatos </div>
        </a>
        <a href="http://localhost:3000/api/lanches">
            <div> API </div>
        </a>
        `)
})

app.post('/' , (req, res)=>{
    itens = req.body

    sugestao = req.body
    sugestao.namef = sugestao.namef.trim().replace(/\s+/g, '+')
    sugestao.igredientes = sugestao.igredientes.trim().replace(/\s+/g, '+')

    query = `/sugestao?nome=${sugestao.namef}&ingredientes=${sugestao.igredientes}`
    res.redirect(`/sugestao?nome=${sugestao.namef}&ingredientes=${sugestao.igredientes}`)
    
    console.log(itens)
})

app.get(query , (req, res)=>{

    if(!itens){
        return res.status(400).send('Nenhuma sugestão foi enviada ainda');
    }

    const {namef, igredientes} = itens

    res.send(`
        <h1> Muito obrigado pela sugestão </h1>
        <p> ${namef} </p>
        <p> ${igredientes} </p>

        <a href="http://localhost:${PORT}/">
            <div> voltar </div>
        </a>
    `)
})

//CODIGO REFERENTE A SUGESTÃO DE CARDÁPIO -- FIM

//CODIGO REFERENTE AOS CONTATOS -- INICIO
let contato = null

app.get('/contato', (req, res)=>{
    res.send(`
        <h3>Preencha os campos abaixo se quiser enviar uma mensagem</h3>

        <form action="/contato" method="POST">

            <label for="nome">Insira o seu nome :</label>
            <input type="text" id="nome" name="nome">

            <label for="email">Insira o seu email :</label>
            <input type="text" id="email" name="email">

            <label for="assunto">Insira o assunto da mensagem :</label>
            <input type="text" id="assunto" name="assunto">

            <label for="mensagem">Insira a mensagem :</label>
            <input type="text" id="mensagem" name="mensagem">
            

            <button type="submit">Enviar</button>
        </form>
        
        <a href="http://localhost:3000/">
            <div> voltar </div>
        </a>
    `)
})

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

        <a href="http://localhost:${PORT}/">
            <div> voltar </div>
        </a>
    `)
})

//CODIGO REFERENTE AOS CONTATOS -- FIM

//CODIGO REFERENTE A API -- INICIO

let lanches = null

app.get('/api/lanches', (req, res) => {

    fs.readFile(path.join(__dirname, 'public', 'data', 'lanches.json'), 'utf8', (err, data) => {

        if (err) {
            console.error("Erro ao ler arquivo:", err);
            return res.status(500).json({ error: "Arquivo não encontrado" });
        }

        lanches = JSON.parse(data); // Converte para objeto JavaScript
        if (!lanches) {
            throw new Error("Arquivo JSON está vazio");
        }
        res.json(lanches);
    });
});


//CODIGO REFERENTE A API -- FIM

app.listen(PORT, () => {
    console.log(`Servidor da DevBurger rodando em http://localhost:${PORT}`);
});