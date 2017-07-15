<template>
  <div>


    <main>
      <div class="container">
        <a class="icon-retour arrow" @click="pageProfil"></a>
        <section id="canvas_wrapper"></section>
        <div>

          <div class="icon_container">
            <figure>
              <img src="../assets/bras.jpg" @click="catF($event)" id="bras" class="catImg">
            </figure>
            <figure>
              <img src="../assets/mains.jpg" @click="catF($event)" id="main" class="catImg">
            </figure>
            <figure>
              <img src="../assets/poitrines.jpg" @click="catF($event)" id="poitrine" class=" catImg">
            </figure>
            <figure>
              <img src="../assets/yeux.jpg" @click="catF($event)" id="yeux" class="catImg">
            </figure>
            <figure>
              <img src="../assets/torses.jpg" @click="catF($event)" id="torse" class="catImg">
            </figure>
            <figure>
              <img src="../assets/bouches.jpg" @click="catF($event)" id="bouche" class=" catImg">
            </figure>
            <figure>
              <img src="../assets/cous.jpg" @click="catF($event)" id="cous" class="catImg">
            </figure>
            <figure>
              <img src="../assets/dos.jpg" @click="catF($event)" id="dos" class="catImg">
            </figure>
            <figure>
              <img src="../assets/épaules.jpg" @click="catF($event)" id="epaule" class=" catImg">
            </figure>
            <figure>
              <img src="../assets/fesses.jpg" @click="catF($event)" id="fesses" class=" catImg">
            </figure>
            <figure>
              <img src="../assets/jambes.jpg" @click="catF($event)" id="jambe" class="catImg">
            </figure>
            <figure>
              <img src="../assets/pieds.jpg" @click="catF($event)" id="pied" class="catImg">
            </figure>
          </div>


          <a @click.prevent="send($event)" class="btn">
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

    data: function () {
      let appCompo = this.$parent; // get pp compososant to have user object
      return {
        user: appCompo.user,
        blob: appCompo.blob,
        canvas: false,
        cat: false

      }

    },

    methods: {
      test: function (event) {
        console.log(event.target);
      },
      pageProfil: function () {

        this.$parent.profilPage = true;
        this.$parent.pageUpload = false;
      },
      catF: function (event) {
        let vm = this;
        let target = event.target;
        let category = target.id;
        let catImg = document.getElementsByClassName('catImg');
        for (let i = 0; i < catImg.length; i++) {
          catImg[i].style.border = "none";
        }
        target.style.border = "3px solid red";
        this.cat = category;

      },
      send: function (event) {


        let vm = this;

        if (vm.cat != false) {


          let blob = vm.blob;
          let canvas = vm.canvas;
          vm.$parent.profilPage = true;
          vm.$parent.pageUpload = false;


          if (canvas.toBlob) {
            canvas.toBlob(
              function (blob) {
                let date = new Date();


                let ref = firebase.storage().ref(JSON.stringify(date));
                ref.put(blob).then(function () {
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
              },
              'image/jpeg'
            );
          }

        } else {
        }
      }


    },
    mounted: function () {


      let vm = this;
      let img = vm.blob;


      displayImage(
        img, // img or canvas element
        {
          maxWidth: 640,
          maxHeight: 640,
          cover:true,
          canvas: true,
          pixelRatio: window.devicePixelRatio,
          downsamplingRatio: 0.5,
          orientation: true
        }
      );




      function displayImage (file, options) {
        //let currentFile = file;
        if (!loadImage(
            file,
            function(img, data){
                //console.log('tamere');
                updateResults(img, data);
            },
            options
          )) {
          console.error("file non remonté");
        }
      }

      function updateResults (img, data) {
        //var content
        if (!(img.src || img instanceof HTMLCanvasElement)) {
          //console.log("ca a pas marché");
          //content = $('<span>Loading image file failed</span>');
        } else {
          /*
            content = $('<a target="_blank">').append(img)
            .attr('download', currentFile.name)
            .attr('href', img.src || img.toDataURL())
            */
          //console.log("YOLO");
          let imgWidth = img.width;
          let imgHeight = img.height;


          let wrapper = document.getElementById('canvas_wrapper');
          let canvas = document.createElement('canvas');

          canvas.setAttribute("width", imgWidth);
          canvas.setAttribute("height", imgHeight);

          wrapper.appendChild(canvas);
          vm.canvas = canvas;
          let ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, imgWidth, imgHeight);

          canvas.style.width = 95 + "vw";
          canvas.style.height = 95 + "vw";
          /*
          if (data && data.exif && (
              data.exif['274'] == 6 || data.exif['274'] == 8 || data.exif['274'] == 5 || data.exif['274'] == 7
            )){
            canvas.style.height = 169 + "vw";
          }else{
            canvas.style.height = 53.43 + "vw";
          }
          */

          canvas.style.marginTop = -15 + "px";
        }
        //result.children().replaceWith(content)
        if (img.getContext) {
          //actionsNode.show()
        }
        if (data && data.exif) {
            //console.log("exif", data.exif);
            //alert(data.exif['274']);
          //displayExifData(data.exif)
        }
      }

      /*img.onload = function () {

       let imgWidth = img.width;
       let imgHeight = img.height;

       let wrapper = document.getElementById('canvas_wrapper');
       let canvas = document.createElement('canvas');

       canvas.setAttribute("width", imgWidth);
       canvas.setAttribute("height", imgHeight);

       wrapper.appendChild(canvas);
       vm.canvas = canvas;
       let ctx = canvas.getContext('2d');
       ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, imgWidth, imgHeight);

       canvas.style.width = 95 + "%";
       canvas.style.height = 450 + "px";
       canvas.style.marginTop = -15 + "px";






       };*/
      !function (t) {
        "use strict";
        let e = t.HTMLCanvasElement && t.HTMLCanvasElement.prototype, o = t.Blob && function () {
            try {
              return Boolean(new Blob)
            } catch (t) {
              return !1
            }
          }(), n = o && t.Uint8Array && function () {
            try {
              return 100 === new Blob([new Uint8Array(100)]).size
            } catch (t) {
              return !1
            }
          }(), r = t.BlobBuilder || t.WebKitBlobBuilder || t.MozBlobBuilder || t.MSBlobBuilder, a = /^data:((.*?)(;charset=.*?)?)(;base64)?,/, i = (o || r) && t.atob && t.ArrayBuffer && t.Uint8Array && function (t) {
            let e, i, l, u, b, c, d, B, f;
            if (e = t.match(a), !e)throw new Error("invalid data URI");
            for (i = e[2] ? e[1] : "text/plain" + (e[3] || ";charset=US-ASCII"), l = !!e[4], u = t.slice(e[0].length), b = l ? atob(u) : decodeURIComponent(u), c = new ArrayBuffer(b.length), d = new Uint8Array(c), B = 0; B < b.length; B += 1)d[B] = b.charCodeAt(B);
            return o ? new Blob([n ? d : c], {type: i}) : (f = new r, f.append(c), f.getBlob(i))
          };
        t.HTMLCanvasElement && !e.toBlob && (e.mozGetAsFile ? e.toBlob = function (t, o, n) {
          t(n && e.toDataURL && i ? i(this.toDataURL(o, n)) : this.mozGetAsFile("blob", o))
        } : e.toDataURL && i && (e.toBlob = function (t, e, o) {
          t(i(this.toDataURL(e, o)))
        })), "function" == typeof define && define.amd ? define(function () {
          return i
        }) : "object" == typeof module && module.exports ? module.exports = i : t.dataURLtoBlob = i
      }(window);
      //# sourceMappingURL=canvas-to-blob.min.js.map

    }

  }


