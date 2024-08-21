const clientId = vc.variables['client_id'];
//const clientSecret = vc.variables['client_secret'];
//const requestId = vc.variables['request_id'];// include when needed
const tokenUrl = vc.variables['token_url'];
const username = vc.variables['username'];
const password = vc.variables['password'];
const grantType = "password";//set the appropriate grant type for the passed values

var bearerToken = null;

function run() {
    // Check if the the bearer token has already been fetched
    if (bearerToken === null) {
        let tokenRequest = createTokenRequest();
        bearerToken = fetchToken(tokenRequest)
    }

    // Update the target URL request with authentication headers
    updateRequestHeaders(bearerToken);
}

function createTokenRequest() {
 

    let tokenRequest = httpClient.createRequest(tokenUrl);
    tokenRequest.addHeader("content-type", "application/x-www-form-urlencoded");//make sure the encoding matches that which is required by the API
    tokenRequest.setBody("grant_type=" + grantType + "&client_id=" + clientId + "&username=" + username + "&password=" + password);
    tokenRequest.setMethod("POST");

    return tokenRequest;
}

function fetchToken(tokenRequest) {
    let response = tokenRequest.send();
    let body = response.asString();
    let parsedBearerToken = JSON.parse(body).access_token;

    return parsedBearerToken;
}

function updateRequestHeaders(token) {
    request.addHeader("authorization", "Bearer " + token);
    //request.addHeader("client_id", clientId); //if needed to pass in a header pass here
    //request.addHeader("client_secret", clientSecret);
    //request.addHeader("X-Request-Id", requestId);
}
