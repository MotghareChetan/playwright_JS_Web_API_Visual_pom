// @ts-check
const { expect } = require('@playwright/test');
class LoginPage {

    constructor(page) {
        this.page = page;
        this.loginbtn = page.locator("//a[contains(text(),'Signup / Login')]");
        this.emailField = page.locator("input[data-qa='login-email']");
        this.password = page.locator("input[type='password']");
        this.clickLogin = page.locator("button[data-qa='login-button']");
        this.loginUserName = page.locator("//ul[@class='nav navbar-nav']//b[1]");
        this.logoutbtn = page.getByRole('link', { name: ' Logout' });
        this.logo = page.locator("img[alt='Website for automation practice']");

    }

    async navigateToUrl(url) {
        await this.page.goto(url);
    }

    async validateLogin(username, password, userName) {
        await this.loginbtn.click()
        await this.emailField.fill(username)
        await this.password.fill(password)
        await this.clickLogin.click()
        const actualUsername = await this.loginUserName.textContent()
        expect(actualUsername).toContain(userName)


    }

    async logOut() {
        await this.logoutbtn.click();
    }

    async validateLogo() {
        expect(await this.logo.screenshot()).toMatchSnapshot('test_practice_logo.png');
    }

}
module.exports = { LoginPage }
