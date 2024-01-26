import React from 'react';
import { proxy, useSnapshot } from 'valtio';
import { motion,AnimatePresence } from 'framer-motion';
import {headContainerAnimation,
        headContentAnimation,
        headTextAnimation,
        slideAnimation
} from '../config/motion';
 import state from '../store/index'
 import { CustomButton } from '../components';

const Home = () => {
        const sanp=useSnapshot(state)
            return(
            <AnimatePresence>
                {sanp.intro &&
                (<motion.section className='home' {...slideAnimation('left')}>
                        <motion.header {...slideAnimation('down')}>
                                <img src='./images/threejs.png' 
                                alt='logo'
                                className='w-8 h-8 object-contain'
                                />
                        </motion.header>
                        <motion.div className='home-content' {...headContainerAnimation}>
                                <motion.div {...headTextAnimation}>
                                        <h1 className='head-text'>
                                                LET'S <br className='xl:block hidden'/> DO IT.
                                        </h1>
                                </motion.div>
                                <motion.div>
                                  <motion.div {...headContentAnimation} 
                                  className='flex flex-col gap-5'>
                                <p className="max-w-md font-normal text-gray-600 text-base">
                                 Create your unique and exclusive shirt with our brand-new 3D customization tool. 
                                 <strong>Unleash your imagination</strong>{" "} and define your own style.
                                </p>
                                <CustomButton 
                                type='filled'
                                title='Customize It'
                                handleClick={()=> state.intro=false}
                                customSyles='px-4 w-fit py-2.5 font-bold text-sm'
                                />
                                </motion.div>
                                </motion.div>
                               

                        </motion.div>
                </motion.section>)}
            </AnimatePresence>
            )
}

export default Home;