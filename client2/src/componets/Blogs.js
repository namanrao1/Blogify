import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog";
import config from "../config";

const Blogs = ({ userid,setblogid}) => {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get(`${config.BASE_URL}/api/blogs`);
      const data = res.data;
      console.log("Fetched blogs, user ID:", userid);
      setBlogs(data.blogs); // Update state with fetched blogs
      
      console.log(blogs);
    } catch (err) {
      console.error("Error fetching blogs:", err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = (deletedId) => {
    // Update the blog list after deletion
    setBlogs((prevBlogs) => prevBlogs.filter(blog => blog._id !== deletedId));
  };

  return (
    <div>
      {blogs.map((blog) => (
        <Blog
        setblogid={setblogid}
          key={blog._id} // Ensure unique key for each blog
          id={blog._id}
          isUser={userid === blog.user}
          title={blog.title}
          desc={blog.desc}
          img={blog.img}
          user={blog.user.name}
          date={new Date(blog.date).toLocaleDateString()}
          onDelete={handleDelete} // Pass the delete handler to Blog component
        />
      ))}
    </div>
  );
};

export default Blogs;
