import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from './../home/home';
import * as WC from 'woocommerce-api';
import { ProductsByCategoryPage } from './../products-by-category/products-by-category';

@Component({
    selector: 'page-menu',
    templateUrl: 'menu.html',
})
export class MenuPage {

    public homePage: Component;
    public WooCommerce: any;
    public categories: any[] = [];
    @ViewChild('content') childNavCtrl : NavController;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.homePage = HomePage;
        this.categories = [];
        this.WooCommerce = WC({
            url: 'http://localhost/wordpress/',
            consumerKey: 'ck_0ff6e165ef736ba1e7e21de1bb5d5dfa1a7a4f70',
            consumerSecret: 'cs_b6b1604977312a676baf676021c15567f4a3cee4'
        });
        this.WooCommerce.getAsync('products/categories').then(data => {
            let temp: any[] = JSON.parse(data.body).product_categories;
            for (var i = 0; i < temp.length; i++) {
                if (temp[i].parent == 0) {
                    // icon & image

                    if (temp[i].slug == 'clothing') {
                        temp[i].icon = 'shirt';
                    }
                    if (temp[i].slug == 'music') {
                        temp[i].icon = 'musical-notes';
                    }
                    if (temp[i].slug == 'posters') {
                        temp[i].icon = 'images';
                    }

                    this.categories.push(temp[i]);
                }
            }
        }, err => {
            console.log(err);
        });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad MenuPage');
    }

    openCategoryPage(category) {
        this.childNavCtrl.setRoot(ProductsByCategoryPage, {
            category
        });
    }

}
