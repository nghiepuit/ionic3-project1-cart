import { Component, ViewChild } from '@angular/core';
import { NavController, Slides, ToastController } from 'ionic-angular';
import * as WC from 'woocommerce-api';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    public WooCommerce: any;
    public products: any[] = [];
    public moreProducts: any[] = [];
    @ViewChild('productSlides') productSlides: Slides;
    public page: number;

    constructor(public navCtrl: NavController, public toastCtrl : ToastController) {
        this.page = 2;
        this.WooCommerce = WC({
            url: 'http://localhost/wordpress/',
            consumerKey: 'ck_0ff6e165ef736ba1e7e21de1bb5d5dfa1a7a4f70',
            consumerSecret: 'cs_b6b1604977312a676baf676021c15567f4a3cee4'
        });
        this.onLoadMoreProducts(null);
        this.WooCommerce.getAsync('products').then(data => {
            this.products = JSON.parse(data.body).products;
        }, err => {
            console.log(err);
        });
    }

    ionViewDidLoad() {
        setInterval(() => {
            if (this.productSlides.getActiveIndex() == this.productSlides.length() - 1) {
                this.productSlides.slideTo(0);
            }
            this.productSlides.slideNext();
        }, 3000);
    }

    onLoadMoreProducts(event) {
        if (event == null) {
            this.page = 2;
            this.moreProducts = [];
        } else {
            this.page++;
        }

        this.WooCommerce.getAsync('products?page=' + this.page).then(data => {
            this.moreProducts = this.moreProducts.concat(JSON.parse(data.body).products);
            if(event != null){
                event.complete();
            }

            if(JSON.parse(data.body).products.length < 10){
                event.enable(false);
                this.toastCtrl.create({
                    message : 'Đã tải hết sản phẩm !',
                    duration : 5000
                }).present();
            }

        }, err => {
            console.log(err);
        });
    }

}
