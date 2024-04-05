const isLoggedIn = (req, res, next)=>{
const user = req.session.loggedUser
if(user){
    
   next() 
}else{
    res.send(`<script>alert("Debes iniciar sesion o registrarte primero!");</script>
    <script>window.location.href = "/users/login";</script>`);
}

}

module.exports= isLoggedIn