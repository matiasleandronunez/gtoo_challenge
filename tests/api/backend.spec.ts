import { expect, test } from '../../fixtures/fixtureBuilder';
import { GoRestUser } from '../../helpers/typesHelper';

test.describe.parallel('API testing @api_feature', () => {
    test('test1: Retrieve list of users and check at least one is returned', async ({ requestHelper }) => {
        const usersResp = await requestHelper.getAllUsers();
        await expect(usersResp.status(), `Expected status code 200, was ${usersResp.status()}`).toBe(200);

        const users : GoRestUser[] = await usersResp.json();
        await expect(users.length).toBeGreaterThan(0);
    });


    test('test2: Retrieve list of users and check at least ones name strats with C', async ({ requestHelper }) => {
        const usersResp = await requestHelper.getAllUsers();
        await expect(usersResp.status(), `Expected status code 200, was ${usersResp.status()}`).toBe(200);

        const users : GoRestUser[] = await usersResp.json();
        await expect(users.length).toBeGreaterThan(0);

        // Username == Email ?
        // Flatten array, get emails, and then use some to check any string starts with C. If none is found
        // some returns false, so I'm checking for Truthy.
        await expect(
            users.flatMap((user) => user.email).some((email) => email.toUpperCase().startsWith('C')),
            'Assertion Error: No usernames (emails) starting with C were found'
        ).toBeTruthy();
    });


    test('test3: Retrieve list of users and display on console', async ({ requestHelper }) => {
        const usersResp = await requestHelper.getAllUsers();
        await expect(usersResp.status(), `Expected status code 200, was ${usersResp.status()}`).toBe(200);

        const users : GoRestUser[] = await usersResp.json();
        await expect(users.length).toBeGreaterThan(0);

        console.log('-------- USERS RETRIEVED ----------\n');
        users.forEach(u => {
            console.log(`${u.id.toString()} | ${u.name} | ${u.email} | ${u.gender} | ${u.status}`);
        });
    });
});