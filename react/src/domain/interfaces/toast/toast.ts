export interface Toast {
  success: (params: Toast.MessageParams) => void
  error: (params: Toast.MessageParams) => void
}

export namespace Toast {
  export interface MessageParams {
    message: string
    duration?: number
  }
}
