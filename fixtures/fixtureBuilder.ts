import { APIRequestContext, request, test as base } from '@playwright/test';
import { CONFIG } from '../variables.config';
import { APIRequestsHelper } from "../helpers/apiRequestsWrapper";
import { LandingPage } from '../pages/landingPage';
import { InventoryPage } from '../pages/inventoryPage';
import { CartPage } from '../pages/cartPage';
import { ProductCardSection } from '../pages/productCardSection';
import { CheckoutStepOnePage } from '../pages/checkoutStepOnePage';
import { CheckoutStepTwoPage } from '../pages/checkoutStepTwoPage';
import { CheckoutCompletePage } from '../pages/checkoutCompletePage';

// declare the types of your fixtures
interface MyFixtures {
    requestHelper: APIRequestsHelper;
    landingPage: LandingPage;
    cartPage: CartPage;
    inventoryPage: InventoryPage;
    productCard: ProductCardSection;
    checkoutStepOnePage: CheckoutStepOnePage;
    checkoutStepTwoPage: CheckoutStepTwoPage;
    checkoutCompletePage: CheckoutCompletePage;
}

// extend base test to be used in multiple test files. Each of them will get the fixtures
export const test = base.extend<MyFixtures>({
    // eslint-disable-next-line no-empty-pattern
    async requestHelper({}, use) {
        // Set up the fixture

        const apiContext: APIRequestContext = await request.newContext({
            baseURL: CONFIG.baseAPIHost,
            extraHTTPHeaders: {
                Accept: 'application/json',
                'Content-type': 'application/json',
            },
        });

        const requestHelper: APIRequestsHelper = new APIRequestsHelper(apiContext);

        // Use the fixture value in the test
        await use(requestHelper);

        // Clean up the fixture
        await requestHelper.dispose();
    },

    // PAGE OBJECTS
    landingPage: async ({ page }, use) => {
        const landingPage = new LandingPage(page);
        await use(landingPage);
    }, 

    cartPage: async ({ page }, use) => {
        const cartPage = new CartPage(page);
        await use(cartPage);
    }, 

    inventoryPage: async ({ page }, use) => {
        const inventoryPage = new InventoryPage(page);
        await use(inventoryPage);
    }, 

    productCard: async ({ page }, use) => {
        const productCard = new ProductCardSection(page);
        await use(productCard);
    }, 

    checkoutStepOnePage: async ({ page }, use) => {
        const checkoutStepOnePage = new CheckoutStepOnePage(page);
        await use(checkoutStepOnePage);
    }, 

    checkoutStepTwoPage: async ({ page }, use) => {
        const checkoutStepTwoPage = new CheckoutStepTwoPage(page);
        await use(checkoutStepTwoPage);
    }, 

    checkoutCompletePage: async ({ page }, use) => {
        const checkoutCompletePage = new CheckoutCompletePage(page);
        await use(checkoutCompletePage);
    }, 
});

export { expect } from '@playwright/test';