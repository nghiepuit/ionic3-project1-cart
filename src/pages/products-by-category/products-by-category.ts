import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import * as WC from 'woocommerce-api';
import { ProductDetailsPage } from './../product-details/product-details';

@Component({
    selector: 'page-products-by-category',
    templateUrl: 'products-by-category.html',
})
export class ProductsByCategoryPage {

    public WooCommerce: any;
    public products: any[];
    public page: number;
    public category: any;

    constructor(public navCtrl: NavController, public navParams: NavParams) {

        this.page = 1;
        this.category = this.navParams.get('category');

        this.WooCommerce = WC({
            url: 'http://localhost/wordpress/',
            consumerKey: 'ck_0ff6e165ef736ba1e7e21de1bb5d5dfa1a7a4f70',
            consumerSecret: 'cs_b6b1604977312a676baf676021c15567f4a3cee4'
        });

        this.WooCommerce.getAsync(`products?filter[category]=${this.category.slug}`).then(data => {
            this.products = JSON.parse(data.body).products;
        }, err => {
            console.log(err);
        });

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ProductsByCategoryPage');
    }

    onLoadMoreProducts(event) {
        this.page++;

        this.WooCommerce.getAsync(`products?filter[category]=${this.category.slug}&page=${this.page}`).then(data => {

            let temp = JSON.parse(data.body).products;
            this.products = this.products.concat(JSON.parse(data.body).products);
            event.complete();
            if (temp.length < 10) {
                event.enable(false);
            }

        }, err => {
            console.log(err);
        });
    }

    openProductPage(product) {
        this.navCtrl.push(ProductDetailsPage, {
            product
        });
    }

}
