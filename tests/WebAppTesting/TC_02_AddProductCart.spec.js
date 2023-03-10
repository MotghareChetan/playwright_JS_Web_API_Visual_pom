// @ts-check
const { test } = require('@playwright/test');
const { POManager } = require('../../pages/POManager');
const { testConfig } = require('../../Data/login_data');
const { Orderdata } = require('../../Data/orderData')


test.describe('E2E', () => {

    test('TC_03 Add Product to Cart', async ({ page }) => {
        /* const expectedUserName = "Chetan Motghare"
         const productName = "Blue Top";
         const ordererName = "Mr. Chetan Motghare";
         const mobileNumber = "23415154123";
         const nameOnCard = "Chetan";
         const cardNumber = "6787134156"
         const cvc = "908"
         const expiryMonth = "02"
         const expiryYear = "2029"
         const confirmationMessage = "Congratulations! Your order has been confirmed!";*/

        const poManager = new POManager(page);
        const loginpage = poManager.getLoginPage();
        const dashboardPage = poManager.getDashboardPage();
        const cartPage = poManager.getCartPage();
        const checkoutpage = poManager.getCheckOutPage();
        const paymentpage = poManager.getPaymentPage();
        const confirmationpage = poManager.getConfirmationPage();

        await loginpage.navigateToUrl(testConfig.url);
        await loginpage.validateLogin(testConfig.username, testConfig.password, Orderdata.expectedUserName);
        await dashboardPage.searchProduct(Orderdata.productName);
        await dashboardPage.navigateToCart();
        await cartPage.verifyProductIsDisplayed(Orderdata.productName);



    })

    test("TC_04 PlaceOrder", async ({ page }) => {
        const poManager = new POManager(page);
        const loginpage = poManager.getLoginPage();
        const dashboardPage = poManager.getDashboardPage();
        const cartPage = poManager.getCartPage();
        const checkoutpage = poManager.getCheckOutPage();
        const paymentpage = poManager.getPaymentPage();
        const confirmationpage = poManager.getConfirmationPage();

        await loginpage.navigateToUrl(testConfig.url);
        await loginpage.validateLogin(testConfig.username, testConfig.password, Orderdata.expectedUserName);
        await dashboardPage.searchProduct(Orderdata.productName);
        await dashboardPage.navigateToCart();
        await cartPage.verifyProductIsDisplayed(Orderdata.productName);
        await cartPage.checkOut();
        await checkoutpage.verifyAddress(Orderdata.ordererName, Orderdata.mobileNumber);
        await checkoutpage.clickPlaceOrder();
        await paymentpage.enterPaymentDetail(Orderdata.nameOnCard, Orderdata.cardNumber, Orderdata.cvc, Orderdata.expiryMonth, Orderdata.expiryYear);
        await paymentpage.clickOnPlaceOrder();

        await confirmationpage.verifyOrderConfirmation(Orderdata.confirmationMessage)

    })

})
