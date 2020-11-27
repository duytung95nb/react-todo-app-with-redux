
const apiService = {
    get: (url, params) => {
        if(typeof params == 'object') {
            url = url + '?' + new URLSearchParams(params);
        }
        return fetch(url, {
            method: 'GET'
        }).then(res => res.json());
    },
    post: (url, payload, params) => {
        if(typeof params == 'object') {
            url = url + '?' + new URLSearchParams(params);
        }
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }).then(res => res.json())
    },
    delete: (url, params) => {
        if(typeof params == 'object') {
            url = url + '?' + new URLSearchParams(params);
        }
        return fetch(url, {
            method: 'DELETE'
        }).then(res => res.json());
    }
}
export default apiService