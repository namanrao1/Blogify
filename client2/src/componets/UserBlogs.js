/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from "@mui/styles";
import config from "../config";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "20px auto",
    width: "80%",
  },
  card: {
    width: "40%",
    margin: "auto",
    marginTop: "20px",
    padding: "20px",
    boxShadow: "5px 5px 10px #ccc",
    transition: "box-shadow 0.3s",
    position: "relative",
    backgroundColor: "#fff",
  },
  cardButtons: {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: "10px",
  },
  editButton: {
    backgroundColor: "#007bff",
    border: "none",
    color: "white",
    padding: "10px",
    marginLeft: "10px",
    cursor: "pointer",
    borderRadius: "4px",
  },
  deleteButton: {
    backgroundColor: "#dc3545",
    border: "none",
    color: "white",
    padding: "10px",
    marginLeft: "10px",
    cursor: "pointer",
    borderRadius: "4px",
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
  },
  avatar: {
    backgroundColor: "red",
    color: "white",
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px",
    marginRight: "10px",
  },
  cardTitle: {
    fontSize: "18px",
    fontWeight: "bold",
  },
  cardImage: {
    width: "100%",
    height: "194px",
    objectFit: "cover",
    marginTop: "10px",
  },
  cardContent: {
    marginTop: "10px",
  },
  loading: {
    color: "#999",
  },
  error: {
    color: "#dc3545",
  },
}));

const UserBlogs = ({ userid }) => {
  const classes = useStyles();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get(`http://localhost:5001/api/blogs/user/${userid}`);
      setBlogs(res.data.user.blogs);
    } catch (err) {
      console.error("Error fetching blogs:", err);
      setError("Failed to fetch blogs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [userid]);

  const handleDelete = async (blogId) => {
    try {
      await axios.delete(`${config.BASE_URL}/api/blogs/${blogId}`);
      setBlogs((prevBlogs) => prevBlogs.filter(blog => blog._id !== blogId));
    } catch (err) {
      console.error("Error deleting blog:", err);
      setError("Failed to delete blog.");
    }
  };

  return (
    <div className={classes.container}>
      {loading && <p className={classes.loading}>Loading...</p>}
      {error && <p className={classes.error}>{error}</p>}
      {blogs.map((blog) => (
        <div key={blog._id} className={classes.card}>
          <div className={classes.cardHeader}>
            <div className={classes.avatar}>
              {blog.userName ? blog.userName.charAt(0) : "U"}
            </div>
            <div className={classes.cardTitle}>{blog.title}</div>
          </div>
          <img
            className={classes.cardImage}
            src={blog.image} // Ensure this URL is correct
            alt={blog.title}
            onError={(e) => e.target.style.display = 'none'} // Hide image if there's an error
          />
          <div className={classes.cardContent}>
            <p>{blog.description}</p>
          </div>
          <div className={classes.cardButtons}>
          
            <button className={classes.deleteButton} onClick={() => handleDelete(blog._id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserBlogs;
