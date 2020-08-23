import {ExelComponent} from '../../core/ExelComponent';
import {createTable} from './table-template';
import {resizeHandler} from '@/components/table/table.resize';
import {TableSelection} from '@/components/table/TableSelection';
import {shouldResize, isCell, matrix,
    nextSelector} from '@/components/table/table.functions';
import {$} from '@core/dom';
import * as actions from '@/redux/actions'
import {defaultStyles} from '@/constans';
import {parse} from '@core/parse';

export class Table extends ExelComponent {
    static className = 'exel__table'
    constructor($root, options) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'keydown', 'input'],
            ...options
        });
    }
    toHTML() {
        return createTable(20, this.store.getState())
    }
    prepare() {
        this.selection = new TableSelection()
    }

    init() {
        super.init()
        this.selectCell(this.$root.find('[data-id="0:0"]'))
        this.$on('formula:input', value => {
            this.selection.current
                .attr('data-value', value)
                .text(parse(value))
            // this.selection.current.text(value)
            this.updateTextInStore(value)
        })
        this.$on('formula:done', ()=> {
            this.selection.current.focus()
        })
        this.$on('toolbar:applyStyle', value => {
            this.selection.applyStyle(value)
            this.$dispatch(actions.applyStyle({
                value,
                ids: this.selection.selectedIds
            }))
        })
    }
    selectCell($cell) {
        this.selection.select($cell)
        this.$emit('table:select', $cell)
        const styles = $cell.getStyles(Object.keys(defaultStyles))
        this.$dispatch(actions.changeStyles(styles))
    }
    async resizeTable(event) {
        try {
            const data = await resizeHandler(this.$root, event)
            this.$dispatch(actions.tableResize(data))
            // console.log('Resize data', data)
        } catch (e) {
            console.warn('Resize error', e.message)
        }
    }
    onMousedown(event) {
        if (shouldResize(event)) {
            this.resizeTable(event)
        } else if (isCell(event)) {
            const $target = $(event.target)
            if (event.shiftKey) {
                const target = $target.id(true)
                const current = this.selection.current.id(true)
                const $cells = matrix(target, current)
                    .map(id => this.$root.find(`[data-id="${id}"]`))
                this.selection.selectGroup($cells)
            } else {
                this.selectCell($target)
            }
        }
    }
    onKeydown(event) {
        const keys = [
            'Enter',
            'Tab',
            'ArrowLeft',
            'ArrowRight',
            'ArrowDown',
            'ArrowUp'
        ]
        const {key} = event
        if (keys.includes(key) && !event.shiftKey) {
            event.preventDefault()
            const id = this.selection.current.id(true)
            this.selectCell(this.$root.find(nextSelector(key, id)))
        }
    }
    updateTextInStore(value) {
        this.$dispatch(actions.changeText( {
            id: this.selection.current.id(),
            value
        }))
    }
    onInput(event) {
        // this.$emit('table:input', $(event.target))
        this.updateTextInStore($(event.target).text())
    }
}

