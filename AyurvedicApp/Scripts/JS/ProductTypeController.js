AyurvadApp.factory('ProductTypeService', ['$http', function ($http) {
    var urlBase = GetVirtualDirectory();
    var ReportService = {};
    ReportService.GetDetails = function (Id) {
        if (Id === undefined) {
            Id = 0
        }
        return $http.get(urlBase + "/ProductType/GetProductTypes");
    };

    ReportService.Save = function (model, IsEdit) {
        var url = urlBase + '/ProductType/Save';
        if (IsEdit == false) {
            url = urlBase + '/ProductType/Update';
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

AyurvadApp.controller("ProductTypeController", ['$scope', '$http', '$filter', '$rootScope', 'ProductTypeService', function ($scope, $http, $filter, $rootScope, ProductTypeService) {
    $scope.MainProductTypeList = [];

    $scope.ProductTypeList = [];
    $scope.SearchProductTypeList = [];

    $scope.Details = true;
    $scope.ErrorModel = { IsSelectProductType: false };
    $scope.ErrorMessage = ""
    $scope.Add = false;
    $scope.Edit = false;
    $scope.ProductTypeId = 0;
    $scope.Paging = 10;
    $scope.CurruntIndex = 0;
    $scope.ProductTypeModel = { ProductTypeId: 0, ProductType: "", Description: "" };

    $scope.Prefix = "";

    $scope.AddNewUI = function (isedit) {
        $scope.Details = false;
        $scope.Add = true;
        $scope.Edit = false;
    }


    function GetReportTypes() {
        ProductTypeService.GetDetails()
           .success(function (qualifications) {
               $scope.MainProductTypeList = qualifications.ProductTypeList;
               $scope.ProductTypeList = qualifications.ProductTypeList;
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
        //$scope.ProductTypeList = $filter('filter')(JSON.parse($("#ProductTypeList").val()), { ProductType: $scope.Prefix })
        var reg = new RegExp($scope.Prefix.toLowerCase());
        $scope.ProductTypeList = $scope.MainProductTypeList.filter(function (actype) {
            return (reg.test(actype.ProductType.toLowerCase()));
        });
        $scope.First();
    }

    $scope.Reset = function () {
        $scope.ProductTypeList = $scope.MainProductTypeList;
        $scope.SearchProductTypeList = $scope.ProductTypeList;
        $scope.First();
    }

    $scope.CancelClick = function () {
        $("#ProductType").val("");
        $("#Description").val("");
        $scope.Details = true;
        $scope.Add = false;
        $scope.Edit = false;
    }

    $scope.EditClick = function (ProductTypeModel) {
        $("#producttypeid").val(ProductTypeModel.ProcutTypeId);
        $("#ProductType").val(ProductTypeModel.ProductTyepe);
        $("#Description").val(ProductTypeModel.Description);
        $scope.Details = false;
        $scope.Add = false;
        $scope.Edit = true;
    }

    $scope.Save = function (isEdit) {
        if ($("#ProductType").val() == "") {
            $scope.ErrorModel.IsSelectProductType = true;
            $scope.ErrorMessage = "Product type should be filled.";
            return false;
        }
        else {
            $scope.ErrorModel.IsSelectSubledger = false;
        }

        var url = GetVirtualDirectory() + '/ProductType/Save';
        if (isEdit == false) {
            url = GetVirtualDirectory() + '/ProductType/Update';
        }
        var model = {};
        if (isEdit == false) {
            model = { ProductTyepe: $("#ProductType").val(), Description: $("#Description").val(), ProcutTypeId: $("#producttypeid").val() };
        }
        else {
            model = { ProductTyepe: $("#ProductType").val(), Description: $("#Description").val(), ProcutTypeId: 0 };
        }
        ProductTypeService.Save(model,isEdit)
           .success(function (qualifications) {
               HideLoader();
               var objShowCustomAlert = new ShowCustomAlert({
                   Title: "",
                   Message: "Record saved successfully.",
                   Type: "alert",
                   OnOKClick: function () {
                       $scope.Details = true;
                       $scope.Add = false;
                       $scope.Edit = false;
                       $scope.CancelClick();
                   }
               });
               objShowCustomAlert.ShowCustomAlertBox();
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
        $scope.SearchProductTypeList = $filter('limitTo')($scope.ProductTypeList, $scope.Paging, 0);
    }

    $scope.Prev = function () {
        $scope.CurruntIndex = $scope.CurruntIndex - $scope.Paging;
        if ($scope.CurruntIndex >= 0) {
            $scope.SearchProductTypeList = $filter('limitTo')($scope.ProductTypeList, $scope.Paging, $scope.CurruntIndex);
        }
        else {
            $scope.CurruntIndex = 0;
        }
    }

    $scope.Next = function () {
        $scope.CurruntIndex = $scope.CurruntIndex + $scope.Paging;
        if ($scope.CurruntIndex <= $scope.ProductTypeList.length) {
            $scope.SearchProductTypeList = $filter('limitTo')($scope.ProductTypeList, $scope.Paging, $scope.CurruntIndex);
        }
        else {
            $scope.Last();
        }
    }

    $scope.Last = function () {
        var total = $scope.ProductTypeList.length;
        var rem = parseInt($scope.ProductTypeList.length) % parseInt($scope.Paging);
        var position = $scope.ProductTypeList.length - $scope.Paging;
        if (rem > 0) {
            position = $scope.ProductTypeList.length - rem;
        }
        $scope.CurruntIndex = position;
        $scope.SearchProductTypeList = $filter('limitTo')($scope.ProductTypeList, $scope.Paging, position);
    }

    $scope.init = function () {
        GetReportTypes();
        //        $scope.MainProductTypeList=JSON.parse(data);
        //        $scope.ProductTypeList=$scope.MainProductTypeList;
        //        $scope.First();

    }

    $scope.init();

}]);