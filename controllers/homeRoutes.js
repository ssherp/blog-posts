const {User, Blog, Comment} = require('../../models')
const router = require('express').Router()
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
      // Get all post and JOIN with user data
      const postData = await Blog.findAll({
        include: [
          {
            model: User,
            attributes: ['username'],
          },
        ],
      });
  
      // Serialize data so the template can read it
      const posts = postData.map((post) => post.get({ plain: true }));
  
      // Pass serialized data and session flag into template
      res.render('homepage', { 
        posts, 
        logged_in: req.session.logged_in 
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });






















module.exports = router;