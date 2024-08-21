//const clientId = vc.variables['client_id']; //using scanner variables so the script can be used as a template, replace these scanner variables with hardcoded values otherwise
const username = vc.variables['username'];
const password = vc.variables['password'];


function run() {// The run function is run every time before every single request
  updateRequestHeaders(encodeCredentials(username, password));
}


function updateRequestHeaders(token) {
    request.addHeader("Authorization", "Basic " + token);
}

function encodeCredentials(username, password) {
    return CryptoJS.enc.Base64.parse(username + ":" + password);
}
