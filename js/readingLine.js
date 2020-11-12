// document.body.onkeyup = function(e){
//     if(e.keyCode == 32){
//         showRL();
//     }
// };

var RLshow = false;

$(document).ready(function() {
    var x = document.cookie;
    console.log(x);
    if(!x.includes("firstVisit=true")) {
        var survey = document.getElementById("survey");
        survey.classList.remove("hidden");
    }
});

function showRL() {
    RLshow = !RLshow;

    var line = document.getElementById("readingline");
    if(RLshow) {
        line.classList.remove("hidden");
    } else {
        line.classList.add("hidden");
    }
}

function hideSurvey() {
    var survey = document.getElementById("survey");
    survey.classList.add("hidden");

    document.cookie = "firstVisit=true;";
}