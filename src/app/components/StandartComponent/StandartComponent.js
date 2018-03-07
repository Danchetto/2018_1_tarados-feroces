(function() {
    'use strict';

    class StandartComponent extends BaseComponent {

        constructor() {
            super(standartTemplate);
        }
    }

    const standartTemplate = '<{{tag}} class="{{class}}">' +
        '{{text}}' +
        '</{{tag}}>';

    window.StandartComponent = StandartComponent;
})();
