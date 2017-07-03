<template>
  <div>



    <main>
      <div class="container">
        <a class="icon-arrow-left2 arrow" @click="flowPage"></a>
        <h1>{{user.displayName}}</h1>
        <div class="cardGlobal">

          <div class="containerCard"  v-for="elem in myPhoto" v-bind:class="[elem.pushId]" >
            <div class="photo-card"  >
              <div class="image"  :style="{ 'background-image': 'url(' + elem.url + ')' }" >
              </div>
              <div class="heading">
                <h2 class="title">like : {{elem.like}}</h2>
                <a class="icon-x close" v-bind:class="[elem.pushId]" @click="removePhoto($event)"></a>

              </div>
            </div>
          </div>
        </div>
      </div>
      <footer>
        <nav>
          <ul>
            <li id="profil" class="icon-photo">
              <input  class="input-file "  type="file" @change="onFileChange">
            </li>
            <li id="photo_icon">
            </li>
          </ul>
        </nav>
      </footer>
    </main>







  </div>
</template>



<script>
  import Vue from 'vue'
import footerMenu from './menu'
export default {
  name: 'pageProfil',
  components:{footerMenu},
  data : function () {
      let appCompo = this.$parent; // get pp compososant to have user object
      return{
        user :appCompo.user,
        imageUrl:false,
        image:false,
        isPhoto:false,
        msg : {a :false, b:"Postez une photo"},
        myPhoto:false,
        classId:false,
        active:true
      }

  },

  methods:{
            test(event){
              console.log(event);

            },
            removePhoto(){
                console.log(event.currentTarget);
                let container = event.currentTarget.parentElement.parentElement;
                let str = event.currentTarget.getAttribute("class");
                let res = str.split(" ");
                //console.log(res)
                firebase.database().ref('photos/' + res[2] ).remove()


            },
            flowPage(){
                this.$parent.flowPage = true;
                this.$parent.profilPage=false
            },

            onFileChange(e) {
              let files = e.target.files || e.dataTransfer.files; // chope l'image
              if (!files.length)
                return;
              this.createImage(files[0]);
            },
            createImage(file) {
              let image = new Image();
              let reader = new FileReader();
              let vm = this;
              console.log(file);



              reader.onload = (e) => {
                vm.imageUrl = e.target.result;


              };
              //reader.readAsDataURL(file); // assigne l'url de l'image a data.imageUrl
              vm.image =file;  //assigne l'objet image a data.image

              //console.log(file); //
              this.uploadImage();
            },
            removeImage: function (e) {
              this.image = '';
            },
            uploadImage(){
              let vm = this;
              let image = vm.image;
              let file = image; // use the Blob or File API
              console.log(file.lastModified);

              let ref = firebase.storage().ref(JSON.stringify(file.lastModified));
              // push dans ce dossier un enfant qui a le nom " image.name "

              ref.put(file).then(function(snapshot) {
                console.log('Uploaded a blob or file!');
              }).then(function () {

                let ref = firebase.storage().ref(JSON.stringify(file.lastModified));
                let storeUrl;

                let getUrl = function () {


                  ref.getDownloadURL().then(function(url) {
                    let xhr = new XMLHttpRequest();
                    xhr.responseType = 'blob';
                    xhr.onload = function(event) {
                      let blob = xhr.response;
                    };
                    xhr.open('GET', url);
                    xhr.send();
                    storeUrl = url;

                    postUrl(storeUrl);


                  }).catch(function(error) {
                    console.log(error)
                  });




                };
                getUrl();
                // post l'url de l'image dans un tableau photos dans la table user.uid
                let postUrl = function () {
                  /*let photoId = 1;
                  firebase.database().ref('photos/').once('value').then(function (snapshot) {
                    if (snapshot.val()) {

                      let data = snapshot.val();
                      data = data.length;
                      photoId = data++;
                      return photoId
                    }

                  }).then(function () {*/
                    let plop = {a: "plop", b: "plop2", c: "plop3"}; // valeur test pour db
                    let category = {a: "random"}; // valeur test pour la db


                    let newRef = firebase.database().ref('photos/' ).push({

                      url: storeUrl,
                      wtacherId: plop,
                      category: category,
                      userId: vm.user.uid,
                      like: 0,
                      pushId : 0


                    });
                  let pushId = newRef.key;
                  let niquePush ={};
                  niquePush['photos/'+ pushId + '/pushId'] = pushId;
                  firebase.database().ref().update(niquePush);



                  let updates = {};
                    updates['users/' + vm.user.uid + '/isPhoto'] = true;
                    firebase.database().ref().update(updates);

                    vm.removeImage();
                    vm.isPhoto = true;
                    console.log(vm.msg);
                    vm.msg.a = "Photo bien recu";
                    vm.msg.b = "Poster d'autre photos"


                  //});
                }

              });
      }
    },
  created:function () {
    let vm = this;
    firebase.database().ref('users/' + vm.user.uid).on('value', function (snapshot) {

      vm.isPhoto = true;
      let ref = firebase.database().ref("photos/");
      ref.orderByChild("userId").equalTo(vm.user.uid).on('value', function(snapshot) {

        let data = snapshot.val();
        let myPhoto = [];

        if(data){
          let dataB = Object.keys(data).map(function(e) {
            return [Number(e), data[e]];
          });
          dataB.map( function(obj){
              myPhoto.push(obj[1]);

          });

          vm.myPhoto = myPhoto;
          console.log(vm.myPhoto)


        }



      });

    });




  }

}


