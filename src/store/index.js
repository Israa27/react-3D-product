import { proxy } from 'valtio';

const state = proxy({
  intro: true,
  color: '#EFBD48',
  isLogoTexture: true,
  isFullTexture: false,
  logoDecal:`images/threejs.png`,
  fullDecal:`images/threejs.png`,
});

export default state;