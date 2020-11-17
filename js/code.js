var nextUrl = "";

$(document).ready(function() {
    search();
    getGenres();
});

// window.onscroll = function(ev) {
//     if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
//         getNext();
//     }
// };

function createCards(data) {
    for(var i=0;i<data.results.length;++i) {
        createCard(data.results[i]);
    }
}

function createCard(data) {
    var card = document.createElement("DIV");
    card.className = "card";

    var cardfront = document.createElement("DIV");
    cardfront.className = "cardfront";
    var cardback = document.createElement("DIV");
    cardback.className = "cardback";

    var cardYT = document.createElement("DIV");
    cardYT.className = "youtube";
    var cardT = document.createElement("DIV");
    cardT.className = "twitch";

    var img = document.createElement("IMG");
    img.src = data.background_image;
    img.onclick = function() {
        window.open(data.stores[0].url_en, "_blank");
    }

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


    //Back of the card
    var flipped = false;

    card.addEventListener("click", 
    function() {
        card.classList.toggle("isflipped");
        //checks to see if the card as been flipped before, if not search twitch and youtube
        if(flipped == false){ 
            //getting youtube and twitch data
            getYoutube(data.name, cardYT);
            getTwitch(data.name, cardT);
            flipped = true;
        }
    });

    cardback.appendChild(cardYT);
    cardback.appendChild(cardT);

    card.appendChild(cardfront);
    card.appendChild(cardback);

    var body = document.getElementById("recBody");
    body.appendChild(card);
}

function search() {
    var search, url, genre, name;

    name = $("#name").val();
    genre = $("#genre").val();
    console.log(name);
    console.log(genre);
    url = 'https://api.rawg.io/api/games';

    var dat = 'page_size=3;';
    if(name != '') {
        dat += 'search='+name+';';
    }
    if(genre != '') {
        dat += 'genres='+String(genre).toLowerCase()+';';
    }

    $.ajax({
    method:'GET',
    url:url,
    data : dat,
    success:function(data){
        console.log(data)
        createCards(data)

        nextUrl = data.next;
    }
    });
}

function getNext() {
    var search, url, genre, name;

    name = $("#name").val();
    genre = $("#genre").val();
    console.log(name);
    console.log(genre);
    url = nextUrl;

    $.ajax({
    method:'GET',
    url:url,
    success:function(data){
        console.log(data)
        createCards(data)

        nextUrl = data.next;
    }
    });
}

function newSearch() {
    var body = document.getElementById("recBody");
    body.innerHTML = '';

    search();
}

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

var YTindex = 0, Tindex = 0;

function incYTIndex(inc) {
    YTindex += inc;

    // wrap around
    if(YTindex == 5)
        YTindex = 0;

    var container = document.getElementById("ytcontainer");
    container.style.left = (-395*YTindex)+"px";

    console.log(container.style.left);
}

function incTIndex(inc) {
    Tindex += inc;

    var container = document.getElementById("tcontainer");
    container.style.left = (-395*Tindex)+"px";

    console.log(container.style.left);
}


//--------------------------------------------------------------------------------------------


//This function called the youtube api and updates the back of the card with youtube videos of the game
// inputs:
// name - name of the game
// container - used to update the back of the card with youtube videos
function getYoutube(name, container){
    API_KEY = "AIzaSyBcjlVIXezOVg54hV7_ZWrksbgg3Q1kjDE",
    url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&part=snippet&maxResults=5&type=video&q=${name}`;
    $.ajax({
        method:'GET',
        url:url,
        success:function(data){
            console.log(data)
            //Display youtube data
            var videocontainer = document.createElement("DIV");
            videocontainer.className = "vidcontainer";
            videocontainer.id = "ytcontainer";
            for(var i = 0; i < data.items.length; i++){
                // setting the limit if there isn't already
                if(i == 5)
                    break;
                var video = document.createElement("IFRAME");
                video.src = `http://www.youtube.com/embed/${data.items[i].id.videoId}`;
                videocontainer.appendChild(video);
            }
            container.appendChild(videocontainer);

            //Left button
            var btnLeft = document.createElement("A");
            btnLeft.className = "btn left";
            btnLeft.onclick = "incYTIndex(1)";
            var fasL = document.createElement("I");
            fasL.className = "fas fa-arrow-left";
            btnLeft.appendChild(fasL);
            container.appendChild(btnLeft);

            //Right button
            var btnRight = document.createElement("A");
            btnRight.className = "btn right";
            btnRight.onclick = "incYTIndex(-1)";
            var fasR = document.createElement("I");
            fasR.className = "fas fa-arrow-right";
            btnRight.appendChild(fasR);
            container.appendChild(btnRight);
        }
    });
}

//This function called the twitch api and updates the back of the card with twitch streams of the game
// inputs:
// name - name of the game
// container - used to update the back of the card with twitch streams
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
            if(data.streams.length != 0){ //check to see if there are streams
                var streamcontainer = document.createElement("DIV");
                streamcontainer.className = "strcontainer";
                streamcontainer.id = "tcontainer";
                for(var i = 0; i < data.streams.length; i++){
                    //setting the limit
                    if(i == 5)
                        break;
                    //check if stream game and the game name match because are some that don't
                    if(data.streams[i].game == name){
                        var stream = document.createElement("IMG");
                        // For charity streams???
                        // checks to see the title of streams includes charity
                        // if(data.streams[i].channel.status.includes("charity"))
                        //     stream.className = "charity";
                        stream.src = data.streams[i].preview.large;
                        streamcontainer.appendChild(stream);
                    }  
                }
                container.appendChild(streamcontainer);

                /*
                //Left button
                var btnLeft = document.createElement("A");
                btnLeft.className = "btn left";
                btnLeft.onclick = "incTIndex(1)";
                var fasL = document.createElement("I");
                fasL.className = "fas fa-arrow-left";
                btnLeft.appendChild(fasL);
                container.appendChild(btnLeft);

                //Right button
                var btnRight = document.createElement("A");
                btnRight.className = "btn right";
                btnRight.onclick = "incTIndex(-1)";
                var fasR = document.createElement("I");
                fasR.className = "fas fa-arrow-right";
                btnRight.appendChild(fasR);
                container.appendChild(btnRight);
                */
            }
            else{ //if no streams avalible
                container.appendChild("No streams :(");
            }
        }
    });
}



