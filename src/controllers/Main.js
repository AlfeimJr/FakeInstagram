const { Publication } = require("../models");

const mainController = {
  showHome(req, res) {
    return res.render("home");
  },
  showCreatePublication(req, res) {
    return res.render("post");
  },

  //Criar uma publicação 
  async createPublication(req, res) {
    const {id} = req.session.user;
    const {filename} = req.file;
    try {
      const publication = await Publication.create({
        user_id: id,
        image: filename,
        create_at: new Date().toISOString(),
      });

      return res.redirect("/home");
    } catch (err) {
      console.log(err);
      return res.redirect("/publicar", {
        error: "erro ao cadastrar publicação"
      });
    }
  },
  ///////////////////////////////////////////////
};



module.exports = mainController;
