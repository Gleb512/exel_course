import {storage} from '@core/utils';

export function toHTML(key) {
    const modele = storage(key)
    const idModel = key.split(':')[1]
    return `
            <li class="db__record">
                <a href="#excel/${idModel}">${modele.title}</a>
                <strong>${new Date(modele.openedDate)
                    .toLocaleDateString()}
                    ${new Date(modele.openedDate).toLocaleTimeString()}
                </strong>
            </li>
    `
}
function getAllKeys() {
    const keys = []
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (!key.includes('excel')) {
           continue
        }
        keys.push(key)
    }
    return keys
}
export function createRecordsTable() {
    const keys = getAllKeys()
    if (!keys.length) {
        return `<p>Таблиц не найдено</p>`
    }
    return `
            <div class="db__list-header">
                <span>Название</span>
                <span>Дата открытия</span>
            </div>
            <div class="db__list">
                <ul>
                    ${keys.map(toHTML).join('')}
                </ul>
            </div>
    `
}
