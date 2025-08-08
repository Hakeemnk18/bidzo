import { toast } from "react-toastify";

export function showErrorToast(error: any, defaultMessage = "Something went wrong") {
  if (error?.response?.data?.message) {
    toast.error(error.response.data.message);
  } else {
    toast.error(defaultMessage);
  }
}