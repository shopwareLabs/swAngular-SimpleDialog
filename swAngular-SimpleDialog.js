angular.module('swAngularSimpleDialog', [])
    .directive('swAngularSimpleDialog', function ($compile, $sce) {
        return {
            restrict: "A",
            scope: {
                instantContent: '@swAngularSimpleDialog',
                options: '=swOptions'
            },
            link: function ($scope, $element) {
                $scope.modalId = parseInt(Math.random() * 10000);

                $scope.content = $scope.instantContent;
                $scope.htmlContent = "";

                /**
                 * Options
                 */
                var modalOptions = {
                    backdrop: true,
                    keyboard: true
                };

                if ($scope.options) {
                    if ($scope.options.backdrop) {
                        modalOptions.backdrop = $scope.options.backdrop;
                    }

                    if ($scope.options.keyboard) {
                        modalOptions.keyboard = $scope.options.keyboard;
                    }

                    if ($scope.options.content) {
                        $scope.content = $scope.options.content;
                    }
                };


//                if($scope.options && $scope.options.contentUrl) {
//                    var contentElement = angular.element('<div><div><b>hm</b><div ng-include="\''+$scope.options.contentUrl+'\'"></div></div></div>');
//                    $compile(contentElement)($scope);
//                    $scope.content = "";
//                    console.log('content', contentElement[0]);
//                    $scope.htmlContent = contentElement;
//                }

                /**
                 * Construct dialogWrapper, compile and append to body
                 */
                var dialogWrapper = angular.element('<div><div><div ng-include="\'/directives/swAngular-SimpleDialog/swAngular-SimpleDialog.html\'"></div></div></div>');
                $compile(dialogWrapper)($scope);
                $('body').append(dialogWrapper);

                /**
                 * Bind click event to open dialogWrapper
                 */
                $element.bind('click', function () {
                    $('#' + $scope.modalId).modal(modalOptions);
                });
            }
        };
    });