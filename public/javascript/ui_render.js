var cachedDisplayStyle = {};


function verifySignIn () {
    let loginForm = document.forms['loginForm'];
    let loginEmail = loginForm['login-email'].value;
    let loginPassword = loginForm['login-password'].value;
    console.log( `${loginPassword + loginEmail}` );
}

function signupUser () {
    let signupForm = document.forms['signupForm']
    let signupFirstName = signupForm['signupName'].value;
    let signupLastName = signupForm['signupLastName'].value;
    let signupEmail = signupForm['signupEmail'].value;
    let signupNumber = signupForm['signupNumber'].value;
    let signupPassword = signupForm['signupPassword'].value;
    let signupComfirmPassword = signupForm['signupComfirmpassword'].value;

    console.log( `${signupFirstName + signupEmail + signupLastName + signupNumber +
        signupPassword + signupComfirmPassword}` )
}


/* Set the display of an html element identified by the id or class name passed in as
 * argument. if an arguments contains object. the id field should be the elements id or class
 * and the display property is the type of display. By default an id withoud display is set to
 * block display
 *  */


function getElement ( identifier, attribute ) {
    switch ( attribute ) {
        case "class":
            return document.getElementsByClassName( identifier );
        case "id":
            return document.getElementById( identifier );
        case "tag":
            return document.getElementsByTagName( identifier );
    }
}

function showDashContent ( viewID ) {
    setDisplay( viewID );
}

function toggle (ui) {
  
   let  element = document.getElementById(ui);
   console.log(element.style.display);
    element.style.display = ( element.style.display !== "block" ) ? "block" : "none";
    console.log(element.style.display);
}




