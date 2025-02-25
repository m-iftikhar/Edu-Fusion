"use client";

import React, { FC, useState } from 'react'
import Heading from './utils/Heading';
import Header from './components/Header';
interface Props {

}


const page :FC<Props>= (props) => {
  const [open,setOpen]=useState(false);
  const [activeItem,setActiveItem]=useState(0);
  return (
    <div>
        <Heading
        title="Edu Fusion"
        description="EduFusion is a platform for students to learn and get help from teachers"
        keywords="ProgramMing,MERN,AI,Machine Learning & DevOps"
      />
      <Header
      open={open}
      setOpen={setOpen}
      activeItem={activeItem}
      />
    </div>
  )
}

export default page
