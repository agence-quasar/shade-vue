<template>

  <main>
    <ul>
      <li v-for="elem in picturesUrl">
        <v-touch tag="div"
                 @doubletap="like($event)"
                 v-bind:class="[elem.pushId]"
        >
          <div class="image" :style="{ 'background-image': 'url(' + elem.url + ')' }" ></div>
        </v-touch>
      </li>
      <div >
      </div>

    </ul>

    <footer-menu></footer-menu>
  </main>


</template>



<script>


  import footerMenu from './menu'
  let count = 0;
  export default {
    name: 'pageFlow',


    data : function () {
      let appCompo = this.$parent; // get pp compososant to have user object
      return{
        user :appCompo.user,
        userTab : false,
        picturesUrl:[]


      }

    },

    methods: {
        toast: function () {
          this.$toast.top('like');  // or this.$toast.bottom('bottom');
        },
      untoast: function () {
        this.$toast.top('unlike');  // or this.$toast.bottom('bottom');
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
            console.log(data);


            photo = data.pushId;
            like = data.like;
            owner = data.userId;
            let obj = userTab.likeList;
            if(userTab.likeList){


              console.log('1) peut étre un like');

              // fetch user/id/likeList
              let photoRef = firebase.database().ref('users/' + vm.user.uid +'/likeList' );
              photoRef.orderByKey().equalTo(owner).once('value').then(function(snapshot) {

                  let userID = snapshot.val();
                  // si l'utilisateur de le photo existe chez l'utilisateur qui like
                  if(userID === null){
                      // l'utilisateur en question n'existe pas dans liekList donc je l'ajoute et je like
                    console.log('finalement aucun like donc je like');

                    like ++;
                    let updates = {};
                    updates['photos/'+photo+'/like'] = like;
                    firebase.database().ref().update(updates);

                    let ref = firebase.database().ref('users/' + vm.user.uid + '/likeList/' +  owner);
                    ref.push({
                      id : photo
                    })
                    vm.toast();
                  }
                  else {
                    // l'uilisateur existe donc on va chercher dans ce tableau si il y a une photo
                    console.log('plop',userID);
                    let ref1 = Object.keys(userID)[0];

                    let photoRef = firebase.database().ref('users/' + vm.user.uid + '/likeList/' + Object.keys(userID)[0]);
                    photoRef.orderByChild('id').equalTo(photo).once('value').then(function (snapshot) {

                      let data = snapshot.val();
                      //console.log('before ref',data);
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


                          let delet = {};
                          delet['users/' + vm.user.uid + '/likeList/' + ref1 + '/' + ref2 + '/id'] = null;
                          firebase.database().ref().update(delet);
                          vm.untoast();


                        }
                      }



                    });
                  }



              });



            }
            // pas de likeList je like auto ( likelist = false)
            else{
              console.log('aucun like cest sur donc like++' );

              like ++;
              let updates = {};
              updates['photos/'+photo+'/like'] = like;
              firebase.database().ref().update(updates);

              let ref = firebase.database().ref('users/' + vm.user.uid + '/likeList/' +  owner);
              ref.push({
                id : photo
              })
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

    created : function () {
      let vm = this;

      let ref = firebase.database().ref('users/' + vm.user.uid );
      ref.on('value', function(snapshot) {
        let data = snapshot.val();
        vm.userTab = data;
      });
      vm.$parent.userTab = vm.userTab;
      let categoryActive = vm.userTab.categoryActive;

      if (!categoryActive) {
          console.log('category active = ', vm.userTab.categoryActive);

        let photoRef = firebase.database().ref('photos/');
        photoRef.on('value', function (snapshot) {


          let data = snapshot.val();
          let coucou=[];
          if (data) {
            let dataB = Object.keys(data).map(function (e) {
              return [Number(e), data[e]];
            });
            dataB.map(function (obj) {
              coucou.push(obj[1])
            });

            vm.picturesUrl = coucou
          }


        });
      }else{
        // cree un tableau avec tout les categories dans l'objet categoryActive
        let listActive = Object.values(categoryActive);

        for (let i=0;i<listActive.length;i++){
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

              vm.picturesUrl = coucou;
            }

          });
        }


      }


      }

  }


</script>


<style scoped>
  main{
    background-image: url("../assets/background-profil.jpg");
    background-size: 100%;
    overflow: auto;
    width: 100%;
    background-repeat:no-repeat;
    min-height: 100vh;
  }
  ul li {
    list-style: none;
    border-radius: 10px;
    display: block;
    width: 80%;
    margin: 20px auto;

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

</style>


