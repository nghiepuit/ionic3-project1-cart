import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
    selector: 'page-cart',
    templateUrl: 'cart.html',
})
export class CartPage {

    public cartItems: any[] = [];
    public total: number = 0.0;
    public isEmptyCart: boolean = false;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public storage: Storage,
        public viewCtrl : ViewController
    ) {
        this.storage.ready().then(() => {
            this.storage.get('cart').then(data => {
                this.cartItems = data;
                console.log(this.cartItems)
                if (this.cartItems.length > 0) {
                    this.cartItems.forEach((item, index) => {
                        this.total += item.product.price * item.qty;
                    });
                } else {
                    this.isEmptyCart = true;
                }
            });
        });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad CartPage');
    }

    removeFromCart(item, i) {
        let price = item.product.price;
        let qty = item.qty;
        this.cartItems.splice(i, 1);
        this.storage.set('cart', this.cartItems).then(() => {
            this.total -= (price * qty)
        });
        if(this.cartItems.length == 0){
            this.isEmptyCart = true;
        }
    }

    closeModal(){
        this.viewCtrl.dismiss();
    }

}
