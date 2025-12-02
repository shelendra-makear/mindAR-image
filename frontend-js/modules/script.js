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










  
const cardsContainer = document.querySelector(".card-carousel");
const cardsController = document.querySelector(".card-controller");

// ---------------- DRAG EVENT ----------------
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
      window.addEventListener("mouseup", clearDragging);
    });

    this.target.addEventListener("touchstart", e => {
      handler = callback(e);

      window.addEventListener("touchmove", handler);
      window.addEventListener("touchend", clearDragging);
    });

    function clearDragging() {
      window.removeEventListener("mousemove", handler);
      window.removeEventListener("mouseup", clearDragging);
      window.removeEventListener("touchmove", handler);
      window.removeEventListener("touchend", clearDragging);
      handler(null);
    }
  }

  getDistance(callback) {
    function start(e1) {
      let startX = e1.touches ? e1.touches[0].clientX : e1.clientX;

      return function (e2) {
        if (!e2) return callback(null);
        const nowX = e2.touches ? e2.touches[0].clientX : e2.clientX;
        callback({ x: nowX - startX });
      };
    }
    this.event(start);
  }
}

// ---------------- CAROUSEL CLASS ----------------
class CardCarousel extends DraggingEvent {
  constructor(container, controller) {
    super(container);
    this.container = container;
    this.controller = controller;

    this.cards = [...container.querySelectorAll(".card")];
    this.total = this.cards.length;

    this.centerIndex = 0;
    this.visibleRange = 2;

    this.lastOffset = 0;

    this.build();

    super.getDistance(this.moveCards.bind(this));
  }

  wrap(i) {
    return (i + this.total) % this.total;
  }

  build() {
    this.updatePositions(0);
  }

  updatePositions(offset) {
    this.lastOffset = offset;

    for (let i = 0; i < this.total; i++) {
      const dist =
        ((i - this.centerIndex - offset + this.total + this.total / 2) %
          this.total) -
        this.total / 2;

      this.updateCard(this.cards[i], dist);
    }
  }

  updateCard(card, dist) {
    const round = Math.round(dist);

    if (Math.abs(round) > this.visibleRange) {
      card.style.opacity = 0;
      card.style.transform = "scale(0)";
      card.style.pointerEvents = "none";
      return;
    }

    card.style.pointerEvents = "auto";

    let scale = 1 - Math.abs(round) * 0.25;
    if (scale < 0) scale = 0;

    card.style.transform = `scale(${scale})`;
    card.style.opacity = 1;

    const centerPos = 35;
    const step = 17.5;

    if (round < 0) {
      card.style.left = `${centerPos - Math.abs(round) * step}%`;
      card.style.right = "";
    } else if (round > 0) {
      card.style.right = `${centerPos - round * step}%`;
      card.style.left = "";
    } else {
      card.style.left = `${centerPos}%`;
      card.style.right = "";
    }

    card.style.zIndex = 20 - Math.abs(round);
  }

  moveCards(data) {
    if (!data) return this.snap();

    const offset = data.x / 150;
    this.updatePositions(offset);
  }

  snap() {
    const offset = this.lastOffset;

    if (offset > 0.5) this.centerIndex = this.wrap(this.centerIndex - 1);
    else if (offset < -0.5) this.centerIndex = this.wrap(this.centerIndex + 1);

    this.lastOffset = 0;

    this.container.classList.add("smooth-return");
    this.updatePositions(0);

    setTimeout(() => {
      this.container.classList.remove("smooth-return");
    }, 250);
  }
}

new CardCarousel(cardsContainer, cardsController);


}