/**
 * Description: Reusable modal for creating quick, sophisticated dialog boxes.
 *
 * Behavior:    HTML code will be nested inside this directive. The nested markup will be hidden. 
 *              Only when the modal has been triggered, the markup will show.
 *              Triggered by an external element, the dialog will pop-up and show the nested content.
 *              
 *
 * Attributes:  size (string)           Initializes the dialog box size. 
 *                                      @required to equal to one of the following: 'small', 'medium' or 'large'
 *              ------------------------------------------------------------------------------------------------------------------
 *              title (string)          Title of the modal. 
 *              ------------------------------------------------------------------------------------------------------------------
 *              remoteID (string)       The ID of the element that will trigger the dialog box.
 *                                      @required if "remoteClass" is not used.
 *              ------------------------------------------------------------------------------------------------------------------
 *              remoteClass (string)    The class of the element that will trigger the dialog box.
 *                                      @required if "remoteID" is not used.
 *
 *
 * Optional Features: 1) Buttons inside the dialog box may close the dialog by including the attribute [data-dismiss="modal"]
 *                       ex. <button data-dismiss="modal">Exit</button>
 *
 *                    2) Containers including the class .modal-body, .modal-footer may be used to include bootstrap styling.  
 *                       ex. <div class="modal-footer"><button>Save</button></div>
 *
 *  Result:  
 *  <code>
 *      <dialog-box-Fe title="Example Dialog" size="medium" remoteID="myButton">
 *          <h2>Hello World</h2>
 *          <div class="modal-body">
 *              <p>Some content</p>
 *          </div>
 *          <div class="modal-footer">
 *              <button class="btn btn-danger" data-dismiss="modal">Exit Dialog</button>
 *          </div>
 *      </dialog-box-Fe>
 *  </code>
*/
(function() {
    "use strict";

    function dialogBoxFe() {           
        return {
            restrict: 'E',
            transclude: true,
            replace: true,
            scope: {  
                size: '=', 
                header: '@'       
            },
            link: function(scope, element, attr) {
                scope.header = attr.header;
                switch(attr.size) {
                    case "large":
                        scope.size = 'modal-lg';
                        break;
                    case "small":
                        scope.size = 'modal-sm';
                        break;
                    case "medium":
                        scope.size = 'modal-md';
                        break;
                    default:
                        scope.size = 'defaultSize';
                }
                if (!!attr.remoteid && !!attr.remoteclass) {
                    $('#' + attr.remoteid).on('click', function () {
                        $('#' + attr.id).modal('show');
                    });
                } else if (!!attr.remoteid && !attr.remoteclass) {
                    $('#' + attr.remoteid).on('click', function () {
                        $('#' + attr.id).modal('show');
                    });
                } else if (!attr.remoteid && !!attr.remoteclass) {
                    setTimeout(function () {
                        $('.' + attr.remoteclass).on('click', function () {
                            $('#' + attr.id).modal('show');
                        });
                    }, 1000);
                } else {
                    bootbox.alert('Please Enter a remoteID or remoteClass attribute to the Directive Element!')
                }
            },
            templateUrl: 'views/dialogBoxViewFe.html'
        }
    }

/*
    * Delete Markup: Insert this Markup inside ngRepeat
    *               
    *               <delete-Directive index="$index" modalID="relationDeletePopup" edge="prop[0]">
    *               </delete-Directive>
    *             
    * Attributes:  index (number)    Index of the loop where the markup is inserted                            
    *              ------------------------------------------------------------------------------------------------------------------
    *              modalID (string)  The Modal ID of the delete dialog 
    *              ------------------------------------------------------------------------------------------------------------------
    *              edge (object)     The main object in the loop that you wanted to delete.
    *              ------------------------------------------------------------------------------------------------------------------
    *
    *
    *  Delete Dialog Markup: Insert this Markup outside the ngRepeat but within the same view   
    *
    *   <dialog-Box-Fe id="relationDeletePopup" size="medium" remoteID="deleteRelation" header="Relation Delete Confirmation">
            <div class="main">
                <div class="modal-body">
                    <div id="delete_body_confirm" class="media-left"> <i class="fa fa-exclamation-triangle fa-3x"></i>

                    </div>
                    <div class="media-body alertPopupText">
                         <h4><span class="danger"><p>You are about to remove <span class="relationTypeText">{{ personRelationController.popupRelationName}}</span> Relation between {{personController.patient.SBRPerson.Person.FirstName}} {{personController.patient.SBRPerson.Person.LastName}} and {{ personRelationController.popupPersonName }}.</p><p>Press OK to confirm.</p></span></h4>

                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-danger" data-dismiss="modal" ng-click="personRelationController.deleteRow()">OK</button>
                </div>
            </div>
            <div class="main" ng-show="personRelationController.currentLocationUsed()">
                <div class="modal-header">
                    <h4 class="modal-title">Location Still Used</h4>
                </div>
                <div class="modal-body">
                    <div id="delete_body_used" class="media-left"> <i class="fa fa-exclamation-triangle fa-3x"></i>

                    </div>
                    <div class="media-body">
                         <h4><span class="danger"><p>The selected location is still used by one or more communications.</p><p>Remove the communication(s) before removing the location.</p></span></h4>

                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-dismiss="modal">OK</button>
                </div>
            </div>
        </dialog-Box-Fe>

      Controller Markup: 

        *** Insert this code in your controller and specify your API call ***

        $scope.$on('selectItem', function (event, dataIndex, edge) {
            _vm.popupRelationName = edge.relationName;
            _vm.popupPersonName = edge.personname;
            _vm.deleteRow = function () {
                _vm.listOfRelations.splice(dataIndex, 1);
                personRelationService.deleteRelation($stateParams.id, edge.NGEdgeID, $http);
            }
        });
    *
*****/

    function deleteDirective() {
        return {
            restrict: 'E',
            replace: false, 
            transclude: false, 
            scope: {
                index: '=',
                edge: '='
            },
            controller: function($scope, $element, $transclude) {
                $scope.selectItem = function() {
                    $scope.$emit('selectItem', $scope.index, $scope.edge);
                }
            },
            link: function (scope, element, attr) {
                scope.remoteClass = attr.remoteclass;   
                $(element).on('click', function (e) {
                    $('#' + attr.modalid).modal('show');
                    e.stopImmediatePropagation(); 
                });
            },
            templateUrl: 'views/deleteDirectiveView.html'
        }
    }

    angular
        .module('nextGateApp')
        .directive('dialogBoxFe', dialogBoxFe)
        .directive('deleteDirective', deleteDirective);
})();