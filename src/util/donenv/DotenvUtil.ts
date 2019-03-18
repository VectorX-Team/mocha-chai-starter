import * as path from "path";
import fs from "fs";
import Logger from "../logger/WinstonLogger";
import dotEnv from "dotenv";


export const LoadDotenv = () => {
    let envPath = path.join(__dirname, '../../../config/.env');
    const isExist = fs.existsSync(envPath);
    Logger.debug("환경변수 가저오기", [envPath, isExist]);

    if (isExist) {
        const result = dotEnv.config({
            path: envPath,
            debug: true
        });
        Logger.debug(`DotEnv 초기화 완료`, [result]);
    } else {
        Logger.debug("서버 종료");
        process.exit(0);
    }
};