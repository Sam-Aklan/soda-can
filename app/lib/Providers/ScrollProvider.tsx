"use client"

import { MotionValue } from "framer-motion"
import React, { useState } from "react"
import MyScrollProgress from "../context/ScrollContext"

const ScrollProvider = ({children,scrollProgress}:{
    children:React.ReactNode,
    scrollProgress:MotionValue<number>|null
}) => {
    const [scroll] = useState(scrollProgress)
  return (
    
    <MyScrollProgress.Provider value={{scrollProgress:scroll}}>
        {children}
    </MyScrollProgress.Provider>
  )
}

export default ScrollProvider