</script>

<style scoped>


  .icon_container {
    width: 100%;
    height: 100px;
    display: inline-table;
    overflow: scroll;
  }

  .icon_container figure {

    width: 30%;
    display: inline-block;
    margin: 10px 0;

  }

  .icon_container figure img {
    width: 80%;
  }

  main {
    background-image: url("../assets/background-profil.jpg");
    background-size: 100%;
    background-attachment: fixed;

    overflow: auto;
    width: 100%;
    background-repeat: no-repeat;
    position: relative
  }

  .arrow {
    font-size: 30px;
    /* position: absolute; */
    display: block;
    float: left;
    margin: 20px;
  }

  .container {
    width: 95%;
    background-color: white;
    margin: 0 auto;
    padding-bottom: 20px;
    border-radius: 10px;
    margin-top: 10vh;
    -webkit-box-shadow: 0px 0px 6px 1px rgba(87, 87, 87, 1);
    -moz-box-shadow: 0px 0px 6px 1px rgba(87, 87, 87, 1);
    box-shadow: 0px 0px 6px 1px rgba(87, 87, 87, 1);
    overflow: inherit;
    text-align: center;
    min-height: 80vh;
    display: inline-block;

  }

  .btn {
    background: -moz-linear-gradient(left, #e26a84 0%, #e5244e 100%); /* FF3.6-15 */
    background: -webkit-linear-gradient(left, #e26a84 0%, #e5244e 100%); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(to right, #e26a84 0%, #e5244e 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#1e5799', endColorstr='#e5244e', GradientType=1); /* IE6-9 */
    -webkit-border-radius: 28;
    -moz-border-radius: 28;
    border-radius: 28px;
    font-family: Arial;
    color: #ffffff;
    font-size: 22px;
    padding: 13px 45px 13px 45px;
    text-decoration: none;
    margin: 20px;
    display: inline-block;
  }

</style>




