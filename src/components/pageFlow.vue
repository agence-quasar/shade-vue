<template>

  <main>
  <!--  <div class="spinner" v-show="loading">
      <div class="dot1"></div>
      <div class="dot2"></div>
    </div>-->
    <h1 v-if="empty" style="margin-top: 30vh">aucune dans la category {{emptyCat}}, Soyez le premier !</h1>



   <div>
      <ul>
        <li v-for="elem in picturesUrl">
          <v-touch tag="div"
                   @doubletap="like($event)"
                   v-bind:class="[elem.pushId]"

          >
            <!--<div class="image" :style="{ 'background-image': 'url(' + elem.url + ')' }" v-lazy="elem.url" ></div>-->
            <img class="img" :src="elem.url" v-lazy="elem.url" >
          </v-touch>
        </li>


      </ul>
    </div>



<!--
    <footer-menu></footer-menu>
-->
  </main>


</template>



<script>


  import footerMenu from './menu'
  import { Lazyload } from 'mint-ui';
  import { Toast } from 'mint-ui';

  let count = 0;
  export default {
    name: 'pageFlow',


    data: function () {
      let appCompo = this.$parent; // get pp compososant to have user object
      return {
        user: appCompo.user,
        userTab: false,
        picturesUrl: [],
        stateUrl: [],
        empty: false,
        busy: true,
        lastEntry: 0,
        emptyCat : false


      }

    },


    methods: {

      toast: function () {
        Toast({
          message: 'like !',
          iconClass: 'mintui mintui-success',
          duration:700
        });
      },
      openToastWithIcon:function () {

      },
      untoast: function () {
        Toast({
          message: 'unLike !',
          iconClass: 'mintui mintui-success',
          duration:700
        });
      },

      like: function (event) {
        let parent = event.target.parentElement;
        let vm = this;
        let userTab = vm.userTab;
        let likeRef = firebase.database().ref('photos/' + parent.className);
        let owner = false;
        let photo = false;
        let like=false;


        likeRef.once('value').then(function(snapshot) {
          let data = snapshot.val();
          console.log(data);photo = data.pushId;
          like = data.like;
          owner = data.userId;
          let obj = userTab.likeList;
          if(userTab.likeList){


            console.log('1) peut étre un like');

            // fetch user/id/likeList
            let photoRef = firebase.database().ref('users/' + vm.user.uid +'/likeList' );
            photoRef.orderByKey().equalTo(owner).once('value').then(function(snapshot) {

              let userID = snapshot.val(); // si l'utilisateur de le photo existe chez l'utilisateur qui like
              if(userID === null){ // l'utilisateur en question n'existe pas dans liekList donc je l'ajoute et je like
                console.log('finalement aucun like donc je like');

                like ++;
                let updates = {};
                updates['photos/' + photo+'/like'] = like;
                firebase.database().ref().update(updates);

                let ref = firebase.database().ref('users/' + vm.user.uid + '/likeList/' +  owner);
                ref.push({
                  id : photo
                })
                let yu = document.createElement('span');
                yu.classList = 'icon-like';
                yu.style.transition='all 0.5sec ease';
                parent.appendChild(yu);
                yu.style.position='absolute';
                yu.style.top='0px';
                yu.style.color ='#E6214B';
                yu.style.left=' -10px';
                yu.style.opacity='1';
                yu.style.fontSize='50px';
                vm.toast();
              }
              else { // l'uilisateur existe donc on va chercher dans ce tableau si il y a une photo
                console.log('plop',userID);
                let ref1 = Object.keys(userID)[0];

                let photoRef = firebase.database().ref('users/' + vm.user.uid + '/likeList/' + Object.keys(userID)[0]);
                photoRef.orderByChild('id').equalTo(photo).once('value').then(function (snapshot) {

                  let data = snapshot.val(); //console.log('before ref',data);
                  if(data === null){
                    console.log('likelist + userid  mais nouvelle photo');
                    like ++;
                    let updates = {};
                    updates['photos/'+photo+'/like'] = like;
                    firebase.database().ref().update(updates);

                    let ref = firebase.database().ref('users/' + vm.user.uid + '/likeList/' +  owner);
                    ref.push({
                      id : photo
                    })
                    let yu = document.createElement('span');
                    yu.classList = 'icon-like';
                    yu.style.transition='all 0.5sec ease';
                    parent.appendChild(yu);
                    yu.style.position='absolute';
                    yu.style.top='0px';
                    yu.style.color ='#E6214B';
                    yu.style.left=' -10px';
                    yu.style.opacity='1';
                    yu.style.fontSize='50px';
                    vm.toast();
                  }
                  else{
                    let ref2 = Object.keys(data)[0];
                    let pouet = data[Object.keys(data)[0]];
                    console.log('ref2', ref2);
                    let nqtm = pouet.id;
                    console.log('nqtm', nqtm);
                    if (photo === nqtm) {
                      console.log('tu as déjo liké cette photo');
                      like--;
                      let updates = {};


                      updates['photos/' + photo + '/like'] = like;
                      firebase.database().ref().update(updates);


                      let delet = {};delet['users/' + vm.user.uid + '/likeList/' + ref1 + '/' + ref2 + '/id'] = null;
                      firebase.database().ref().update(delet);
                      vm.untoast();

                      let ym =event.target.nextSibling;
                      ym.style.opacity='0';


                    }
                  }



                });
              }



            });



          } // pas de likeList je like auto ( likelist = false)
          else{
            console.log('aucun like cest sur donc like++' );

            like ++;
            let updates = {};
            updates['photos/'+photo+'/like'] = like;
            firebase.database().ref().update(updates);

            let ref = firebase.database().ref('users/' + vm.user.uid + '/likeList/' +


              owner);
            ref.push({
              id : photo
            })
            let yu = document.createElement('span');
            yu.classList = 'icon-like';
            yu.style.transition='all 0.5sec ease';
            parent.appendChild(yu);
            yu.style.position='absolute';
            yu.style.top= '0px';
            yu.style.color ='#E6214B';
            yu.style.left=' -10px';
            yu.style.opacity='1';
            yu.style.fontSize='50px';
            vm.toast()




          }





        })




      },
      goFiltre : function () {
        this.$parent.flowPage = false;
        this.$parent.pageFiltre = true;
      }
    },

    components:{footerMenu},

    mounted : function () {


      let vm = this;

      let ref = firebase.database().ref('users/' + vm.user.uid );
      ref.on('value', function(snapshot) {
        let data = snapshot.val();
        vm.userTab =
          data;
      });
      vm.$parent.userTab = vm.userTab;
      //.loadMore();
      //console.log(u)

      let categoryActive = vm.userTab.categoryActive;

      function shuffle(a) {
        for (let i = a.length; i; i--) {
          let j = Math.floor(Math.random() * i);
          [a[i - 1], a[j]] = [a[j], a[i - 1]];
        }
      }

      if (!categoryActive) {
        let photoRef = firebase.database().ref('photos');
        photoRef.on('value', function(snapshot) {
          let data = snapshot.val();
          console.log(data);
          if (data) {
            let dataB = Object.keys(data).map(function (e) {
              return [Number(e), data[e]];
            });
            dataB.map(function (obj) {
              vm.picturesUrl.push(obj[1])
            });





          }
        });
      }else{
        // cree un tableau avec tout les categories dans l'objet categoryActive
        let listActive = Object.values(categoryActive);
        console.log(listActive);

        for (let i=0;i<listActive.length;i++){
          console.log(listActive[i]);
          // boucle mes categorie ou aller chercher les photo equalto chaque categories actives
          let photoRef = firebase.database().ref('photos/');
          photoRef.orderByChild("category").equalTo(listActive[i]).on('value', function(snapshot) {

            let data = snapshot.val();
            let coucou = [];
            if (data) {
              let dataB = Object.keys(data).map(function (e) {
                return [Number(e), data[e]];
              });
              dataB.map(function (obj) {
                coucou.push(obj[1])
              });

              vm.stateUrl.push(coucou);

              vm.empty=false;



            }else{
              vm.empty = true;
              console.log('elsemsg',listActive[i]);
              vm.emptyCat = listActive[i];
            }

          });
          let newstate = Object.keys(vm.stateUrl).reduce(function(res, v) {
            return res.concat(vm.stateUrl[v]);
          }, []);
          vm.picturesUrl = newstate;




          //shuffle(vm.picturesUrl);

        }



      }
      shuffle(vm.picturesUrl)

    }
    }


</script>


<style scoped>
  .img{
    width: 100%;
    border-radius:10px;
    object-fit: cover;
    height: 60vh;
  }
  img[lazy=loading] {
    width: 40px;
  }

  main{
    background-image: url("../assets/background-profil.jpg");
    background-attachment: fixed;
    background-size: 100%;
    overflow: auto;
    width: 100%;
    background-repeat:no-repeat;
    box-sizing: border-box;
    height: 100%;
  }
  ul li {
    list-style: none;
    border-radius: 10px;
    display: block;
    width: 90%;
    margin: 20px auto;
    position: relative;

  }
  ul {margin: 10vh 0 0 0;
    padding: 0;}
  .image {
    border-radius: 2px 2px 0 0;
    height:0px;
    width:100%;
    padding-bottom:106.25%;
    border-radius: 15px;
    background : center center / cover;
    display:block;
  }
  .image-container{
    position: relative;

  }


</style>


