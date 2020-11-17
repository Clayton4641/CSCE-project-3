//this script needs: <script src="https://cdn.jsdelivr.net/npm/js-cookie@rc/dist/js.cookie.min.js"></script>

class user{
    constructor(CookieData=""){
        this.name = "";
        this.game = "";
        this.preferences = new Array();
        if (CookieData !== "") {
            let dataAtDots = CookieData.split(".");
            this.name = dataAtDots[0].split(":")[1];
            this.game = dataAtDots[1].split(":")[1];
            let preferenceData = dataAtDots[2].split(":")[1].split("|");
            for(i = 0;i<preferenceData.length-1;i++){
                this.preferences.push((preferenceData[i]));
            }
        }
    }
}

function openUserCookie(){
    cookie = Cookies.get("User");
    newUser = new user();
    if (cookie !== undefined) {
        newUser = new user(cookie);
    }
    return newUser;
}

function writeUserCookie(userAccount) {
    dataString = "";
    dataString += "username:"+userAccount.name;
    dataString += ".game:"+userAccount.game;
    dataString += ".preferences:";
    for(i = 0;i<userAccount.preferences.length;++i){
        s = (userAccount.preferences[i]);
        dataString += s+"|";
    }
    Cookies.set('User', dataString, { expires: 9999 });
}

function cookieFromSurvey() {
    var name = document.getElementById("name").value;
    var game = document.getElementById("favgame").value;
    var genres = document.getElementById("favgenres").value.split(",");

    console.log(name);
    console.log(game);
    console.log(genres);

    var newUser = new user();

    newUser.name = name;
    newUser.game = game;

    for (var i = 0;i<genres.length;i++){
        newUser.preferences.push(genres[i]);
    }

    writeUserCookie(newUser);
}

function testUserCookie() {
    let u = new user();
    u.preferences.push("FPS");
    u.name = "HI";
    writeUserCookie(u);
}