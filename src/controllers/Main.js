const { Publication, User } = require("../models");


const mainController = {
  async showHome(req, res){
    try{
      const publications = await Publication.findAll({
        include: [
          {
            model: User
          }
        ],
        order: [
          ["create_at", "DESC"]
        ]
      })
      return res.render('home',{publications})
    }catch(err){
      console.log(err)
    }
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
