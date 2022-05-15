<template>
  <!-- <div v-observe-visibility="handleScroll()"></div -->
  <infinite-scroll
    @infinite-scroll="loadDataFromServer"
    :message="message"
    :noResult="noResult"
  >
    <div v-for="item in list" :key="item.title" class="post">
      <h2>
        <a :href="item.url">{{ item.title }}</a>
      </h2>
      <p>~ {{ item.author }}</p>
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
      }
    },
    // loadDataFromServer() {
    //   console.log("scroll more");
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
  margin-top: 60px;
}
body {
  /* background: url("https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg?w=2000"); */
  font-family: "Montserrat", sans-serif;
}
.post {
  background: #fff;
  padding: 1.5em;
  width: 40vw;
  margin: auto;
}

.post:not(:last-child) {
  border-bottom: 1px solid #ddd;
}
.post a {
  text-decoration: none;
  color: #333;
}
.post h2 {
  width: 80%;
  font-size: 1.3em;
  padding-bottom: 0.25rem;
  margin: auto;
}

.post p {
  color: #888;
  text-align: right;
}
</style>
