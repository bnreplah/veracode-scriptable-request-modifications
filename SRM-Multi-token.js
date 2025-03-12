//const clientId = vc.variables['client_id']; //using scanner variables so the script can be used as a template, replace these scanner variables with hardcoded values otherwise
const username = vc.variables['username'];
const password = vc.variables['password'];
const token1 = vc.variables['user_token'];
const token2 = vc.variables['admin_token'];

function run() {// The run function is run every time before every single request
   if(request.uri == '/admin'){
    //admin specific actions
     request.setHeader('token',token2);
   }
  if (request.uri == '/user'){
    //user specific actions
     request.setHeader('token',token2);
  }
  
  updateRequestHeaders(encodeCredentials(username, password));
}


function updateRequestHeaders(token) {
    request.addHeader("Authorization", "Basic " + token);
}

function encodeCredentials(username, password) {
    return CryptoJS.enc.Base64.parse(username + ":" + password);
}
