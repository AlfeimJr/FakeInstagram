const { Publication, User, Comment } = require("../models");

//EXIBIR O FEED
const mainController = {
  async showHome(req, res){
    try{
      const publications = await Publication.findAll({
        include: [
          {
            model: User
          },
          {
            model: Comment,
            include: [
              {
                model: User,
                attributes: ['name'],
              }
            ]
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


  //EXIBIÇÃO DO COMENTARIO NO POST
  async createComment(req, res) {
    const {user} = req.session;
    const {description, postId} = req.body;
    try {
      const comment = await Comment.create({
        user_id: user.id,
        publication_id: postId,
        content: description,
        create_at: new Date().toISOString(),
      });
      
      
      return res.redirect("/home");
    } catch (err) {
      console.log("Erro ao comentar");;
    }
  },
  ////////////////////////////////////////



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
