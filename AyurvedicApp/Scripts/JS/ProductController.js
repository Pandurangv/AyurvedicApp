AyurvadApp.factory('ProductService', ['$http', function ($http) {
    var urlBase = GetVirtualDirectory();
    var ReportService = {};

    ReportService.GetProductTypeDetails = function (Id) {
        if (Id === undefined) {
            Id = 0
        }
        return $http.get(urlBase + "/ProductType/GetProductTypes");
    };

    ReportService.GetProducts = function (Id) {
        if (Id === undefined) {
            Id = 0
        }
        return $http.get(urlBase + "/Product/GetProducts");
    };

    ReportService.Save = function (model, IsEdit) {
        var url = urlBase + '/Product/Save';
        if (IsEdit == false) {
            url = urlBase + '/Product/Update';
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

AyurvadApp.controller("ProductController", ['$scope', '$http', '$filter', '$rootScope','ProductService', function ($scope, $http, $filter, $rootScope,ProductService) {

    $scope.ProductTypeList = [];
    $scope.MainProductList = [];

    $scope.ProductList = [];
    $scope.SearchProductList = [];

    $scope.SelectedProductType = 0;

    $scope.Details = true;
    $scope.ErrorModel = { IsProductName: false, IsUOM: false, IsPrice: false, IsProductType: false };
    $scope.ErrorMessage = ""
    $scope.Add = false;
    $scope.Edit = false;
    $scope.ProductId = 0;
    $scope.ProductTypeId = 0;
    $scope.Paging = 10;
    $scope.CurruntIndex = 0;
    $scope.ProductModel = { ProductId: 0, ProductName: "", UOM: "", SubUOM: "", Price: 0, Content: "", ProductTypeId: 0 };

    $scope.Prefix = "";

    $scope.AddNewUI = function (isedit) {
        $("#ddlPType").val(0);
        $scope.ProductModel = { ProductId: 0, ProductName: "", UOM: "", SubUOM: "", Price: 0, Content: "", ProductTypeId: 0 };
        $scope.Details = false;
        $scope.Add = true;
        $scope.Edit = false;
    }


    function GetReportTypes() {
        ProductService.GetProductTypeDetails()
           .success(function (qualifications) {
               $scope.ProductTypeList = qualifications.ProductTypeList;
               $scope.ProductTypeList.splice(0, 0, { ProductTypeId: 0, ProductTyepe: "---Select---" });
               var html = "";
               var html = "";
               angular.forEach($scope.ProductTypeList, function (value, key) {
                   html += '<option value="' + value.ProductTypeId + '">' + value.ProductTyepe + '</option>';
               });
               $("#ddlPType").html(html);
               $("#ddlPType").val(0);
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

    function GetProducts() {
        ProductService.GetProducts()
           .success(function (response) {
               $scope.MainProductList = response.ProductList;
               $scope.ProductList = $scope.MainProductList;
               $scope.First();
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


    $scope.FilterList = function () {
        var reg = new RegExp($scope.Prefix.toLowerCase());
        $scope.ProductList = $scope.MainProductList.filter(function (actype) {
            return (reg.test(actype.ProductName.toLowerCase()));
        });
        $scope.First();
    }

    $scope.Reset = function () {
        $scope.ProductList = $scope.MainProductList;
        $scope.SearchProductList = $scope.ProductList;
        $scope.First();
    }

    $scope.CancelClick = function () {
        $scope.Details = true;
        $scope.Add = false;
        $scope.Edit = false;
    }

    $scope.EditClick = function (ProductTypeModel) {
        $scope.ProductModel = { ProductId: ProductTypeModel.ProductId, ProductName: ProductTypeModel.ProductName, UOM: ProductTypeModel.UOM, SubUOM: ProductTypeModel.SubUOM, Price: ProductTypeModel.Price, Content: ProductTypeModel.Content, ProductTypeId: 0 };
        $("#ddlPType").val(ProductTypeModel.ProductTypeId);
        $("#txtPrice").val(ProductTypeModel.Price);
        $scope.ProductModel.ProductContent = ProductTypeModel.ProductContent;
        $scope.Details = false;
        $scope.Add = false;
        $scope.Edit = true;
    }

    $scope.Save = function (isEdit) {
        if ($("#ddlPType").val() == "0") {
            $scope.ErrorModel.IsProductType = true;
            $scope.ErrorMessage = "Product type should be selected.";
            return false;
        }
        else {
            $scope.ErrorModel.IsProductType = false;
        }
        if ($scope.ProductModel.ProductName == "") {
            $scope.ErrorModel.IsProductName = true;
            $scope.ErrorMessage = "Product name should be filled.";
            return false;
        }
        else {
            $scope.ErrorModel.IsProductName = false;
        }
        if ($scope.ProductModel.UOM == "") {
            $scope.ErrorModel.IsUOM = true;
            $scope.ErrorMessage = "U. O. M. should be selected.";
            return false;
        }
        else {
            $scope.ErrorModel.IsUOM = false;
        }

        if ($("#txtPrice").val() == "") {
            $scope.ErrorModel.IsPrice = true;
            $scope.ErrorMessage = "Price should be selected.";
            return false;
        }
        else {
            $scope.ErrorModel.IsPrice = false;
        }
        $scope.ProductModel.Price = $("#txtPrice").val();
        
        var model = {};
        $scope.ProductModel.ProductTypeId = $("#ddlPType").val();
        ProductService.Save($scope.ProductModel, isEdit)
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
                       GetProducts();
                   }
               });
               objShowCustomAlert.ShowCustomAlertBox();
           },
        function (response) {

        });
    }

    $scope.First = function () {
        $scope.CurruntIndex = 0;
        $scope.SearchProductList = $filter('limitTo')($scope.ProductList, $scope.Paging, 0);
    }

    $scope.Prev = function () {
        $scope.CurruntIndex = $scope.CurruntIndex - $scope.Paging;
        if ($scope.CurruntIndex >= 0) {
            $scope.SearchProductList = $filter('limitTo')($scope.ProductList, $scope.Paging, $scope.CurruntIndex);
        }
        else {
            $scope.CurruntIndex = 0;
        }
    }

    $scope.Next = function () {
        $scope.CurruntIndex = $scope.CurruntIndex + $scope.Paging;
        if ($scope.CurruntIndex <= $scope.ProductList.length) {
            $scope.SearchProductList = $filter('limitTo')($scope.ProductList, $scope.Paging, $scope.CurruntIndex);
        }
        else {
            $scope.Last();
        }
    }

    $scope.Last = function () {
        var total = $scope.ProductList.length;
        var rem = parseInt($scope.ProductList.length) % parseInt($scope.Paging);
        var position = $scope.ProductList.length - $scope.Paging;
        if (rem > 0) {
            position = $scope.ProductList.length - rem;
        }
        $scope.CurruntIndex = position;
        $scope.SearchProductList = $filter('limitTo')($scope.ProductList, $scope.Paging, position);
    }

    $scope.init = function () {
        GetReportTypes();
        GetProducts();
    }

    $scope.init();

}]);