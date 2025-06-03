import Image from 'next/image'
import React, { use, useRef } from 'react'
import MyScrollProgress from '../lib/context/ScrollContext'
import { useMotionValueEvent, useTransform, motion } from 'framer-motion'

const Scanner = () => {
    const {scrollProgress}= use(MyScrollProgress)
    const audioRef = useRef<HTMLAudioElement>(null)
    if(!scrollProgress) return
    useMotionValueEvent(scrollProgress,'change',latest=>{
      if(latest >.99 && scrollProgress.getPrevious()! <=.99){
            audioRef.current?.play()
      }
    })
    const x1 = useTransform(scrollProgress,[.98,1],[100,0])
    const x2 = useTransform(scrollProgress,[.98,1],[-100,0])
    const opacity = useTransform(scrollProgress,[.98,1],[0,1])


  return (
    <section className='relative overflow-x-hidden'>
        <div className="scan-info absolute top-0 overflow-hidden">
            <motion.div id="product-id" className='flex-1'
            style={{
                x:x2,
                opacity
            }}>
                <h2>#98734</h2>
            </motion.div>
            <motion.div className="product-description w-fit overflow-hidden"
            style={{
                x:x1,
                opacity
            }}>
                <p className='overflow-hidden'>Transform your digital identity</p>
            </motion.div>
        </div>

        <div className="scan-container"></div>
        <motion.div className="barcode relative w-1/2 aspect-video"
        style={{
            x:x2,
            opacity
        }}>
            <Image
            src='/barcode.png'
            alt='bar code'
            fill
            className='object-cover'/>
        </motion.div>
        <motion.div className="purchased"
        style={{
            x:x1,
            opacity
        }}>
            <p className=''>Innovation Veriified</p>
        </motion.div>
        <audio src='/scanner-beep.mp3' ref={audioRef} />
    </section>
  )
}

export default Scanner