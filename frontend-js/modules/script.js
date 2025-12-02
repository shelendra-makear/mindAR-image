export default function script() {
const BGimages = [
    "assets/images/BGimages/Chhota_Bheem_bg.png",
   "assets/images/BGimages/Brown_bg.png",
    "assets/images/BGimages/Crunchy_Bites.png",
    "assets/images/BGimages/Duet_bg.png",
    "assets/images/BGimages/Moon_star_bg.png",
  ];
  const handCardBoard = [
    "assets/images/handCardBoard/sooo_chocolatey.png",
   "assets/images/handCardBoard/more_chocolatey.png",
    "assets/images/handCardBoard/choco_caramel.png",
    "assets/images/handCardBoard/choco_vanilla.png",
    "assets/images/handCardBoard/sooo_chocolatey.png",
  ];

  const randomImage = BGimages[Math.floor(Math.random() * BGimages.length)];

   const randomhandCardBoard = handCardBoard[Math.floor(Math.random() * handCardBoard.length)];
const handCardBoardImg = document.querySelector(".hand-card-board-img");
  if (handCardBoardImg) {
    handCardBoardImg.src= randomhandCardBoard;
  }
  const landing = document.querySelector(".landing-page");
  if (landing) {
    landing.style.backgroundImage = `url('${randomImage}')`;
  }
// Example food list (replace with your 20 items)
const cardsContainer = document.querySelector(".card-carousel");
const cardsController = document.querySelector(".card-carousel + .card-controller");

// ---------------- DRAG EVENT CLASS ----------------
class DraggingEvent {
  constructor(target = undefined) {
    this.target = target;
  }

  event(callback) {
    let handler;

    this.target.addEventListener("mousedown", e => {
      e.preventDefault();
      handler = callback(e);

      window.addEventListener("mousemove", handler);
      window.addEventListener("mouseup", clearDraggingEvent);
    });

    this.target.addEventListener("touchstart", e => {
      handler = callback(e);

      window.addEventListener("touchmove", handler);
      window.addEventListener("touchend", clearDraggingEvent);
    });

    function clearDraggingEvent() {
      window.removeEventListener("mousemove", handler);
      window.removeEventListener("mouseup", clearDraggingEvent);
      window.removeEventListener("touchmove", handler);
      window.removeEventListener("touchend", clearDraggingEvent);
      handler(null);
    }
  }

  getDistance(callback) {
    function distanceInit(e1) {
      let startX = e1.touches ? e1.touches[0].clientX : e1.clientX;

      return function (e2) {
        if (!e2) return callback(null);
        const nowX = e2.touches ? e2.touches[0].clientX : e2.clientX;
        callback({ x: nowX - startX });
      };
    }
    this.event(distanceInit);
  }
}

// ---------------- CAROUSEL CLASS ----------------
class CardCarousel extends DraggingEvent {
  constructor(container, controller) {
    super(container);
    this.container = container;
    this.controllerElement = controller;
    this.cards = container.querySelectorAll(".card");

    this.centerIndex = (this.cards.length - 1) / 2;
    this.cardWidth = (this.cards[0].offsetWidth / this.container.offsetWidth) * 100;
    this.xScale = {};

    window.addEventListener("resize", () => this.updateCardWidth());
    this.build();

    super.getDistance(this.moveCards.bind(this));
  }

  updateCardWidth() {
    this.cardWidth = (this.cards[0].offsetWidth / this.container.offsetWidth) * 100;
    this.build();
  }

  build() {
    for (let i = 0; i < this.cards.length; i++) {
      const x = i - this.centerIndex;
      this.xScale[x] = this.cards[i];

      this.updateCards(this.cards[i], {
        x,
        scale: this.calcScale(x),
        pos: this.calcPos(x, this.calcScale2(x)),
        zIndex: -Math.abs(x)
      });
    }
  }

  calcPos(x, scale) {
    const cardW = this.cardWidth;

    if (x < 0) {
      return { side: "left", value: (scale * 100 - cardW) / 2 };
    }

    if (x > 0) {
      return { side: "right", value: (scale * 100 - cardW) / 2 };
    }

    return { side: "left", value: (100 - (scale * 100 + cardW) / 2) };
  }

  updateCards(card, data) {
    if (data.x !== undefined) card.dataset.x = data.x;

    if (data.scale !== undefined) {
      card.style.transform = `scale(${data.scale})`;
      card.style.opacity = data.scale === 0 ? 0 : 1;
    }

    if (data.pos) {
      card.style.left = "";
      card.style.right = "";
      card.style[data.pos.side] = `${data.pos.value}%`;
    }

    if (data.zIndex !== undefined) {
      card.style.zIndex = data.zIndex;
      if (data.zIndex === 0) card.classList.add("highlight");
      else card.classList.remove("highlight");
    }
  }

  calcScale2(x) {
    return x <= 0 ? 1 - (-1 / 5) * x : 1 - (1 / 5) * x;
  }

  calcScale(x) {
    const val = 1 - (1 / 5) * Math.pow(x, 2);
    return val < 0 ? 0 : val;
  }

  checkOrdering(card, x, xDist) {
    const original = parseInt(card.dataset.x);
    const rounded = Math.round(xDist);
    let newX = x;

    if (x !== x + rounded) {
      if (x + rounded > original && x + rounded > this.centerIndex) {
        newX = ((x + rounded - 1) - this.centerIndex) - rounded + -this.centerIndex;
      } else if (x + rounded < original && x + rounded < -this.centerIndex) {
        newX = ((x + rounded + 1) + this.centerIndex) - rounded + this.centerIndex;
      }

      this.xScale[newX + rounded] = card;
    }

    this.updateCards(card, { zIndex: -Math.abs(newX + rounded) });
    return newX;
  }

  moveCards(data) {
    let xDist = data ? data.x / 250 : 0;

    if (!data) {
      this.container.classList.add("smooth-return");
      for (let x in this.xScale) {
        this.updateCards(this.xScale[x], { x, zIndex: Math.abs(Math.abs(x) - this.centerIndex) });
      }
    } else {
      this.container.classList.remove("smooth-return");
    }

    for (let card of this.cards) {
      const x = this.checkOrdering(card, parseInt(card.dataset.x), xDist);
      const scale = this.calcScale(x + xDist);
      const pos = this.calcPos(x + xDist, this.calcScale2(x + xDist));

      this.updateCards(card, { scale, pos });
    }
  }
}

new CardCarousel(cardsContainer, cardsController);

}