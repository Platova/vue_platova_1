import {expect, test} from '@playwright/test'

   test('add/del to cart', async ({page}) => {
        await page.goto('http://127.0.0.1:5173/');
        //проверили что открыли что надо
        await expect(page).toHaveTitle(/Нефрет/);
        //проверяем добавление в корзину
        const productItem = page.getByTestId('cardItem-1');
        const cartCounter = page.getByTestId('cart-counter');
        await productItem.getByRole('button',{name : 'Добавить в корзину' }).click();
        await expect(cartCounter).toHaveText('1');

        const productItem2 = page.getByTestId('cardItem-2');
        await productItem2.getByRole('button',{name : 'Добавить в корзину' }).click();
        await expect(cartCounter).toHaveText('2');
        await expect(productItem2.getByRole('button',{name : '-' })).toBeVisible();
        await productItem2.getByRole('button',{name : '-' }).click();
        await expect(productItem2.getByRole('button',{name : '-' })).not.toBeVisible();
        await expect(cartCounter).toHaveText('1');
    });
    //проверяем поиск
    test('search products by name', async ({page}) => {
        await page.goto('http://127.0.0.1:5173/');
        //текстовый поиск
        await page.getByTestId('filterField').fill('cotton');
        const items = await page.locator('.cardItem')
        await expect(items).toHaveCount(2)
        //поиск по цене
        await page.getByTestId('findByPrice').click();
        await expect(items).toHaveCount(0)
        await page.getByTestId('filterField').fill('64');
        await expect(items).toHaveCount(1)
    });

    // проверяем навигацию  в корзину и проверку подсчета суммы
    test('test routing to cart', async ({page}) => {
        await page.goto('http://127.0.0.1:5173/');
        const productItem = page.getByTestId('cardItem-1');
        await productItem.getByRole('button',{name : 'Добавить в корзину' }).click();
        await productItem.getByTestId('goToCart').click();
        //перешли в Корзину
        await expect(page.getByTestId('CardProductList')).toBeVisible();
        await expect(page.getByTestId('price')).toHaveText('109.95');
        const product1 = page.getByTestId('card-1');
        //добавим товар
        await product1.getByRole('button',{name : '+' }).click();
        await expect(page.getByTestId('price')).toHaveText('219.90');
        // удалим товар- корзина пуста
        await product1.getByRole('button',{name : 'Удалить' }).click();
        await expect(page.getByTestId('cart-empty')).toBeVisible();
    });
