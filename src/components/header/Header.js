import {ExelComponent} from '../../core/ExelComponent';

export class Header extends ExelComponent {
    static className = 'exel__header'
    toHTML() {
        return `<input type="text" placeholder="Новая таблица" class="input"  />
                <div>
                    <div class="button">
                        <i class="material-icons">delete</i>
                        <i class="material-icons">exit_to_app</i>
                    </div>
                </div>`
    }
}
