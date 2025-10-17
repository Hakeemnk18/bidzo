import cron from 'node-cron';
import {container} from './di/container'
import { AuctionService } from './services/auction.service';

export const scheduleAuctionJobs = async () => {
    await auctionService.processAuctionStarts();
    await auctionService.processAuctionEnds();
}
  

const auctionService = container.resolve(AuctionService);
cron.schedule('0 * * * *', async () => {
  
  const now = new Date();
  try {
    await scheduleAuctionJobs();
  } catch (error) {
    console.error('Error during scheduled job execution:', error);
  }
});