function renderHome(req,res){
 res.render('index.ejs');
}

const view = {
 renderHome: renderHome
}


export default view;