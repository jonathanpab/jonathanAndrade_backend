import chai, {expect} from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon, {SinonMock, SinonStub} from 'sinon';
import {Pool} from 'pg'
import {organization} from '../db';

chai.use(chaiAsPromised);

class ClientMock {
    query() {
    }
}

describe('Organization', () => {
    let query: SinonStub;
    let connect: SinonStub;
    let client: SinonMock;

    beforeEach(() => {
        query = sinon.stub(Pool.prototype, 'query');
        connect = sinon.stub(Pool.prototype, 'connect');
        client = sinon.mock(ClientMock.prototype);
    })

    afterEach(() => {
        query.restore();
        connect.restore();
        client.restore();
    })

    it('findById', async () => {
        query.resolves({
            rows: [{}]
        });

        const result = await organization.findById(1);

        expect(result.length).to.equal(1);
    })
})
