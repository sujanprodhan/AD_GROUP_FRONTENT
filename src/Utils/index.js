import axios from "axios";

var API = axios.create({
//	baseURL: process.env.API_URL + '/',
	baseURL: 'https://jsonplaceholder.typicode.com/',
	headers: {
		'Authorization': '1234',
		'Content-Type': 'application/json',
	//	'Content-Type': 'application/x-www-form-urlencoded',
		'Accept': 'application/json',
	}
})

export { API }