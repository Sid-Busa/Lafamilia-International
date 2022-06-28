import axios from 'axios';

const API = axios.create({
	baseURL: process.env.REACT_APP_BASE_URL,
	// timeout: 10000
});

const requestHandler = (request) => {
	// Token will be dynamic so we can use any app-specific way to always
	// fetch the new token before making the call
	const token = localStorage.getItem('token');

	request.headers['authorization'] = token;

	return request;
};

const responseHandler = (response) => {
	return response.data;
};

const errorHandler = (error) => {
	if (error.response.status === 401) {
		window.location.href = '/login';
	}
	return Promise.reject(error);
};

API.interceptors.request.use(
	(request) => requestHandler(request),
	(error) => errorHandler(error)
);

API.interceptors.response.use(
	(response) => responseHandler(response),
	(error) => errorHandler(error)
);

export default API;
