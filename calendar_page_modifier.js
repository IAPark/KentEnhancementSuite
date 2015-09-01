/// <reference path="typings/jquery/jquery.d.ts" />
/// <reference path="typings/chrome/chrome.d.ts" />
chrome.runtime.sendMessage("authorize", function (token) {
    console.log("got responce");
    console.log(token);
});
function on_auth_result(result) {
    if (!result || result.error) {
        return;
        console.log(result);
    }
    var table = $(".datadisplaytable").find("tbody");
    var rows = table.find("tr");
    var top = rows.eq(0);
    top.append("<td class=\"dddefault\" style=\"background-color:tan;border:tan solid 1px;font-size:-1\"><b>Add</b></td>");
    rows.each(function (index, row) {
        if (index % 2 != 0) {
            var boxes = $(row).find("td");
            var location = boxes[6].innerHTML.replace(/&nbsp;/g, '');
            var days = boxes[7].innerHTML.replace(/&nbsp;/g, '');
            var time = boxes[8].innerHTML.replace(/&nbsp;/g, '');
            var date_range = boxes[11].innerHTML.replace(/&nbsp;/g, '');
            var title = boxes[3].innerHTML.replace(/&nbsp;/g, '');
            console.log(title + " " + location + " " + days + " " + +" " + time + " " + +" " + " " + date_range + " " + title);
            $(row).append("<td class=\"dddefault\" style=\"border:tan solid 1px;\">" +
                add_event_button(title, location, days, time, date_range) +
                "</td>");
        }
    });
}
function add_event_button(title, location, days, time, date_range) {
    if (days === "<abbr title=\"To Be Announced\">TBA</abbr>") {
        return "~~";
    }
    title = to_title(title);
    var days_of_week = "";
    for (var i = 0; i < days.length; ++i) {
        switch (days[i]) {
            case ("M"):
                days_of_week.concat("MO,");
                break;
            case ("T"):
                days_of_week.concat("TU,");
                break;
            case ("W"):
                days_of_week.concat("WE,");
                break;
            case ("R"):
                days_of_week.concat("TH,");
                break;
            case ("F"):
                days_of_week.concat("FR,");
                break;
            default:
                console.error(days[i] + " is not a recognized day");
                break;
        }
    }
    var start_stop = time.split("-");
    var start = start_stop[0].trim();
    var stop = start_stop[1].trim();
    var date_start_end = date_range.split("-");
    var date_start = date_start_end[0].trim();
    var date_end = date_start_end[1].trim();
    return "\n    <div title=\"Add to Calendar\" class=\"addthisevent\">\n        Add\n        <span class=\"start\">09/14/2015 08:00 AM</span>\n        <span class=\"end\">09/14/2015 10:00 AM</span>\n        <span class=\"timezone\">America/New_York</span>\n        <span class=\"title\">Summary of the event</span>\n        <span class=\"description\">Description of the event</span>\n        <span class=\"location\">Location of the event</span>\n        <span class=\"date_format\">MM/DD/YYYY</span>\n    </div>\n    ";
}
function to_title(title) {
    var words = title.toLowerCase().split(' ');
    words = words.map(function (word, i) {
        if (word.length > 3) {
            word = word[0].toUpperCase() + word.substring(1);
        }
        else if (i == 0) {
            word = word[0].toUpperCase() + word.substring(1);
        }
        return word;
    });
    return words.join(" ");
}
//# sourceMappingURL=calendar_page_modifier.js.map