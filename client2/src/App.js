import './App.css';
import { Route, Routes } from "react-router-dom";
import Header from './componets/Header';
import React, { useState } from 'react';
import Login from './componets/Login';
import Blogs from './componets/Blogs';
import UserBlogs from './componets/UserBlogs'
import AddBlogs from './componets/AddBlogs'
import BlogDetail from './componets/BlogDetail'



function App() {
  const [userid,setuserid]=useState("");
  const [blogid,setblogid]=useState("");

  
  return <React.Fragment>
    <header>
      <Header/>
    </header>
    <main>
    <Routes>
      <Route path="/login" element={<Login userid={userid} setuserid={setuserid}/>}></Route>
      <Route path="/blogs" element={<Blogs userid={userid} setblogid={setblogid}/>}></Route>
      <Route path="/myBlogs" element={<UserBlogs userid={userid} blogid={blogid}/>}></Route>
      <Route path="/myBlogs/:id" element={<BlogDetail/>}></Route>
      <Route path="/blogs/add" element={<AddBlogs />} />
    </Routes>
    </main>

  </React.Fragment>;
}

export default App;
