(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/index"],{"09ef":function(e,n,t){},3339:function(e,n,t){"use strict";var o=t("09ef"),i=t.n(o);i.a},"420b":function(e,n,t){},"5e66":function(e,n,t){"use strict";t.r(n);var o=t("9c0b"),i=t.n(o);for(var s in o)"default"!==s&&function(e){t.d(n,e,(function(){return o[e]}))}(s);n["default"]=i.a},6758:function(e,n,t){"use strict";t.r(n);var o=t("b008"),i=t("5e66");for(var s in i)"default"!==s&&function(e){t.d(n,e,(function(){return i[e]}))}(s);t("3339"),t("c1fc");var c,a=t("f0c5"),r=Object(a["a"])(i["default"],o["b"],o["c"],!1,null,"2e84681e",null,!1,o["a"],c);n["default"]=r.exports},"6e72":function(e,n,t){"use strict";(function(e){t("a687");o(t("66fd"));var n=o(t("6758"));function o(e){return e&&e.__esModule?e:{default:e}}e(n.default)}).call(this,t("543d")["createPage"])},"9c0b":function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=t("ab9c"),i=t("822a"),s=function(){t.e("pages/index/components/Pdftext").then(function(){return resolve(t("9f66"))}.bind(null,t)).catch(t.oe)},c=function(){t.e("pages/index/components/GetOilSuccess").then(function(){return resolve(t("1d35"))}.bind(null,t)).catch(t.oe)},a=function(){t.e("pages/index/components/UploadVideo").then(function(){return resolve(t("21b6"))}.bind(null,t)).catch(t.oe)},r={components:{Pdftext:s,GetOilSuccess:c,UploadVideo:a},data:function(){return{realNameList:[],localdata:[{value:1,text:"已阅读并同意"}],nameIndex:"",showName:!1,active:0,slider:0,moeny:"",form:{idNum:"",phone:"",realName:"",imgUrl:""},checked:!1,showpdf:!1,showSuccess:!1,failMsg:"",tipList1:["请输入您的真实姓名和身份证号码，否则不能领取成功。","为了确保是您本人领取权益我们会采集您的脸部照片进行实名验证。","每个账号每天只能验证3次，请确保输入正确的信息和录入清晰的照片。"],tipList:["广东省内任意中石化直营加油站可以使用，有效期180天。","活动赠送优惠，不可开具发票。","每月第一天和最后一天为中石化电子渠道内部结算日期，这两天不可以使用。"],videoPopup:!1,videoSrc:"",rules:{phone:{rules:[{required:!0,errorMessage:"请获取手机号"}]},realName:{rules:[{required:!0,errorMessage:"请选择真实名字"}]},idNum:{rules:[{required:!0,errorMessage:"请输入身份证号码"}]}}}},onLoad:function(e){this.form.phone=e.phone||"",this.realNameList=e.realNameList.split(",")||[],this.realNameList&&1==this.realNameList.length&&(this.nameIndex=0,this.form.realName=this.realNameList[this.nameIndex])},onReady:function(){this.$refs.form.setRules(this.rules)},methods:{gotoMiniProgram:function(){e.navigateToMiniProgram({appId:"wx32fe2eb8b2fa221f",path:"",success:function(e){}})},callPhone:function(){e.makePhoneCall({phoneNumber:"4006310818"})},takePhoto:(0,i.Debounce)((function(){var n=this,t=e.createCameraContext(),o=function(){t.stopRecord({compressed:!0,success:function(t){console.log("成功回调",t),n.videoSrc=t.tempVideoPath,n.videoSrc||e.showToast({title:"录制失败，请刷新页面重试",icon:"none"}),e.showLoading({mask:!0,title:"正在上传比对中，请勿关闭"}),n.uploadFile()},fail:function(e){console.log("失败回调",e)}})};t.startRecord({success:function(e){var t=setInterval((function(){n.slider++,n.slider>=4&&(n.slider=0,clearInterval(t),o())}),1e3)},fail:function(n){e.showToast({title:n})}})})),error:function(n){console.log(n.detail),e.showModal({title:"提示",content:"相机组件初始化失败，请刷新重试，或检查是否开启摄像头权限",showCancel:!1})},bindPickerChange:function(e){console.log("picker发送选择改变，携带值为",e.target.value),this.nameIndex=e.target.value,this.form.realName=this.realNameList[this.nameIndex]},open:function(){this.showpdf=!0,this.checked=[1]},nextStep:function(){if(console.log(123123,this.form.realName,this.form.idNum,this.form.phone,this.checked),0==this.active){if(!this.form.phone)return void e.showToast({icon:"none",title:"请获取手机号码"});if(!this.form.realName)return void e.showToast({icon:"none",title:"请选择真实姓名"});if(!(0,i.CheckIdCard)(this.form.idNum))return void e.showToast({icon:"none",title:"请输入正确的身份证号"});if(!this.checked||!this.checked.length)return void e.showToast({icon:"none",title:"请先阅读并勾选隐私协议"})}this.active++},clickStep:function(e){this.slider||0==e&&(this.active=0)},uploadFile:function(){var n=this;e.uploadFile({url:"".concat(o.baseURL,"/uploadFile/baiduUploadFile"),filePath:this.videoSrc,name:"mfile",success:function(t){console.log(t.data);var o={};try{o=JSON.parse(t.data)}catch(i){o=t.data}if(200!=o.code)return e.hideLoading(),void e.showToast({icon:"none",title:o.msg||"上传失败"});n.submit(o.data)},fail:function(n){e.hideLoading()}})},submit:function(n){var t=this,i=Object.assign({},this.form);i.imgUrl=n,(0,o.getOilCardAndInterests)(i).then((function(n){e.hideLoading(),console.log(n),200==n.code?(console.log("成功了"),t.getOilSuccess(n.data)):(console.log("失败了"),t.getOilError(n.msg)),t.beforeClose()})).catch((function(n){e.hideLoading(),console.log("失败了",n),t.getOilError(n.msg)}))},getOilSuccess:function(e){this.moeny=e,this.active=2,this.showSuccess=!0},getOilError:function(e){console.log("获取油失败的回调",e),this.failMsg=e}}};n.default=r}).call(this,t("543d")["default"])},b008:function(e,n,t){"use strict";t.d(n,"b",(function(){return i})),t.d(n,"c",(function(){return s})),t.d(n,"a",(function(){return o}));var o={uniForms:function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uni-forms/components/uni-forms/uni-forms")]).then(t.bind(null,"dc38"))},uniFormsItem:function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uni-forms/components/uni-forms-item/uni-forms-item")]).then(t.bind(null,"223f"))},uniEasyinput:function(){return t.e("uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput").then(t.bind(null,"ef2e"))},uniDataCheckbox:function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uni-data-checkbox/components/uni-data-checkbox/uni-data-checkbox")]).then(t.bind(null,"468b"))}},i=function(){var e=this,n=e.$createElement;e._self._c},s=[]},c1fc:function(e,n,t){"use strict";var o=t("420b"),i=t.n(o);i.a}},[["6e72","common/runtime","common/vendor"]]]);