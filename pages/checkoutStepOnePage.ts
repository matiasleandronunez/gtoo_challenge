import { type Locator, type Page } from '@playwright/test';
import { BasePage} from "./basePage";
import { faker } from '@faker-js/faker';

export class CheckoutStepOnePage extends BasePage{
    readonly firstNameInput : Locator;
    readonly lastNameInput : Locator;
    readonly zipCodeInput : Locator;
    readonly continueBtn : Locator;

    constructor(page: Page) {
        super(page);
        this.firstNameInput = this.page.getByPlaceholder('First Name');
        this.lastNameInput = this.page.getByPlaceholder('Last Name');
        this.zipCodeInput = this.page.getByPlaceholder('Zip/Postal Code');
        this.continueBtn = this.page.getByRole('button', {name: 'continue'});
    }

    async fillInCustomerInfo(firstName? : string, lastName? : string, zip?: string){
        await this.firstNameInput.fill(firstName ?? faker.person.firstName());
        await this.lastNameInput.fill(lastName ?? faker.person.lastName());
        await this.zipCodeInput.fill(zip ?? faker.location.zipCode());
    }

    async continueToStepTwo(){
        await this.continueBtn.click();
    }
}