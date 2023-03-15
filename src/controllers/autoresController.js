import autores from "../models/Autor.js";

class AutorController {
  static listarAutores = async (req, res) => {
    const result = await autores.find({}).lean()

    if (result) {
      res.status(200).json({
        data: result,
      })
      return
    }

    res.status(500).json({
      message: "Não foi possível obter a lista de autores",
    })
  }

  static cadastrarAutor = (req, res) => {
    const { nome, nacionalidade } = req.body

    if (!nome || !nacionalidade) {
      res.status(400).json({
        message: "Dados inválidos",
      })
      return
    }

    const autor = new autores({
      nome,
      nacionalidade
    })

    autor
      .save()
      .then((result) => {
        res.status(201).json({
          data: result,
        })
      })
      .catch((err) => {
        res.status(500).json({
          message: "Não foi possível cadastrar o autor",
        })
      })
  }

  static atualizarAutor = (req, res) => {
    const id = req.params.id

    autores.findByIdAndUpdate(id, { $set: req.body })
      .then((result) => {
        res.status(201).json({
          message: "Autor atualizado com sucesso",
        })
      })
      .catch((err) => {
        res.status(500).json({
          message: "Não foi possível atualizar o autor",
        })
        return
      })
  }

  static listarAutoresPorId = (req, res) => {
    const id = req.params.id

    autores.findById(id)
      .then((result) => {
        res.status(201).json({
          data: result,
        })
      }).catch((err) => {
        res.status(400).json({
          message: "Não foi possível obter o autor",
        })
        return
      })
  }

  static deletarAutor = (req, res) => {
    const id = req.params.id

    autores.findByIdAndDelete(id)
      .then((result) => {
        res.status(201).json({
          message: "Autor deletado com sucesso",
        })
      }).catch((err) => {
        res.status(400).json({
          message: "Não foi possível deletar o autor",
        })
        return
      })
  }
}

export default AutorController