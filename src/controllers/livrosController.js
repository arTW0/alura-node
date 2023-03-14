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
}

export default LivroController