/// <reference path="typings/jquery/jquery.d.ts" />

$(() => {
    var table = $(".datadisplaytable").find("tbody");
    var rows = table.find("tr");
    var top = rows.eq(0);
    top.prepend(`<td class="dddefault" style="background-color:tan;border:tan solid 1px;font-size:-1"><b>Book</b></td>`);
    rows.each((index, row) => {
        if(index%2 != 0) {
            var boxes = $(row).find("td");
            var course_text = boxes[1].innerHTML;
            var course = course_text.split('-');

            var campus = boxes[3].innerHTML;
            var department = course[0];
            var course_num = parseInt(course[1]);
            var section = parseInt(course[2]);
            var term = 201580; // wish I knew why
            $(row).prepend(
                `<td class="dddefault" style="border:tan solid 1px;">
                    <a href="`+get_book_search_url(campus, course_num, department, section, term)+`" target="_blank">
                        Book
                    </a>
                </td>`
            );
        }
    });
});

function get_book_search_url(campus: string, course_num: number, department: string, section: number, term: number):string {
    var base_url = "https://securex.bncollege.com/" +
        "webapp/wcs/stores/servlet/TBListView?cm_mmc=RI-_-8152-_-1-_-A&catalogId=10001&storeId=87857&langId=-1&%20" +
        "termMapping=Y&courseXml=";
    var xml =
        '<?xml version="1.0" encoding="UTF-8"?>' +
        '<textbookorder>' +
        '<campus name="'+campus+'">' +
        '<courses>' +
        '<course num="'+course_num+'" dept="'+department+'" sect="'+("00"+section).slice(-3)+'" term="'+term+'"/>' +
        '</courses>' +
        '</campus>' +
        '</textbookorder>';

    return base_url+encodeURIComponent(xml);
}