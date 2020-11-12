// script needs cookie-js
// to import use: <script src="https://cdn.jsdelivr.net/npm/js-cookie@rc/dist/js.cookie.min.js"></script>

// Makes basic Accessibility cookie
function makeAccessibilityCookie(){
    var colorBlind = "colorblind:no";
    var visionImpairment = "visionimpairment:no";
    var data = colorBlind + "." + visionImpairment;
    Cookies.set('Accessibility', data, { expires: 9999 });
}

// Method to make an accessibility cookie
// Input: Bool for colorblindness, Bool for vision impairment
function makeAccessibilityCookie(colorBlindOption, visionImpairmentOption){
    var colorBlind = "colorblind:";
    if (colorBlindOption){
        colorBlind += "yes";
    } else {
        colorBlind += "no";
    }

    var visionImpairment = "visionimpairment:";
    if (visionImpairmentOption){
        visionImpairment += "yes";
    } else {
        visionImpairment += "no";
    }

    var data = colorBlind + "." + visionImpairment;
    Cookies.set('Accessibility', data, { expires: 9999 });
}

// Makes a Accessibility cookie only if one does not already exist
function makeAccessibilityIfNotExist(){
    var cookieMade = Cookies.get("Accessibility");

    if (cookieMade === undefined){
        makeAccessibilityCookie();
    }
}

// Method that returns the accessibility cookie
// NOTE: undefined is returned if the cookie is not made and the method is set to not make a new cookie on failed existence (default)
// Input: A bool tell to make a new cookie if one is not found
// returns an all the data in the accessibility cookie
function getAccessibilityCookie(makeCookie = false){
    var cookieMade = Cookies.get("Accessibility");

    if (cookieMade === undefined && makeCookie){
        makeAccessibilityCookie();
        cookieMade = Cookies.get("Accessibility");
    }

    return cookieMade;
}

// Method that returns the accessibility cookie
// NOTE: undefined is returned if the cookie is not made and the method is set to not make a new cookie on failed existence (default)
// Input: A bool tell to make a new cookie if one is not found
// returns an array of the cookies values
function getAccessibilityCookieValues(makeCookie = false){
    var cookieMade = Cookies.get("Accessibility");

    if (cookieMade === undefined && !makeCookie){
        return undefined;
    } else if (cookieMade === undefined && makeCookie){
        makeAccessibilityCookie();
        cookieMade = Cookies.get("Accessibility");
    }

    return cookieMade.split(".");
}

// Removes the Accessibility cookie
function removeAccessibilityCookie(){
    Cookies.remove("Accessibility");
}