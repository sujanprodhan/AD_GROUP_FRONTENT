import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000/",
  timeout: 10000,
});

instance.interceptors.request.use(
  (config) => {
    //const token = AuthService.getToken();
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const ApiService = {
  get(url) {
    return instance
      .get(url)
      .then((res) => res)
      .catch((reason) => Promise.reject(reason));
  },

  post(url, data) {
    return instance
      .post(url, data)
      .then((res) => res)
      .catch((reason) => Promise.reject(reason));
  },

  put(url, data) {
    return instance
      .put(url, data)
      .then((res) => res)
      .catch((reason) => Promise.reject(reason));
  },
  
  awaitAll() {
    return axios
      .all(Array.from(arguments))
      .then(axios.spread((...responses) => responses))
      .catch((reasons) => Promise.reject(reasons));
  },
};

export default ApiService;
