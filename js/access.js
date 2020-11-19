var manmode = false;

function setmanmode(mode) {
    manmode = mode;
}

function changeStyle() {
    manmode = !manmode;
    var header_bg, header_title, header_title_highlight, navlink_color, landing_sub, border_upper, border_lower;
    if(!manmode) {
        header_bg = "rgb(0, 41, 107)";
        header_title = "rgb(253, 197, 0)";
        header_title_highlight = "rgb(226, 177, 1)";
        navlink_color = "rgb(146, 190, 226)";
        landing_sub = "rgb(136, 183, 223)";
        border_upper = "rgb(0, 25, 61)";
        border_lower = "rgb(23, 67, 128)";
    } 
    else {
        header_bg = "#500000";
        header_title = "#a7a7a7";
        header_title_highlight = "#707070";
        navlink_color = "#d1d1d1";
        landing_sub = "#c4c4c4";
        border_upper = "#400000";
        border_lower = "#900000";
    }

    document.documentElement.style.setProperty("--header-bg-color", header_bg);
    document.documentElement.style.setProperty("--header-title-color", header_title);
    document.documentElement.style.setProperty("--header-title-highlight-color", header_title_highlight);
    document.documentElement.style.setProperty("--navlink-color", navlink_color);
    document.documentElement.style.setProperty("--landingPage-sub-color", landing_sub);
    document.documentElement.style.setProperty("--border-upper", border_upper);
    document.documentElement.style.setProperty("--border-lower", border_lower);


    // for(var i=0; i<document.styleSheets.length; ++i) {
    //     var sheet = document.styleSheets[i];
        
    //     sheet.
    // }
}