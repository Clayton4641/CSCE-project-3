
$(document).ready(function() {

  var search,
  API_KEY = "AIzaSyBcjlVIXezOVg54hV7_ZWrksbgg3Q1kjDE",
  url,
  maxResults = 5
  $("#myForm").submit(function(e) {
    e.preventDefault()
    search = $("#search").val()
    url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&part=snippet&maxResults=${maxResults}&type=video&q=${search}`

    $.ajax({
      method:'GET',
      url:url,
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
    data.items.forEach(item => {
      videoData = `
      <tr>
      <td>
      ${item.snippet.title}
      </td>
      <td>
      <img width = "200" height = "200" src ="${item.snippet.thumbnails.high.url}"/>
      </td>
      </tr>
      `
      $("#results").append(videoData)
    })
  }

})
