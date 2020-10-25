
$(document).ready(function() {

  var search,
  API_KEY = "24nahn5xlcv8ulpesnf3ux54kun9j3",
  url,
  maxResults = 3
  $("#myForm").submit(function(e) {
    e.preventDefault()
    search = $("#search").val()
    url = `https://api.twitch.tv/kraken/search/streams?first=${maxResults}&query=${search}`

    $.ajax({
      method:'GET',
      url:url,
      headers: {
        "Accept": "application/vnd.twitchtv.v5+json",
        "Client-ID": "24nahn5xlcv8ulpesnf3ux54kun9j3"
      },
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
