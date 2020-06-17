import { appendFile } from 'fs'
import { resolve } from 'path';

export function logError(...arg: any[]) {
    const logFile = resolve('./log/error.data');
    appendFile(logFile, `Error: ${arg.join(' ')} ${new Date()} \n`, (err) => {
        if (err) throw err;
    })
}

export function logInfo(...arg: any[]) {
    const logFile = resolve('./log/info.data');
    appendFile(logFile, `Error: ${arg.join(' ')} ${new Date()} \n`, (err) => {
        if (err) throw err;
    })
    console.log(`Info: ${arg.join(' ')} ${new Date()}`);
}