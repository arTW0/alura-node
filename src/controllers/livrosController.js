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
}

export default LivroController