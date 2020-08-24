import {debaunce} from '@core/utils';

export class StateProcessor {
    constructor(client, delay = 300) {
        this.client = client
        this.listen = debaunce(this.listen.bind(this), delay)
    }
    listen(state) {
        this.client.save(state)
    }
    get() {
        return this.client.get()
    }
}
