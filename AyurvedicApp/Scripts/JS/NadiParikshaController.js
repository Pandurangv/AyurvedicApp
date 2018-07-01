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
                    var barchartContainer = document.getElementById("barchartContainer").getContext('2d');
                   var chartdata = new Chart(barchartContainer, {
                       type: 'bar',
                       data: {
                           labels:
                               [
                                   $scope.NadiParikshaResult[0].ParamName,
                                   $scope.NadiParikshaResult[1].ParamName,
                                   $scope.NadiParikshaResult[2].ParamName,
                               ],
                           datasets: [{
                               label: $scope.NadiParikshaResult[0].ParamName,
                               data: [
                                   $scope.NadiParikshaResult[0].Result,
                                   $scope.NadiParikshaResult[1].Result,
                                   $scope.NadiParikshaResult[2].Result
                               ],
                               backgroundColor: [
                                   "#55B2D7",
                                   "#DA4940",
                                   "#78D755",
                               ],
                               borderColor: [
                                   "#55B2D7",
                                   "#DA4940",
                                   "#78D755",
                               ],
                               borderWidth: 1
                           }]
                       },
                       options: {
                           scales: {
                               yAxes: [{
                                   ticks: {
                                       beginAtZero: true
                                   }
                               }]
                           }
                       }
                   });
                   
                   var ctx = document.getElementById("chartContainer").getContext('2d');
                   var config = {
                       type: 'pie',
                       data: {
                           datasets: [{
                               data: [
                                   $scope.NadiParikshaResult[0].Result,
                                   $scope.NadiParikshaResult[1].Result,
                                   $scope.NadiParikshaResult[2].Result,
                               ],
                               backgroundColor: [
                                   "#55B2D7",
                                   "#DA4940",
                                   "#78D755",
                               ],
                               label: 'Vata, Pitta and Kapha'
                           }],
                           labels: [
                               $scope.NadiParikshaResult[0].ParamName + " " + $scope.NadiParikshaResult[0].Result + "%",
                               $scope.NadiParikshaResult[1].ParamName + " " + $scope.NadiParikshaResult[1].Result + "%",
                               $scope.NadiParikshaResult[2].ParamName + " " + $scope.NadiParikshaResult[2].Result + "%"
                           ]
                       },
                       options: {
                           responsive: true
                       }
                   };
                   window.myPie = new Chart(ctx, config);
               }
               
               if ($scope.NadiParikshaResult[3].Result > 0 && $scope.NadiParikshaResult[4].Result > 0 && $scope.NadiParikshaResult[5].Result > 0) {
                   flag = true;
                   var barchartContainer1 = document.getElementById("barchartContainer1").getContext('2d');
                   chartdata = new Chart(barchartContainer1, {
                       type: 'bar',
                       data: {
                           labels:
                               [
                                    $scope.NadiParikshaResult[3].ParamName,
                                    $scope.NadiParikshaResult[4].ParamName,
                                    $scope.NadiParikshaResult[5].ParamName,
                               ],
                           datasets: [{
                               label: $scope.NadiParikshaResult[3].ParamName,
                               data: [
                                   $scope.NadiParikshaResult[3].Result,
                                   $scope.NadiParikshaResult[4].Result,
                                   $scope.NadiParikshaResult[5].Result
                               ],
                               backgroundColor: [
                                   "#55B2D7",
                                   "#DA4940",
                                   "#78D755",
                               ],
                               borderColor: [
                                   "#55B2D7",
                                   "#DA4940",
                                   "#78D755",
                               ],
                               borderWidth: 1
                           }]
                       },
                       options: {
                           scales: {
                               yAxes: [{
                                   ticks: {
                                       beginAtZero: true
                                   }
                               }]
                           }
                       }
                   });

                   var ctx1 = document.getElementById("chartContainer1").getContext('2d');

                   var config1 = {
                       type: 'pie',
                       data: {
                           datasets: [{
                               data: [
                                   $scope.NadiParikshaResult[3].Result,
                                   $scope.NadiParikshaResult[4].Result,
                                   $scope.NadiParikshaResult[5].Result,
                               ],
                               backgroundColor: [
                                   "#55B2D7",
                                   "#DA4940",
                                   "#78D755",
                               ],
                               label: 'Satwa, Rajas and Tama'
                           }],
                           labels: [
                               $scope.NadiParikshaResult[3].ParamName + " " + $scope.NadiParikshaResult[3].Result + "%",
                               $scope.NadiParikshaResult[4].ParamName + " " + $scope.NadiParikshaResult[4].Result + "%",
                               $scope.NadiParikshaResult[5].ParamName + " " + $scope.NadiParikshaResult[5].Result + "%",
                           ]
                       },
                       options: {
                           responsive: true
                       }
                   };
                   window.myPie = new Chart(ctx1, config1);
               }
               
               if ($scope.NadiParikshaResult[6].Result > 0 && $scope.NadiParikshaResult[7].Result > 0 && $scope.NadiParikshaResult[8].Result > 0 &&
                   $scope.NadiParikshaResult[9].Result > 0 &&
                   $scope.NadiParikshaResult[10].Result > 0
                   ) {
                   flag = true;
                   var barchartContainer2 = document.getElementById("barchartContainer2").getContext('2d');
                   var chartdata = new Chart(barchartContainer2, {
                   type: 'bar',
                   data: {
                       labels:
                           [
                               $scope.NadiParikshaResult[6].Result,
                               $scope.NadiParikshaResult[7].Result,
                               $scope.NadiParikshaResult[8].Result,
                               $scope.NadiParikshaResult[9].Result,
                               $scope.NadiParikshaResult[10].Result,
                           ],
                       datasets: [{
                           label: $scope.NadiParikshaResult[6].ParamName,
                           data: [
                               $scope.NadiParikshaResult[6].Result,
                               $scope.NadiParikshaResult[7].Result,
                               $scope.NadiParikshaResult[8].Result,
                               $scope.NadiParikshaResult[9].Result,
                               $scope.NadiParikshaResult[10].Result,
                           ],
                           backgroundColor: [
                               "#33FFB2",
                               "#35B384",
                               "#49CB9A",
                               "#43B8A6",
                               "#2582A2",
                           ],
                           borderColor: [
                               "#33FFB2",
                               "#35B384",
                               "#49CB9A",
                               "#43B8A6",
                               "#2582A2",
                           ],
                           borderWidth: 1
                       }]
                   },
                   options: {
                       scales: {
                           yAxes: [{
                               ticks: {
                                   beginAtZero: true
                               }
                           }]
                       }
                   }
               });

               
               var ctx2 = document.getElementById("chartContainer2").getContext('2d');

               var config2 = {
                   type: 'pie',
                   data: {
                       datasets: [{
                           data: [
                               $scope.NadiParikshaResult[6].Result,
                               $scope.NadiParikshaResult[7].Result,
                               $scope.NadiParikshaResult[8].Result,
                               $scope.NadiParikshaResult[9].Result,
                               $scope.NadiParikshaResult[10].Result,
                           ],
                           backgroundColor: [
                               "#33FFB2",
                               "#35B384",
                               "#49CB9A",
                               "#43B8A6",
                               "#2582A2",
                           ],
                           label: 'Types of Vata'
                       }],
                       labels: [
                               $scope.NadiParikshaResult[6].ParamName + " " + $scope.NadiParikshaResult[6].Result + "%",
                               $scope.NadiParikshaResult[7].ParamName + " " + $scope.NadiParikshaResult[7].Result + "%",
                               $scope.NadiParikshaResult[8].ParamName + " " + $scope.NadiParikshaResult[8].Result + "%",
                               $scope.NadiParikshaResult[9].ParamName + " " + $scope.NadiParikshaResult[9].Result + "%",
                               $scope.NadiParikshaResult[10].ParamName + " " + $scope.NadiParikshaResult[10].Result + "%",
                            ]
                   },
                   options: {
                       responsive: true
                   }
               };
               window.myPie = new Chart(ctx2, config2);
               }
               

               if ($scope.NadiParikshaResult[11].Result > 0 && $scope.NadiParikshaResult[12].Result > 0 && $scope.NadiParikshaResult[13].Result > 0 &&
                   $scope.NadiParikshaResult[14].Result > 0 &&
                   $scope.NadiParikshaResult[15].Result > 0
                   ) {
                   flag = true;
                   var barchartContainer3 = document.getElementById("barchartContainer3").getContext('2d');
                   var chartdata = new Chart(barchartContainer3, {
                       type: 'bar',
                       data: {
                           labels:
                               [
                                   $scope.NadiParikshaResult[11].ParamName,
                                   $scope.NadiParikshaResult[12].ParamName,
                                   $scope.NadiParikshaResult[13].ParamName,
                                   $scope.NadiParikshaResult[14].ParamName,
                                   $scope.NadiParikshaResult[15].ParamName,
                               ],
                           datasets: [{
                               label: $scope.NadiParikshaResult[16].ParamName,
                               data: [
                                   $scope.NadiParikshaResult[11].Result,
                                   $scope.NadiParikshaResult[12].Result,
                                   $scope.NadiParikshaResult[13].Result,
                                   $scope.NadiParikshaResult[14].Result,
                                   $scope.NadiParikshaResult[15].Result,
                               ],
                               backgroundColor: [
                                   "#DA4940",
                                   "#EF3C31",
                                   "#B51A10",
                                   "#B72B22",
                                   "#BC453E",
                               ],
                               borderColor: [
                                   "#DA4940",
                                   "#EF3C31",
                                   "#B51A10",
                                   "#B72B22",
                                   "#BC453E",
                               ],
                               borderWidth: 1
                           }]
                       },
                       options: {
                           scales: {
                               yAxes: [{
                                   ticks: {
                                       beginAtZero: true
                                   }
                               }]
                           }
                       }
                   });


                   var ctx3 = document.getElementById("chartContainer3").getContext('2d');

                   var config3 = {
                       type: 'pie',
                       data: {
                           datasets: [{
                               data: [
                                   $scope.NadiParikshaResult[11].Result,
                                   $scope.NadiParikshaResult[12].Result,
                                   $scope.NadiParikshaResult[13].Result,
                                   $scope.NadiParikshaResult[14].Result,
                                   $scope.NadiParikshaResult[15].Result,
                               ],
                               backgroundColor: [
                                   "#DA4940",
                                   "#EF3C31",
                                   "#B51A10",
                                   "#B72B22",
                                   "#BC453E",
                               ],
                               label: 'Types of Pitta'
                           }],
                           labels: [
                                   $scope.NadiParikshaResult[11].ParamName + " " + $scope.NadiParikshaResult[11].Result + "%",
                                   $scope.NadiParikshaResult[12].ParamName + " " + $scope.NadiParikshaResult[12].Result + "%",
                                   $scope.NadiParikshaResult[13].ParamName + " " + $scope.NadiParikshaResult[13].Result + "%",
                                   $scope.NadiParikshaResult[14].ParamName + " " + $scope.NadiParikshaResult[14].Result + "%",
                                   $scope.NadiParikshaResult[15].ParamName + " " + $scope.NadiParikshaResult[15].Result + "%",
                           ]
                       },
                       options: {
                           responsive: true
                       }
                   };
                   window.myPie = new Chart(ctx3, config3);
               }

               

               if ($scope.NadiParikshaResult[16].Result > 0 && $scope.NadiParikshaResult[17].Result > 0 && $scope.NadiParikshaResult[18].Result > 0 &&
                   $scope.NadiParikshaResult[19].Result > 0 &&
                   $scope.NadiParikshaResult[20].Result > 0
                   ) {
                   flag = true;
                   var barchartContainer4 = document.getElementById("barchartContainer4").getContext('2d');
                   var chartdata = new Chart(barchartContainer4, {
                       type: 'bar',
                       data: {
                           labels:
                               [
                                   $scope.NadiParikshaResult[16].ParamName,
                                   $scope.NadiParikshaResult[17].ParamName,
                                   $scope.NadiParikshaResult[18].ParamName,
                                   $scope.NadiParikshaResult[19].ParamName,
                                   $scope.NadiParikshaResult[20].ParamName,
                               ],
                           datasets: [{
                               label: $scope.NadiParikshaResult[16].ParamName,
                               data: [
                                   $scope.NadiParikshaResult[16].Result,
                                   $scope.NadiParikshaResult[17].Result,
                                   $scope.NadiParikshaResult[18].Result,
                                   $scope.NadiParikshaResult[19].Result,
                                   $scope.NadiParikshaResult[20].Result,
                               ],
                               backgroundColor: [
                                   "#62BC3E",
                                   "#59BE31",
                                   "#4FC122",
                                   "#71E742",
                                   "#5CEC23",
                               ],
                               borderColor: [
                                   "#62BC3E",
                                   "#59BE31",
                                   "#4FC122",
                                   "#71E742",
                                   "#5CEC23",
                               ],
                               borderWidth: 1
                           }]
                       },
                       options: {
                           scales: {
                               yAxes: [{
                                   ticks: {
                                       beginAtZero: true
                                   }
                               }]
                           }
                       }
                   });


                   var ctx4 = document.getElementById("chartContainer4").getContext('2d');

                   var config4 = {
                       type: 'pie',
                       data: {
                           datasets: [{
                               data: [
                                   $scope.NadiParikshaResult[16].Result,
                                   $scope.NadiParikshaResult[17].Result,
                                   $scope.NadiParikshaResult[18].Result,
                                   $scope.NadiParikshaResult[19].Result,
                                   $scope.NadiParikshaResult[20].Result,
                               ],
                               backgroundColor: [
                                   "#62BC3E",
                                   "#59BE31",
                                   "#4FC122",
                                   "#71E742",
                                   "#5CEC23",
                               ],
                               label: 'Types of Kapha'
                           }],
                           labels: [
                                   $scope.NadiParikshaResult[16].ParamName + " " + $scope.NadiParikshaResult[16].Result + "%",
                                   $scope.NadiParikshaResult[17].ParamName + " " + $scope.NadiParikshaResult[17].Result + "%",
                                   $scope.NadiParikshaResult[18].ParamName + " " + $scope.NadiParikshaResult[18].Result + "%",
                                   $scope.NadiParikshaResult[19].ParamName + " " + $scope.NadiParikshaResult[19].Result + "%",
                                   $scope.NadiParikshaResult[20].ParamName + " " + $scope.NadiParikshaResult[20].Result + "%",
                           ]
                       },
                       options: {
                           responsive: true
                       }
                   };
                   window.myPie = new Chart(ctx4, config4);
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