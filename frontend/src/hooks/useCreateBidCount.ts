import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBidPack } from "../api/bid.count.api";
import { toast } from "react-toastify";
import { showErrorToast } from "../utils/showErrorToast";

export const useCreateBidCount = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createBidPack,
    onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['bidCounts'] });
          toast.success("bid created successfully")
          
        },
        onError: (error) => {
          showErrorToast(error)
        },
  });
};