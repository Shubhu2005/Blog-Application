import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");
  const [theme, setTheme] = useState("light");

  // Load blogs and theme from localStorage
  useEffect(() => {
    const savedBlogs = JSON.parse(localStorage.getItem("blogs"));
    const savedTheme = localStorage.getItem("theme");

    if (savedBlogs) setBlogs(savedBlogs);
    if (savedTheme) setTheme(savedTheme);
  }, []);

  // Save blogs in localStorage
  useEffect(() => {
    localStorage.setItem("blogs", JSON.stringify(blogs));
  }, [blogs]);

  // Save theme in localStorage
  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Add or Update Blog
  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) {
      alert("Please enter both Title and Content.");
      return;
    }

    if (title.length > 50) {
      alert("Title must be under 50 characters.");
      return;
    }

    if (content.length > 500) {
      alert("Content must be under 500 characters.");
      return;
    }

    if (editId) {
      const updated = blogs.map((b) =>
        b.id === editId ? { ...b, title, content } : b
      );
      setBlogs(updated);
      setEditId(null);
    } else {
      const newBlog = {
        id: Date.now(),
        title,
        content,
        date: new Date().toLocaleString(),
      };
      setBlogs([newBlog, ...blogs]);
    }

    setTitle("");
    setContent("");
  };

  // Delete with confirmation
  const deleteBlog = (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      setBlogs(blogs.filter((b) => b.id !== id));
    }
  };

  // Edit blog
  const editBlog = (blog) => {
    setTitle(blog.title);
    setContent(blog.content);
    setEditId(blog.id);
  };

  // Clear form
  const clearForm = () => {
    setTitle("");
    setContent("");
    setEditId(null);
  };

  // Filter blogs using search
  const filteredBlogs = blogs.filter((b) =>
    b.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">

      {/*  Navbar */}
      <div className="navbar">
        <h2>React Blog App</h2>

        {/* Dark Mode Toggle */}
        <button
          className="theme-btn"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>
      </div>

      {/* Search Bar */}
      <input
        className="search"
        placeholder="Search blog..."
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Form Card */}
      <div className="card form-card">
        <h3>{editId ? "Edit Blog" : "Add Blog"}</h3>

        <input
          className="input"
          placeholder="Blog title (max 50 chars)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="textarea"
          placeholder="Blog content (max 500 chars)"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="4"
        />

        <button className="btn btn-primary" onClick={handleSubmit}>
          {editId ? "Update Blog" : "Add Blog"}
        </button>

        <button className="btn btn-secondary" onClick={clearForm}>
          Clear
        </button>
      </div>

      <h2 className="list-title">All Blogs</h2>

      {/*  Search Result Empty State */}
      {filteredBlogs.length === 0 && blogs.length > 0 && (
        <p className="empty-text">No matching blogs found.</p>
      )}

      {/* Blog List */}
      {filteredBlogs.map((blog) => (
        <div key={blog.id} className="card blog-card">

          <h3>{blog.title}</h3>
          <p>{blog.content}</p>

          <small className="date-text">Created: {blog.date}</small>

          <br /><br />

          <button className="btn btn-edit" onClick={() => editBlog(blog)}>
            Edit
          </button>

          <button className="btn btn-delete" onClick={() => deleteBlog(blog.id)}>
            Delete
          </button>
        </div>
      ))}

      {blogs.length === 0 && (
        <p className="empty-text">No blogs yet. Start by adding one!</p>
      )}
    </div>
  );
}

export default App;
