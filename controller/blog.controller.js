const Blog = require('../model/blog.schema'); 
const User = require('../model/user.schema'); 

module.exports = {
    //for creating a blog
    createBlog: async (req, res) => {
        try {
            const userId = req.user.id;
            const {blogName,description} = req.body;
            const userData = await User.query().findById(userId);

            if (!userData) {
                return res.status(404).send({
                    success: false,
                    message: "User not found."
                });
            }
            const newBlog = await Blog.query().insert({
                blogName: blogName,
                description: description,
                userId: userId
            })

            res.status(201).send({
                success: true,
                message: "blog Created Successfully.",
                data: newBlog
            });
        } catch (error) {
            res.status(500).send({
                success: false,
                message: "Error Occurs.",
                error: error.message
            });
        }
    },
    // for gettings  details user with blogs
      blogFullDetail: async (req, res) => {
        try {
          const userId = req.user.id; 
      
          const userWithBlogs = await User.query()
            .findById(userId) 
            .withGraphFetched('blog')
            .select('id', 'userName', 'userEmail') 
            .modifyGraph('blog', (builder) => {
              builder.select('id', 'blogName', 'description');
            });
            if(!userWithBlogs){
                return res.status(404).send({
                    success: false,
                    message: "this user has no blog "
                });
            }
            res.status(201).send({
                success: true,
                message: "list of user's blog",
                data: userWithBlogs
            });
      
        }  catch (error) {
            res.status(500).send({
                success: false,
                message: "Error Occurs.",
                error: error.message
            });
        }
      }
      
};
