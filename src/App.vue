<template>
  <div id="title" @click="refreshPage">
    <h1>Y</h1>
    <h2>Hacker News</h2>
  </div>
  <infinite-scroll
    @infinite-scroll="loadDataFromServer"
    :message="message"
    :noResult="noResult"
  >
    <div v-for="item in list" :key="item.title" class="post">
      <h3>
        <a :href="item.url" target="_blank">{{ item.title }}</a>
      </h3>
      <p>~ {{ item.points }} points by {{ item.author }}</p>
    </div>
    <!-- Place the content of your page here. E.g a list of resources being fetched from a server -->
  </infinite-scroll>
</template>

<script>
import axios from "axios";
import InfiniteScroll from "infinite-loading-vue3";

export default {
  name: "App",
  components: {
    InfiniteScroll,
  },
  data() {
    return {
      list: [],
      page: 1,
      message: "",
      noResult: false,
    };
  },
  methods: {
    async loadDataFromServer() {
      try {
        let article = await axios.get(
          "//hn.algolia.com/api/v1/search_by_date?tags=story"
        );
        if (article.data.hits.length) {
          this.list.push(...article.data.hits);
          this.page++;
        } else {
          this.noResult = true;
          this.message = "No result found";
        }
      } catch (err) {
        this.noResult = true;
        this.message = "Error loading data";
        console.error(err);
      }
    },
    refreshPage() {
      window.location.reload();
    },
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
  margin-top: 60px;
}
#title {
  text-align: center;
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
body {
  background: url("https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg?w=2000");
  font-family: "Montserrat", sans-serif;
}
.post {
  background: #fff;
  padding: 1.5em;
  width: 40vw;
  margin: auto;
  /* transition: top ease 0.8s; */
}
.post:first-child {
  border-radius: 10px 10px 0 0;
}
.post:last-child {
  border-radius: 0 0 10px 10px;
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
</style>
