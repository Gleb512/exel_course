import {ExelComponent} from '../../core/ExelComponent';
import {createTable} from './table-template';
import {resizeHandler} from '@/components/table/table.resize';

export class Table extends ExelComponent {
    static className = 'exel__table'
    constructor($root, options) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown']
        });
    }
    toHTML() {
        return createTable(20)
    }
    onMousedown(event) {
        if (event.target.dataset.resize) {
            resizeHandler(this.$root, event)
        }
    }
}

