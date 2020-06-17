import { fetchData } from './fetch-data';
import { parseData } from './parse-data';
import { logError, logInfo } from './log';
import { writeFileSync, readFileSync } from 'fs';
import { resolve } from 'path';

interface ProcessOptions{
    existenceFileName: string;
    outputFileName: string;
    dataType: string;
    requestUrl: string;
}

export async function init(options: ProcessOptions) {
    const {
        existenceFileName,
        outputFileName,
        dataType,
        requestUrl
    } = options;
    
    const existenceFile = resolve(`./data/${existenceFileName}`);
    const outputFile = resolve(`./data/${outputFileName}`);
    try {
        // 请求数据
        const resultData = await fetchData(requestUrl);
        // 处理数据
        const fetchArr = parseData(resultData, dataType);
        // 获取源文件比对内容，处理更新资源
        const savedData = readFileData(existenceFile);
        writeDiff(savedData, fetchArr, existenceFile, outputFile);
    } catch (error) {
        logError(error);
    }
}

function writeDiff(originArr: string[], newArr: string[], existenceFile: string, outputFile: string) {
    if (originArr.length < newArr.length) {
        logInfo('数据有diff');
        writeFileSync(existenceFile, newArr.join('\n'));
        writeFileSync(outputFile, getDiff(originArr, newArr).join('\n'));
    } else {
        logInfo('数据无diff');
        writeFileSync(outputFile, '');
    }
}

function readFileData(filePath: string): string[] {
    const fileContent = readFileSync(filePath, 'utf8');
    if (fileContent === '') return [];
    return fileContent.split('\n');
}

function getDiff(originData: string[], newData: string[]) {
    const diffArr = newData.filter(v => !originData.includes(v));
    return diffArr;
}

