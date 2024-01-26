import React from 'react';
import state from '../store';
import { useSnapshot } from 'valtio';
import { getContrastingColor } from '../config/helpers';
const CustomButton = ({title,customSyles,type,handleClick}) => {
            const snap=useSnapshot(state)
            const generateSyle=(type)=>{
                        if(type==='filled'){
                                    return{
                                       backgroundColor:state.color,
                                       color:getContrastingColor(snap.color)
                                    }
                        }
                        if(type==='outline'){
                            return{
                               borderWidth:'1px',
                               borderColor:snap.color,
                               color:snap.color

                               
                            }
                }
            }
            return( 
                <button 
                className={`px-2 py-1.5 flex-1 rounded-md ${customSyles}`}
                style={generateSyle(type)}
                onClick={handleClick}
                >
                        {title}
                </button>
            )
}

export default CustomButton;