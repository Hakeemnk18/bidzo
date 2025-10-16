import cron from 'node-cron';
import {container} from './di/container'
import { AuctionService } from './services/auction.service';



const auctionService = container.resolve(AuctionService);
cron.schedule('0 * * * *', async () => {
  const now = new Date();
  try {
    await auctionService.processAuctionStarts();
    await auctionService.processAuctionEnds();
  } catch (error) {
    console.error('Error during scheduled job execution:', error);
  }
});