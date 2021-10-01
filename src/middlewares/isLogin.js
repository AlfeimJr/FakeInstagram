module.exports = (req,res,next) =>{
    const {user} = req.session
    if(typeof user  == 'undefined' && !user){
       return res.redirect('/login')
    }
    
    //feita para usar as informações do usuario dentro das views
    res.locals.user = user;
    //passa pro proximo 
    next();
}