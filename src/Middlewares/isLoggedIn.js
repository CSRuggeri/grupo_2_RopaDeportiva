


function isLoggedIn (req, res, next){
const user = req.session.loggedUser
if(user){
    
   next() 
}else{
    res.send(`<script>alert("You must be logged in!");</script>
    <script>window.location.href = "/users/login";</script>`);
}

}

module.exports=isLoggedIn