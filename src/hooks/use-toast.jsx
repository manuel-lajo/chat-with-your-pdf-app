import { toast } from "react-toastify"

const useToast = () => {
  const options = {
    position: 'top-right',
    autoClose: 7000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true
  }

  const showInfoToast = content => {
    toast.info(content, options)
  }

  const showSuccessToast = content => {
    toast.success(content, options)
  }

  const showWarningToast = content => {
    toast.warning(content, options)
  }

  const showErrorToast = content => {
    toast.error(content, options)
  }

  return { showInfoToast, showSuccessToast, showWarningToast, showErrorToast }
}

export default useToast
