import React, { useState } from 'react';
import {useSnapshot } from 'valtio';
import { motion,AnimatePresence } from 'framer-motion';
import {slideAnimation ,fadeAnimation} from '../config/motion';
 import state from '../store/index'
 import axios from 'axios';
import {download} from '../assets'
import {downloadCanvasToImage,reader} from '../config/helpers'
import {EditorTabs,FilterTabs,DecalTypes} from '../config/constants'
import {AiPicker,ColorPicker,CustomButton,FilePicker,Tab} from '../components'
          
import { generateImage } from '../api/generateImage';
const Customizer = () => {
            const snap=useSnapshot(state)
            const [file,setFile]=useState('')

            const[prompt,setPrompt]=useState('')
            const[generatingImg,seGeneratingIm]=useState(false)

            const[activeEditorTab,setActiveEditorTab]=useState('')
            const[activeFilterTab,setActiveFilterTab]=useState({
              logoShirt:true,
              stylishShirt:false
            })

            //show tab content depending on the active tab
            const generateTabContent = () => {
              switch (activeEditorTab) {
                case "colorpicker":
                  return <ColorPicker/>
    
                case "filepicker":
                  return <FilePicker
                  file={file}
                  setFile={setFile}
                  readFile={readFile}
                  />
                case "aipicker":
                  return <AiPicker 
                  prompt={prompt}
                  setPrompt={setPrompt}
                  generatingImg={generatingImg}
                  handleSubmit={handleSubmit}
          
                  />
                default:
                  return null;
              }
            }
            console.log(activeEditorTab)
            const handleDecals = (type, result) => {
              const decalType = DecalTypes[type];

              // Update the texture in the state based on the result
              if (type === 'full') {
                state.fullDecal = result;
              } else if (type === 'logo') {
                state.logoDecal = result;
              }
            
              if (!activeFilterTab[decalType.filterTab]) {
                    handleActiveFilterTab(decalType.filterTab);
                  }
            }

            const handleActiveFilterTab=(tabName)=>{
              switch(tabName){
                case 'logoShirt':
                  state.isLogoTexture=! activeFilterTab[tabName]
                  break
                case 'stylishShirt':
                  state.isFullTexture= !activeFilterTab[tabName]
                  break
                case 'downloadShirt':
                  return downloadCanvasToImage()
                default:
                  state.isFullTexture=false
                  state.isLogoTexture=true
              }
              setActiveFilterTab((prevState)=>{
                return{
                ...prevState,
                [tabName]:!prevState[tabName]
              }})
            }

            const readFile = (type) => {
              reader(file).then((result) => {
                // Update the texture in the state based on the result
                if (type === 'full') {
                  state.fullDecal = result;
                } else if (type === 'logo') {
                  state.logoDecal = result;
                }
               
                handleDecals(type, result);
                setActiveEditorTab("");
              });
            };
           

            const handleSubmit = async (type) => {
                if (!prompt) return alert("Please enter a prompt");

                try {
                  seGeneratingIm(true);
                  const imageUrl = await generateImage(prompt);
                  

                  // Call handleDecals to handle the updated state
                  handleDecals(type,imageUrl);;
                } catch (error) {
                  alert(`Error: ${error.message}`);
                } finally {
                  seGeneratingIm(false);
                  setActiveEditorTab("");
                }
              };


            
            
            
            
            
            
            return(
              <AnimatePresence>
                        {! snap.intro && (
                           <>
                           <motion.div 
                           key='custom'
                           className='absolute top-0 left-0 z-10'
                           {...slideAnimation('left')}
                           >
                             <div className='flex items-center min-h-screen'>
                                    <div className='editortabs-container tabs'>
                                         {EditorTabs.map((tab)=>(
                                                <Tab key={tab.name}
                                                     tab={tab}
                                                     handleClick={()=>setActiveEditorTab(tab.name)}
                                                     
                                                     
                                                />

                                         ))}
                                         
                                         {generateTabContent()} 
                                    </div>
                                   
                             </div>
                           </motion.div>
                           <motion.div
                             className='absolute top-5 right-5 z-10'
                             {...slideAnimation}
                           >
                                    <CustomButton
                                    type='filled'
                                    title='Go Back'
                                    handleClick={()=> state.intro=true}
                                    customSyles='w-fit px-4 py-2.5 font-bold text-sm'
                                    />
                           </motion.div>
                           <motion.div 
                           className='filtertabs-container '
                           {...slideAnimation('up')}
                           >
                                {FilterTabs.map((tab)=>(
                                    <Tab key={tab.name}
                                         tab={tab}
                                         isFilterTab
                                         isActiveTab={activeFilterTab[tab.name]}
                                         handleClick={() => handleActiveFilterTab(tab.name)}
                                         
                                                     
                                    />

                                  ))}
                                    
                           </motion.div>
                           </>
                        )}
              </AnimatePresence>
            )
}


export default Customizer;