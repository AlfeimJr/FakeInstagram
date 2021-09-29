const { User } = require("../models");
const bcrypt = require('bcryptjs')

const authController = {
  showLogin(req, res) {
    return res.render("auth/login");
  },
  showRegister(req, res) {
    return res.render("auth/register");
  },
  async register(req, res) {
    const { name, email, password, username } = req.body;
    try {
      const hash = bcrypt.hashSync(password, 10)
      const user = await User.create({
        name,
        email,
        password: hash,
        username,
        avatar: "link",
        create_at: new Date().toISOString(),
      });

      return res.redirect("/login");
    } catch (err) {
      console.log(err);
      return res.redirect("/registro");
    }
  },

  async login(req, res){
    
    try {
      const {email, password} = req.body;

      const user = await User.findOne({
        where:{
          email
        }
    });
    if (!user) return res.render('auth/login',{error: 'Usuario não existe!'})

    if(!bcrypt.compareSync (password, user.password)){
      return res.render('auth/login',{error: 'Senha está errada!'})
    }
    return res.redirect('/home');
  } catch(err){
    console.log(error);
    return res.render('auth/login',{error: 'Sistema indesponivel tente novamente'})
  }
}

};




module.exports = authController;
