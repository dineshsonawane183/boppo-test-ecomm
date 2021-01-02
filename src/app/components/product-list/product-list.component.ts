import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { productStore } from 'src/app/store/product-store';
import { ActionTypes } from 'src/app/store/actions';
import { cartStore, cartEventDispatcher } from 'src/app/store/cart-store';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: any = [];
  carts: any = [];

  constructor(
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    productStore.subscribe((state) => {
      this.products = state.products;
    });
    cartStore.subscribe((state)=>{
      this.carts = state.carts;
    })
  }
  viewProduct(item: any): void {
    this.router.navigate(['/view/product', item.pid])
  }
  addToCart(pid: any) {
    if (this.auth.isAuthenticated()) {
      const product = this.products.filter((prod: any) => { return prod.pid == pid })[0];
      let tmp = [{
        pid: pid,
        name: product.product_name,
        product_weight: product.product_weight,
        price: product.product_price,
        qty: 1,
        product_image: product.product_image
      }]
      cartEventDispatcher.next({ type: ActionTypes.ADD_CART, payload: this.carts.concat(tmp) });
      this.router.navigate(["cart", "addedToCart"]);
    } else {
      this.router.navigate(["login"]);
    }
  }

}
