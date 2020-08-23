import {DomListener} from './DomListener';

export class ExelComponent extends DomListener {
    constructor($root, options = {}) {
        super($root, options.listeners);
        this.name = options.name || ''
        this.emiter = options.emiter
        this.subscribe = options.subscribe || []
        this.store = options.store
        this.unsubscribers = []

        this.prepare()
    }
    // Настраиваем наш компонент до init
    prepare() {}
    // Возвращает шаблон компонента
    toHTML() {
        return ''
    }
    // Inform listeners about event "event"
    $emit(event, ...args) {
        this.emiter.emit(event, ...args)
    }
    // Subscribe for the event
    $on(event, fn) {
        const unsub = this.emiter.subscribe(event, fn)
        this.unsubscribers.push(unsub)
    }
    $dispatch(action) {
        this.store.dispatch(action)
    }
    // changes from the fields that was subscribed only
    storeChanged() {
    }
    isWatching(key) {
        return this.subscribe.includes(key)
    }
    // Инициализируем компонент
    // Добавляем ДОМ слушателей
    init() {
        this.initDomListeners()
    }
    // Удаляем компонент
    // Чистим слушателей
    destroy() {
        this.removeDomListeners()
        this.unsubscribers.forEach(unsub => unsub())
    }
}
