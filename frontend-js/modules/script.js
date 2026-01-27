

export const kelloggList = [
  
  { id: 1,slug: "chocos1", name: "Chocos 1", img: "../assets/images/products/choco.png", text: "chocos", Energy: "126 kcal", Protein: "3.1 gm", Fat: "3.8 gm", Carbs: "21.6 gm" },
  { id: 2,slug: "moons_stars",name: "Moons stars", img: "../assets/images/products/moons_stars.png", text: "Moons Stars", Energy: "172 kcal", Protein: "5.2 gm", Fat: "2.7 gm", Carbs: "19.1 gm", Calcium: "100 mg", Iron: "4.5 mg" },
  { id: 3,slug: "doet", name: "Doet", img: "../assets/images/products/duet.png", text: "Doet", Energy: "128 kcal", Protein: "3.3 gm", Fat: "3.6 gm", Carbs: "22.5 gm" },
  { id: 4,slug: "chhota_laddoo", name: "Chhota Laddoo", img: "../assets/images/products/chhota_laddoo.png", text: "Chhota Laddoo", Energy: "129 kcal", Protein: "3.1 gm", Fat: "3.9 gm", Carbs: "23.0 gm" },
  { id: 5,slug:"crunchy_bites" , name: "Crunchy Bites", img: "../assets/images/products/crunchy_bites.png", text: "Crunchy Bites", Energy: "130 kcal", Protein: "3.0 gm", Fat: "4.0 gm", Carbs: "21.0 gm" }
];
export const cardList = [
  
  { id: 1, img: "../assets/images/icons/icon1.png", text: "Lorem 1", Energy: "126 kcal", Protein: "3.1 gm", Fat: "3.8 gm", Carbs: "21.6 gm", Calcium: "100 mg", Iron: "4.5 mg" },
  { id: 2, img: "../assets/images/icons/icon2.png", text: "Lorem 2", Energy: "127 kcal", Protein: "3.2 gm", Fat: "3.7 gm", Carbs: "20.1 gm" },
  { id: 3, img: "../assets/images/icons/icon3.png", text: "Lorem 3", Energy: "128 kcal", Protein: "3.3 gm", Fat: "3.6 gm", Carbs: "22.5 gm" },
  { id: 4, img: "../assets/images/icons/icon4.png", text: "Lorem 4", Energy: "129 kcal", Protein: "3.1 gm", Fat: "3.9 gm", Carbs: "23.0 gm" },
  { id: 5, img: "../assets/images/icons/icon5.png", text: "Lorem 5", Energy: "130 kcal", Protein: "3.0 gm", Fat: "4.0 gm", Carbs: "21.0 gm" },
  { id: 6, img: "../assets/images/icons/icon6.png", text: "Lorem 6", Energy: "131 kcal", Protein: "3.4 gm", Fat: "3.5 gm", Carbs: "19.8 gm" },
  { id: 7, img: "../assets/images/icons/icon7.png", text: "Lorem 7", Energy: "132 kcal", Protein: "3.6 gm", Fat: "3.7 gm", Carbs: "22.0 gm" },
  { id: 8, img: "../assets/images/icons/icon8.png", text: "Lorem 8", Energy: "133 kcal", Protein: "3.2 gm", Fat: "3.8 gm", Carbs: "21.3 gm" },
  { id: 9, img: "../assets/images/icons/icon9.png", text: "Lorem 9", Energy: "134 kcal", Protein: "3.1 gm", Fat: "3.9 gm", Carbs: "20.2 gm" },
  { id: 10, img: "../assets/images/icons/icon10.png", text: "Lorem 10", Energy: "135 kcal", Protein: "3.3 gm", Fat: "4.1 gm", Carbs: "19.5 gm" },
  { id: 11, img: "../assets/images/icons/icon11.png", text: "Lorem 11", Energy: "136 kcal", Protein: "3.0 gm", Fat: "3.6 gm", Carbs: "22.8 gm" },
  { id: 12, img: "../assets/images/icons/icon12.png", text: "Lorem 12", Energy: "137 kcal", Protein: "3.4 gm", Fat: "3.9 gm", Carbs: "23.1 gm" },
  { id: 13, img: "../assets/images/icons/icon13.png", text: "Lorem 13", Energy: "138 kcal", Protein: "3.2 gm", Fat: "3.7 gm", Carbs: "20.7 gm" },
  { id: 14, img: "../assets/images/icons/icon14.png", text: "Lorem 14", Energy: "139 kcal", Protein: "3.5 gm", Fat: "3.8 gm", Carbs: "21.4 gm" },
  { id: 15, img: "../assets/images/icons/icon15.png", text: "Lorem 15", Energy: "140 kcal", Protein: "3.3 gm", Fat: "3.6 gm", Carbs: "22.9 gm" },
  { id: 16, img: "../assets/images/icons/icon16.png", text: "Lorem 16", Energy: "141 kcal", Protein: "3.1 gm", Fat: "3.5 gm", Carbs: "21.2 gm" },
  { id: 17, img: "../assets/images/icons/icon17.png", text: "Lorem 17", Energy: "142 kcal", Protein: "3.7 gm", Fat: "4.0 gm", Carbs: "20.9 gm" },
  { id: 18, img: "../assets/images/icons/icon18.png", text: "Lorem 18", Energy: "143 kcal", Protein: "3.4 gm", Fat: "3.8 gm", Carbs: "19.6 gm" },
  { id: 19, img: "../assets/images/icons/icon19.png", text: "Lorem 19", Energy: "144 kcal", Protein: "3.2 gm", Fat: "3.9 gm", Carbs: "22.3 gm" },
  { id: 20, img: "../assets/images/icons/icon20.png", text: "Lorem 20", Energy: "145 kcal", Protein: "3.1 gm", Fat: "3.7 gm", Carbs: "21.9 gm" }
];
export default function script() {
window.addEventListener("xrloaded", () => {
     const landingPage = document.querySelector(".landing-page");
     const mainContainerage = document.querySelector(".main-container");
     landingPage.style.display = "block";
      mainContainerage.style.display = "block";
}

);


const target = window.location.pathname.replace("/", "");


const productConfig = {
  chocos: {
    bg: "assets/images/BGimages/Brown_bg.png",
    card: "assets/images/cardBoard/choco-card.png",
    product: "assets/images/products/chocos.png",
  },

  moons_stars: {
    bg: "assets/images/BGimages/Moon_star_bg.png",
    card: "assets/images/cardBoard/moons&stars-card.png",
    product: "assets/images/products/moons_stars.png",
  },

  duet: {
    bg: "assets/images/BGimages/Duet_bg.png",
    card: "assets/images/cardBoard/duet-card.png",
    product: "assets/images/products/duet.png",
  },

  chhota_laddoo: {
    bg: "assets/images/BGimages/Chhota_Bheem_bg.png",
    card: "assets/images/cardBoard/chhota_laddoo-card.png",
    product: "assets/images/products/chhota_laddoo.png",
  },

  crunchy_bites: {
    bg: "assets/images/BGimages/Crunchy_Bites.png",
    card: "assets/images/cardBoard/crunchy_bites-card.png",
    product: "assets/images/products/crunchy_bites.png",
  },
};


const data = productConfig[target] || productConfig["moons_stars"];

const loadingScreen = document.getElementById("loadingScreen");
loadingScreen.style.backgroundImage = `url(${data.bg})`;

const cardImg = document.getElementById("cardImage");
const productImg = document.getElementById("productImage");

if (cardImg) cardImg.src = data.card;
if (productImg) productImg.src = data.product;

 

 


const container = document.querySelector(".card-carousel");

cardList.forEach((card, i) => {
  const el = document.createElement("div");
  el.className = "card";
  el.dataset.index = i;
  el.innerHTML = `
    <img src="${card.img}" />
    <p style="padding-bottom: 0.5rem;">${card.text}</p>
  `;
  container.appendChild(el);
});

class DraggingEvent {
  constructor(target) {
    this.target = target;
    this.isTouchDragging = false;
  }

  event(cb) {
    let handler;

    this.target.addEventListener("mousedown", (e) => {
      this.isTouchDragging = false;
      handler = cb(e);
      window.addEventListener("mousemove", handler);
      window.addEventListener("mouseup", clear);
    });

    this.target.addEventListener("touchstart", (e) => {
      this.isTouchDragging = true;
      handler = cb(e);
      window.addEventListener("touchmove", handler, { passive: false });
      window.addEventListener("touchend", clear);
    }, { passive: false });

    const clear = () => {
      window.removeEventListener("mousemove", handler);
      window.removeEventListener("mouseup", clear);
      window.removeEventListener("touchmove", handler);
      window.removeEventListener("touchend", clear);
      handler(null);
    };
  }

  getDistance(cb) {
    this.event((start) => {
      const startX = start.touches ? start.touches[0].clientX : start.clientX;

      return (move) => {
        if (!move) return cb(null);

       
        if (move.cancelable) move.preventDefault();

        const x = move.touches ? move.touches[0].clientX : move.clientX;
        cb({ x: x - startX });
      };
    });
  }
}

class CardCarousel extends DraggingEvent {
  constructor(container) {
    super(container);

    this.container = container;
    this.cards = [...container.children];
    this.total = this.cards.length;

    this.centerIndex = 0;
    this.visibleRange = 2;
    this.lastOffset = 0;

    this.build();
    this.getDistance(this.move.bind(this));

 
    this.cards.forEach((card, i) => {
      card.addEventListener("click", () => this.onCardClick(i));

      card.addEventListener(
        "touchend",
        (e) => {
          e.preventDefault();
          this.onCardClick(i);
        },
        { passive: false }
      );
    });
  }

  wrap(i) {
    return (i + this.total) % this.total;
  }

  build() {
    this.update(0);
    this.setActive();
  }

  setActive() {
    this.cards.forEach((c) => c.classList.remove("active"));
    this.cards[this.centerIndex]?.classList.add("active");
  }

  update(offset) {
    this.lastOffset = offset;

    for (let i = 0; i < this.total; i++) {
      const dist =
        ((i - this.centerIndex + offset + this.total + this.total / 2) %
          this.total) -
        this.total / 2;

      this.updateCard(this.cards[i], dist);
    }
  }

  updateCard(card, dist) {
    const round = Math.round(dist);

    if (Math.abs(round) > this.visibleRange) {
      card.style.opacity = 0;
      card.style.transform = "translateX(-50%) scale(0)";
      return;
    }

    // NON-LINEAR SPACING
    const spacingMap = {
      0: 0,
      1: 80,
      2: 140,
    };

    const x =
      round < 0 ? -spacingMap[Math.abs(round)] : spacingMap[Math.abs(round)];

    // SCALE
    const scaleMap = {
      0: 1,
      1: 0.7,
      2: 0.5,
    };

    card.style.opacity = Math.abs(round) === 2 ? 0.5 : 1;
    card.style.zIndex = 10 - Math.abs(round);

    card.style.transform = `
      translateX(calc(-50% + ${x}px))
      scale(${scaleMap[Math.abs(round)]})
    `;
  }

  move(data) {
    if (!data) return this.snap();

 
    const speed = this.isTouchDragging ? 450 : 220;

    this.update(data.x / speed);
  }

  snap() {
    const offset = this.lastOffset;

    if (offset > 0.5) this.centerIndex = this.wrap(this.centerIndex - 1);
    if (offset < -0.5) this.centerIndex = this.wrap(this.centerIndex + 1);

    this.container.classList.add("smooth-return");
    this.update(0);
    this.setActive();

    setTimeout(() => {
      this.container.classList.remove("smooth-return");
    }, 300);
  }

  onCardClick(clickedIndex) {
    if (clickedIndex === this.centerIndex) return;

    const forward =
      (clickedIndex - this.centerIndex + this.total) % this.total;
    const backward =
      (this.centerIndex - clickedIndex + this.total) % this.total;

    if (forward < backward) {
      this.centerIndex = this.wrap(this.centerIndex + forward);
    } else {
      this.centerIndex = this.wrap(this.centerIndex - backward);
    }

    this.container.classList.add("smooth-return");
    this.update(0);
    this.setActive();

    setTimeout(() => {
      this.container.classList.remove("smooth-return");
    }, 300);
  }
}

new CardCarousel(container);


}