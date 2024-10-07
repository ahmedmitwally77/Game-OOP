import { Details } from "./details.module.js";
export class Home {
  gameContent = document.getElementById("content-games");
  navBar = document.querySelector(".navbar");
  constructor() {
    this.changeCategory();
    this.display("mmorpg");
    this.loding = document.querySelector(".overlay");
  }
  changeCategory() {
    let links = document.querySelectorAll(".navbar-nav .nav-link");
    links.forEach((link) => {
      link.addEventListener("click", (e) => {
        links.forEach((navLink) => {
          navLink.classList.remove("active");
        });
        e.target.classList.add("active");
        this.display(e.target.dataset.category);
      });
    });
  }
  async getData(category) {
    let res = await fetch(
      `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`,
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
  async display(category) {
    const spinner = document.querySelector(".overlay");
    spinner.classList.remove("d-none");
    let data = await this.getData(category);
    let rowContent = document.getElementById("row-content");
    let cartona = "";
    data.map((game) => {
      cartona += `<div class="col-sm-6 col-md-4 col-lg-3">
              <div class="inner p-3 overflow-hidden " data-id=${game.id}>
                <img src="${
                  game.thumbnail
                }" class="w-100" alt="" id="game-image" loading="lazy">
                <div class="content mt-3">
                  <div class="header d-flex justify-content-between align-items-center">
                    <h3 id="game-name" class="text-capitalize">${
                      game.title
                    }</h3>
                    <span id="game-status">Free</span>
                  </div>
                  <div class="body mt-2">
                    <p id="game-description" class="text-center opacity-50 game-description">${game.short_description.split(
                      " ",
                      10
                    )}</p>
                  </div>
                  <div class="footer d-flex justify-content-between align-items-center p-2 pb-0">
                    <div id="game-category" class="text-uppercase">${
                      game.genre
                    }</div>
                    <div id="game-platform">${game.platform}</div>
                  </div>
                </div>
              </div>
            </div>`;
    });
    rowContent.innerHTML = cartona;
    spinner.classList.add("d-none");
    this.addEventListener();
  }

  addEventListener() {
    let boxes = document.querySelectorAll(".inner");
    boxes.forEach((box) => {
      box.addEventListener("click", (e) => {
        let details = new Details(e.currentTarget.getAttribute("data-id"));
      });
    });
  }
}
