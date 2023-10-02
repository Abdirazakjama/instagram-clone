import {v2 as cloudinary} from 'cloudinary';
import { CLOUDNARY_API_KEY, CLOUDNARY_API_SECRET, CLOUD_NAME } from './config.js';
          
cloudinary.config({ 
  cloud_name: CLOUD_NAME, 
  api_key: CLOUDNARY_API_KEY, 
  api_secret: CLOUDNARY_API_SECRET 
});

export default cloudinary;