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
                var dialogWrapper = angular.element(
                    ['<div>',
                     '    <div>',
                     '        <div class="modal fade" id="{{modalId}}" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">',
                     '            <div class="modal-dialog">',
                     '                <div class="modal-content">',
                     '                    <div class="modal-header" ng-show="options.showHeader">',
                     '                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>',
                     '                        <h4 class="modal-title" id="myModalLabel">{{options.heading || "&nbsp;"}}</h4>',
                     '                    </div>',
                     '                    <div ng-show="content" class="modal-body" ng-bind="content">',
                     '                    </div>',
                     '                    <div ng-show="options.contentUrl" class="modal-body">',
                     '                        <div ng-include="options.contentUrl"></div>',
                     '                    </div>',
                     '                    <div class="modal-footer" ng-show="options.showFooter > 0">',
                     '                        <button data-ng-repeat="button in options.buttons" type="button" class="btn {{button.classes}}" data-dismiss="{{button.closing?\'modal\':\'\'}}" ng-bind="button.label" ng-click="button.callback()"></button>',
                     '                    </div>',
                     '                 </div>',
                     '             </div>',
                     '         </div>',
                     '    </div>',
                     '</div>'
                    ].join('\n'));
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