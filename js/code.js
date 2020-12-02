$(document).ready(function() {
    topGames();
    getGenres();
});

function assignGenres(data) {
    var genreDataList = document.getElementById("genreDataList");
    for(var i=0; i<data.length; ++i) {
        var opt = document.createElement("OPTION");
        opt.value = data[i].name;
        genreDataList.appendChild(opt);
    }
}

function getGenres() {
    url = 'https://api.rawg.io/api/genres';

    $.ajax({
    method:'GET',
    url:url,
    data: 'page_size=40;',
    success:function(data){
        console.log(data)
        assignGenres(data.results)
    }
    });
}

var degOffset = 0, degInc = 72, dist = 34;

function createCards(data) {
    for(var i=0;i<data.results.length;++i) {
        createCard(data.results[i]);
    }
}

function createCard(data) {
    var card = document.createElement("DIV");
    card.className = "card";

    // Create Front of Card

    var cardfront = document.createElement("DIV");
    cardfront.className = "cardfront";
    var cardback = document.createElement("DIV");
    cardback.className = "cardback";

    var img = document.createElement("IMG");
    img.src = data.background_image;
    // img.onclick = function() {
    //     window.open(data.stores[0].url_en, "_blank");
    // }

    var platforms = document.createElement("DIV");
    platforms.className = "platforms"

    var platDict = {
        "PC": 0,
        "Xbox": 0,
        "PlayStation": 0,
        "Nintendo": 0,
        "macOS": 0
    };

    var iconDict = {
        "PC": "fab fa-windows",
        "Xbox": "fab fa-xbox",
        "PlayStation": "fab fa-playstation",
        "Nintendo": "fas fa-gamepad",
        "macOS": "fab fa-apple"
    }

    if(data.platforms) {
        for(var i=0; i<data.platforms.length; ++i) {
            var platIcon = document.createElement("I");

            var n = String(data.platforms[i].platform.name);
            for(var key in platDict) {
                if(n.includes(key) && platDict[key] == 0) {
                    platDict[key] = 1;
                    platIcon.className = iconDict[key];
                    platforms.appendChild(platIcon);
                } 
            }
        }
    }

    var title = document.createElement("A");
    title.className = "title";
    title.innerHTML = data.name;

    var genre = document.createElement("DIV");
    genre.className = "genre";

    for(var i=0; i<3; ++i) {
        if(i >= data.genres.length)
            break;
        var g = document.createElement("A");
        g.className = "genre";
        g.innerHTML = data.genres[i].name;

        genre.appendChild(g);
    }

    cardfront.appendChild(img);
    cardfront.appendChild(platforms);
    cardfront.appendChild(title);
    cardfront.appendChild(genre);

    // Create Back of Card
    // YouTube

    var youtube = document.createElement("DIV");
    youtube.classList.add("youtube");

    var yicon = document.createElement("I");
    yicon.classList.add("fab"); 
    yicon.classList.add("fa-youtube");

    var yvidcontainer = document.createElement("DIV");
    yvidcontainer.classList.add("vidcontainer");

    var leftbtn = document.createElement("A");
    leftbtn.classList.add("btn");
    leftbtn.classList.add("left");
    leftbtn.onclick = function() {incYTIndex(-1, yvidcontainer);};
    
    var leftbtni = document.createElement("I");
    leftbtni.classList.add("fas"); 
    leftbtni.classList.add("fa-arrow-left");

    leftbtn.appendChild(leftbtni);

    var rightbtn = document.createElement("A");
    rightbtn.classList.add("btn");
    rightbtn.classList.add("right");
    rightbtn.onclick = function() {incYTIndex(1, yvidcontainer);};
    
    var rightbtni = document.createElement("I");
    rightbtni.classList.add("fas");
    rightbtni.classList.add("fa-arrow-right");

    rightbtn.appendChild(rightbtni);

    youtube.appendChild(yicon);
    youtube.appendChild(yvidcontainer);
    youtube.appendChild(leftbtn);
    youtube.appendChild(rightbtn);

    cardback.appendChild(youtube);

    // Twitch

    var twitch = document.createElement("DIV");
    twitch.classList.add("twitch");

    var ticon = document.createElement("I");
    ticon.classList.add("fab"); 
    ticon.classList.add("fa-twitch");

    var tvidcontainer = document.createElement("DIV");
    tvidcontainer.classList.add("vidcontainer");

    leftbtn = document.createElement("A");
    leftbtn.classList.add("btn");
    leftbtn.classList.add("left");
    leftbtn.onclick = function() {incTIndex(-1, tvidcontainer);};
    
    leftbtni = document.createElement("I");
    leftbtni.classList.add("fas");
    leftbtni.classList.add("fa-arrow-left");

    leftbtn.appendChild(leftbtni);

    rightbtn = document.createElement("A");
    rightbtn.classList.add("btn");
    rightbtn.classList.add("right");
    rightbtn.onclick = function() {incTIndex(1, tvidcontainer);};
    
    rightbtni = document.createElement("I");
    rightbtni.classList.add("fas");
    rightbtni.classList.add("fa-arrow-right");

    rightbtn.appendChild(rightbtni);


    twitch.appendChild(ticon);
    twitch.appendChild(tvidcontainer);
    twitch.appendChild(leftbtn);
    twitch.appendChild(rightbtn);

    cardback.appendChild(twitch);

    // Create Hover
    var firstFlip = false;
    var i = 0, offset = 20;
    var hover = document.createElement("DIV");
    hover.classList.add("cardhover");
    hover.onmouseover = function() {
        card.style.transform = "rotateY("+((180*i)+offset)+"deg)";
        if(i%2==0)
            hover.style.right = "-23px";
        else
            hover.style.left = "-23px";
        hover.style.width = "40px";
    };
    hover.onmouseout = function() {
        card.style.transform = "rotateY("+(180*i)+"deg)";
        if(i%2==0)
            hover.style.right = "-15px";
        else
            hover.style.left = "-15px";
        hover.style.width = "30px";
    };
    hover.onclick = function() {
        i++;
        var t = "rotateY("+String(180*i)+"deg)";
        card.style.transform = t;
        if(i%2==0) {
            hover.style.right = "-15px";
            hover.style.left = null;
        } else {
            hover.style.left = "-15px";
            hover.style.right = "0";
        }

        if(!firstFlip) {
            firstFlip = true;
            getYoutube(data.name, yvidcontainer);
            getTwitch(data.name, tvidcontainer);
        }
    }

    card.appendChild(hover);
    card.appendChild(cardfront);
    card.appendChild(cardback);

    var body = document.getElementById("topRec");
    body.appendChild(card);
}

