import { JourneyData } from 'journey-data';
import MockStorage from 'journey-data/src/storage/mock-storage';

const journeyData = new JourneyData(new MockStorage());

export default journeyData;
