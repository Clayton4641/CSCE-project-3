var nextUrl = "";

window.onscroll = function(ev) {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        getNext();
    }
};

function createCards(data) {
    for(var i=0;i<data.results.length;++i) {
        createCard(data.results[i]);
    }
}

function createCard(data) {
    var card = document.createElement("DIV");
    card.className = "card";

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

    card.appendChild(img);
    card.appendChild(platforms);
    card.appendChild(title);
    card.appendChild(genre);

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

    var dat = 'page_size=40;';
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

function topGames(){
    let url = "https://api.rawg.io/api/games?dates=";
    var m = new Date();
    var year = m.getUTCFullYear();
    var month = (m.getUTCMonth()+1);
    var day = m.getUTCDate();
    var dateString = m.getUTCFullYear() +"-"+ (m.getUTCMonth()+1) +"-"+ m.getUTCDate();

    url += year +"-"+ month +"-"+ (day-1) +","+ year +"-"+ month +"-"+ (day) + "&ordering=-added";

    $.ajax({
    method:'GET',
    url:url,
    data : "page_size=5;",
    success:function(data){
        console.log(data)
        createCards(data)

        nextUrl = data.next;
    }
    });
}