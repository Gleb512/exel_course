import {Page} from '@core/Page';
import {$} from '@core/dom';
import {createRecordsTable} from '@/pages/dashboard.functions';

export class DashboardPage extends Page {
    getRoot() {
        const now = Date.now().toString()
        return $.create('div', 'db').html(`
        <div class="db__header">
            <h1>Exel Dashboard</h1>
        </div>
        <div class="db__new">
            <div class="db__vue">
                <a href="#excel/${now}" class="db__create">
                    Новая <br>Таблица
                </a>
            </div>
        </div>
        <div class="db__table db__vue">
            ${createRecordsTable()}
        </div>
        `)
    }
}
