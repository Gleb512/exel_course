export class Emiter {
    constructor() {
        this.listeners = {}
    }
    // dispatch fire trigger
    // Уведомлять слушателей если они есть
    // 'focus' 'formula: done'
    emit(event, ...args) {
        if (!Array.isArray(this.listeners[event])) {
            return false
        }
        this.listeners[event].forEach(listener => {
            listener(...args)
        })
        return true
    }
    // listen for the messages or add listener
    // formula.subscribe('table:select', () => {})
    subscribe(event, fn) {
        this.listeners[event] = this.listeners[event] || []
        this.listeners[event].push(fn)
        return () => {
            this.listeners[event] =
                this.listeners[event].filter(listener => listener !== fn)
        }
    }
}


//
// Example emit and subscribe
// const emitter = new Emiter()
// const unsub = emitter.subscribe('gleb', data => console.log('Sub',data))
// setTimeout( ()=>{
//     emitter.emit('gleb', 'After 2 Seconds')
// }, 2000)
// setTimeout(() => {
//     unsub()
// }, 3000)
// setTimeout( ()=>{
//     emitter.emit('gleb', 'After 4 Seconds')
// }, 4000)
