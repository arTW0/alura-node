import livros from "../models/Livro.js";

class LivroController {
  static listarLivros = async (req, res) => {
    const result = await livros.find({}).lean()

    if (result) {
      res.status(200).json({
        data: result,
      })
      return
    }

    res.status(500).json({
      message: "Não foi possível obter a lista de livros",
    })
  }

  static cadastrarLivro = (req, res) => {
    const { titulo, autor, numeroPaginas, editora } = req.body

    if (!titulo || !autor || !numeroPaginas || !editora) {
      res.status(400).json({
        message: "Dados inválidos",
      })
      return
    }

    const livro = new livros({
      titulo,
      autor,
      numeroPaginas,
      editora
    })

    livro
      .save()
      .then((result) => {
        res.status(201).json({
          data: result,
        })
      })
      .catch((err) => {
        res.status(500).json({
          message: "Não foi possível cadastrar o livro",
        })
      })
  }

  static atualizarLivro = (req, res) => {
    const id = req.params.id

    livros.findByIdAndUpdate(id, { $set: req.body })
      .then((result) => {
        res.status(201).json({
          message: "Livro atualizado com sucesso",
          // data: result,
        })
      })
      .catch((err) => {
        res.status(500).json({
          message: "Não foi possível atualizar o livro",
        })
        return
      })
  }

  static listarLivros = (req, res) => {
    const id = req.params.id

    livros.findById(id)
      .then((result) => {
        res.status(201).json({
          data: result,
        })
      }).catch((err) => {
        res.status(400).json({
          message: "Não foi possível obter o livro",
        })
        return
      })
  }
}

export default LivroController