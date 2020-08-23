import {Page} from '@core/Page';
import {createStore} from '@core/createStore';
import {normalizeInitialState} from '@/redux/initialState';
import {rootReducer} from '@/redux/rootReducer';
import {Header} from '@/components/header/Header';
import {Table} from '@/components/table/Table';
import {Formula} from '@/components/formula/Formula';
import {Toolbar} from '@/components/toolbar/Toolbar';
import {Exel} from '@/components/exel/Exel';
import {debaunce, storage} from '@core/utils';

function storageName(param) {
    return 'excel:' + param
}
export class ExelPage extends Page {
    getRoot() {
        const params = this.params ? this.params : Date.now().toString()
        const state = storage(storageName(params))
        const initialState = normalizeInitialState(state)
        const store = createStore(rootReducer, initialState)
        const stateListener = debaunce(state=>{
            storage(storageName(params), state)
        }, 300)
        store.subscribe(stateListener)
        this.excel = new Exel({
            components: [Header, Toolbar, Formula, Table],
            store
        })

        return this.excel.getRoot()
    }
    afterRender() {
        this.excel.init()
    }
    destroy() {
        this.excel.destroy()
    }
}
