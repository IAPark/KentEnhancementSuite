/// <reference path="typings/jquery/jquery.d.ts" />
$(function () {
    var table = $(".datadisplaytable").find("tbody");
    var rows = table.find("tr");
    var top = rows.eq(0);
    top.prepend("<td class=\"dddefault\" style=\"background-color:tan;border:tan solid 1px;font-size:-1\"><b>Book</b></td>");
    rows.each(function (index, row) {
        if (index % 2 != 0) {
            console.log(row);
            var crn = $(row).find("td")[1].innerHTML;
            var course = crn.split('-');
            console.log(course);
            console.log(crn);
            var department = course[0];
            var course_num = parseInt(course[1]);
            var section = parseInt(course[2]);
            var term = 201580; // wish I knew why
            $(row).prepend("<td class=\"dddefault\" style=\"border:tan solid 1px;\">\n                    <a href=\"" + get_book_search_url(course_num, department, section, term) + "\">\n                        Book\n                    </a>\n                </td>");
        }
    });
});
function get_book_search_url(course_num, department, section, term) {
    var base_url = "https://securex.bncollege.com/" + "webapp/wcs/stores/servlet/TBListView?cm_mmc=RI-_-8152-_-1-_-A&catalogId=10001&storeId=87857&langId=-1&%20" + "termMapping=Y&courseXml=";
    var xml = '<?xml version="1.0" encoding="UTF-8"?>' + '<textbookorder>' + '<campus name="KC">' + '<courses>' + '<course num="' + course_num + '" dept="' + department + '" sect="' + ("00" + section).slice(-3) + '" term="' + term + '"/>' + '</courses>' + '</campus>' + '</textbookorder>';
    return base_url + encodeURIComponent(xml);
}
//# sourceMappingURL=page_modifier.js.map