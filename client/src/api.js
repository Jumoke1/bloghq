import axios from 'axios'
const accessToken = localStorage.getItem(`ACCESS_TOKEN`)

const api = axios.create({

    baseURL: "http://127.0.0.1:5000/",
    headers: {
        "Content-Type": "application/json", 
    }

})

api.interceptors.request.use(
	(config) => {

		if (accessToken) {
			config.headers.Authorization = `Bearer ${accessToken}`;
		}
		return config;	
	}, (error) => {
		return Promise.reject(error);
	}
);

export default api;