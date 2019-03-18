import {suite, test} from "mocha-typescript";
import chai from 'chai';
import chaiHttp from "chai-http";
import {StackLogger} from "../util/logger/StackLogger";

chai.use(chaiHttp);
const url = 'https://ireceipt.ciaosgarage.xyz';
// const url = 'localhost:3000';

let token: string;

@suite("Receipt Sever 테스트")
class ReceiptTest {
    before() {
        StackLogger.init();
    }

    after() {
        StackLogger.flush();
    }

    @test("토큰 만들기")
    async makeToken() {

        let result = await chai.request(url).post('/account/uidLogin')
            .set("Content-Type", "application/json")
            .send({uid: "JsqAO84heuhv0UySMfnKOR6x0303", deviceNm: "MockUp"});

        StackLogger.stack('token', [result.body.body]);
        token = result.body.body;
    }
}
