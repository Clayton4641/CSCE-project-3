$(document).ready(function() {
    topGames();
});

var degOffset = 0, degInc = 72, dist = 34;

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
        "macOS": 0,
        "Web": 0
    };

    var iconDict = {
        "PC": "fab fa-windows",
        "Xbox": "fab fa-xbox",
        "PlayStation": "fab fa-playstation",
        "Nintendo": "fas fa-gamepad",
        "macOS": "fab fa-apple",
        "Web": "fab fa-internet-explorer"
    }

    console.log(data.name);

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

    card.addEventListener("click", 
    function() {
        card.classList.toggle("isflipped");
        // console.log("HI");
        // alert("HI");
    });

    card.appendChild(cardfront);
    card.appendChild(cardback);

    // card.style.transform = "translate3d(" + "000px" + ",0,0) rotateY(" + 0 + "deg)";
    // card.style.position = "absolute";
    degOffset += degInc;

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

    url += year +"-"+ month +"-01,"+ year +"-"+ month +"-"+ (day-1) + "&ordering=-added";
    // console.log(url);
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
    scroll(1);
}

function subIndex() {
    scroll(-1);
}

var scrollOffset = 10;

function scroll(a){
    scrollIndex += a;
    if(scrollIndex < 0) 
        scrollIndex = 0;
    if(scrollIndex > 4)
        scrollIndex = 4;

    var recCont = document.getElementById("topRec");
    recCont.style.transform = "translateX(" + ((-scrollIndex*455)+scrollOffset) + "px)";

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