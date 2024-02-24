// const BASE_URL = 'http://123.207.32.32:1888/api'
// export const BASE_URL = 'http://codercba.com:1888/api'
// export const BASE_URL = import.meta.env.VITE_BASE_URL
// export const BASE_URL = '/backend/'

export const BASE_URL = import.meta.env.DEV ? 'http://codercba.com:1888/api' : '/backend/'
export const TIMEOUT = 60000
