const multer = require('multer')
const {v4: gerarNomeAlatorio} = require('uuid')
const path = require('path')


const storage = multer.diskStorage({
    destination: function (req, file, next) {
      next(null, path.resolve('src', 'public', 'posts'))
    },
    filename: function (req, file, next) {
      const extensao = file.originalname.split('.').pop();
      const nomeArquivo = `${gerarNomeAlatorio()}.${extensao}`
      next(null, nomeArquivo)
    }
  })
  
  const upload = multer({ storage: storage })  
  module.exports = upload;