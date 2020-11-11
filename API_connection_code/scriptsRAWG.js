var access,
API_KEY = "6e35f50792dd455188ca874fe3828c13"

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
    url = 'https://api.rawg.io/api/games'

    $.ajax({
      method:'GET',
      url:url,
      data : `search "${search}"; fields *;`,
      beforeSend:function(){
        $("#btn").attr("disabled", true)
        $("#search").val("")
      },
      success:function(data){
        console.log(data)
        $("#btn").attr("disabled", false)
        // displayVideos(data)
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
