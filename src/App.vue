<template>
  <div class="container">
    <div id="title" @click="refreshPage">
      <h1>Y</h1>
      <h2>Hacker News</h2>
    </div>
    <!-- <infinite-scroll
    class="scroll-list"
            @infinite-scroll="loadDataFromServer"
            target="#top"
            :message="message"
            :noResult="noResult"
          > -->

    <div class="scroll-list" id="renderList">
      <div v-for="(item, index) in list" :key="index" class="post">
        <h3>
          <a :href="item.url" target="_blank">{{ item.title }}</a>
        </h3>
        <p>~ {{ item.points }} points by {{ item.author }}</p>
      </div>
    </div>
    <InfiniteLoading
      top="true"
      target="#renderList"
      @infinite="loadDataFromServer"
    />
    <!-- </infinite-scroll> -->
  </div>
</template>

<script>
import axios from "axios";
// import InfiniteScroll from "infinite-loading-vue3";
import InfiniteLoading from "v3-infinite-loading";

export default {
  name: "App",
  components: {
    InfiniteLoading,
  },
  data() {
    return {
      list: [],
      page: 1,
    };
  },
  methods: {
    async loadDataFromServer($state) {
      try {
        let article = await axios.get(
          "//hn.algolia.com/api/v1/search_by_date?tags=story",
          {
            params: {
              page: this.page,
            },
          }
        );
        console.log;
        if (article.data.hits.length) {
          this.page += 1;
          this.list.push(...article.data.hits);
          $state.loaded();
        } else {
          $state.complete();
        }
      } catch (err) {
        $state.error();
      }
    },
    // refreshPage() {
    //   window.location.reload();
    // },
  },
  mounted() {
    this.loadDataFromServer();
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat&display=swap");
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
  overflow-x: hidden;
}
.container {
  width: 100vw;
}
#title {
  text-align: center;
  /* margin: auto; */
  /* display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px; */
}
#title h2 {
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 2rem;
  color: #212f3c;
  margin-top: 0;
  margin-bottom: 3rem;
}
#title h1,
h2:hover {
  cursor: pointer;
  /* -webkit-transition: all 1s ease;
  transition: all 1s ease; */
  /* transform: scale(1.2); */
}
h1 {
  background: #a2d9ce;
  border-radius: 5px;
  padding: 4px 12px;
  display: inline-block;
  border: 3px solid #000;
  font-weight: bold;
  color: #212f3c;
  animation-name: spinner;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-duration: 3s;
  transform-style: preserve-3d;
}
@keyframes spinner {
  from {
    transform: rotateY(0deg);
  }
  to {
    transform: rotateY(-360deg);
  }
}
.scroll-list {
  height: 60vh;
  position: fixed;
  overflow-y: scroll;
  margin-bottom: 30px;
  left: 50%;
  transform: translate(-50%, 0);
  overflow-x: hidden;
  /* display: flex;
  flex-direction: column-reverse; */
  /* bottom: 0; */
  /* width: fit-content; */
  /* scroll-behavior: revert; */
}

body {
  background: url("https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg?w=2000");
  font-family: "Montserrat", sans-serif;
  background-attachment: fixed;
}
.post {
  background: #fff;
  padding: 1.5em;
  width: 40vw;
  margin: auto;
  /* transition: top ease 0.8s; */
}
.post:first-child {
  border-radius: 15px 0 0 0;
}
.post:last-child {
  border-radius: 0 0 0 15px;
}
.post:not(:last-child) {
  border-bottom: 1px solid #ddd;
}
.post:hover {
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  top: 10px;
}
.post a {
  text-decoration: none;
  color: #333;
}
.post h3 {
  width: 80%;
  font-size: 1.3em;
  padding-bottom: 0.25rem;
  margin: auto;
  line-height: 1.4;
}

.post p {
  color: #888;
  text-align: right;
}
@media only screen and (max-width: 1200px) {
  /*Tablets [601px -> 1200px]*/
}
</style>
