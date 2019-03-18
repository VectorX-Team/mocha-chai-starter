import Logger from "./WinstonLogger";

let logStorage: Array<{
    time: number,
    msg: string,
    args: any
}> = [];

let now: number;

export const StackLogger = {

    init(): void {
        logStorage = [];
        now = Date.now();
    },
    stack(msg: string, args?: any): void {
        logStorage.push({
            time: Date.now(),
            msg: msg,
            args: args
        });
    },
    flush(): void {
        Logger.debug('+ Stack logging start');

        for (let log of logStorage) {
            Logger.debug(`| ${getDate(log.time)} ${log.msg}`, log.args);
        }

        // 종료시간
        Logger.debug(`| Spent time : ${Date.now() - now} ms`);
        Logger.debug('+ Stack logging end\n');

        StackLogger.init();
    }
};

let getDate = (date?: number): string => {
    if (!date) {
        date = Date.now();
    }

    let now = new Date(date);

    return `${now.getHours()}:${now.getMinutes()} ${now.getSeconds()} ${now.getMilliseconds()}`
};
