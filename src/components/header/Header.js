import {ExelComponent} from '../../core/ExelComponent';
import {$} from '@core/dom';
import {changeTitle} from '@/redux/actions';
import {defaultTitle} from '@/constans';
import {debaunce} from '@core/utils';
import {ActiveRoute} from '@core/routes/ActiveRoute';

export class Header extends ExelComponent {
    static className = 'exel__header'
    constructor($root, options) {
        super($root, {
            name: 'Header',
            ...options,
            listeners: ['input', 'click']
        });
    }
    prepare() {
        this.onInput = debaunce(this.onInput, 300)
    }

    toHTML() {
        const title = this.store.getState().title || defaultTitle
        return `<input type="text" value="${title}" class="input"  />
                <div>
                    <div class="button" data-button="remove">
                        <i class="material-icons" 
                        data-button="remove">delete</i>
                    </div>
                    <div class="button" data-button="exit">
                        <i class="material-icons" 
                        data-button="exit">exit_to_app</i>
                    </div>
                </div>`
    }
    onClick(event) {
        const $target = $(event.target)
        if ($target.data.button === 'remove') {
            const decision = confirm('Вы действительно хотите удалить таблицу?')
            if (decision) {
                localStorage.removeItem('excel:'+ ActiveRoute.param)
                ActiveRoute.navigate('')
            }
        } else if ($target.data.button === 'exit') {
            ActiveRoute.navigate('')
        }
    }
    onInput(event) {
        const $target = $(event.target)
        this.$dispatch(changeTitle($target.text()))
    }
}
