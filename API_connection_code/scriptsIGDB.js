var access,
API_KEY = "24nahn5xlcv8ulpesnf3ux54kun9j3",
secret = "cidkotg9d1qygv94rhodj9y2192nug"

// //Getting access token for search later
// $.ajax({
//   method:'POST',
//   url:`https://id.twitch.tv/oauth2/token?client_id=${API_KEY}&client_secret=${secret}&grant_type=client_credentials`,
//   success:function(data){
//     console.log(data)
//     access = data.access_token
//     console.log(access)
//   }
// })

//Waits for page to load
$(document).ready(function() {
  var search,
  url,
  maxResults = 3
  $("#myForm").submit(function(e) {
    e.preventDefault()
    search = $("#search").val()
    url = `https://cors-anywhere.herokuapp.com/https://api.igdb.com/v4/games`

    $.ajax({
      method:'POST',
      url:url,
      headers: {
        'Accept': 'application/json',
        'Client-ID': '24nahn5xlcv8ulpesnf3ux54kun9j3',
        'Authorization': 'Bearer cc5zpm2edixp8m4dnkvji2dhrwzfw3',
        "Access-Control-Allow-Origin": "*"
      },
      data : `search "${search}"; fields *;`,
      beforeSend:function(){
        $("#btn").attr("disabled", true)
        $("#search").val("")
      },
      success:function(data){
        console.log(data)
        $("#btn").attr("disabled", false)
        displayVideos(data)
      }
    })

  })
    
    

  function displayVideos(data) {
    $("#table").show()
    var videoData = ""
    // data.games.forEach(game => {
    //   videoData = `
    //   <tr>
    //   <td>
    //   ${game.name}
    //   </td>
    //   <td>
      
    //   </td>
    //   </tr>
    //   `
    // })
    for(var i=0;i<data.length;++i) {
      videoData = `
      <tr>
      <td>
      ${data[i].name}
      </td>
      <td>
      
      </td>
      </tr>
      `
    }
  }

})
