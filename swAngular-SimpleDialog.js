angular.module('swAngularSimpleDialog', [])
    .directive('swAngularSimpleDialog', function ($compile, $sce) {
        return {
            restrict: "A",
            scope: {
                instantContent: '@swAngularSimpleDialog',
                options: '=swOptions'
            },
            link: function ($scope, $element) {
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

                if (!$scope.options) $scope.options = {contentUrl: ''};
                if (!$scope.options.contentUrl) $scope.options.contentUrl = '';

                /**
                 * Construct dialogWrapper, compile and append to body
                 */
                var dialogWrapper = angular.element('<div class="modal fade {{options.classes}}" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"></div>');
                var modalDialog = angular.element('<div class="modal-dialog"></div>');
                var modalContent = angular.element('<div class="modal-content"></div>');
                var modalHeader = angular.element([
                    '<div class="modal-header" ng-show="options.showHeader">',
                    '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>',
                    '<h4 class="modal-title" id="myModalLabel">{{options.heading || "&nbsp;"}}</h4>',
                    '</div>'
                ].join('\n'));
                var normalContent = angular.element('<div ng-show="content" class="modal-body" ng-bind="content"></div>');
                var externalContent = angular.element('<div ng-show="options.contentUrl" class="modal-body"></div>');
                var externalInclude = angular.element('<div ng-include="\'' + $scope.options.contentUrl + '\'"></div>');
                var modalFooter = angular.element([
                    '<div class="modal-footer" ng-show="options.showFooter > 0">',
                    '<button data-ng-repeat="button in options.buttons" type="button" class="btn {{button.classes}}" data-dismiss="{{button.closing?\'modal\':\'\'}}" ng-bind="button.label" ng-click="button.callback()"></button>',
                    '</div>'
                ].join('\n'));

                $compile(externalInclude)($scope.$parent);

                dialogWrapper.append(modalDialog);
                modalDialog.append(modalContent);
                modalContent.append(modalHeader);
                modalContent.append(normalContent);
                modalContent.append(externalContent);
                externalContent.append(externalInclude);
                modalContent.append(modalFooter);
                $compile(dialogWrapper)($scope);
                $('body').append(dialogWrapper);

                /**
                 * Bind click event to open dialogWrapper
                 */
                $element.bind('click', function () {
                    dialogWrapper.modal(modalOptions);
                });
            }
        };
    });