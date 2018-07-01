$(document).ready(function () {
    if ($("#pagename").val()=="homepage") {
        $(this).scrollTop(10);
    }
    else {
        $(this).scrollTop(250);
    }
    $("#status_message").keypress(function (event) {
        if (event.which == 13) {
            event.preventDefault();
            SendMessage();
        }
    });
});
function Logout() {
    window.location = GetVirtualDirectory() + '/Account/LogOff';
}

function baseUrl() {
    var pathname = window.location.href;
    return pathname;
}

function ShowLoader()
{
    $("#rclLoader").show();
}

function HideLoader() {
    $("#rclLoader").hide();
}


function convertNumberToWords(amount) {
    var words = new Array();
    words[0] = '';
    words[1] = 'One';
    words[2] = 'Two';
    words[3] = 'Three';
    words[4] = 'Four';
    words[5] = 'Five';
    words[6] = 'Six';
    words[7] = 'Seven';
    words[8] = 'Eight';
    words[9] = 'Nine';
    words[10] = 'Ten';
    words[11] = 'Eleven';
    words[12] = 'Twelve';
    words[13] = 'Thirteen';
    words[14] = 'Fourteen';
    words[15] = 'Fifteen';
    words[16] = 'Sixteen';
    words[17] = 'Seventeen';
    words[18] = 'Eighteen';
    words[19] = 'Nineteen';
    words[20] = 'Twenty';
    words[30] = 'Thirty';
    words[40] = 'Forty';
    words[50] = 'Fifty';
    words[60] = 'Sixty';
    words[70] = 'Seventy';
    words[80] = 'Eighty';
    words[90] = 'Ninety';
    amount = amount.toString();
    var atemp = amount.split(".");
    var number = atemp[0].split(",").join("");
    var n_length = number.length;
    var words_string = "";
    if (n_length <= 9) {
        var n_array = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
        var received_n_array = new Array();
        for (var i = 0; i < n_length; i++) {
            received_n_array[i] = number.substr(i, 1);
        }
        for (var i = 9 - n_length, j = 0; i < 9; i++, j++) {
            n_array[i] = received_n_array[j];
        }
        for (var i = 0, j = 1; i < 9; i++, j++) {
            if (i == 0 || i == 2 || i == 4 || i == 7) {
                if (n_array[i] == 1) {
                    n_array[j] = 10 + parseInt(n_array[j]);
                    n_array[i] = 0;
                }
            }
        }
        value = "";
        for (var i = 0; i < 9; i++) {
            if (i == 0 || i == 2 || i == 4 || i == 7) {
                value = n_array[i] * 10;
            } else {
                value = n_array[i];
            }
            if (value != 0) {
                words_string += words[value] + " ";
            }
            if ((i == 1 && value != 0) || (i == 0 && value != 0 && n_array[i + 1] == 0)) {
                words_string += "Crores ";
            }
            if ((i == 3 && value != 0) || (i == 2 && value != 0 && n_array[i + 1] == 0)) {
                words_string += "Lakhs ";
            }
            if ((i == 5 && value != 0) || (i == 4 && value != 0 && n_array[i + 1] == 0)) {
                words_string += "Thousand ";
            }
            if (i == 6 && value != 0 && (n_array[i + 1] != 0 && n_array[i + 2] != 0)) {
                words_string += "Hundred and ";
            } else if (i == 6 && value != 0) {
                words_string += "Hundred ";
            }
        }
        words_string = words_string.split("  ").join(" ");
    }
    return words_string;
}

function SendMessage()
{
    var touserid = $("#touserid").attr("data");
    if (touserid===undefined) {
        touserid = $("#UserId").val();
    }
    $.ajax({
        cache: false,
        type: "GET",
        async: false,
        url: GetVirtualDirectory() + "/Message/SendMessage?fromUserId=" + $("#ActiveUserId").val() + "&toUserId=" + touserid + "&msg=" + $("#status_message").val(),
        dataType: "json",
        success: function (students) {
            var objShowCustomAlert = new ShowCustomAlert({
                Title: "",
                Message: "Your message has been send.",
                Type: "alert",
                OnOKClick: function () {
                    window.location = GetVirtualDirectory() + "/UserProfile/Index";
                },
            });
            objShowCustomAlert.ShowCustomAlertBox();
            
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert('Error during process: \n' + xhr.responseText);
        }
    });
}

