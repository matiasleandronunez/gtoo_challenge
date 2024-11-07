import { expect, test } from '../../fixtures/fixtureBuilder';
import { testParameters } from "../../test-data/test4.json" ;
import { CONFIG } from '../../variables.config';

test.describe.parallel('Shop @shop_feature', () => {
    test(`test4: it should login checkout flow for a product`,async ({ landingPage, productCard, cartPage, inventoryPage, checkoutStepOnePage, checkoutStepTwoPage, checkoutCompletePage }) => {
        // Go to site, assert the logging form is there
        await landingPage.goto(CONFIG.baseHost);
        await expect(landingPage.loginContainer, 'Login box couldn\'t be found in page').toBeVisible();

        // Input User/pass and assert user lands in inventory listing page
        await landingPage.loginAs(CONFIG.username, CONFIG.password);
        await expect(inventoryPage.pageTitle).toContainText('Products');

        // ID the appropiate product card, as per the test-data, add to cart and verify button changed to 'Remove'
        await productCard.identifyCard(testParameters.productTitle);
        await productCard.addToCart();
        await expect(await productCard.removeBtnVisible()).toBeTruthy();
        await expect(await inventoryPage.shoppingCartCount()).toBe(1);

        // Click on the Cart icon and assert navigation to said site happens and product is displayed in cart
        await inventoryPage.goToCart();
        await expect(cartPage.pageTitle).toContainText('Your Cart');
        await expect(await cartPage.productInCart(testParameters.productTitle)).toBeTruthy();

        // Checkout the cart, user lands on Checkout step 1
        await cartPage.checkoutCart();
        await expect(checkoutStepOnePage.pageTitle).toContainText('Checkout: Your Information');

        // Complete the checkout Step 1, go to step 2
        await checkoutStepOnePage.fillInCustomerInfo();
        await checkoutStepOnePage.continueToStepTwo();
        await expect(checkoutStepTwoPage.pageTitle).toContainText('Checkout: Overview');
        
        // Assert product information is displayed in step 2. Assert subtotal matches 1 x product
        // price (to discard having extra unwanted products). Finish purchase flow.
        await expect(checkoutStepTwoPage.productInOverview(testParameters.productTitle)).toBeVisible();
        await expect(checkoutStepTwoPage.productPrice(testParameters.productTitle)).toContainText(`$${testParameters.productExpectedPrice.toString()}`);
        await expect(checkoutStepTwoPage.productQuantity(testParameters.productTitle)).toContainText('1');
        await expect(await checkoutStepTwoPage.getSubtotal()).toBe(testParameters.productExpectedPrice);
        await checkoutStepTwoPage.confirmPurchase();

        // Assert user is in thank you page
        await expect(checkoutCompletePage.pageTitle).toContainText('Checkout: Complete!');
        await expect(checkoutCompletePage.completeHeader).toContainText('Thank you for your order!');
    });
});