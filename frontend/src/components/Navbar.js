import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCommentDots,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
// import image from "./logo.png";


function Navbar() {


  return (
    <header>
    <nav class="navbar">
      <span></span>
      <div class="logo">CodeScape</div>
      <ul class="menu">
      <li><a href="http://localhost:5000/index2.html">About</a></li>
      <li><a href="/">Code</a></li>
        <li>
        <Link to="/upload">
          ASK
        </Link>
        </li>
        <li><a href="/resource">Docs</a></li>
        <li><a href="http://localhost:5000/contact.html">Contact</a></li>
        <li><a href="http://localhost:5000/index.html">Log Out</a></li>
      </ul>
      <div class="btn"></div>
    </nav>
  </header>
  );
}

export default Navbar;