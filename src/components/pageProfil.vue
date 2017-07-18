<template>
  <div>



    <main>
      <div class="container">
        <a class="icon-retour arrow" @click="flowPage"></a>
        <h4>profil : {{user.displayName}}</h4>
        <div class="cardGlobal">
          <div class="containerCard"  v-for="elem in myPhoto" v-bind:class="[elem.pushId]" >

            <div class="photo-card"  >
              <div class="image" v-bind:class="[elem.pushId]"  ><!--:style="{ 'background-image': 'url(' + elem.url + ')' }"-->
              <img :src="elem.url" v-bind:class="[elem.pushId]">
                <span class="del hide" @click="removePhoto($event)">X</span>
              </div>
              <div class="heading">
                <h2 class="title"> {{elem.like}} <span class="icon-like"></span></h2>
                <a class="icon-x close" v-bind:class="[elem.pushId]" @click="removePhoto($event)"></a>
              </div>
            </div>
          </div>
        </div>



      </div>

<!--
      <footer-menu></footer-menu>
-->

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
        active:true,
      }

  },

  methods:{
            edit(event){
                let croix = document.getElementsByClassName('del');
                for ( let i = 0 ; i < croix.length; i++){
                    croix[i].classList.toggle('show');
                    croix[i].classList.toggle('hide');

                }
                let edit = event.target;
                console.log(edit);
                edit.classList.toggle("icon-validation");
                edit.classList.toggle("icon-edit")
            },
            removePhoto(event){
                //console.log(event.target.parentElement);
                let container = event.target.parentElement;
                console.log(container.parentElement);
                let str = container.getAttribute("class");
                let res = str.split(" ");
                console.log(res);
                firebase.database().ref('photos/' + res[1] ).remove()

              container.parentElement.style.display="none";


            },
            flowPage(){
                this.$parent.flowPage = true;
                this.$parent.profilPage=false
            },

            onFileChange(e) {
              let vm = this;




              loadImage(
                e.target.files[0],
                function () {

                    let file = e.target.files[0];
                    vm.$parent.blob = file;
                    console.log(file);
                    vm.$parent.pageUpload = true;
                    vm.$parent.profilPage = false;
                },
                {canvas : true} // Options
              );


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
  img{
    width: 100%;
    border-radius:10px;
    object-fit: cover;
    height: 20vh;
  }
  img[lazy=loading] {
    width: 40px;
  }

  .show{display: block}
  .hide{display: none}
  .del{    width: 25px;
    height: 25px;
    position: absolute;
    top: -2px;
    font-size: 16px;
    line-height: 25px;
    right: -2px;
    border-radius: 50%;
    background-color: #e6184a;
    font-weight: bold;
    cursor: pointer;
    color: white;}
.icon-like{
  position: absolute;
  top: -1px;
  font-size: 22px;
}
label{
  border:1px solid black;
}
main{
  background-image: url("../assets/background-profil.jpg");
  background-attachment: fixed;
  background-size: 100%;
  overflow: auto;
  width: 100%;
  background-repeat:no-repeat;
  position: relative
}
h4{
  clear: both;
  margin-top: 60px;

}
.arrow{
  font-size: 30px;
  /* position: absolute; */
  display: block;
  float: left;
  margin: 20px;
}
.arrow-r{
  font-size: 30px;
  /* position: absolute; */
  display: block;
  float: right;
  margin: 20px;
}
.container{
  width: 95%;
  background-color: white;
  margin: 0 auto;
  padding-bottom: 20px;
  margin-bottom:70px;
  border-radius: 10px;
  margin-top: 10vh;
  -webkit-box-shadow: 0px 0px 6px 1px rgba(87,87,87,1);
  -moz-box-shadow: 0px 0px 6px 1px rgba(87,87,87,1);
  box-shadow: 0px 0px 6px 1px rgba(87,87,87,1);
  overflow: inherit;
  text-align: center;
  min-height: 80vh;
display:inline-block;

}
nav{
  display: block;
  width: 100%;
  height: 30px;
  border-top:2px solid #3c1042;
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
  position: relative;
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

  -webkit-box-shadow: 0px 0px 6px 1px rgba(87,87,87,1);
  -moz-box-shadow: 0px 0px 6px 1px rgba(87,87,87,1);
  box-shadow: 0px 0px 6px 1px rgba(87,87,87,1);
}

footer input{
  font-size: 0px;
  width: 50px;
  height: 50px;
  opacity: 0;
}
.icon-camera:before {
  position: absolute;
  bottom: 17px;
  left: 0px;
  right: 0px;
  text-align: center;
  color: white;
  font-size: 40px;
  font-weight: 100;
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
     width:100%;
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




