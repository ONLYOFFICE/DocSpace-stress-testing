import http from 'k6/http';
import { basePath, wizardData, authData, wizardComplete, authentication, setParams } from './index.js';

export function auth() {
    let url = `${basePath}settings?withPassword=true`;
    let params = {
      headers: {
        'Content-Type': 'application/json',
      }
    };
  
    let res = http.get(url, params).json().response;
  
    if(res.wizardToken) {
      url = wizardComplete;
      params = {
        headers: {
          'Content-Type': 'application/json',
          'confirm': `${res.wizardToken}`
        }
      };
      const payload = JSON.stringify(wizardData);
  
      res = http.put(url, payload, params);
      return res.cookies.asc_auth_key[0].value;
    }
  
    url = authentication;
    params = setParams(null);
    const payload = JSON.stringify(authData);
  
    res = http.post(url, payload, params).json().response.token;
    return res;
  }