const Preferences = {
    FPS : 0 // we can add more as needed
};
Object.freeze(Preferences);

function preferenceToString(s){
    line = "";
    switch (s) {
        case Preferences.FPS:
            line = "FPS";
            break;
        default:
            line = "unknown"
    }
    return line;
}

function stringToPreference(s) {
    switch (s){
        case "FPS":
            return Preferences.FPS;
    }
    return undefined;
}

class user{
    constructor(CookieData=""){
        this.username = "";
        this.steamuser = "";
        this.steampassword = "";
        this.preferences = new Array();
        if (CookieData !== "") {
            let dataAtDots = CookieData.split(".");
            this.username = dataAtDots[0].split(":")[1];
            this.steamuser = dataAtDots[1].split(":")[1];
            this.steampassword = dataAtDots[2].split(":")[1];
            let preferenceData = dataAtDots[3].split(":")[1].split("|");
            for(i = 0;i<preferenceData.length-1;i++){
                this.preferences.push(stringToPreference(preferenceData[i]));
            }
        }
    }
}

function openUserCookie(password){
    cookie = Cookies.get("User");
    data = sjcl.decrypt(password,cookie);
    newUser = new user(data);
    return newUser;
}

function writeUserCookie(password, userAccount) {
    dataString = "";
    dataString += "username:"+userAccount.username;
    dataString += ".steamuser:"+userAccount.steamuser;
    dataString += ".steampassword:"+userAccount.steampassword+".preferences:";
    for(i = 0;i<userAccount.preferences.length;++i){
        s = preferenceToString(userAccount.preferences[i]);
        dataString += s+"|";
    }
    dataString = sjcl.encrypt(password,dataString);
    Cookies.set('User', dataString, { expires: 9999 });
}

function testUserCookie() {
    let u = new user();
    u.preferences.push(Preferences.FPS);
    u.username = "HI";
    writeUserCookie("",u);
}