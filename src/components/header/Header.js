import {ExelComponent} from '../../core/ExelComponent';
import {$} from '@core/dom';
import {changeTitle} from '@/redux/actions';
import {defaultTitle} from '@/constans';
import {debaunce} from '@core/utils';

export class Header extends ExelComponent {
    static className = 'exel__header'
    constructor($root, options) {
        super($root, {
            name: 'Header',
            ...options,
            listeners: ['input']
        });
    }
    prepare() {
        this.onInput = debaunce(this.onInput, 300)
    }

    toHTML() {
        const title = this.store.getState().title || defaultTitle
        return `<input type="text" value="${title}" class="input"  />
                <div>
                    <div class="button">
                        <i class="material-icons">delete</i>
                        <i class="material-icons">exit_to_app</i>
                    </div>
                </div>`
    }
    onInput(event) {
        console.log('Input')
        const $target = $(event.target)
        this.$dispatch(changeTitle($target.text()))
    }
}
