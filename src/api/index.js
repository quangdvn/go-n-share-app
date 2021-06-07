import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const reqConfig = (token = '') => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  if (token !== '') {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
};

export const gnsTripApi = axios.create({
  baseURL: 'https://www.gns.quangdvn.me/api/trip/',
});

export const gnsDriverApi = axios.create({
  baseURL: 'https://www.gns.quangdvn.me/api/driver/',
});

export const gnsAuthApi = axios.create({
  baseURL: 'https://www.gns.quangdvn.me/api/auth/',
});

export const weMapApi = axios.create({
  baseURL:
    'https://apis.wemap.asia/geocode-1/search?key=JsKGJWHJJxxENLWZGIBNOyTLPC&text=Bến xe mỹ đình&boundary.gid=18470000&size=1',
});
