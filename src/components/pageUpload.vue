<template>
  <div>



    <main>
      <div class="container">
        <a class="icon-arrow-left2 arrow" @click="pageProfil"></a>
        <section id="canvas_wrapper"></section>
        <div>
          <tabs>
            <tab name="First tab">

              <div class="icon_container">
                <figure >
                  <img src="../assets/cat1.jpg" @click="catF($event)"  id="bras" class="catImg">
                </figure>
                <figure >
                  <img src="../assets/cat2.jpg" @click="catF($event)" id="main" class="catImg">
                </figure>
                <figure >
                  <img src="../assets/cat3.jpg" @click="catF($event)" id="poitrine" class=" catImg">
                </figure>
              </div>

            </tab>
            <tab name="Second tab">
              developpement in progress
            </tab>
          </tabs>

          <a @click.prevent="send($event)"class="btn">
            Valider</a>
        </div>
      </div>

    </main>







  </div>
</template>



<script>
import Vue from 'vue'
import {Tabs, Tab} from 'vue-tabs-component';
Vue.component('tabs', Tabs);
Vue.component('tab', Tab);
export default {
  name: 'pageUpload',

  data : function () {
      let appCompo = this.$parent; // get pp compososant to have user object
      return{
          user : appCompo.user,
          blob : appCompo.blob,
          canvas : false,
          cat : false

      }

  },

  methods:{
    pageProfil : function () {

          this.$parent.profilPage = true;
          this.$parent.pageUpload = false;
    },
    catF : function (event) {

        let target = event.target;
        let category = target.id;
        let catImg = document.getElementsByClassName('catImg');
        for(let i=0; i < catImg.length;i++){

            catImg[i].style.border = "none";
        }
        target.style.border = "3px solid red";
        this.cat = category;

    },
    send : function (event) {


      let vm = this;

      if(vm.cat != false) {


        let blob = vm.blob;
        let canvas = vm.canvas;
        canvas.toBlob(function (blob) {
          let date = new Date();


          let ref = firebase.storage().ref(JSON.stringify(date));
          ref.put(blob).then(function (snapshot) {
            vm.$parent.profilPage = true;
            vm.$parent.pageUpload = false;
          }).then(function () {

            let ref = firebase.storage().ref(JSON.stringify(date));
            let storeUrl;

            let getUrl = function () {


              ref.getDownloadURL().then(function (url) {
                let xhr = new XMLHttpRequest();
                xhr.responseType = 'blob';
                xhr.onload = function (event) {
                  let blob = xhr.response;
                };
                xhr.open('GET', url);
                xhr.send();
                storeUrl = url;

                postUrl(storeUrl);


              }).catch(function (error) {
                console.log(error)
              });


            };
            getUrl();
            // post l'url de l'image dans un tableau photos dans la table user.uid
            let postUrl = function () {
              let cat = vm.cat;
              let newRef = firebase.database().ref('photos/').push({

                url: storeUrl,
                category: cat,
                userId: vm.user.uid,
                like: 0,
                pushId: 0


              });
              let pushId = newRef.key;
              let niquePush = {};
              niquePush['photos/' + pushId + '/pushId'] = pushId;
              firebase.database().ref().update(niquePush);


              let updates = {};
              updates['users/' + vm.user.uid + '/isPhoto'] = true;
              firebase.database().ref().update(updates);


              vm.isPhoto = true;

            }

          });


        }, 'image/jpeg', 0.6)
      }else{
      }
    }





  },
  created:function () {


    let vm = this;
    let img = vm.blob;
    img.onload = function () {

      let imgWidth = img.width;
      let imgHeight = img.height;
      let maxInternalSize = 800;
      let maxDisplaySize = 300;
      let scaleRatio = maxDisplaySize / maxInternalSize;

      let wrapper = document.getElementById('canvas_wrapper');
      /*
       while (wrapper.hasChildNodes()) {
       wrapper.removeChild(wrapper.lastChild);
       }
       */
      let canvas = document.createElement('canvas');

      canvas.setAttribute("width", imgWidth);
      canvas.setAttribute("height", imgHeight);

      wrapper.appendChild(canvas);
      vm.canvas = canvas;
      let ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, imgWidth, imgHeight);

      // fix for canvas internal size calc (attr) and display (style)
      canvas.style.width = 99 + "%";
      canvas.style.height = 350 + "px";
      canvas.style.marginTop = -15 + "px"




    }
  }

}


</script>

<style scoped>

.icon_container{
  width: 100%;
  height: 100px;
  border:1px solid black;
  display: inline-table;
  overflow: scroll;
}
.icon_container figure{

  width: 30%;
  display: inline-block;
  margin: 10px 0;


}
.icon_container figure img {
  width: 80%;
}

main{
  background-image: url("../assets/background-profil.jpg");
  background-size: 100%;
  overflow: auto;
  width: 100%;
  background-repeat:no-repeat;
  position: relative
}

.arrow{
  font-size: 30px;
  /* position: absolute; */
  display: block;
  float: left;
  margin: 20px;
}
.container{
  width: 90%;
  background-color: white;
  margin: 0 auto;
  border-radius: 10px;
  margin-top: 10vh;
  -webkit-box-shadow: 0px 0px 25px 0px rgba(0,0,0,1);
  -moz-box-shadow: 0px 0px 25px 0px rgba(0,0,0,1);
  box-shadow: 0px 0px 25px 0px rgba(0,0,0,1);
  text-align: center;
  min-height: 100vh;
display:inline-block;

}
.btn {
  background: -moz-linear-gradient(left, #e26a84 0%, #e5244e 100%); /* FF3.6-15 */
  background: -webkit-linear-gradient(left,#e26a84 0%,#e5244e 100%); /* Chrome10-25,Safari5.1-6 */
  background: linear-gradient(to right,#e26a84 0%,#e5244e 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#1e5799', endColorstr='#e5244e',GradientType=1 ); /* IE6-9 */
  -webkit-border-radius: 28;
  -moz-border-radius: 28;
  border-radius: 28px;
  font-family: Arial;
  color: #ffffff;
  font-size: 22px;
  padding: 13px 45px 13px 45px;
  text-decoration: none;
  margin: 20px;
  display:inline-block;
}

</style>




