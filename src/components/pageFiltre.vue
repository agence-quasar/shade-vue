<template>

  <main>

    <a class="icon-retour arrow" @click="flowPage"></a>
    <div class="container">
      <h1>Quels sont mes <strong>Fantasmes</strong></h1>


      <a class="btn" v-for="(value, key) in list"  v-bind:class="[value]" @click="add($event)">{{value}}</a>
      <a class="btn_post"  @click="valider($event)">Découvrir ma selection</a>




    </div>
    <!--<footer-menu></footer-menu>-->

  </main>


</template>



<script>
  import footerMenu from './menu'
  export default {
    name: 'pageFiltre',
    components:{footerMenu},

    data : function () {
      return{

        list : false,
        categoryActive : false,



      }

    },

    methods: {
      flowPage : function () {
        this.$parent.flowPage = true;
        this.$parent.pageFiltre = false;
      },

      add : function (event) {

        let get = event.target;
        get.classList.toggle('btn_active');
        get.classList.toggle('btn');

      },
      valider : function (event) {
        let vm = this;
        let get = document.getElementsByClassName('btn_active');
        //let old = this.$parent.userTab.categoryActive;
        let newold = {};
        for(let i=0;i<get.length;i++){
          let elem = get[i].innerHTML;
          console.log(elem);
          newold[elem] = elem;

        }

        let updates = {};
        updates['users/' + vm.$parent.user.uid + '/categoryActive'] = newold;
        firebase.database().ref().update(updates);
        vm.flowPage();


      }
    },

    created : function () {
      let vm = this;
      vm.list = vm.$parent.categoryList;
      let categoryActive = vm.$parent.userTab.categoryActive;
      if(categoryActive){
        let listActive = Object.values(categoryActive);
        console.log(listActive);
      }





    },
    mounted : function () {

      let vm = this;
      vm.list = vm.$parent.categoryList;
      let categoryActive = vm.$parent.userTab.categoryActive;
      if(categoryActive){
        let listActive = Object.values(categoryActive);
        console.log(listActive);
        for(let i=0; i<listActive.length;i++){
          console.log(listActive[i]);
          let get = document.getElementsByClassName(listActive[i]);
          console.log(get[0])
          get[0].classList.toggle('btn_active');
          get[0].classList.toggle('btn');
        }
      }



    }
  }


</script>


<style scoped>
  .container{
    width: 100%;
    margin: 0 auto;
    margin-top: 15vh;
    padding-bottom: 30px;



  }
  .arrow{
    font-size: 30px;
    /* position: absolute; */
    display: block;
    float: left;
    margin: 20px;
  }
  h1{
    font-size: 28px;
    font-weight: 400;
  }
  main{
    background-image: url("../assets/background-profil.jpg");
    background-size: 100%;
    overflow: auto;
    width: 100%;
    background-repeat:no-repeat;
    height: 100%
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
  .btn_post {
    background: -moz-linear-gradient(left, #e26a84 0%, #e5244e 100%); /* FF3.6-15 */
    background: -webkit-linear-gradient(left,#e26a84 0%,#e5244e 100%); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(to right,#e26a84 0%,#e5244e 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#1e5799', endColorstr='#e5244e',GradientType=1 ); /* IE6-9 */
    -webkit-border-radius: 28;
    -moz-border-radius: 28;
    border-radius: 28px;
    color: #ffffff;
    font-size: 22px;
    padding: 13px 0px 13px 0px;
    text-decoration: none;
    margin: 10px;
    display:block;
  }
  .btn {
    background: -moz-linear-gradient(left, #e26a84 0%, #e5244e 100%); /* FF3.6-15 */
    background: -webkit-linear-gradient(left,#e26a84 0%,#e5244e 100%); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(to right,#e26a84 0%,#e5244e 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#1e5799', endColorstr='#e5244e',GradientType=1 ); /* IE6-9 */
    -webkit-border-radius: 28;
    -moz-border-radius: 28;
    border-radius: 28px;
    color: #ffffff;
    font-size: 16px;
    font-weight: bold;
    padding: 13px 20px 13px 20px;
    text-decoration: none;
    margin: 10px;
    display:inline-block;
  }

  .btn_active {
    background: -moz-linear-gradient(to right, rgb(128, 78, 126) 0%, rgb(69, 28, 72) 100%); /* FF3.6-15 */
    background: -webkit-linear-gradient(to right, rgb(128, 78, 126) 0%, rgb(69, 28, 72) 100%); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(to right, rgb(128, 78, 126) 0%, rgb(69, 28, 72) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#1e5799', endColorstr='#e5244e',GradientType=1 ); /* IE6-9 */
    -webkit-border-radius: 28;
    -moz-border-radius: 28;
    border-radius: 28px;
    font-family: Arial;
    color: #ffffff;
    font-size: 16px;
    padding: 13px 20px 13px 20px;
    text-decoration: none;
    margin: 10px;
    display:inline-block;
  }
</style>


