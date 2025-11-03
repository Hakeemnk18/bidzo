import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createBid } from '../api/bid.api';
import { toast } from 'react-toastify';
import { showErrorToast } from '../utils/showErrorToast';

export const useBid = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBid,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auctions'] });
      toast.success("bid created successfully")
      
    },
    onError: (error) => {
      showErrorToast(error)
    },
  });
};