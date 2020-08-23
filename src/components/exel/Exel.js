import {$} from '../../core/dom';
import {Emiter} from '@core/Emiter';
import {StoreSubscriber} from '@core/storeSubscriber';
import {updateDate} from '@/redux/actions';
import {preventDefault} from '@core/utils';

export class Exel {
    constructor(options) {
        this.components = options.components || []
        this.store = options.store
        this.emiter = new Emiter()
        this.subscriber = new StoreSubscriber(this.store)
    }
    getRoot() {
        const $root = $.create('div', 'exel')
        const componentOptions = {
            emiter: this.emiter,
            store: this.store
        }

        this.components = this.components.map( Component => {
            const $el = $.create('div', Component.className)
            const component = new Component($el, componentOptions)
            // debug
            // if (component.name) {
            //     window['c' + component.name] = component
            // }
            $el.html(component.toHTML())
            $root.append($el)
            return component
        })
        return $root
    }
    init() {
        if (process.env.NODE_ENV === 'production') {
            document.addEventListener('contextmenu', preventDefault)
        }
        this.store.dispatch(updateDate())
        this.components.forEach(component => component.init())
        this.subscriber.subscribeComponents(this.components)
    }
    destroy() {
        this.subscriber.unsubscribeFromStore()
        this.components.forEach(component => component.destroy())
        document.removeEventListener('contextmenu', preventDefault)
    }
}
