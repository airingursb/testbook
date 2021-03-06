/// <reference path="../tabs/wilddog.d.ts" />
import {Component} from '@angular/core';
import {NavController, ViewController, ToastController, LoadingController} from 'ionic-angular';
import wilddog from 'wilddog';

@Component({
    templateUrl: 'register.html',
    styleUrls: ['/pages/contact/register.scss']
})

export class Register {

    private user:any;

    constructor(private navCtrl:NavController,
                private viewCtrl:ViewController,
                private toastCtrl:ToastController,
                private loadingCtrl:LoadingController) {
        this.user = {
            username : '',
            password : '',
            passwordconfirm : '',
            email : ''
        };
    }

    ionViewWillEnter() {
        var config = {
            authDomain : 'plant-book.wilddog.com',
            syncURL : 'https://plant-book.wilddog.com'
        }
        wilddog.initializeApp(config);
    }

    //返回登陆界面操作
    dismiss() {
        this.viewCtrl.dismiss();
    }

    //注册操作
    register() {
        //判断用户名是否为空或长度是否小于6
        //判断正确则提示“用户名格式不正确”

        if (this.user.username == "" || this.user.username.length < 6) {
            let usernameToast = this.toastCtrl.create({
                message: "用户名格式不正确",
                duration: 2000
            });

            usernameToast.present();

        }
        //判断密码是否为空
        //判断正确则提示“密码不能为空”
        else if (this.user.password == "") {
            let passwordToast = this.toastCtrl.create({
                message: "密码不能为空",
                duration: 2000
            });

            passwordToast.present();
        }
        //判断密码与重复密码是否一致
        //判断正确则提示“密码与重复密码不一致”
        else if (this.user.passwordconfirm != this.user.password) {
            let passwordconfirmToast = this.toastCtrl.create({
                message: "密码与重复密码不一致",
                duration: 2000
            });

            passwordconfirmToast.present();
        }
        //判断email是否为空
        //判断正确则提示“邮箱不能为空”
        else if (this.user.email == "") {
            let telephoneToast = this.toastCtrl.create({
                message: "邮箱不能为空",
                duration: 2000
            });

            telephoneToast.present();
        }
        //注册资料正确则进行注册操作
        else {
            let registerLoading = this.loadingCtrl.create({
                spinner: "circles",
                content: "正在注册"
            });

            registerLoading.present();

            // 使用 Wilddog 进行用户注册
            wilddog.auth().createUserWithEmailAndPassword(this.user.email,this.user.password);
            wilddog.auth().signInWithEmailAndPassword(this.user.email,this.user.password);
            wilddog.auth().onAuthStateChanged((user) => {
                if(user){
                    console.log('User is logined in')
                    user.updateProfile({
                        displayName : this.user.username
                    })
                }else{
                    console.log('No user is logined in');
                }
            })
            setTimeout(() => {
                registerLoading.dismiss();
            }, 3000);
            this.viewCtrl.dismiss();

        }
    }


}