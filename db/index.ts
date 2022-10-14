import {Pool, types} from 'pg';
import {OrganizationDb} from './OrganizationDb'
import {Organization} from './pg/Organization';

const connectionString = 'postgresql://jpab_ec:rJreHjdE94ye7X3ZJbiG2A@free-tier14.aws-us-east-1.cockroachlabs.cloud:26257/backend_db?sslmode=verify-full&options=--cluster%3Dsixth-cattle-5693';
const pool = new Pool({
    connectionString
});

const NUMERIC_OID = 1700;

types.setTypeParser(NUMERIC_OID, (val) =>
    parseFloat(val)
);

export const organization: OrganizationDb = new Organization(pool);
