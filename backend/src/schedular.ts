import cron from 'node-cron';
import {container} from './di/container'
import { AuctionService } from './services/auction.service';

export const scheduleAuctionJobs = async () => {
  try {
    await auctionService.processAuctionStarts();    
  } catch (err) {
    console.error("processAuctionStarts failed:", err);
  }

  try {
    await auctionService.processAuctionEnds();      
  } catch (err) {
    console.error("processAuctionEnds failed:", err);
  }
};
  

const auctionService = container.resolve(AuctionService);
cron.schedule('0 * * * *', async () => {
  
  const now = new Date();
  try {
    await scheduleAuctionJobs();
  } catch (error) {
    console.error('Error during scheduled job execution:', error);
  }
});