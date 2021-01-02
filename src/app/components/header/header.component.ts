import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { cartStore } from 'src/app/store/cart-store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  cartItemsList:any =[];
  cartItemCount = 0;
  constructor(
    private auth : AuthService,
    private router:Router
  ) { }

  ngOnInit(): void {
    cartStore.subscribe((state)=>{
      this.cartItemsList = state.carts;
      this.cartItemCount =this.cartItemsList.length; 
    })
  }
  isAuthenticated(){
    return this.auth.isAuthenticated();
  }
  logout(){
    this.auth.logout().subscribe((res)=>{
      if(res){
        this.router.navigate(['login'])
      }
    })
  }
}
