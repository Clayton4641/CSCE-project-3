$(document).ready(function() {
    var search,
    url

    url = 'https://api.rawg.io/api/games'

    $.ajax({
    method:'GET',
    url:url,
    data : `search "${search}"; fields *;`,
    success:function(data){
        console.log(data)
        $("#btn").attr("disabled", false)
        createCards(data)
    }
    })
  
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

        var title = document.createElement("A");
        title.className = "title";
        title.innerHTML = data.name;

        var genre = document.createElement("DIV");
        genre.className = "genre";

        for(var i=0; i<3; ++i) {
            if(i >= data.genres.length)
                break;
            var g1 = document.createElement("A");
            g1.className = "genre";
            g1.innerHTML = data.genres[i].name;

            genre.appendChild(g1);
        }

        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(genre);

        var body = document.getElementById("recBody");
        body.appendChild(card);
    }
  
  })