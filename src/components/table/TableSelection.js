export class TableSelection {
    static ClassName = 'selected'
    constructor() {
        this.group = []
        this.current = null
    }
    // $el instance of DOM
    select($el) {
        this.clear()
        this.group.push($el)
        this.current = $el
        $el.focus().addClass(TableSelection.ClassName)
    }
    clear() {
        this.group.forEach( $el => $el.removeClass(TableSelection.ClassName))
        this.group = []
    }
    selectGroup($group = []) {
        this.clear()
        this.group = $group
        this.group.forEach($el => $el.addClass(TableSelection.ClassName))
    }
    applyStyle(style) {
        this.group.forEach(el=> el.css(style))
    }
    get selectedIds() {
        return this.group.map($el => $el.id())
    }
}
