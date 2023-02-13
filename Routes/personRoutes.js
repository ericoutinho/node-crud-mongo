const Router = require("express").Router()
const Person = require("../Models/Person")

Router.post("/", async (req, res) => {
    const {name, salary, approved} = req.body
    const person = {
        name,
        salary,
        approved
    }

    if (!name) {
        return res.status(422).json({error: "O nome é obrigatório"})
    }

    try {
        await Person.create(person)
        return res.status(201).json({message: "Pessoa criada com sucesso"})
    } catch (error) {
        return res.status(500).json({error: error})
    }
})

Router.get("/", async (req, res) => {
    
    try {
        const people = await Person.find()
        return res.status(200).json(people)
    } catch (error) {
        return res.status(500).json({error: error})
    }
})

Router.get("/:id", async (req, res) => {

    const {id} = req.params
    
    Person.findById(id)
    .then( (person) => {
        return res.status(200).json(person)
    })
    .catch( (error) => {
        return res.status(422).json({message: "Pessoa não encontrada"})
    })

})

Router.patch("/:id", (req, res) => {
    const {id} = req.params
    const {name, salary, approved} = req.body

    Person.findByIdAndUpdate(id, {name, salary, approved})
    .then( (person) => {
        return res.status(200).json(person)
    })
    .catch( (error) => {
        return res.status(422).json({message: "Não foi possível atualizar"})
        console.error(error)
    })
})

Router.delete("/:id", (req, res) => {
    const id = req.params.id
    Person.findByIdAndDelete(id)
    .then( () => {
        return res.status(200).json({message: "Pessoa excluida com sucesso."})
    })
    .catch( (error) => {
        return res.status(500).json({error: "Não foi possível excluir pessoa"})
        console.error(error)
    })
})

module.exports = Router