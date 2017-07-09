<template>

  <main>
    <button @click="goFiltre">page filtre</button>
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

      like: function (event) {
        let parent = event.target.parentElement;
        let vm = this;
        let likeRef = firebase.database().ref('photos/' + parent.className);
        likeRef.once('value').then(function(snapshot) {

            let data = snapshot.val();
            console.log(data);
        });



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
                vm.picturesUrl.push(obj[1])
              });
              console.log(vm.picturesUrl);
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


