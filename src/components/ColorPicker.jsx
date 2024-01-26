import React from 'react';
import { SketchPicker } from 'react-color'
import { useSnapshot } from 'valtio';
import state from '../store';
const ColorPicker = () => {
 const snap = useSnapshot(state);
  return <div className='relative'>
    <div className="absolute top-[-14.5rem] left-full ml-[3rem]">
    <SketchPicker
      color={snap.color}
      disableAlpha
      onChange={(color) => state.color = color.hex}
      
/>
</div>
</div>;
}



export default ColorPicker;