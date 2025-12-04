
export default function script() {
window.addEventListener("xrloaded", () => {
     const landingPage = document.querySelector(".landing-page");
     landingPage.style.display = "block";
}

);

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
 

 


const cardList = [
  { id: 1, img: "../assets/images/menu_bg.png", text: "Lorem" },
  { id: 2, img: "https://static.addtoany.com/images/dracaena-cinnabari.jpg", text: "Lorem" },
  { id: 3, img: "https://static.addtoany.com/images/dracaena-cinnabari.jpg", text: "Lorem" },
  { id: 4, img: "https://static.addtoany.com/images/dracaena-cinnabari.jpg", text: "Lorem" },
  { id: 5, img: "https://static.addtoany.com/images/dracaena-cinnabari.jpg", text: "Lorem" },
  { id: 6, img: "https://static.addtoany.com/images/dracaena-cinnabari.jpg", text: "Lorem" },
  { id: 7, img: "https://static.addtoany.com/images/dracaena-cinnabari.jpg", text: "Lorem" },
  { id: 8, img: "https://static.addtoany.com/images/dracaena-cinnabari.jpg", text: "Lorem" },
  { id: 9, img: "https://static.addtoany.com/images/dracaena-cinnabari.jpg", text: "Lorem" },
  { id: 10, img: "https://static.addtoany.com/images/dracaena-cinnabari.jpg", text: "Lorem" },
  { id: 11, img: "https://static.addtoany.com/images/dracaena-cinnabari.jpg", text: "Lorem" },
  { id: 12, img: "https://static.addtoany.com/images/dracaena-cinnabari.jpg", text: "Lorem" },
  { id: 13, img: "https://static.addtoany.com/images/dracaena-cinnabari.jpg", text: "Lorem" },
  { id: 14, img: "https://static.addtoany.com/images/dracaena-cinnabari.jpg", text: "Lorem" },
  { id: 15, img: "https://static.addtoany.com/images/dracaena-cinnabari.jpg", text: "Lorem" },
  { id: 16, img: "https://static.addtoany.com/images/dracaena-cinnabari.jpg", text: "Lorem" },
  { id: 17, img: "https://static.addtoany.com/images/dracaena-cinnabari.jpg", text: "Lorem" },
  { id: 18, img: "https://static.addtoany.com/images/dracaena-cinnabari.jpg", text: "Lorem" },
  { id: 19, img: "https://static.addtoany.com/images/dracaena-cinnabari.jpg", text: "Lorem" },
  { id: 20, img: "https://static.addtoany.com/images/dracaena-cinnabari.jpg", text: "Lorem" }
];

const cardsContainer = document.querySelector(".card-carousel");

// Generate cards dynamically
cardList.forEach(card => {
  const cardDiv = document.createElement("div");
  cardDiv.classList.add("card");
  cardDiv.id = card.id;

  cardDiv.innerHTML = `
      <img class="image-container" src="${card.img}">
      <p>${card.text}</p>
  `;

  cardsContainer.appendChild(cardDiv);
});



/* ============================================
   DRAG EVENT
============================================ */
class DraggingEvent {
  constructor(target) {
    this.target = target;
  }

  event(callback) {
    let handler;

    this.target.addEventListener("mousedown", e => {
      e.preventDefault();
      handler = callback(e);

      window.addEventListener("mousemove", handler);
      window.addEventListener("mouseup", clear);
    });

    this.target.addEventListener("touchstart", e => {
      handler = callback(e);

      window.addEventListener("touchmove", handler);
      window.addEventListener("touchend", clear);
    });

    function clear() {
      window.removeEventListener("mousemove", handler);
      window.removeEventListener("mouseup", clear);
      window.removeEventListener("touchmove", handler);
      window.removeEventListener("touchend", clear);
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

/* ============================================
   CAROUSEL CLASS
============================================ */
class CardCarousel extends DraggingEvent {
  constructor(container) {
    super(container);

    this.container = container;
    this.cards = [...container.querySelectorAll(".card")];

    this.total = this.cards.length;
    this.centerIndex = 0;
    this.visibleRange = 2;
    this.lastOffset = 0;

    this.cards.forEach((c, i) => (c.dataset.index = i));

    this.build();
    super.getDistance(this.moveCards.bind(this));
  }

  wrap(i) {
    return (i + this.total) % this.total;
  }

  build() {
    this.updatePositions(0);
    this.setActiveCard();
  }

  setActiveCard() {
    this.cards.forEach(card => card.classList.remove("active", "center-box-shadow"));
    const active = this.cards[this.centerIndex];
    if (active) {
      active.classList.add("active");
      active.classList.add("center-box-shadow");
    }
  }

  updatePositions(offset) {
    this.lastOffset = offset;

    for (let i = 0; i < this.total; i++) {
      const dist =
        ((i - this.centerIndex - offset + this.total + this.total / 2) % this.total) -
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

    /* SCALE */
    let scale = 1 - Math.abs(round) * 0.22;
    if (scale < 0) scale = 0;

    /* ARC MOVEMENT (CIRCLE PATH) */
    card.style.top = "0px"; 

    /* POSITION LEFT/RIGHT */
    const centerPos = 32;
    const step = 16;

    if (round < 0) {
      card.style.left = `${centerPos - Math.abs(round) * step}%`;
      card.style.right = "";
    } else if (round > 0) {
      card.style.right = `${centerPos - round * step}%`;
      card.style.left = "";
    } else {
      card.style.left = "0%";
      card.style.right = "0%";
    }

    /* OPACITY FOR -2 AND +2 */
    if (Math.abs(round) === 2) {
      card.style.opacity = 0.5;
    } else {
      card.style.opacity = 1;
    }

    /* APPLY TRANSFORM */
    card.style.transform = `scale(${scale})`;

    /* LAYER ORDER */
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
    this.setActiveCard();

    setTimeout(() => {
      this.container.classList.remove("smooth-return");
    }, 250);
  }
}

/* INIT */
const carousel = new CardCarousel(cardsContainer);


}