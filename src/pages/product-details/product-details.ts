import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, ModalController } from 'ionic-angular';
import * as WC from 'woocommerce-api';
// storage
import { Storage } from '@ionic/storage';
import { CartPage } from './../cart/cart';

@Component({
    selector: 'page-product-details',
    templateUrl: 'product-details.html',
})
export class ProductDetailsPage {

    public product: any;
    public WooCommerce: any;
    public reviews: any[] = [];

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public storage: Storage,
        public toastCtrl: ToastController,
        public modalCtrl : ModalController
    ) {
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

    addToCart(product) {
        this.storage.get('cart').then(data => {
            if (data == null || data.length == 0) {
                data = [];
                data.push({
                    product,
                    qty: 1,
                    amount: parseFloat(product.price)
                });
            } else {
                let added = 0;
                for (var i = 0; i < data.length; i++) {
                    if (product.id == data[i].product.id) {
                        let qty = data[i].qty;
                        data[i].qty = qty + 1;
                        data[i].amount = parseFloat(data[i].amount) + parseFloat(data[i].product.price);
                        added = 1;
                    }
                }
                if (added == 0) {
                    data.push({
                        product,
                        qty: 1,
                        amount: parseFloat(product.price)
                    });
                }
            }

            this.storage.set('cart', data).then(() => {
                this.toastCtrl.create({
                    message: 'Mua hàng thành công',
                    duration: 3000
                }).present();
            });

        });
    }

    openCart(){
        this.modalCtrl.create(CartPage).present();
    }

}
