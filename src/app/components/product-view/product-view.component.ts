import { Component, OnInit } from '@angular/core';
import { ProductsModel } from 'src/app/model/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { AuthService } from 'src/app/auth/auth.service';
import { cartEventDispatcher, cartStore } from 'src/app/store/cart-store';
import { ActionTypes } from 'src/app/store/actions';
import { productStore } from 'src/app/store/product-store';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {


  productId: any;
  carts:any;
  product:any;
  products: any = [];

  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private auth : AuthService
  ) { }

  ngOnInit(): void {
    productStore.subscribe((state) => {
      this.products = state.products;
    });
    cartStore.subscribe((state)=>{
      this.carts = state.carts;
    })
    this.products = new ProductsModel().data;
    this.productId = this.route.snapshot.paramMap.get("id");
    this.product = this.products.filter((prod: any) => { return prod.pid == this.productId })[0];
    if(!this.product){
      this.router.navigate(["?"]);
    }
  }
  addToCart(pid:any){
    if(this.auth.isAuthenticated()){
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
    }else{
      this.router.navigate(["login"]);
    }
  }

}
