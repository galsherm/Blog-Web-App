import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

// Initialize an array to store blog posts
const blogPosts = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

// Endpoint to submit a blog post
app.post("/blog", (req, res) => {
  // Extract message and subject from the request body
  const message = req.body.message;
  const subject = req.body.subject;
  
  // Create a new blog post object
  const newPost = {
    message: message,
    subject: subject
  };
  
  // Push the new post object into the array
  blogPosts.push(newPost);
  console.log(`-----------------------\n`);

  blogPosts.forEach((post, index) => {
    console.log(`Blog Post ${index + 1}:`);
    console.log(`Subject: ${post.subject}`);
    console.log(`Message: ${post.message}`);
  });
  
  // Log the new post
  console.log("New blog post added:", newPost);
  
  // Send response (to the client)
  res.sendStatus(200);
});

// Endpoint to get all blog posts
app.get("/blog", (req, res) => { //client make a GET request
  

  // Server sends a JSON (blogPosts) back to the client
  res.json(blogPosts);
});
app.post("/submit", (req, res) => {
  //msgBlog = req.body.message;
  //subjectBlog = req.body.subject;
  //console.log(req.body.subject);
  res.render("form.ejs");
});
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
