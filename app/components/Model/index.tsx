"use client"
import { Canvas } from '@react-three/fiber'
import React, { useEffect, useRef, useState } from 'react'
import Scene from '@/app/components/Scene'
import {  useMotionValueEvent, useScroll,motion, useTransform } from 'framer-motion'
import ScrollProvider from '@/app/lib/Providers/ScrollProvider'
import Hero from '../Hero'
import Info from '../Info'
import Scanner from '../Scanner'
import Outro from '../Outro'
import ReactLenis from 'lenis/react'
import type { LenisRef } from 'lenis/react';
import { cancelFrame, frame } from 'framer-motion';

const ThreeDModle = () => {
  const ref= useRef<HTMLDivElement>(null)
  const lenisRef = useRef<LenisRef>(null)

  useEffect(() => {
    function update(data: { timestamp: number }) {
      const time = data.timestamp
      lenisRef.current?.lenis?.raf(time)
    }

    frame.update(update, true)

    return () => cancelFrame(update)
  }, [])
  
  const {scrollYProgress} = useScroll({
    target:ref,
    offset:['start start','end end']
  })
   
  return (
    <ReactLenis ref={lenisRef} root options={{lerp:.1,duration:1.5, smoothWheel:true, autoRaf:false}}>

    <div>

    <div   className=' bg-[#fefdfd] relative z-0 ' ref={ref}>
    
      <ScrollProvider scrollProgress={scrollYProgress}>
      <div className={` h-screen sticky top-0 left-0 `}
      >
        <Canvas className='' >

            <Scene />
        </Canvas>
      </div>

       <Hero/>
      
   <Info/>
   <Scanner/>
    </ScrollProvider>
    </div>
   <Outro/>
    </div>
    </ReactLenis>
  )
}

export default ThreeDModle