const express = require('express')
const path = require ('path')
const fs = require('fs')

const app = express();
const PORT = 3000;


app.use(express.urlencoded({extended: true}))


//CODIGO REFERENTE A SUGESTÃO DE CARDÁPIO -- INICIO

let sugestao = null

app.get('/' , (req, res)=>{
    
    res.send(`
        <div>
            <h3>Dê uma sugestão para o nosso cardapio</h3>
            <form action="/sugestao" method="GET">

                <label for="namef">Insira o nome da comida :</label>
                <input type="text" id="namef" name="namef">
                <label for="ingredientes">Insira os ingredientes dessa comida</label>
                <input type="text" id="ingredientes" name="ingredientes">

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



app.get('/sugestao' , (req, res)=>{
    const { namef, ingredientes } = req.query;

    if(!namef || !ingredientes){
        return res.status(400).send('Nenhuma sugestão foi enviada ainda');
    }

    const ingredientesFormatados = ingredientes.split(',').join('');


    res.send(`
        <h1> Muito obrigado pela sugestão </h1>
        <p> ${namef} </p>
        <p> ${ingredientesFormatados} </p>

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
            <input type="email" id="email" name="email">

            <label for="assunto">Insira o assunto da mensagem :</label>
            <input type="text" id="assunto" name="assunto">

            <label for="mensagem">Insira a mensagem :</label>
            <input type="text" id="mensagem" name="mensagem">
            

            <button type="submit">Enviar</button>
        </form>
        
        <a href="http://localhost:${PORT}/">
            <div> voltar </div>
        </a>
    `)
})

app.post('/contato', (req,res) =>{
    contato = req.body
    const {nome, email, assunto, mensagem} = contato

    if(!nome || !email || !assunto || !mensagem){
        return res.status(400).send('A mensagem não foi enviada');
    }

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
    console.log(res.statusCode)
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