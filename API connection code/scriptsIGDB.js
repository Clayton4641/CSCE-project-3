var access,
API_KEY = "24nahn5xlcv8ulpesnf3ux54kun9j3",
secret = "pmnsm8abo19x65daymr3e8qdaye3s4"

//Getting access token for search later
$.ajax({
  method:'POST',
  url:`https://id.twitch.tv/oauth2/token?client_id=${API_KEY}&client_secret=${secret}&grant_type=client_credentials`,
  success:function(data){
    console.log(data)
    access = data.access_token
  }
})

//Waits for page to load
$(document).ready(function() {

  var search,
  url,
  maxResults = 3
  $("#myForm").submit(function(e) {
    e.preventDefault()
    search = $("#search").val()
    url = `https://api.igdb.com/v4/games`

    $.ajax({
      method:'POST',
      url:url,
      headers: {
        'Accept': 'application/json',
        'Client-ID': '24nahn5xlcv8ulpesnf3ux54kun9j3',
        'Authorization': 'Bearer ' + access,
      },
      data : "fields age_ratings,aggregated_rating,aggregated_rating_count,alternative_names,artworks,bundles,category,checksum,collection,cover,created_at,dlcs,expansions,external_games,first_release_date,follows,franchise,franchises,game_engines,game_modes,genres,hypes,involved_companies,keywords,multiplayer_modes,name,parent_game,platforms,player_perspectives,rating,rating_count,release_dates,screenshots,similar_games,slug,standalone_expansions,status,storyline,summary,tags,themes,total_rating,total_rating_count,updated_at,url,version_parent,version_title,videos,websites;",
      beforeSend:function(){
        $("#btn").attr("disabled", true)
        $("#search").val("")
      },
      success:function(data){
        console.log(data)
        $("#btn").attr("disabled", false)
        //displayVideos(data)
      }
    })

  })
    
    

  function displayVideos(data) {
    $("#table").show()
    var videoData = ""
    data.streams.forEach(stream => {
      videoData = `
      <tr>
      <td>
      ${stream.channel.status}
      </td>
      <td>
      <img width = "200" height = "200" src ="${stream.preview.medium}"/>
      </td>
      </tr>
      `
      $("#results").append(videoData)
    })
  }

})
