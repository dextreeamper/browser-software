/**
 * Created by dennismacbookpro on 29/07/2017.
 *
 * This library is used for HTTP Client request.
 */

// request ofbject.
const request = {};

/**
 * Function for sending a get request to the server
 *
 * @param {string} URL
 * @returns {promise}
 */
request.get = (URL) => {
    return new Promise((resolve, reject) => {
        // we will create an instance of the XMLHttpRequest constructor.
        const http = new XMLHttpRequest();
        // this is an event handler is called whenever the readystatechante event is triggered.
        // the callback function is executed when this handler is called.
        http.onreadystatechange = function(){
            // we will check if the state of the request is done and the response status of the server is 200
            // readyState property returns the state of the request
            if(http.readyState === XMLHttpRequest.DONE && http.status === 200) {
                resolve(JSON.parse(this.responseText));
            }
            else if(http.readyState === XMLHttpRequest.DONE && http.status !== 200){
                reject(JSON.parse(this.responseText));
            }
        };
        // initialize a request
        http.open('GET', URL);
        // send the request.
        http.send();
    });
};


export default request;
