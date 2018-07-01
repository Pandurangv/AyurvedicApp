AyurvadApp.factory('ReceiptService', ['$http', function ($http) {
    var urlBase = GetVirtualDirectory();
    var ReportService = {};
    ReportService.GetReceipts = function (Id) {
        if (Id===undefined) {
            Id=0
        }
        return $http.get(urlBase + "/Receipt/GetReceipts");
    };

    ReportService.Save = function (model) {
        var req = {
            method: 'POST',
            dataType: 'JSON',
            url: urlBase + "/Receipt/Save",
            headers: {
                'Content-Type': 'application/json;'
            },
            data: model,
        }
        return $http(req);
    };

    ReportService.GetOutstanding = function (PatientId) {
        return $http.get(urlBase + "/Receipt/GetOutstanding?PatientId="+PatientId);
    };

    //ReportService.MarriageDone = function (UserId) {
    //    return $http.post(urlBase + "/Rugnapatrika/MarriageDone", { UserId: UserId });
    //};

    //ReportService.SendSMS = function (UserId) {
    //    return $http.post(urlBase + "/Rugnapatrika/SendSMS", { UserId: UserId });
    //};

    return ReportService;
}]);
AyurvadApp.controller("ReceiptController", ['$scope', '$http', '$filter', '$rootScope', 'ReceiptService', function ($scope, $http, $filter, $rootScope, ReceiptService) {
    $scope.ErrorDetails =
        {
            ErrorMessage: "",
            IsName: false,
            IsAmount: false
        };

    $scope.MainReceiptList = [];

    $scope.PatientList = [];

    $scope.ReceiptList = [];
    $scope.SearchReceiptList = [];

    $scope.Details = true;
    $scope.Add = false;
    $scope.Edit = false;
    $scope.Report = false;

    $scope.ErrorMessage = ""

    $scope.ReceiptNo = 0;
    $scope.Paging = 10;
    $scope.CurruntIndex = 0;
    $scope.SelectedPatient = {};


    $scope.Prefix = "";

    $scope.ReceiptModel =
    {
        AdmitId: 0,
        ReceiptDate: new Date(),
        Description: "",
        Amount: 0,
        ReceiptNo:0,
    }

    $scope.CancelClick = function () {
        $scope.Details = true;
        $scope.Add = false;
        $scope.Edit = false;
        $scope.Report = false;
        GetReceipts();
    }
    
    $scope.Prev = function () {
        $scope.CurruntIndex = $scope.CurruntIndex - $scope.Paging;
        if ($scope.CurruntIndex >= 0) {
            $scope.SearchReceiptList = $filter('limitTo')($scope.ReceiptList, $scope.Paging, $scope.CurruntIndex);
        }
        else {
            $scope.CurruntIndex = 0;
        }
    }

    $scope.Next = function () {
        $scope.CurruntIndex = $scope.CurruntIndex + $scope.Paging;
        if ($scope.CurruntIndex <= $scope.ReceiptList.length) {
            $scope.SearchReceiptList = $filter('limitTo')($scope.ReceiptList, $scope.Paging, $scope.CurruntIndex);
        }
        else {
            $scope.Last();
        }
    }

    $scope.FilterList = function () {
        var reg = new RegExp($scope.Prefix.toLowerCase());
        $scope.ReceiptList = $scope.MainReceiptList.filter(function (actype) {
            return (reg.test(actype.PatientName.toLowerCase()));
        });
        $scope.First();
    }

    $scope.Last = function () {
        var total = $scope.ReceiptList.length;
        var rem = parseInt($scope.ReceiptList.length) % parseInt($scope.Paging);
        var position = $scope.ReceiptList.length - $scope.Paging;
        if (rem > 0) {
            position = $scope.ReceiptList.length - rem;
        }
        $scope.CurruntIndex = position;
        $scope.SearchReceiptList = $filter('limitTo')($scope.ReceiptList, $scope.Paging, position);
    }

    $scope.ReceiptResult = {};
    $scope.AmountInWords = "";

    $scope.GetReceiptResult = function (model)
    {
        $scope.Details = false;
        $scope.Add = false;
        $scope.Edit = false;
        $scope.Report = true;
        $scope.AmountInWords=convertNumberToWords(model.Amount);
        $scope.ReceiptResult = model;
    }

    $scope.PrintClick = function (model)
    {
        console.log(model);
        $scope.ReceiptResult = model;
    }

    $scope.AddNewUI = function (isedit) {
        //$("#ddlPType").val(0);
        $scope.PrescriptionModel = { PrescriptionId: 0, Prescription_Date: "", AdmitId: 0 };
        $("#txtExamDate").val("");
        $scope.Details = false;
        $scope.Add = true;
        $scope.Edit = false;
        $scope.Report = false;
    }

    $scope.First = function () {
        $scope.CurruntIndex = 0;
        $scope.SearchReceiptList = $filter('limitTo')($scope.ReceiptList, $scope.Paging, 0);
    }

    $scope.Save = function () {
        if ($scope.SelectedPatient.PKId == 0) {
            var objShowCustomAlert = new ShowCustomAlert({
                Title: "",
                Message: "Please fill Gender.",
                Type: "alert"
            });
            objShowCustomAlert.ShowCustomAlertBox();
            return false;
        }
        if ($scope.ReceiptModel.Amount == "") {
            var objShowCustomAlert = new ShowCustomAlert({
                Title: "",
                Message: "Please fill Amount.",
                Type: "alert"
            });
            objShowCustomAlert.ShowCustomAlertBox();
            return false;
        }
        $scope.ReceiptModel.ReceiptDate = $("#txtReceiptDate").val();
        $scope.ReceiptModel.AdmitId = $scope.SelectedPatient.PKId;
        ShowLoader();

        ReceiptService.Save($scope.ReceiptModel)
           .success(function (qualifications) {
               HideLoader();
               var objShowCustomAlert = new ShowCustomAlert({
                   Title: "",
                   Message: "Record saved successfully.",
                   Type: "alert",
               });
               objShowCustomAlert.ShowCustomAlertBox();
               $scope.CancelClick();
               GetReceipts();
           }).error(function (error) {
               HideLoader();
               findAndCallErrorBox("", response.data.Error.Message, "alert", null, null);
           });

    }

    $scope.Outstanding = 0;

    $scope.GetOutstanding = function (Patient)
    {
        ShowLoader();
        ReceiptService.GetOutstanding(Patient.PKId)
           .success(function (qualifications) {
               $scope.Outstanding = qualifications;
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

    function GetReceipts() {
        ShowLoader();
        ReceiptService.GetReceipts()
           .success(function (qualifications) {
               $scope.Details = true;
               $scope.Add = false;
               $scope.Edit = false;
               $scope.Report = false;
               $scope.PatientList = qualifications.PatientList;
               $("#txtReceiptDate").val("");
               var patient = { PKId: 0, Name: "---Select Patient---" };
               $scope.PatientList.splice(0, 0, patient);
               $scope.MainReceiptList = qualifications.ReceiptList;
               $scope.ReceiptList = qualifications.ReceiptList;
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

    $scope.init = function () {
        $(document).ready(function () {
            $('#txtReceiptDate').datetimepicker({
                timepicker: false,
                format: 'Y/m/d'
            });
        });
        GetReceipts();
    }

    $scope.init();
}]);