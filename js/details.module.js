export class Details {
  gameContent = document.getElementById("content-games");
  navBar = document.querySelector(".navbar");
  datailsContent = document.getElementById("details");
  closeBtn = document.querySelector("#close");
  rowContent = document.getElementById("game-details");
  constructor(id) {
    this.addEventListener();
    this.hideNavBarAndContent();
    this.id = id;
    this.display(id);
  }
  hideNavBarAndContent() {
    this.datailsContent.classList.remove("d-none");
    this.navBar.classList.add("d-none");
    this.gameContent.classList.add("d-none");
  }

  async getDetails(id) {
    let res = await fetch(
      `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
          "x-rapidapi-key":
            "e6435cf980mshc88263093f8a35ap1f5d8cjsnb24a7ff4c86c",
        },
      }
    );
    let data = await res.json();
    return data;
  }

  async display(id) {
    let data = await this.getDetails(id);
    this.rowContent.innerHTML = `
          <div class="col-lg-4">
            <div class="inner">
              <img src="${data.thumbnail}" alt="" class="w-100">
            </div>
          </div>
          <div class="col-lg-8">
            <div class="content">
              <h2>Title: <span id="game-name">${data.title}</span></h2>
              <h5 class="pb-3 ">Category: <span class="box-color" id="game-category">${data.genre}</span></h5>
              <h5 class="pb-3 ">Platform: <span class="box-color" id="game-platform">${data.platform}</span></h5>
              <h5 class="pb-3 ">Status: <span class="box-color" id="game-status">${data.status}</span></h5>
              <p id="game-description">${data.description}</p>
              <a class="btn btn-outline-danger" href="${data.game_url}" id="close" target="_blank">Show Game</a>
            </div>
          </div>`;
  }

  addEventListener() {
    this.closeBtn.addEventListener("click", () => {
      this.datailsContent.classList.add("d-none");
      this.navBar.classList.remove("d-none");
      this.gameContent.classList.remove("d-none");
    });
  }
}
