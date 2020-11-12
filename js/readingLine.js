// document.body.onkeyup = function(e){
//     if(e.keyCode == 32){
//         showRL();
//     }
// };

var RLshow = false;

function showRL() {
    RLshow = !RLshow;

    var line = document.getElementById("readingline");
    if(RLshow) {
        line.classList.remove("hidden");
    } else {
        line.classList.add("hidden");
    }
}