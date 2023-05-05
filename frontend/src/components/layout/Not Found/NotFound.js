import React from "react";
import "./NotFound.css";
import { Link } from "react-router-dom";
import {Typography } from '@mui/material'

const NotFound = () => {
  return (
    <div className="PageNotFound">
      <Typography>Page Not Found </Typography>
      <Link to="/">Home</Link>
    </div>
  );
};

export default NotFound;