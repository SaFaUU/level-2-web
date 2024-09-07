import React from "react";
import { NavLink } from "react-router-dom";
import { Button } from "../ui/button";
import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <motion.header
      className="h-16 fixed w-full top-0 z-[999]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 1 }}
    >
      <nav className="h-full bg-white w-full max-w-[1230px] mx-auto flex justify-between items-center px-[20px] top">
        <span className="text-3xl">iRepair</span>
        <ul className="space-x-5">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <Button className="bg-primary ">
            <NavLink to="/login">Login</NavLink>
          </Button>
        </ul>
      </nav>
    </motion.header>
  );
};

export default Navbar;
