const {User, Blog, Comment} = require('../models')
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

  
 
 // renders the page with posts associated with logged in user
router.get('/dashboard', withAuth, async (req, res)=>{
  try{
      const {user_id} = req.session
      const blogPosts = await Blog.findAll({
          where: {
              user_id: user_id
          }
      })
  
      const parsedPosts = blogPosts.map((blog) => blog.get({plain: true}))
      
      res.render('dashboard', {posts: parsedPosts, loggedIn: req.session.log_in})
  }catch(error){
      res.render('error', {error, loggedIn: req.session.log_in})
  }
})
  



router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      res.redirect('/dashboard');
      return;
    }
  
    res.render('login');
  });




















module.exports = router;