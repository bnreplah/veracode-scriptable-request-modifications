//const clientId = vc.variables['client_id']; //using scanner variables so the script can be used as a template, replace these scanner variables with hardcoded values otherwise
const authUrl = vc.variables['auth_url'];;
const username = vc.variables['username'];
const password = vc.variables['password'];

var bearerToken = null;


function run() {// The run function is run every time before every single request

    if (bearerToken === null) {// on the initial request or when the token expires
        let tokenRequest = createTokenRequest();// makes the initial request to get the token
        bearerToken = fetchToken(tokenRequest);//sends the request and fetches the response
    }

    updateRequestHeaders(bearerToken); // passes either the previous token that was set or the recent token to be parsed to be passed
}

function createTokenRequest() {
   

    let tokenRequest = httpClient.createRequest(authUrl);
    //tokenRequest.addHeader("X-IBM-Client-Id", clientId);//add any additional headers that are needed 
    tokenRequest.addHeader("Authorization", "Basic " + encodeCredentials(username, password));
    tokenRequest.setMethod("GET");

    return tokenRequest;
}

function fetchToken(tokenRequest) {//extracts the token from the response of the body and then returns it
    let response = tokenRequest.send();//sends the request and gets the object response back
    let body = response.asString();
    let parsedBearerToken = JSON.parse(body).access_token;

    return parsedBearerToken;
}

function updateRequestHeaders(token) {
    request.addHeader("authorization", "Bearer " + token);
    
    //request.addHeader("client_id", clientId);
}

function encodeCredentials(username, password) {
    return CryptoJS.enc.Base64.parse(username + ":" + password);
}
