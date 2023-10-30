import { toast } from 'react-toastify'
import { Toast } from 'domain/interfaces/toast'

export class ToastService implements Toast {
  success({ message, duration = 5000 }: Toast.MessageParams): void {
    toast.success(message, {
      autoClose: duration,
    })
  }

  error({ message, duration = 5000 }: Toast.MessageParams): void {
    toast.error(message, {
      autoClose: duration,
    })
  }
}
