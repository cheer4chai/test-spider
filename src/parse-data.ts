import { JSDOM } from 'jsdom';
import { logError } from './log';

export function parseData(resultData, dataType: string): string[] {
    switch (dataType) {
        case 'html':
            return parseHtml(resultData);
            break;
        case 'json':
            return parseJson(resultData);
            break;
        case 'list':
            return resultData;
            break;
        default:
            logError(`dataType error: get ${dataType}`);
            break;
    }
}

function parseHtml(htmlContent: string): string[] {
    const { document } = (new JSDOM(htmlContent)).window;
    let fetchArr: string[] = [];
    document.querySelectorAll('.item-id').forEach((val) => {
        fetchArr.push(val.innerHTML);
    })
    return fetchArr;
}

function parseJson(obj: string): string[] {
    let json = {};
    try {
        json = JSON.parse(obj);
    } catch (err) {
        logError(`JSON parse Error`)
    }
    return Object.keys(json).map((key) => json[key]);
}