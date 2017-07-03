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
    </ul>

    <footer-menu></footer-menu>
  </main>


</template>



<script>


  import footerMenu from './menu'
  export default {
    name: 'pageFlow',
    components:{footerMenu},

    data : function () {
      let appCompo = this.$parent; // get pp compososant to have user object
      return{
        user :appCompo.user,
        picturesUrl:[]


      }

    },

    methods: {
      like: function (event) {
        let parent = event.target.parentElement;
        let vm = this;
        //console.log(parent.className)
        let likeRef = firebase.database().ref('photos/' + parent.className);
        likeRef.once('value').then(function(snapshot) {

            let data = snapshot.val();
            let like = data.like;
            like++;
            let updates = {};
            updates['photos/' + parent.className + '/' + 'like'] = like;
            firebase.database().ref().update(updates);

        });

     /*   likeRef.orderByChild("url").equalTo(imageUrl).on('value', function(snapshot) {
          console.log(snapshot.key); // -KJ....
          let data = snapshot.val();
          console.log(data);

            console.log('sensé etre un object',data);
            let id = Object.keys(data);
            console.log('id',id[0])
            let dataB = Object.keys(data).map(function(e) {
              return [Number(e), data[e]];
            });
            console.log('est devenu un array', dataB);
            let count = dataB.map( function(obj){  return obj[1].like });
            count++;
            console.log('count',count);
            let updates = {};
            updates['photos/' + id[0] + '/' + 'like'] = count;
            firebase.database().ref().update(updates);
        });*/



      }
    },

    created : function () {
      let that = this;
      let photoRef = firebase.database().ref('photos/');
      photoRef.on('value', function(snapshot) {


        let data = snapshot.val();
        let coucou = [];

        if(data){
          let dataB = Object.keys(data).map(function(e) {
            return [Number(e), data[e]];
          });
          dataB.map( function(obj){  coucou.push(obj[1]) });
          that.picturesUrl = coucou;
        }



      });
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


