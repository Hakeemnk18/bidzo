import { toast } from "react-toastify";
import { showErrorToast } from "../utils/showErrorToast";
import { deleteBidPack } from "../api/bid.count.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeletePack = ()=>{
    const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteBidPack,
    onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['bidCounts'] });
          toast.success("bid deleted successfully")
        },
        onError: (error) => {
          showErrorToast(error)
        },
  });
}