</script>

<style scoped>
label{
  border:1px solid black;
}
main{
  background-image: url("../assets/background-profil.jpg");
  background-size: 100%;
  overflow: auto;
  width: 100%;
  background-repeat:no-repeat;
  position: relative
}
h1{
  clear: both;

}
.arrow{
  font-size: 30px;
  /* position: absolute; */
  display: block;
  float: left;
  margin: 20px;
}
.container{
  width: 85%;
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
nav{
  display: block;
  width: 100%;
  height: 30px;
}

ul{
  list-style: none;
  clear: both;
  padding: 0;
}
ul li {
  float: left;
  padding: 10px;
  font-weight: bold;
}
ul li button{

  font-size: 14px;

}
input[type="file"]:focus {
  border: none;
  outline: none;
}
.cardGlobal{
  padding: 10px;
  clear: both;
}
.containerCard{
  width: calc(50% - 10px);
  float: left;
  padding: 5px;
}

/*
card css
*/




footer ul{
  list-style: none;
  display: inline-table;
  margin: 0;
  padding: 0;
  position: relative;
  width: 100%;

}
footer nav{
  height:40px;
  background-color: white;
  border-top:2px solid black;
  position: fixed;
  bottom: 0;
  width: 100%;

}
footer ul li {
  display: inline-block;
}
footer ul li:first-child{
  margin-right: 70%;
}
footer #profil{
  font-size: 0px;
  width: 50px;
  height: 50px;
  display: block;
  position: absolute;
  top: -55px;
  left: 0;
  right: 0;
  border-radius: 50%;
  background-color: #e6184a;
  margin: 0 auto;
  cursor: pointer;
  color: white;

}

footer input{
  font-size: 0px;
  width: 50px;
  height: 50px;
  opacity: 0;
}
.icon-photo:before {
  position: absolute;
  bottom: 17px;
  left: 0px;
  right: 0px;
  text-align: center;
  color: white;
  font-size: 40px;
}
#photo_icon{
  position: absolute;
  bottom: -10px;
  right: 0;
  left: 0;
}







/*------------------*/
.heading{
  position: relative;
}
.close{
  font-size: 20px;
  position: absolute;
  font-weight: bold;
  bottom: 2px;
  right: 8px;
}
   .image {
      border-radius: 2px 2px 0 0;
      height:0px;
     width:100%;
     padding-bottom:106.25%;
     background : center center / cover;
      display:block;
    }


  .photo-card {
    width: 100%;
    background-color: #fff;
    border-radius: 2px;
    overflow: hidden;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  }
  .title{
    margin:5px 0;
    font-size: 12px;
    text-align: left;
    padding: 3px 15px;
  }

</style>




