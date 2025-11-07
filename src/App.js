import { useState } from "react";

function App() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [blogs, setBlogs] = useState([]);

  const addBlog = () => {
    if (!title || !content) return;
    
    const newBlog = {
      id: Date.now(),
      title,
      content,
    };

    setBlogs([newBlog, ...blogs]);
    setTitle("");
    setContent("");
  };

  const deleteBlog = (id) => {
    setBlogs(blogs.filter((blog) => blog.id !== id));
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Simple Blog Application</h1>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter blog title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ display: "block", width: "300px", padding: "8px", marginBottom: "10px" }}
        />

        <textarea
          placeholder="Enter blog content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="4"
          style={{ display: "block", width: "300px", padding: "8px", marginBottom: "10px" }}
        />

        <button onClick={addBlog}>Add Blog</button>
      </div>

      <h2>All Blogs</h2>

      {blogs.map((blog) => (
        <div
          key={blog.id}
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            marginBottom: "10px",
            borderRadius: "8px",
            width: "320px"
          }}
        >
          <h3>{blog.title}</h3>
          <p>{blog.content}</p>

          <button onClick={() => deleteBlog(blog.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
