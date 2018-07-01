(function ($) {
    // This variable is available only inside this plugin 
    var MonthArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var settings = {};

    datehelper = function (options) {
        settings = $.extend({ format: "yyyy-MM-dd", cdate: new Date() }, options);
        return datehelper;
    },

    datehelper.caststringtodate = function (str, formatchange) {
        var dt = null;

        if (str != "" && str !== undefined) {
            var arr = [];
            var month = 0;
            var dd = 0;
            var yyyy = 0;
            switch (settings.format.toLowerCase()) {
                case "dd-mm-yyyy":
                    arr = str.split("-");
                    if (arr.length == 3) {
                        dt = new Date(parseInt(arr[2]), parseInt(arr[1]), parseInt(arr[0]));
                    }
                    break;
                case "dd/mm/yyyy":
                    arr = str.split("/");
                    if (arr.length == 3) {
                        dt = new Date(parseInt(arr[2]), parseInt(arr[1]), parseInt(arr[0]));
                    }
                    break;
                case "dd/mmm/yyyy":
                    arr = str.split("/");
                    if (arr.length == 3) {
                        dt = new Date(parseInt(arr[2]), parseInt(MonthArray.indexOf(arr[1]) + 1), parseInt(arr[0]));
                    }
                    break;
                case "dd-mmm-yyyy":
                    arr = str.split("-");
                    if (arr.length == 3) {
                        dt = new Date(parseInt(arr[2]), parseInt(MonthArray.indexOf(arr[1]) + 1), parseInt(arr[0]));
                    }
                    break;
                case "mm-dd-yyyy":
                    arr = str.split("-");
                    if (arr.length == 3) {
                        dt = new Date(parseInt(arr[2]), parseInt(arr[0]), parseInt(arr[1]));
                    }
                    break;
                case "mm/dd/yyyy":
                    arr = str.split("/");
                    if (arr.length == 3) {
                        dt = new Date(parseInt(arr[2]), parseInt(arr[0]), parseInt(arr[1]));
                    }
                    break;
                case "mmm/dd/yyyy":
                    arr = str.split("/");
                    if (arr.length == 3) {
                        dt = new Date(parseInt(arr[2]), parseInt(MonthArray.indexOf(arr[0]) + 1), parseInt(arr[1]));
                    }
                    break;
                case "mmm-dd-yyyy":
                    arr = str.split("-");
                    if (arr.length == 3) {
                        dt = new Date(parseInt(arr[2]), parseInt(MonthArray.indexOf(arr[0]) + 1), parseInt(arr[1]));
                    }
                    break;
                case "yyyy-mm-dd":
                    arr = str.split("-");
                    if (arr.length == 3) {
                        dt = new Date(parseInt(arr[0]), parseInt(arr[1]), parseInt(arr[2]));
                    }
                    break;
                case "yyyy/mm/dd":
                    arr = str.split("/");
                    if (arr.length == 3) {
                        dt = new Date(parseInt(arr[0]), parseInt(arr[1]), parseInt(arr[2]));
                    }
                    break;
                case "yyyy-mmm-dd":
                    arr = str.split("-");
                    if (arr.length == 3) {
                        dt = new Date(parseInt(arr[0]), parseInt(MonthArray.indexOf(arr[0]) + 1), parseInt(arr[2]));
                    }
                    break;
                case "yyyy/mmm/dd":
                    arr = str.split("/");
                    if (arr.length == 3) {
                        dt = new Date(parseInt(arr[0]), parseInt(MonthArray.indexOf(arr[0]) + 1), parseInt(arr[2]));
                    }
                    break;
                case "yyyy/dd/mmm":
                    arr = str.split("/");
                    if (arr.length == 3) {
                        dt = new Date(parseInt(arr[0]), parseInt(MonthArray.indexOf(arr[2]) + 1), parseInt(arr[1]));
                    }
                    break;
                case "yyyy-dd-mmm":
                    arr = str.split("/");
                    if (arr.length == 3) {
                        dt = new Date(parseInt(arr[0]), parseInt(MonthArray.indexOf(arr[2]) + 1), parseInt(arr[1]));
                    }
                    break;
            }

            if (formatchange !== undefined) {
                dt = datehelper.getFormatteddate(dt, formatchange);
            }
            return dt;
        }
    },

    datehelper.getFormatteddate = function (date, formatchange) {
        var compareformat = settings.format;
        if (formatchange !== undefined) {
            compareformat = formatchange;
        }
        var str = "";
        var dt = new Date();
        if (date === undefined) {
            dt = settings.cdate;
        }
        else {
            dt = new Date(date);
        }
        var month = dt.getMonth();
        var dd = dt.getDate();
        var yyyy = dt.getFullYear();
        switch (compareformat.toLowerCase()) {
            case "dd-mm-yyyy":
                str = (dd.toString().length == 1 ? '0' + dd : dd) + "-" + (parseInt(month + 1).toString().length == 1 ? '0' + parseInt(month + 1) : parseInt(month + 1)) + "-" + yyyy;
                break;
            case "dd/mm/yyyy":
                str = (dd.toString().length == 1 ? '0' + dd : dd) + "/" + (parseInt(month + 1).toString().length == 1 ? '0' + parseInt(month + 1) : parseInt(month + 1)) + "/" + yyyy;
                break;
            case "dd/mmm/yyyy":
                str = (dd.toString().length == 1 ? '0' + dd : dd) + "-" + MonthArray[month] + "-" + yyyy;
                break;
            case "dd-mmm-yyyy":
                str = (dd.toString().length == 1 ? '0' + dd : dd) + "/" + MonthArray[month] + "/" + yyyy;
                break;
            case "mm-dd-yyyy":
                str = (parseInt(month + 1).toString().length == 1 ? '0' + parseInt(month + 1) : parseInt(month + 1)) + "-" + (dd.toString().length == 1 ? '0' + dd : dd) + "-" + yyyy;
                break;
            case "mm/dd/yyyy":
                str = (parseInt(month + 1).toString().length == 1 ? '0' + parseInt(month + 1) : parseInt(month + 1)) + "/" + (dd.toString().length == 1 ? '0' + dd : dd) + "/" + yyyy;
                break;
            case "mmm/dd/yyyy":
                str = MonthArray[parseInt(month - 1)] + "/" + (dd.toString().length == 1 ? '0' + dd : dd) + "/" + yyyy;
                break;
            case "mmm-dd-yyyy":
                str = MonthArray[month] + "-" + (dd.toString().length == 1 ? '0' + dd : dd) + "-" + yyyy;
                break;
            case "yyyy-mm-dd":
                str = yyyy + "-" + (parseInt(month + 1).toString().length == 1 ? '0' + parseInt(month + 1) : parseInt(month + 1)) + "-" + (dd.toString().length == 1 ? '0' + dd : dd);
                break;
            case "yyyy/mm/dd":
                str = yyyy + "/" + (parseInt(month + 1).toString().length == 1 ? '0' + parseInt(month + 1) : parseInt(month + 1)) + "/" + (dd.toString().length == 1 ? '0' + dd : dd);
                break;
            case "yyyy-mmm-dd":
                str = yyyy + "-" + MonthArray[month] + "-" + (dd.toString().length == 1 ? '0' + dd : dd);
                break;
            case "yyyy/mmm/dd":
                str = yyyy + "/" + MonthArray[month] + "/" + (dd.toString().length == 1 ? '0' + dd : dd);
                break;
        }
        return str;
    }

    datehelper.getTodaysDate = function () {
        return new Date();
    }

    // Change date from date string
    datehelper.changeDateformat = function (str, newformat) {
        var dt = new Date();
        var dd = 0;
        var mm = 0;
        var yyyy = 0;
        if (newformat.toLowerCase() == settings.format.toLowerCase()) {
            return str;
        }
        else {
            var arr = [];
            switch (settings.format.toLowerCase()) {
                case "dd-mm-yyyy":
                    arr = str.split("-");
                    if (arr.length == 3) {
                        dd = parseInt(arr[0]);
                        mm = parseInt(arr[1]) - 1;
                        yyyy = parseInt(arr[2]);
                        dt = new Date(yyyy, mm, dd);
                    }
                    break;
                case "dd/mm/yyyy":
                    arr = str.split("/");
                    if (arr.length == 3) {
                        dd = parseInt(arr[0]);
                        mm = parseInt(arr[1]) - 1;
                        yyyy = parseInt(arr[2]);
                        dt = new Date(yyyy, mm, dd);
                    }
                    break;
                case "dd/mmm/yyyy":
                    arr = str.split("/");
                    if (arr.length == 3) {
                        dd = parseInt(arr[0]);
                        mm = parseInt(MonthArray.indexOf(arr[1]) + 1);
                        yyyy = parseInt(arr[2]);
                        dt = new Date(yyyy, mm, dd);
                    }
                    break;
                case "dd-mmm-yyyy":
                    arr = str.split("-");
                    if (arr.length == 3) {
                        dd = parseInt(arr[0]);
                        mm = parseInt(MonthArray.indexOf(arr[1]) + 1);
                        yyyy = parseInt(arr[2]);
                        dt = new Date(yyyy, mm, dd);
                    }
                    break;
                case "mm-dd-yyyy":
                    arr = str.split("-");
                    if (arr.length == 3) {
                        dd = parseInt(arr[1]);
                        mm = parseInt(arr[0]) - 1;
                        yyyy = parseInt(arr[2]);
                        dt = new Date(yyyy, mm, dd);
                    }
                    break;
                case "mm/dd/yyyy":
                    arr = str.split("/");
                    if (arr.length == 3) {
                        dd = parseInt(arr[1]);
                        mm = parseInt(arr[0]) - 1;
                        yyyy = parseInt(arr[2]);
                        dt = new Date(yyyy, mm, dd);
                    }
                    break;
                case "mmm/dd/yyyy":
                    arr = str.split("/");
                    if (arr.length == 3) {
                        dd = parseInt(arr[1]);
                        mm = parseInt(MonthArray.indexOf(arr[0]) + 1);
                        yyyy = parseInt(arr[2]);
                        dt = new Date(yyyy, mm, dd);
                    }
                    break;
                case "mmm-dd-yyyy":
                    arr = str.split("-");
                    if (arr.length == 3) {
                        dd = parseInt(arr[1]);
                        mm = parseInt(MonthArray.indexOf(arr[0]) + 1);
                        yyyy = parseInt(arr[2]);
                        dt = new Date(yyyy, mm, dd);
                    }
                    break;
                case "yyyy-mm-dd":
                    arr = str.split("-");
                    if (arr.length == 3) {
                        dd = parseInt(arr[2]);
                        mm = parseInt(arr[1]) - 1;
                        yyyy = parseInt(arr[0]);
                        dt = new Date(yyyy, mm, dd);
                    }
                    break;
                case "yyyy/mm/dd":
                    arr = str.split("/");
                    if (arr.length == 3) {
                        dd = parseInt(arr[2]);
                        mm = parseInt(arr[1]) - 1;
                        yyyy = parseInt(arr[0]);
                        dt = new Date(yyyy, mm, dd);
                    }
                    break;
                case "yyyy-mmm-dd":
                    arr = str.split("-");
                    if (arr.length == 3) {
                        dd = parseInt(arr[2]);
                        mm = parseInt(MonthArray.indexOf(arr[0]) + 1);
                        yyyy = parseInt(arr[0]);
                        dt = new Date(yyyy, mm, dd);
                    }
                    break;
                case "yyyy/mmm/dd":
                    arr = str.split("/");
                    if (arr.length == 3) {
                        dd = parseInt(arr[2]);
                        mm = parseInt(MonthArray.indexOf(arr[0]) + 1);
                        yyyy = parseInt(arr[0]);
                        dt = new Date(yyyy, mm, dd);
                    }
                    break;
                case "yyyy/dd/mmm":
                    arr = str.split("/");
                    if (arr.length == 3) {
                        dd = parseInt(arr[1]);
                        mm = parseInt(MonthArray.indexOf(arr[2]) + 1);
                        yyyy = parseInt(arr[0]);
                        dt = new Date(yyyy, mm, dd);
                    }
                    break;
                case "yyyy-dd-mmm":
                    arr = str.split("/");
                    if (arr.length == 3) {
                        dd = parseInt(arr[1]);
                        mm = parseInt(MonthArray.indexOf(arr[2]) + 1);
                        yyyy = parseInt(arr[0]);
                        dt = new Date(yyyy, mm, dd);
                    }
                    break;
            }

            return datehelper.getFormatteddate(dt, newformat);
        }
    }

    datehelper.addDays = function (date, days) {
        date.setDate(date.getDate() + days);
        return date;
    }

    datehelper.compareDates = function (d1, d2) {
        // can compare only iso format MM-dd-yyyy
        if (d1 == d2) {
            return 0;
        }
        else if (d1 > d2) {
            return 1;
        }
        else if (d1 < d2) {
            return -1;
        }
    }

    datehelper.getMonthName = function (monthindex) {
        return MonthArray[monthindex];
    }

} (jQuery));


