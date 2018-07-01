AyurvadApp.factory('Readmit', ['$http', function ($http) {

    var urlBase = GetVirtualDirectory();
    var ReportService = {};

    ReportService.GetAdmitPatientList = function (Id) {
        return $http.get(urlBase + "/Readmit/GetAdmitPatientList");
    };

    ReportService.GetPrescriptionResult = function (PrescriptionId) {
        return $http.get(urlBase + "/Readmit/GetPrescriptionResult?PrescriptionId=" + PrescriptionId);
    }

    ReportService.GetCharges = function (AdmitId) {
        return $http.get(urlBase + "/Readmit/GetCharges?AdmitId=" + AdmitId);
    }


    ReportService.Save = function (model, IsEdit) {
        //var list = BaseList;
        var url = urlBase + '/Readmit/Save';
        if (IsEdit == false) {
            url = urlBase + '/Readmit/Update';
        }
        var req = {
            method: 'POST',
            dataType: 'JSON',
            url: url,
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            data: model,
        }
        return $http(req);
    };

    return ReportService;
}]);
AyurvadApp.controller("ReadmitController", ['$scope', '$http', '$filter', '$rootScope', 'Readmit', function ($scope, $http, $filter, $rootScope, Readmit) {

    //$scope.ProductList = [];
    $scope.MainAdmitPatientList = [];

    //$scope.PatientList = [];

    $scope.PatientList = [];

    $scope.AdmitPatientList = [];
    $scope.SearchAdmitPatientList = [];

    $scope.SelectedProductType = 0;

    $scope.Details = true;
    $scope.Add = false;
    $scope.Edit = false;
    $scope.Report = false;

    $scope.ErrorModel = { IsPatientName: false };
    $scope.ErrorMessage = ""

    $scope.AdmitId = 0;
    //$scope.ProductId = 0;
    $scope.Paging = 10;
    $scope.CurruntIndex = 0;
    $scope.SelectedPatient = {};

    //$scope.SelectedProduct = {};

    $scope.ReadmitModel = { AdmitId: 0, AdmitDate: "", Dignosys: "",PKId:0,IsIPD:false };


    $scope.Prefix = "";

    

    $scope.Save = function () {
        var flag = true;
        if ($scope.SelectedPatient.PKId == "0") {
            var objShowCustomAlert = new ShowCustomAlert({
                Title: "",
                Message: "Please select Patient Name",
                Type: "alert",
            });
            objShowCustomAlert.ShowCustomAlertBox();
            flag = false;
        }
        else {
            flag = true;
        }
        
        if (flag) {
            $scope.ReadmitModel.PatientId = $scope.SelectedPatient.PKId;
            //$scope.ReadmitModel.AdmitDate = $("#txtExamDate").val();
            
            ShowLoader();
            Readmit.Save($scope.ReadmitModel)
               .success(function (qualifications) {
                   HideLoader();
                   var objShowCustomAlert = new ShowCustomAlert({
                       Title: "",
                       Message: "Records saved successfully.",
                       Type: "alert",
                   });
                   objShowCustomAlert.ShowCustomAlertBox();

                   GetAdmitPatientList();

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

    $scope.CancelClick = function () {
        $scope.Details = true;
        $scope.Add = false;
        $scope.Edit = false;
        $scope.Report = false;
        GetAdmitPatientList();
    }



    $scope.IsDisable = false;

    

    $scope.Prev = function () {
        $scope.CurruntIndex = $scope.CurruntIndex - $scope.Paging;
        if ($scope.CurruntIndex >= 0) {
            $scope.SearchAdmitPatientList = $filter('limitTo')($scope.AdmitPatientList, $scope.Paging, $scope.CurruntIndex);
        }
        else {
            $scope.CurruntIndex = 0;
        }
    }

    $scope.Next = function () {
        $scope.CurruntIndex = $scope.CurruntIndex + $scope.Paging;
        if ($scope.CurruntIndex <= $scope.AdmitPatientList.length) {
            $scope.SearchAdmitPatientList = $filter('limitTo')($scope.AdmitPatientList, $scope.Paging, $scope.CurruntIndex);
        }
        else {
            $scope.Last();
        }
    }

    $scope.FilterList = function () {
        var reg = new RegExp($scope.Prefix.toLowerCase());
        $scope.AdmitPatientList = $scope.MainAdmitPatientList.filter(function (actype) {
            return (reg.test(actype.PatientName.toLowerCase()));
        });
        $scope.First();
    }

    $scope.Last = function () {
        var total = $scope.AdmitPatientList.length;
        var rem = parseInt($scope.AdmitPatientList.length) % parseInt($scope.Paging);
        var position = $scope.AdmitPatientList.length - $scope.Paging;
        if (rem > 0) {
            position = $scope.AdmitPatientList.length - rem;
        }
        $scope.CurruntIndex = position;
        $scope.SearchAdmitPatientList = $filter('limitTo')($scope.AdmitPatientList, $scope.Paging, position);
    }

    function GetAdmitPatientList() {
        ShowLoader();
        Readmit.GetAdmitPatientList()
           .success(function (qualifications) {
               $scope.Details = true;
               $scope.Add = false;
               $scope.Edit = false;
               $scope.Report = false;
               $scope.PatientList = qualifications.PatientList;
               
               //$("#txtExamDate").val("");
               var patient = { PKId: 0, Name: "---Select Patient---" };
               $scope.PatientList.splice(0, 0, patient);
               $scope.MainAdmitPatientList = qualifications.AdmitPatientList;
               $scope.AdmitPatientList = qualifications.AdmitPatientList;
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

    $scope.AddNewUI = function (isedit) {
        //$("#ddlPType").val(0);
        $scope.ReadmitModel = { AdmitId: 0, AdmitDate: "", Dignosys: "",PatientId:0 };
        //$("#txtExamDate").val("");
        $scope.Details = false;
        $scope.Add = true;
        $scope.Edit = false;
        $scope.Report = false;
    }

    $scope.First = function () {
        $scope.CurruntIndex = 0;
        $scope.SearchAdmitPatientList = $filter('limitTo')($scope.AdmitPatientList, $scope.Paging, 0);
    }

    $scope.init = function () {
        //$(document).ready(function () {
        //    $('#txtExamDate').datetimepicker({
        //        timepicker: false,
        //        format: 'Y/m/d'
        //    });
        //});
        GetAdmitPatientList();
    }

    $scope.init();

}]);