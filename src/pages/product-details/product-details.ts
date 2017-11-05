import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import * as WC from 'woocommerce-api';

@Component({
    selector: 'page-product-details',
    templateUrl: 'product-details.html',
})
export class ProductDetailsPage {

    public product: any;
    public WooCommerce: any;
    public reviews: any[] = [];

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.product = this.navParams.get('product');
        this.WooCommerce = WC({
            url: 'http://localhost/wordpress/',
            consumerKey: 'ck_0ff6e165ef736ba1e7e21de1bb5d5dfa1a7a4f70',
            consumerSecret: 'cs_b6b1604977312a676baf676021c15567f4a3cee4'
        });
        this.WooCommerce.getAsync(`products/${this.product.id}/reviews`).then(data => {
            this.reviews = JSON.parse(data.body).product_reviews;
        }, err => {
            console.log(err);
        });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ProductDetailsPage');
    }

}
