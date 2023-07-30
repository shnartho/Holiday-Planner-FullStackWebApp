
const MINIKUBE_IP = process.env.MINIKUBE_IP || 'localhost';
const MINIKUBE_PORT = process.env.MINIKUBE_PORT || '8000';

const BASE_URL = `http://${MINIKUBE_IP}:${MINIKUBE_PORT}`;


export const REGISTER_URL = `${BASE_URL}/authentication/api/v1/user/signup/`;

export const LOGIN_URL = `${BASE_URL}/authentication/api/v1/user/login/`;

export const LOGOUT_URL = `${BASE_URL}/authentication/api/v1/user/logout/`;

export const GET_MYSELF_DATA_URL = `${BASE_URL}/authentication/api/v1/user/myself_data/`;

export const BOOKING_URL = `${BASE_URL}/booking/api/v1/booking/`;



