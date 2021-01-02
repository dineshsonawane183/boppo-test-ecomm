import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { cartStore } from 'src/app/store/cart-store';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  
  cartItemsList :any = [];
  showMsg :boolean = false;
  constructor(
    private route: ActivatedRoute
  ) { }
  
  ngOnInit(): void {
    if(this.route.snapshot.paramMap.get('msg') == "addedToCart"){
      this.showMsg = true;
      setTimeout(()=>{
        this.showMsg = false;
      },3000)
    }
    cartStore.subscribe((state)=>{
      this.cartItemsList = state.carts;
    })
  }

}
