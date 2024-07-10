import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwODIwOTVjMjQwNzE1MWEzYmU4MjczZGMyZmE2ZTBiZSIsInN1YiI6IjY1YjBmZTFjOTljOTY0MDE3MjFmNjM3ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Q-oCK7Gqc_Dbf94bEozcwx2qt5PSnwfqa9Bxgrme7Ys",
  },
});

export default instance;