function ReadMessgesByUser() {
    setInterval(function () {
        if (document.getElementById("ActiveUserId") != null) {
            $.ajax({
                cache: false,
                type: "GET",
                async: false,
                url: GetVirtualDirectory() + "/Home/ReadMessage?toUserId=" + $("#ActiveUserId").val(),
                dataType: "json",
                success: function (students) {
                    bindUserMessage(students, $("#ActiveUserId").val());
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    
                }
            });
        }
    }, 15000);
}

function GetAllMessgaes(userid, touserid)
{
    setInterval(function () {
        $.ajax({
            cache: false,
            type: "GET",
            async: false,
            url: GetVirtualDirectory() + "/Home/GetAllMessgaes?UserId=" + userid + "&ToUserId=" + touserid,
            dataType: "json",
            success: function (students) {
                bindUserMessges(students);
            },
            error: function (xhr, ajaxOptions, thrownError) {

            }
        });
    }, 15000);
}

function bindUserMessges(students)
{
    var htmlin = "";
    $("#msguser").html(htmlin);
    for (var i = 0; i < students.length; i++) {
        var date = new Date(parseInt(students[i].MessageDate.substr(6)));
        htmlin += '<div class="chat-box-single-line"><abbr class="timestamp">' + date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear() + '</abbr></div>';
        htmlin += '<div class="direct-chat-msg doted-border"><div class="direct-chat-info clearfix"><span class="direct-chat-name pull-left">';
        if (students[i].FromUserId == $("#ActiveUserId").val()) {
            htmlin += 'me';
        }
        else {
            htmlin += $("#" + students[i].FromUserId + ">strong").html();
        }
        htmlin += '</span></div><div class="direct-chat-text">' + students[i].MessageText + '</div></div>';
    }
    $("#msguser").html(htmlin);
}

function bindUserMessage(respnse,userid)
{
    $("#inmsg").html("");
    var htmlin = "";
    for (var i = 0; i < respnse.length; i++) {
        htmlin += '<li class="dropdown-menu-header text-center" id="' + respnse[i].Id + '" onclick="ShowChat(this)"><strong>' + respnse[i].FirstName + " " + respnse[i].LName + '</strong></li>';
    }
    $("#inmsg").html(htmlin);
}

function ShowChat(liuser)
{
    $('#qnimate').addClass('popup-box-on');
    var touserid = $(liuser).attr("id");
    $("#touserid").attr("data", touserid);
    var userid = $("#ActiveUserId").val();
    $("#chatuser").html(liuser.fir);
    GetAllMessgaes(userid, touserid);
}


function GetVirtualDirectory() {

    var result = "";
    var url = window.location.href;

    var url_parts = url.split('/');
    var index = 0;
    for (var i = 0; i < url_parts.length; i++) {
        if (url_parts[i] != "") {
            if (i > 2) {
                break;
            }
            result = result + url_parts[i];
        }
        if (i == 1) {
            result = result + "//";
        }
    }
    return result + "/AyurvedicApp";
}
function SetActiveTab(tabname) {
    switch (tabname) {
        case "register":
            $("#lihome").removeClass("active");
            $("#liSearch").removeClass("active")
            $("#liMarriageHall").removeClass("active");
            $("#liOther").removeClass("active");
            $("#licontact").removeClass("contact");
            $("#lireg").addClass("active");
            break
        case "search":
            $("#lihome").removeClass("active");
            $("#liSearch").addClass("active")
            $("#liMarriageHall").removeClass("active");
            $("#liOther").removeClass("active");
            $("#licontact").removeClass("contact");
            $("#lireg").removeClass("active");
            break
        case "contact":
            $("#lihome").removeClass("active");
            $("#liSearch").removeClass("active")
            $("#liMarriageHall").removeClass("active");
            $("#liOther").removeClass("active");
            $("#lireg").removeClass("active");
            $("#licontact").addClass("active");
            break
        default:
            $("#lihome").addClass("active");
            $("#liSearch").removeClass("active")
            $("#liMarriageHall").removeClass("active");
            $("#liOther").removeClass("active");
            $("#lireg").removeClass("active");
            break;

    }
}