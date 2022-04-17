import axios from 'axios'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.withCredentials = true

// manageClass an axios instance
const service = axios.create({
  baseURL: 'http://81.69.225.235:8081/', // url = base url + request url
  // 这里是后端地址

  // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 500000, // request timeout
  crossDomain: true
})

export default service
