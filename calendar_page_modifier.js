/// <reference path="typings/jquery/jquery.d.ts" />
/// <reference path="typings/chrome/chrome.d.ts" />
$(function () {
    var table = $(".datadisplaytable").find("tbody");
    var rows = table.find("tr");
    var top = rows.eq(0);
    top.append("<td class=\"dddefault\" style=\"background-color:tan;border:tan solid 1px;font-size:-1\"><b>Calendar</b></td>");
    rows.each(function (index, row) {
        if (index % 2 != 0) {
            var boxes = $(row).find("td");
            var location = boxes[6].innerHTML.replace(/&nbsp;/g, '');
            var days = boxes[7].innerHTML.replace(/&nbsp;/g, '');
            var time = boxes[8].innerHTML.replace(/&nbsp;/g, '');
            var date_range = boxes[11].innerHTML.replace(/&nbsp;/g, '');
            var title = boxes[3].innerHTML.replace(/&nbsp;/g, '');
            add_event_button(title, location, days, time, date_range, $(row));
        }
    });
});
function add_event_button(title, location, days, time, date_range, row) {
    if (days === "<abbr title=\"To Be Announced\">TBA</abbr>") {
        row.append("<td class=\"dddefault\" style=\"border:tan solid 1px;\">\n                ---\n            </td>");
        return;
    }
    title = to_title(title);
    var days_of_week = "";
    for (var i = 0; i < days.length; ++i) {
        switch (days[i]) {
            case ("M"):
                days_of_week = days_of_week.concat("MO,");
                break;
            case ("T"):
                days_of_week = days_of_week.concat("TU,");
                break;
            case ("W"):
                days_of_week = days_of_week.concat("WE,");
                break;
            case ("R"):
                days_of_week = days_of_week.concat("TH,");
                break;
            case ("F"):
                days_of_week = days_of_week.concat("FR,");
                break;
            default:
                console.error(days[i] + " is not a recognized day");
                break;
        }
    }
    var date_start_end = date_range.split("-");
    var date_start = date_start_end[0].trim();
    var date_end = date_start_end[1].trim();
    var start_stop = time.split("-");
    var start = new Date(date_start + " " + start_stop[0].trim());
    var stop = new Date(date_start + " " + start_stop[1].trim());
    var days_lookup = ['S', 'M', 'T', 'W', 'R', 'F', 'S'];
    while (days_lookup[start.getDay()] != days[0]) {
        start.setDate(start.getDate() + 1);
        stop.setDate(stop.getDate() + 1);
    }
    row.append("<td class=\"dddefault\" style=\"border:tan solid 1px;\">\n            <a href=\"javascript:void(0)\">Add to Calendar</a>\n         </td>");
    row.find("td").last().click(function () {
        add_event(title, location, days_of_week, start, stop, new Date(date_end));
    });
}
function add_event(title, location, days, start, end, date_end) {
    chrome.runtime.sendMessage("authorize", function (token) {
        $.ajax({
            type: "POST",
            url: "https://www.googleapis.com/calendar/v3/calendars/primary/events",
            beforeSend: function (xhr) { return xhr.setRequestHeader('Authorization', 'Bearer ' + token); },
            data: JSON.stringify({
                "summary": title,
                "location": location,
                "start": {
                    "dateTime": start.toISOString(),
                    "timeZone": "America/New_York"
                },
                "end": {
                    "dateTime": end.toISOString(),
                    "timeZone": "America/New_York"
                },
                "recurrence": [
                    " RRULE:FREQ=WEEKLY;WKST=SU;BYDAY=" + days + ";UNTIL=" +
                        to_string_with_digits(date_end.getFullYear(), 4) +
                        to_string_with_digits(date_end.getMonth(), 2) +
                        to_string_with_digits(date_end.getDay(), 2) + "T000000Z"
                ]
            }),
            processData: false,
            contentType: 'application/json',
            success: function (data) { return window.alert(title + " added to calendar"); }
        });
    });
}
function to_string_with_digits(to_string, digits) {
    var zeroes = "";
    for (var i = 0; i < digits; i++) {
        zeroes = zeroes.concat("0");
    }
    return (zeroes + to_string).slice(-digits);
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