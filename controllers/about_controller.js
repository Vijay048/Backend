module.exports.about = function(req,res){
    return res.render('about',{
        title: "Codial about"
    });
}