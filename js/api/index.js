import { Storage, JourneyData } from 'journey-data';
import { defaultDataStorage } from '../../config';

const journeyData = new JourneyData(new Storage[defaultDataStorage]());

export default journeyData;
