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


  res.render("index.ejs", { blogPosts: blogPosts });

});


app.post("/submit", (req, res) => {
  res.render("form.ejs");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
