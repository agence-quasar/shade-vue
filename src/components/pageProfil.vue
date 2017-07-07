<template>
  <div>



    <main>
      <div class="container">
        <a class="icon-arrow-left2 arrow" @click="flowPage"></a>
        <h1>{{user.displayName}}</h1>

        <button @click="test"></button>

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
              this.$parent.pageUpload = true;
              this.$parent.profilPage = false;
            },
            removePhoto(){
                let container = event.currentTarget.parentElement.parentElement;
                let str = event.currentTarget.getAttribute("class");
                let res = str.split(" ");
                firebase.database().ref('photos/' + res[2] ).remove()


            },
            flowPage(){
                this.$parent.flowPage = true;
                this.$parent.profilPage=false
            },

            onFileChange(e) {
              let vm = this;
              let files = e.target.files || e.dataTransfer.files; // chope l'image
              if (!files.length)
                return;

              for (let imgFile of e.target.files) {
                let img = new Image;
                img.src = URL.createObjectURL(imgFile);
                vm.$parent.blob = img;


              }
              this.$parent.pageUpload = true;
              this.$parent.profilPage = false;
              //this.createImage(files[0]);

            }
    },
  created:function () {
    let vm = this;

    let that = this;
    let photoRef = firebase.database().ref('photos/');
    photoRef.orderByChild("userId").equalTo(vm.user.uid).on('value', function(snapshot) {


      let data = snapshot.val();

      let coucou = [];

      if(data){
        let dataB = Object.keys(data).map(function(e) {
          return [Number(e), data[e]];
        });
        dataB.map( function(obj){  coucou.push(obj[1]) });
        that.myPhoto = coucou;
      }



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




