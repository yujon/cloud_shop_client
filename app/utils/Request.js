import {SERVER} from '../constants/common.js';

export const request = (url, method,headers={}, body=null) => {
  let isOk;
  return new Promise((resolve, reject) => {
    let json = {
      method,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Accept': 'application/json',
        ...headers
      }
    };
    if(body){
      json['body'] = body;
    }
    fetch(SERVER + url, json)
      .then((response) => {
        if (response.ok) {
          isOk = true;
        } else {
          isOk = false;
        }
        return response.json();
      })
      .then((responseData) => {
        console.log('return:---------------')
        console.log(responseData)
        if (isOk) {
          resolve(responseData);
        } else {
          reject(responseData);
        }
      })
      .catch((error) => {
        console.log('error:------------------')
        console.log(error)
        reject(error);
      });
  });
};

