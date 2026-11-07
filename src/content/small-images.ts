/**
 * 640px versions of the project covers and Diary photos, for phones (srcset). This module is loaded
 * on demand by useSmallImages(), and only in production builds: the single-file preview skips it to stay small.
 */
import c_hisesne from '../assets/images/hisense-cover-640.webp';
import c_iconnect from '../assets/images/iconnect/cover-640.webp';
import c_limelines from '../assets/images/limelines/cover-640.webp';
import c_gigthree from '../assets/images/gigthree/cover-640.webp';
import c_e_municipality from '../assets/images/emun/cover-640.webp';
import c_al_hilal_bank from '../assets/images/alhilal/cover-640.webp';
import c_tummy from '../assets/images/tummy/cover-640.webp';
import p_beach from '../assets/images/noticed/beach-640.webp';
import p_canal from '../assets/images/noticed/canal-640.webp';
import p_clouds from '../assets/images/noticed/clouds-640.webp';
import p_gorge from '../assets/images/noticed/gorge-640.webp';
import p_hills from '../assets/images/noticed/hills-640.webp';
import p_islet from '../assets/images/noticed/islet-640.webp';
import p_lake from '../assets/images/noticed/lake-640.webp';
import p_palms from '../assets/images/noticed/palms-640.webp';
import p_peninsula from '../assets/images/noticed/peninsula-640.webp';
import p_ponds_dusk from '../assets/images/noticed/ponds-dusk-640.webp';
import p_reservoir from '../assets/images/noticed/reservoir-640.webp';
import p_ridge from '../assets/images/noticed/ridge-640.webp';
import p_sunset_hills from '../assets/images/noticed/sunset-hills-640.webp';
import p_switchbacks from '../assets/images/noticed/switchbacks-640.webp';
import p_valley from '../assets/images/noticed/valley-640.webp';
export const smallCovers: Record<string, string> = { 'hisesne': c_hisesne, 'iconnect': c_iconnect, 'limelines': c_limelines, 'gigthree': c_gigthree, 'e-municipality': c_e_municipality, 'al-hilal-bank': c_al_hilal_bank, 'tummy': c_tummy };
export const smallPhotos: Record<string, string> = { 'beach': p_beach, 'canal': p_canal, 'clouds': p_clouds, 'gorge': p_gorge, 'hills': p_hills, 'islet': p_islet, 'lake': p_lake, 'palms': p_palms, 'peninsula': p_peninsula, 'ponds-dusk': p_ponds_dusk, 'reservoir': p_reservoir, 'ridge': p_ridge, 'sunset-hills': p_sunset_hills, 'switchbacks': p_switchbacks, 'valley': p_valley };
