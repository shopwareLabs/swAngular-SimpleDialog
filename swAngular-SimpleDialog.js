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
                }

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