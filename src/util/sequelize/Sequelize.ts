import {Sequelize} from 'sequelize-typescript';
import Logger from "../logger/WinstonLogger";
import {SequelizerUtil} from "./SequelizeUtil";
import {Models} from "../../models";

const env = process.env.NODE_ENV || "development";
const config = require('../../../resources/config/sequelize.json')[env];

Logger.debug("데이터베이스 접속경로", config);

// 시퀄라이저 객체 생성
const sequel = new Sequelize(config);

// 쿼리 유틸
const query = new SequelizerUtil(sequel);

// 모델 작성
export const DB = {
    sequel: sequel,
    selectOne: query.selectOne,
    select: query.select,
    delete: query.delete,
    update: query.update,
    insert: query.insert,
};

// 모델 입력
sequel.addModels(Models);

export const DatabaseSync = () => {
    if ((env == "development") || (env == "test")) {
        sequel.sync({
            alter: true,
            logging: true,
            force: true
        }).then(value => {
            Logger.debug("데이터베이스 접속완료");
        }).catch(reason => {
            Logger.debug('데이터베이스 접속실패');
            process.exit(0);
        })
    }
};