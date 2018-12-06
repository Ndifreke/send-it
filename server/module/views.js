function renderHome(req,res){
 res.render('login.html');
}

const view = {
 renderHome: renderHome
}


export default view;