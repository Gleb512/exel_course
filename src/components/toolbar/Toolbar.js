import {ExelComponent} from '../../core/ExelComponent';

export class Toolbar extends ExelComponent {
    static className = 'exel__toolbar'
    constructor($root, options) {
        super($root, {
            name: 'Toolbar',
            listeners: ['click'],
            ...options
        });
    }
    toHTML() {
        return `<div class="button">
                    <i class="material-icons">format_align_left</i>
                    <i class="material-icons">format_align_center</i>
                    <i class="material-icons">format_align_right</i>
                    <i class="material-icons">format_align_justify</i>
                    <i class="material-icons">format_italic</i>
                    <i class="material-icons">format_bold</i>
                    <i class="material-icons">format_underlined</i>
                    <i class="material-icons">exit_to_app</i>
                </div>`
    }
    onClick(event) {
        console.log(event.target)
    }
}
