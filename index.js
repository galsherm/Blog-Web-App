import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

// Initialize an array to store blog posts
let blogPosts = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

//submit new posts
app.post("/newPost", (req, res) => {
  // Extract message and subject from the request body
  const content = req.body.content;
  const title = req.body.title;
  const author = req.body.author;
  const id = blogPosts.length;

  // Create a new blog post object
  const newPost = {
    content: content,
    title: title,
    author: author,
    id: id
  };

  // Push the new post object into the array
  blogPosts.push(newPost);

  res.render("index.ejs", { blogPosts: blogPosts });
});
// Route to render the newPost page

app.get("/newPost", (req, res) => {
  res.render("modify.ejs", { heading: "Create New Post", submit: "Create" });
});

// Define a route to handle the GET request for the edit page
app.get("/editPost/:id", (req, res) => {
  // Extract the post ID from the request parameters
  const postId = req.params.id;

  // Find the post with the matching ID in the blogPosts array
  const post = blogPosts[postId];


  // Render the "modify.ejs" template and pass the post data to it
  res.render("modify.ejs", { post: post, heading: "Edit Post", submit: "Save Changes" });
});
app.post("/editPost/:id", (req, res) => {
  // Extract the post ID from the request parameters
  const postId = req.params.id;



  // Update the post data with the new values
  const updatedPost = {
    content: req.body.content,
    title: req.body.title,
    author: req.body.author,
    id: postId
  };


  // Replace the existing post with the updated post
  blogPosts[postId] = updatedPost;


  // Redirect the user to the updated post or any other relevant page
  res.render("index.ejs", { blogPosts: blogPosts });
});



app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});