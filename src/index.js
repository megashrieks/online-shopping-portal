import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./buttons.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import axios from "axios";
import { getToken } from "./components/utils/token";
axios.baseURL = "http://localhost:5000";
axios.interceptors.request.use(
	config => {
		config.headers.token = getToken();
		return config;
	},
	err => Promise.reject(err)
);
ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
