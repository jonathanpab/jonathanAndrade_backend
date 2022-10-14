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

    it('when findById is called, query should be called', async () => {
        organization.findById(1, (id, response) => {
            console.log(id);
        });

        expect(query.calledOnce);
    })
})
