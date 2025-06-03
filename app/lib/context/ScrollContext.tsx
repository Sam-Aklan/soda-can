"use client"
import { MotionValue } from 'framer-motion';
import React from 'react';
const MyScrollProgress = React.createContext<{scrollProgress:MotionValue<number>|null}>({scrollProgress:null})
export default MyScrollProgress;