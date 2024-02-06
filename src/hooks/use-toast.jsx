import { toast } from "react-toastify"

const useToast = () => {
  const options = {
    position: 'top-right',
    autoClose: 7000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true
  }

  const infoToast = content => {
    toast.info(content, options)
  }

  const successToast = content => {
    toast.success(content, options)
  }

  const warningToast = content => {
    toast.warning(content, options)
  }

  const errorToast = content => {
    toast.error(content, options)
  }

  return { infoToast, successToast, warningToast, errorToast }
}

export default useToast
