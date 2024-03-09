const express = require('express')
const router = express.Router();
const Category = require('./Category');
const slugify = require('slugify');

router.get('/admin/categories/new', (req, res) => {
    res.render('admin/categories/new');
});

router.post('/categories/save', (req, res) => {
    var title = req.body.title;
    if(title != undefined){
        Category.create({
            title: title,
            slug: slugify(title, { lower: true, remove: /[*+~.()'"!:@]/g })
        }).then(() => {
            res.redirect("/admin/categories");
        })
    }else{
        res.redirect('/admin/categories/new');
    }
});

router.get('/admin/categories', (req, res) => {

    Category.findAll().then(categories => {
        res.render('admin/categories/index', {
            categories: categories
        })
    });

});

router.post('/categories/delete', (req, res) => {
    var id = req.body.id;

    if(id != undefined){
        if(!isNaN(id)){
            Category.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect('/admin/categories');
            });
        }else{
            res.redirect("/admin/categories");
        }
    }else{
        res.redirect("/admin/categories");
    }
});

router.get("/admin/categories/edit/:id", (req, res) => {
  var id = req.params.id;

  if (isNaN(id)) {
    return res.redirect("/admin/categories"); // Adicionando 'return' aqui
  }

  Category.findByPk(id)
    .then((category) => {
      if (category != undefined) {
        res.render("admin/categories/edit", {
          category: category,
        });
      } else {
        return res.redirect("/admin/categories"); // Adicionando 'return' aqui
      }
    })
    .catch((error) => {
      return res.redirect("/admin/categories"); // Adicionando 'return' aqui
    });
});

router.post("/categories/update", (req, res) => {
  var id = req.body.id;
  var newTitle = req.body.title;

  // Gerar o novo slug a partir do novo título usando o slugify
  var newSlug = slugify(newTitle, { lower: true, remove: /[*+~.()'"!:@]/g });

  Category.update(
    {
      title: newTitle,
      slug: newSlug, // Atualiza também o slug
    },
    {
      where: {
        id: id,
      },
    }
  )
    .then(() => {
      return res.redirect("/admin/categories");
    })
    .catch((error) => {
      console.error("Erro ao atualizar categoria:", error);
      return res.redirect("/admin/categories");
    });
});


module.exports = router;