function topGames(){
    let url = "https://api.rawg.io/api/games?dates=";
    var m = new Date();
    var year = m.getUTCFullYear();
    var month = (m.getUTCMonth()+1);
    var day = m.getUTCDate();
    var dateString = m.getUTCFullYear() +"-"+ (m.getUTCMonth()+1) +"-"+ m.getUTCDate();
    var days = day+"";
    if (day < 10){
        days = "0"+days;
    }
    url += year +"-"+ month +"-01,"+ year +"-"+ month +"-"+ days + "&ordering=-added";
    console.log(url);
    $.ajax({
    method:'GET',
    url:url,
    data : "page_size=5;",
    success:function(data){
        console.log(data);
        createCards(data);
    }
    });
}

var scrollIndex = 0;

function addIndex() {
    scroll(-1);
}

function subIndex() {
    scroll(1);
}

var scrollOffset = 0;

function scroll(a){
    scrollIndex += a;
    if(scrollIndex < 0) 
        scrollIndex = 4;
    if(scrollIndex > 4)
        scrollIndex = 0;

    var recCont = document.getElementById("topRec");
    // recCont.style.transform = "translateX(" + ((-scrollIndex*449)+scrollOffset) + "px)";
    recCont.style.left = ((-scrollIndex*454)-3)+"px";

    var btns = document.getElementsByClassName("btn");
    if(scrollIndex == 0){
        btns[1].style.color = "grey";
    } else if (scrollIndex == 4) {
        btns[0].style.color = "grey";
    } else {
        btns[0].style.color = "black";
        btns[1].style.color = "black";
    }
}

var YTindex = 0, Tindex = 0, YTcap = 5, Tcap = 5;

function incYTIndex(inc, container) {
    YTindex += inc;

    if(YTindex >= YTcap) {
        YTindex = 0;
    }
    if(YTindex < 0) {
        YTindex = YTcap-1;
    }

    // var container = document.getElementById("ytcontainer");
    container.style.left = (-390*YTindex)+"px";
}

function incTIndex(inc, container) {
    Tindex += inc;

    if(Tindex >= Tcap) {
        Tindex = 0;
    }
    if(Tindex < 0) {
        Tindex = Tcap-1;
    }

    // var container = document.getElementById("tcontainer");
    container.style.left = (-390*Tindex)+"px";
}

function getYoutube(name, container){
    API_KEY = "AIzaSyBcjlVIXezOVg54hV7_ZWrksbgg3Q1kjDE",
    //API_KEY = "AIzaSyB_RmnmWsqEfJQBPXOFTKRZLUN-MlOzKK4",
    url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&part=snippet&maxResults=5&type=video&q=${name}`;
    $.ajax({
        method:'GET',
        url:url,
        success:function(data){
          console.log(data)
          //Display youtube data
            for(var i = 0; i < data.items.length; i++){
                //setting the limit
                if(i == 5)
                    break;
                var video = document.createElement("IFRAME");
                video.src = `https://www.youtube.com/embed/${data.items[i].id.videoId}`;
                container.appendChild(video);
            }
        }
    });
}

function getTwitch(name, container){
    API_KEY = "24nahn5xlcv8ulpesnf3ux54kun9j3",
    url = `https://api.twitch.tv/kraken/search/streams?first=5&query=${name}`;
    $.ajax({
        method:'GET',
        url:url,
        headers: {
            "Accept": "application/vnd.twitchtv.v5+json",
            "Client-ID": `${API_KEY}`
          },
        success:function(data){
            console.log(data)
            //Display twitch data
            // const streamlink;
            if(data.streams.length != 0){ //check to see if there are streams
                for(var i = 0; i < data.streams.length; i++){
                    //setting the limit
                    if(i == 5)
                        break;
                    const s = data.streams[i];
                    //check if stream game and the game name match because are some that don't
                    if(s.game == name){
                        var stream = document.createElement("IMG");
                        const streamlink = String(s.channel.url).slice();
                        console.log(streamlink);
                        stream.onclick = function() {
                            window.open(streamlink, "_blank");
                        }
                        // For charity streams???
                        // checks to see the title of streams includes charity
                        // if(data.streams[i].channel.status.includes("charity"))
                        //     stream.className = "charity";
                        stream.src = s.preview.large;
                        container.appendChild(stream);
                    }
                }
            }
            else{ //if no streams avalible
                container.appendChild("No streams :(")
            }
        }
    });
}
