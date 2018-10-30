import React, { Component } from 'react';
import fetch from 'cross-fetch';
import API_URL from '../API';

function login(user) {
    var postObject = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    };


    return fetch(API_URL + '/auth/login', postObject)
        .then(responseData => {
            if (responseData.status >= 400) {
                throw new Error(responseData.statusText);
            }
            return responseData.json(); // This is a MUST, do not remove.
        })
        .then(data => {
            return data;
        })
        .catch(err => {
            throw new Error(err);
        });
}
export const loginService = {
    login
}