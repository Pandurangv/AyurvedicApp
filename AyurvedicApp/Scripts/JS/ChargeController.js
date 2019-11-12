AyurvadApp.factory('ChargeService', ['$http', function ($http) {
    var urlBase = GetVirtualDirectory();
    var ReportService = {};
    ReportService.GetDetails = function (Id) {
        if (Id === undefined) {
            Id = 0
        }
        return $http.get(urlBase + "/Charge/GetCharges");
    };

    ReportService.Save = function (model, IsEdit) {
        var url = urlBase + '/Charge/Save';
        if (IsEdit == false) {
            url = urlBase + '/Charge/Update';
        }
        var req = {
            method: 'POST',
            dataType: 'JSON',
            url: url,
            headers: {
                'Content-Type': 'application/json;'
            },
            data: model,
        }
        return $http(req);
    };
    return ReportService;
}]);

AyurvadApp.controller("ChargeController", ['$scope', '$http', '$filter', '$rootScope', 'ChargeService', function ($scope, $http, $filter, $rootScope, ChargeService) {
    $scope.MainChargeList = [];

    $scope.ChargeList = [];
    $scope.SearchChargeList = [];

    $scope.Details = true;
    $scope.ErrorModel = { IsSelectCharge: false, IsChargesAmount:false };
    $scope.ErrorMessage = ""
    $scope.Add = false;
    $scope.Edit = false;
    $scope.ChargeId = 0;
    $scope.Paging = 10;
    $scope.CurruntIndex = 0;
    $scope.ChargeModel = { ChargeId: 0, ChargesAmount: 0,ChargeName:"" };

    $scope.Prefix = "";

    $scope.AddNewUI = function (isedit) {
        $scope.ChargeModel = { ChargeId: 0, ChargesAmount: 0, ChargeName: "" };
        $scope.Details = false;
        $scope.Add = true;
        $scope.Edit = false;
    }


    function GetCharges() {
        ChargeService.GetDetails()
           .success(function (qualifications) {
               $scope.MainChargeList = qualifications.ChargeList;
               $scope.ChargeList = qualifications.ChargeList;
               $scope.First();
           }).error(function (error) {
               HideLoader();
               var objShowCustomAlert = new ShowCustomAlert({
                   Title: "",
                   Message: "Record not saved.",
                   Type: "alert",
               });
               objShowCustomAlert.ShowCustomAlertBox();
           });
    }

    $scope.FilterList = function () {
        //$scope.ChargeList = $filter('filter')(JSON.parse($("#ChargeList").val()), { Charge: $scope.Prefix })
        var reg = new RegExp($scope.Prefix.toLowerCase());
        $scope.ChargeList = $scope.MainChargeList.filter(function (actype) {
            return (reg.test(actype.Charge.toLowerCase()));
        });
        $scope.First();
    }

    $scope.Reset = function () {
        $scope.ChargeList = $scope.MainChargeList;
        $scope.SearchChargeList = $scope.ChargeList;
        $scope.First();
    }

    $scope.CancelClick = function () {
        $scope.ChargeModel = { ChargeId: 0, ChargesAmount: 0, ChargeName: "" };
        $scope.Details = true;
        $scope.Add = false;
        $scope.Edit = false;
    }

    $scope.EditClick = function (ChargeModel) {
        $scope.ChargeModel = ChargeModel;
        $scope.Details = false;
        $scope.Add = false;
        $scope.Edit = true;
    }

    $scope.Save = function (isEdit) {
        if ($scope.ChargeModel.ChargeName == "") {
            $scope.ErrorModel.IsSelectCharge = true;
            $scope.ErrorMessage = "Charge should be filled.";
            return false;
        }
        else {
            $scope.ErrorModel.IsSelectCharge = false;
        }
        if ($scope.ChargeModel.ChargesAmount == 0) {
            $scope.ErrorModel.IsChargesAmount = true;
            $scope.ErrorMessage = "Charge amount should be filled.";
            return false;
        }
        else {
            $scope.ErrorModel.IsChargesAmount = false;
        }
        var url = GetVirtualDirectory() + '/Charge/Save';
        if (isEdit == false) {
            url = GetVirtualDirectory() + '/Charge/Update';
        }
        var model = $scope.ChargeModel;
        
        ChargeService.Save(model, isEdit)
           .success(function (qualifications) {
               HideLoader();
               var objShowCustomAlert = new ShowCustomAlert({
                   Title: "",
                   Message: "Record saved successfully.",
                   Type: "alert",
               });
               objShowCustomAlert.ShowCustomAlertBox();
               $scope.CancelClick();

           }).error(function (error) {
               HideLoader();
               var objShowCustomAlert = new ShowCustomAlert({
                   Title: "",
                   Message: "Record not saved.",
                   Type: "alert",
               });
               objShowCustomAlert.ShowCustomAlertBox();
           });
    }

    $scope.First = function () {
        $scope.CurruntIndex = 0;
        $scope.SearchChargeList = $filter('limitTo')($scope.ChargeList, $scope.Paging, 0);
    }

    $scope.Prev = function () {
        $scope.CurruntIndex = $scope.CurruntIndex - $scope.Paging;
        if ($scope.CurruntIndex >= 0) {
            $scope.SearchChargeList = $filter('limitTo')($scope.ChargeList, $scope.Paging, $scope.CurruntIndex);
        }
        else {
            $scope.CurruntIndex = 0;
        }
    }

    $scope.Next = function () {
        $scope.CurruntIndex = $scope.CurruntIndex + $scope.Paging;
        if ($scope.CurruntIndex <= $scope.ChargeList.length) {
            $scope.SearchChargeList = $filter('limitTo')($scope.ChargeList, $scope.Paging, $scope.CurruntIndex);
        }
        else {
            $scope.Last();
        }
    }

    $scope.Last = function () {
        var total = $scope.ChargeList.length;
        var rem = parseInt($scope.ChargeList.length) % parseInt($scope.Paging);
        var position = $scope.ChargeList.length - $scope.Paging;
        if (rem > 0) {
            position = $scope.ChargeList.length - rem;
        }
        $scope.CurruntIndex = position;
        $scope.SearchChargeList = $filter('limitTo')($scope.ChargeList, $scope.Paging, position);
    }

    $scope.init = function () {
        GetCharges();
    }

    $scope.init();

}]);