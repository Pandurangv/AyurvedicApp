AyurvadApp.factory('NadiPariksha', ['$http', function ($http) {
    var urlBase = GetVirtualDirectory();
    var ReportService = {};

    ReportService.GetNadiParikshaDetails = function (Id) {
        return $http.get(urlBase + "/NadiPariksha/GetNadiParikshaDetails");
    };

    ReportService.GetNadiParikshaResult = function (NadiParikshaId)
    {
        return $http.get(urlBase + "/NadiPariksha/GetNadiParikshaResult?NadiParikshaId=" + NadiParikshaId);
    }

    ReportService.Save = function (request, IsEdit) {
        //var list = BaseList;
        var url = urlBase + '/NadiPariksha/Save';
        if (IsEdit == false) {
            url = urlBase + '/NadiPariksha/Update';
        }
        var req = {
            method: 'POST',
            dataType: 'JSON',
            url: url,
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            data: JSON.stringify(request),
        }
        return $http(req);
    };

    return ReportService;
}]);
AyurvadApp.controller("NadiParikshaController", ['$scope', '$http', '$filter', '$rootScope', 'NadiPariksha', function ($scope, $http, $filter, $rootScope, NadiPariksha) {

    $scope.MainList = [];
    $scope.MainNadiParikshaList = [];

    $scope.PatientList = [];

    $scope.NadiParikshaList = [];
    $scope.SearchNadiParikshaList = [];

    $scope.SelectedProductType = 0;

    $scope.Details = true;
    $scope.Add = false;
    $scope.Edit = false;

    $scope.ErrorModel = { IsPatientName: false, IsUOM: false, IsPrice: false, IsProductType: false };
    $scope.ErrorMessage = ""
    
    $scope.NadiParikshaId = 0;
    $scope.ProductTypeId = 0;
    $scope.Paging = 10;
    $scope.CurruntIndex = 0;
    $scope.SelectedPatient = {};

    $scope.NadiParikshaModel = { NadiParikshaId: 0, ExamDate: "", PatientId: 0 };

    $scope.NadiParikshaResult = [];

    $scope.Prefix = "";

    $scope.Report = false;

    $scope.FilterList = function ()
    {
        var reg = new RegExp($scope.Prefix.toLowerCase());
        $scope.NadiParikshaList = $scope.MainNadiParikshaList.filter(function (actype) {
            return (reg.test(actype.PatientName.toLowerCase()));
        });
        $scope.First();
    }

    $scope.Reset = function () {
        GetNadiParikshaDetails();
        $scope.BackClick();
    }

    $scope.BackClick = function ()
    {
        $scope.Add = false;
        $scope.Edit = false;
        $scope.Details = true;
        $scope.Report = false;
    }

    $scope.GetNadiParikshaResult = function (model)
    {
        ShowLoader();
        NadiPariksha.GetNadiParikshaResult(model.NadiParikshaId)
           .success(function (response) {
               $scope.NadiParikshaResult = response.PatientDignosysList;
               $scope.NadiParikshaResult.PatientDetails = model;
               $scope.Report = true;
               $scope.Details = false;
               $scope.Add = false;
               $scope.Edit = false;
               var flag = false;
               if ($scope.NadiParikshaResult[0].Result > 0 && $scope.NadiParikshaResult[1].Result > 0 && $scope.NadiParikshaResult[2].Result > 0) {
                   flag = true;
                   var chart = AmCharts.makeChart("barchartContainer", {
                       "type": "serial",
                       "theme": "light",
                       "marginRight": 70,
                       "dataProvider": [{
                           "ParamName": $scope.NadiParikshaResult[0].ParamName,
                           "Result": $scope.NadiParikshaResult[0].Result,
                           "Color": "#55B2D7"
                       }, {
                           "ParamName": $scope.NadiParikshaResult[1].ParamName,
                           "Result": $scope.NadiParikshaResult[1].Result,
                           "Color": "#DA4940"
                       }, {
                           "ParamName": $scope.NadiParikshaResult[2].ParamName,
                           "Result": $scope.NadiParikshaResult[2].Result,
                           "Color": "#78D755"
                       }],
                       "valueAxes": [{
                           "axisAlpha": 0,
                           "position": "left",
                           "title": "Vata, Pitta and Kapha"
                       }],
                       "startDuration": 1,
                       "graphs": [{
                           "balloonText": "<b>[[category]]: [[value]]</b>",
                           "fillColorsField": "Color",
                           "fillAlphas": 0.9,
                           "lineAlpha": 0.2,
                           "type": "column",
                           "valueField": "Result"
                       }],
                       "chartCursor": {
                           "categoryBalloonEnabled": false,
                           "cursorAlpha": 0,
                           "zoomable": false
                       },
                       "categoryField": "ParamName",
                       "categoryAxis": {
                           "gridPosition": "start",
                           "labelRotation": 45
                       },
                       "export": {
                           "enabled": false
                       }

                   });
                   var chart;
                   var legend;

                   var chart = AmCharts.makeChart("chartContainer", {
                       "type": "pie",
                       "theme": "light",
                       "dataProvider": [{
                           "ParamName": $scope.NadiParikshaResult[0].ParamName,
                           "Result": $scope.NadiParikshaResult[0].Result,
                           "Color":"#55B2D7"
                       }, {
                           "ParamName": $scope.NadiParikshaResult[1].ParamName,
                           "Result": $scope.NadiParikshaResult[1].Result,
                           "Color": "#DA4940"
                       }, {
                           "ParamName": $scope.NadiParikshaResult[2].ParamName,
                           "Result": $scope.NadiParikshaResult[2].Result,
                           "Color": "#78D755"
                       }],
                       "valueField": "Result",
                       "titleField": "ParamName",
                       "colorField": "Color",
                       "balloon": {
                           "fixedPosition": true
                       },
                       "export": {
                           "enabled": false
                       }
                   });

                   setTimeout(function () {
                       $("#chartContainer").find(".amcharts-chart-div").find("a").hide()
                       $("#barchartContainer").find(".amcharts-chart-div").find("a").hide()
                   }, 500);
               }
               
               if ($scope.NadiParikshaResult[3].Result > 0 && $scope.NadiParikshaResult[4].Result > 0 && $scope.NadiParikshaResult[5].Result > 0) {
                   flag = true;

                   var chart = AmCharts.makeChart("barchartContainer1", {
                       "type": "serial",
                       "theme": "light",
                       "marginRight": 70,
                       "dataProvider": [{
                           "ParamName": $scope.NadiParikshaResult[3].ParamName,
                           "Result": $scope.NadiParikshaResult[3].Result,
                           "Color": "#55B2D7"
                       }, {
                           "ParamName": $scope.NadiParikshaResult[4].ParamName,
                           "Result": $scope.NadiParikshaResult[4].Result,
                           "Color": "#DA4940"
                       }, {
                           "ParamName": $scope.NadiParikshaResult[5].ParamName,
                           "Result": $scope.NadiParikshaResult[5].Result,
                           "Color": "#78D755"
                       }],
                       "valueAxes": [{
                           "axisAlpha": 0,
                           "position": "left",
                           "title": "Satwa, Rajas and Tama"
                       }],
                       "startDuration": 1,
                       "graphs": [{
                           "balloonText": "<b>[[category]]: [[value]]</b>",
                           "fillColorsField": "Color",
                           "fillAlphas": 0.9,
                           "lineAlpha": 0.2,
                           "type": "column",
                           "valueField": "Result"
                       }],
                       "chartCursor": {
                           "categoryBalloonEnabled": false,
                           "cursorAlpha": 0,
                           "zoomable": false
                       },
                       "categoryField": "ParamName",
                       "categoryAxis": {
                           "gridPosition": "start",
                           "labelRotation": 45
                       },
                       "export": {
                           "enabled": false
                       }

                   });
                   var chart;
                   var legend;

                   var chart = AmCharts.makeChart("chartContainer1", {
                       "type": "pie",
                       "theme": "light",
                       "dataProvider": [{
                           "ParamName": $scope.NadiParikshaResult[3].ParamName,
                           "Result": $scope.NadiParikshaResult[3].Result,
                           "Color": "#55B2D7"
                       }, {
                           "ParamName": $scope.NadiParikshaResult[4].ParamName,
                           "Result": $scope.NadiParikshaResult[4].Result,
                           "Color": "#DA4940"
                       }, {
                           "ParamName": $scope.NadiParikshaResult[5].ParamName,
                           "Result": $scope.NadiParikshaResult[5].Result,
                           "Color": "#78D755"
                       }],
                       "valueField": "Result",
                       "titleField": "ParamName",
                       "colorField": "Color",
                       "balloon": {
                           "fixedPosition": true
                       },
                       "export": {
                           "enabled": false
                       }
                   });

                   setTimeout(function () {
                       $("#chartContainer1").find(".amcharts-chart-div").find("a").hide()
                       $("#barchartContainer1").find(".amcharts-chart-div").find("a").hide()
                   }, 500);
               }
               
               if ($scope.NadiParikshaResult[6].Result > 0 && $scope.NadiParikshaResult[7].Result > 0 && $scope.NadiParikshaResult[8].Result > 0 &&
                   $scope.NadiParikshaResult[9].Result > 0 &&
                   $scope.NadiParikshaResult[10].Result > 0
                   ) {
                       flag = true;

                       var chart = AmCharts.makeChart("barchartContainer2", {
                           "type": "serial",
                           "theme": "light",
                           "marginRight": 70,
                           "dataProvider": [{
                               "ParamName": $scope.NadiParikshaResult[6].ParamName,
                               "Result": $scope.NadiParikshaResult[6].Result,
                               "Color": "#33FFB2"
                           }, {
                               "ParamName": $scope.NadiParikshaResult[7].ParamName,
                               "Result": $scope.NadiParikshaResult[7].Result,
                               "Color": "#35B384"
                           }, {
                               "ParamName": $scope.NadiParikshaResult[8].ParamName,
                               "Result": $scope.NadiParikshaResult[8].Result,
                               "Color": "#49CB9A"
                           }, {
                               "ParamName": $scope.NadiParikshaResult[9].ParamName,
                               "Result": $scope.NadiParikshaResult[9].Result,
                               "Color": "#43B8A6"
                           }, {
                               "ParamName": $scope.NadiParikshaResult[10].ParamName,
                               "Result": $scope.NadiParikshaResult[10].Result,
                               "Color": "#2582A2"
                           }],
                           "valueAxes": [{
                               "axisAlpha": 0,
                               "position": "left",
                               "title": "Types of Vata"
                           }],
                           "startDuration": 1,
                           "graphs": [{
                               "balloonText": "<b>[[category]]: [[value]]</b>",
                               "fillColorsField": "Color",
                               "fillAlphas": 0.9,
                               "lineAlpha": 0.2,
                               "type": "column",
                               "valueField": "Result"
                           }],
                           "chartCursor": {
                               "categoryBalloonEnabled": false,
                               "cursorAlpha": 0,
                               "zoomable": false
                           },
                           "categoryField": "ParamName",
                           "categoryAxis": {
                               "gridPosition": "start",
                               "labelRotation": 45
                           },
                           "export": {
                               "enabled": false
                           }

                       });
                       var chart;
                       var legend;

                       var chart = AmCharts.makeChart("chartContainer2", {
                           "type": "pie",
                           "theme": "light",
                           "dataProvider": [{
                               "ParamName": $scope.NadiParikshaResult[6].ParamName,
                               "Result": $scope.NadiParikshaResult[6].Result,
                               "Color": "#33FFB2"
                           }, {
                               "ParamName": $scope.NadiParikshaResult[7].ParamName,
                               "Result": $scope.NadiParikshaResult[7].Result,
                               "Color": "#35B384"
                           }, {
                               "ParamName": $scope.NadiParikshaResult[8].ParamName,
                               "Result": $scope.NadiParikshaResult[8].Result,
                               "Color": "#49CB9A"
                           }, {
                               "ParamName": $scope.NadiParikshaResult[9].ParamName,
                               "Result": $scope.NadiParikshaResult[9].Result,
                               "Color": "#43B8A6"
                           }, {
                               "ParamName": $scope.NadiParikshaResult[10].ParamName,
                               "Result": $scope.NadiParikshaResult[10].Result,
                               "Color": "#2582A2"
                           }],
                           "valueField": "Result",
                           "titleField": "ParamName",
                           "colorField": "Color",
                           "balloon": {
                               "fixedPosition": true
                           },
                           "export": {
                               "enabled": false
                           }
                       });

                       setTimeout(function () {
                           $("#chartContainer2").find(".amcharts-chart-div").find("a").hide()
                           $("#barchartContainer2").find(".amcharts-chart-div").find("a").hide()
                       }, 500);
               }
               

               if ($scope.NadiParikshaResult[11].Result > 0 && $scope.NadiParikshaResult[12].Result > 0 && $scope.NadiParikshaResult[13].Result > 0 &&
                   $scope.NadiParikshaResult[14].Result > 0 &&
                   $scope.NadiParikshaResult[15].Result > 0
                   ) {
                        flag = true;

                           var chart = AmCharts.makeChart("barchartContainer3", {
                                   "type": "serial",
                                   "theme": "light",
                                   "marginRight": 70,
                                   "dataProvider": [{
                                       "ParamName": $scope.NadiParikshaResult[11].ParamName,
                                       "Result": $scope.NadiParikshaResult[11].Result,
                                       "Color": "#DA4940"
                                   }, {
                                       "ParamName": $scope.NadiParikshaResult[12].ParamName,
                                       "Result": $scope.NadiParikshaResult[12].Result,
                                       "Color": "#EF3C31"
                                   }, {
                                       "ParamName": $scope.NadiParikshaResult[13].ParamName,
                                       "Result": $scope.NadiParikshaResult[13].Result,
                                       "Color": "#B51A10"
                                   }, {
                                       "ParamName": $scope.NadiParikshaResult[14].ParamName,
                                       "Result": $scope.NadiParikshaResult[14].Result,
                                       "Color": "#B72B22"
                                   }, {
                                       "ParamName": $scope.NadiParikshaResult[15].ParamName,
                                       "Result": $scope.NadiParikshaResult[15].Result,
                                       "Color": "#BC453E"
                                   }],
                                   "valueAxes": [{
                                       "axisAlpha": 0,
                                       "position": "left",
                                       "title": "Types of Pitta"
                                   }],
                                   "startDuration": 1,
                                   "graphs": [{
                                       "balloonText": "<b>[[category]]: [[value]]</b>",
                                       "fillColorsField": "Color",
                                       "fillAlphas": 0.9,
                                       "lineAlpha": 0.2,
                                       "type": "column",
                                       "valueField": "Result"
                                   }],
                                   "chartCursor": {
                                       "categoryBalloonEnabled": false,
                                       "cursorAlpha": 0,
                                       "zoomable": false
                                   },
                                   "categoryField": "ParamName",
                                   "categoryAxis": {
                                       "gridPosition": "start",
                                       "labelRotation": 45
                                   },
                                   "export": {
                                       "enabled": false
                                   }

                               });
                               var chart;
                               var legend;

                               var chart = AmCharts.makeChart("chartContainer3", {
                                   "type": "pie",
                                   "theme": "light",
                                   "dataProvider": [{
                                       "ParamName": $scope.NadiParikshaResult[11].ParamName,
                                       "Result": $scope.NadiParikshaResult[11].Result,
                                       "Color": "#DA4940"
                                   }, {
                                       "ParamName": $scope.NadiParikshaResult[12].ParamName,
                                       "Result": $scope.NadiParikshaResult[12].Result,
                                       "Color": "#EF3C31"
                                   }, {
                                       "ParamName": $scope.NadiParikshaResult[13].ParamName,
                                       "Result": $scope.NadiParikshaResult[13].Result,
                                       "Color": "#B51A10"
                                   }, {
                                       "ParamName": $scope.NadiParikshaResult[14].ParamName,
                                       "Result": $scope.NadiParikshaResult[14].Result,
                                       "Color": "#B72B22"
                                   }, {
                                       "ParamName": $scope.NadiParikshaResult[15].ParamName,
                                       "Result": $scope.NadiParikshaResult[15].Result,
                                       "Color": "#BC453E"
                                   }],
                                   "valueField": "Result",
                                   "titleField": "ParamName",
                                   "colorField": "Color",
                                   "balloon": {
                                       "fixedPosition": true
                                   },
                                   "export": {
                                       "enabled": false
                                   }
                               });

                               setTimeout(function () {
                                   $("#chartContainer3").find(".amcharts-chart-div").find("a").hide()
                                   $("#barchartContainer3").find(".amcharts-chart-div").find("a").hide()
                               }, 500);
                       }

               

               if ($scope.NadiParikshaResult[16].Result > 0 && $scope.NadiParikshaResult[17].Result > 0 && $scope.NadiParikshaResult[18].Result > 0 &&
                   $scope.NadiParikshaResult[19].Result > 0 &&
                   $scope.NadiParikshaResult[20].Result > 0
                   ) {
                   flag = true;

                   var chart = AmCharts.makeChart("barchartContainer4", {
                       "type": "serial",
                       "theme": "light",
                       "marginRight": 70,
                       "dataProvider": [{
                           "ParamName": $scope.NadiParikshaResult[16].ParamName,
                           "Result": $scope.NadiParikshaResult[16].Result,
                           "Color": "#62BC3E"
                       }, {
                           "ParamName": $scope.NadiParikshaResult[17].ParamName,
                           "Result": $scope.NadiParikshaResult[17].Result,
                           "Color": "#59BE31"
                       }, {
                           "ParamName": $scope.NadiParikshaResult[18].ParamName,
                           "Result": $scope.NadiParikshaResult[18].Result,
                           "Color": "#4FC122"
                       }, {
                           "ParamName": $scope.NadiParikshaResult[19].ParamName,
                           "Result": $scope.NadiParikshaResult[19].Result,
                           "Color": "#71E742"
                       }, {
                           "ParamName": $scope.NadiParikshaResult[20].ParamName,
                           "Result": $scope.NadiParikshaResult[20].Result,
                           "Color": "#5CEC23"
                       }],
                       "valueAxes": [{
                           "axisAlpha": 0,
                           "position": "left",
                           "title": "Types of Kapha"
                       }],
                       "startDuration": 1,
                       "graphs": [{
                           "balloonText": "<b>[[category]]: [[value]]</b>",
                           "fillColorsField": "Color",
                           "fillAlphas": 0.9,
                           "lineAlpha": 0.2,
                           "type": "column",
                           "valueField": "Result"
                       }],
                       "chartCursor": {
                           "categoryBalloonEnabled": false,
                           "cursorAlpha": 0,
                           "zoomable": false
                       },
                       "categoryField": "ParamName",
                       "categoryAxis": {
                           "gridPosition": "start",
                           "labelRotation": 45
                       },
                       "export": {
                           "enabled": false
                       }

                   });
                   var chart;
                   var legend;

                   var chart = AmCharts.makeChart("chartContainer4", {
                       "type": "pie",
                       "theme": "light",
                       "dataProvider": [{
                           "ParamName": $scope.NadiParikshaResult[16].ParamName,
                           "Result": $scope.NadiParikshaResult[16].Result,
                           "Color": "#62BC3E"
                       }, {
                           "ParamName": $scope.NadiParikshaResult[17].ParamName,
                           "Result": $scope.NadiParikshaResult[17].Result,
                           "Color": "#59BE31"
                       }, {
                           "ParamName": $scope.NadiParikshaResult[18].ParamName,
                           "Result": $scope.NadiParikshaResult[18].Result,
                           "Color": "#4FC122"
                       }, {
                           "ParamName": $scope.NadiParikshaResult[19].ParamName,
                           "Result": $scope.NadiParikshaResult[19].Result,
                           "Color": "#71E742"
                       }, {
                           "ParamName": $scope.NadiParikshaResult[20].ParamName,
                           "Result": $scope.NadiParikshaResult[20].Result,
                           "Color": "#5CEC23"
                       }],
                       "valueField": "Result",
                       "titleField": "ParamName",
                       "colorField": "Color",
                       "balloon": {
                           "fixedPosition": true
                       },
                       "export": {
                           "enabled": false
                       }
                   });

                   setTimeout(function () {
                       $("#chartContainer4").find(".amcharts-chart-div").find("a").hide()
                       $("#barchartContainer4").find(".amcharts-chart-div").find("a").hide()
                   }, 500);
               }

               HideLoader();
               if (flag == false) {
                   var objShowCustomAlert = new ShowCustomAlert({
                       Title: "",
                       Message: "Result Is Empty",
                       Type: "alert",
                   });
                   objShowCustomAlert.ShowCustomAlertBox();
                   window.setTimeout($scope.BackClick(), 1000);
               }
           }).error(function (error) {
               HideLoader();
               var objShowCustomAlert = new ShowCustomAlert({
                   Title: "",
                   Message: "Records not found.",
                   Type: "alert",
               });
               objShowCustomAlert.ShowCustomAlertBox();
           });
    }

    $scope.Expand = function (etype)
    {
        $("." + etype).toggle(1000);
    }

    function GetNadiParikshaDetails() {
        ShowLoader();
        NadiPariksha.GetNadiParikshaDetails()
           .success(function (qualifications) {
               $scope.PatientList = qualifications.PatientList;
               $("#txtExamDate").val("");
               $("#txtDesc").val("");
               var patient={ AdmitId: 0, Name: "---Select---" };
               $scope.PatientList.splice(0, 0,patient );
               $scope.MainList = qualifications.MainList;
               $scope.MainNadiParikshaList = qualifications.NadiParikshaList;
               $scope.NadiParikshaList = qualifications.NadiParikshaList;
               $scope.SelectedPatient = patient;
               $scope.First();
               HideLoader();
               
           }).error(function (error) {
               HideLoader();
               var objShowCustomAlert = new ShowCustomAlert({
                   Title: "",
                   Message: "Records not found.",
                   Type: "alert",
               });
               objShowCustomAlert.ShowCustomAlertBox();
           });
    }

    $scope.Save = function ()
    {
        var valid = false;
        if ($scope.SelectedPatient.AdmitId==0) {
            var objShowCustomAlert = new ShowCustomAlert({
                Title: "",
                Message: "Please select patient.",
                Type: "alert",
            });
            objShowCustomAlert.ShowCustomAlertBox();
            valid = false;
        }
        else {
            valid = true;
        }
        var sum1 = 0;
        var sum2 = 0;
        var sum3 = 0;
        var sum4 = 0;
        var sum5 = 0;
        var requestList = [];


        var test1 = 0;
        var test2 = 0;

        var test3 = 0;
        var test4 = 0;
        var test5 = 0;

        angular.forEach($scope.MainList, function (value, key) {
            if (value.ParamName == "Vata" || value.ParamName == "Pitta" || value.ParamName=="Kapha") {
                sum1 = sum1 + parseInt(value.Result);
                if (key == 0) {
                    test1 = value.Result;
                }
                var arr=[];
                angular.forEach(value.DiagnosysList, function (dign, dignkey) {
                    if (key == 0) {
                        test3 = dign.Result;
                        sum3 = sum3 + parseInt(dign.Result);
                    }
                    else if (key == 1)
                    {
                        test4 = dign.Result;
                        sum4 = sum4 + parseInt(dign.Result);
                    }
                    else if (key == 2) {
                        test5 = dign.Result;
                        sum5 = sum5 + parseInt(dign.Result);
                    }
                })
            }
            else {
                test2 = value.Result;
                sum2 = sum2 + parseInt(value.Result);
            }
            var bdmodel = { ParamId: value.ParamId, Result: value.Result, SubDiagnosysList: value.DiagnosysList };
            //value.SubDiagnosysList = value.DiagnosysList;
            requestList.push(bdmodel);
        });
        
        if (test1>0) {
            if (sum1 != 100) {
                var objShowCustomAlert = new ShowCustomAlert({
                    Title: "",
                    Message: "Vata, Pitta and Kapha Sum should be 100.",
                    Type: "alert",
                });
                objShowCustomAlert.ShowCustomAlertBox();
                valid = false;
                return false;
            }
            else {
                valid = true;
            }
        }
        else {
            valid = true;
        }
        if (test2>0) {
            if (sum2 != 100) {
                var objShowCustomAlert = new ShowCustomAlert({
                    Title: "",
                    Message: "Satwa, Rajas and Tama Sum should be 100.",
                    Type: "alert",
                });
                objShowCustomAlert.ShowCustomAlertBox();
                valid = false;
                return false;
            }
            else {
                valid = true;
            }
        }
        else {
            valid=true;
        }
        
        if (test3>0) {
            if (sum3 != 100) {
                var objShowCustomAlert = new ShowCustomAlert({
                    Title: "",
                    Message: "Sum of Vata Types should be 100.",
                    Type: "alert",
                });
                objShowCustomAlert.ShowCustomAlertBox();
                valid = false;
                return false;
            }
            else {
                valid = true;
            }
        }
        else {
            valid = true;
        }
        

        if (test4>0) {
            if (sum4 != 100) {
                var objShowCustomAlert = new ShowCustomAlert({
                    Title: "",
                    Message: "Sum of Pitta Types should be 100.",
                    Type: "alert",
                });
                objShowCustomAlert.ShowCustomAlertBox();
                valid = false;
                return false;
            }
            else {
                valid = true;
            }
        }
        else {
            valid = true;
        }
        
        if (test5>0) {
            if (sum5 != 100) {
                var objShowCustomAlert = new ShowCustomAlert({
                    Title: "",
                    Message: "Sum of Kapha Types should be 100.",
                    Type: "alert",
                });
                objShowCustomAlert.ShowCustomAlertBox();
                valid = false;
                return false;
            }
            else {
                valid = true;
            }
        }
        else {
            valid = true;
        }
        
        var urlBase = GetVirtualDirectory();
        var model = { PatientId: $scope.SelectedPatient.AdmitId, ExamDate: $("#txtExamDate").val(),Description:$("#txtDesc").val() };
        var request = { NadiPariksha: model, BaseList: requestList};
        if (valid) {
            ShowLoader();
            NadiPariksha.Save(request)
           .success(function (response) {
               HideLoader();
               $scope.Details = true;
               $scope.Add = false;
               $scope.Edit = false;
               GetNadiParikshaDetails();
           }).error(function (error) {
               HideLoader();
               var objShowCustomAlert = new ShowCustomAlert({
                   Title: "",
                   Message: "Records not found.",
                   Type: "alert",
               });
               objShowCustomAlert.ShowCustomAlertBox();
           });
        }
    }

    $scope.AddNewUI = function (isedit) {
        //$("#ddlPType").val(0);
        $scope.NadiParikshaModel = { NadiParikshaId: 0, ExamDate: "", PatientId: 0 };
        $scope.Details = false;
        $scope.Add = true;
        $scope.Edit = false;
    }

    $scope.First = function () {
        $scope.CurruntIndex = 0;
        $scope.SearchNadiParikshaList = $filter('limitTo')($scope.NadiParikshaList, $scope.Paging, 0);
    }

    $scope.init = function () {
        $(document).ready(function () {
            $('#txtExamDate').datetimepicker({
                timepicker: false,
                format: 'Y/m/d'
            });
        });
        GetNadiParikshaDetails();
    }

    $scope.init();

}]);