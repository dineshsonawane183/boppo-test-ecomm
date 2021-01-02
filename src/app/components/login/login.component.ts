import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginInvalid: boolean = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { }

  loginForm: FormGroup = this.fb.group({
    username: ["", Validators.required],
    password: ["", Validators.required]
  });

  ngOnInit(): void {
  }
  onSubmit() {
    if (this.loginForm.valid) {
      this.loginInvalid = true;
      const val = this.loginForm.value;

      if (val.username && val.password) {
          this.authService.login(val.username, val.password)
          .subscribe(
            (res) => {
              this.loginInvalid = false;
              console.log("User is logged in");
              this.router.navigateByUrl('/');
            }
          );
        }
      }

    }
  }
