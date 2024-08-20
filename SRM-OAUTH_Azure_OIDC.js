
const clientId = vc.variables["client_id"];
const tokenURL = "https://login.microsoftonline.com/"+ vc.variables["entra_tenant"] +"/oauth2/token"
const grantType = "client_credentials";
const secret = vc.variables["client_secret"];
var resource = vc.variables["resource"];
var bearerToken = null;


function run() {

    if (bearerToken === null) {
        let tokenRequest = createTokenRequest();
        bearerToken = fetchToken(tokenRequest)
    }

    updateRequestHeaders(bearerToken);
}

function createTokenRequest() {


    let tokenRequest = httpClient.createRequest(tokenURL);
    tokenRequest.addHeader("content-type", "application/x-www-form-urlencoded");
    tokenRequest.setBody("grant_type=" + grantType + "&client_id=" + clientId + "&client_secret=" + secret + "&resource=" + resource);
    tokenRequest.setMethod("POST");

    return tokenRequest;
}

function fetchToken(tokenRequest) {
    let response = tokenRequest.send();
    let message = response.asString();
    let parsedBearerToken = JSON.parse(message).access_token;

    return parsedBearerToken;
}

function updateRequestHeaders(token) {
    request.addHeader("authorization", "Bearer " + token);
    request.addHeader("client_id", clientId);
}
