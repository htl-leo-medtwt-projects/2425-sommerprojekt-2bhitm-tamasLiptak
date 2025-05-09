function toggleMenu() {
  document.getElementById("navLinks").classList.toggle("active");
}

function signup() {
  document.querySelector(".submitButton").innerHTML = "THANK YOU!";
  document.querySelector(".submitButton").style.animation = "thxPop 0.3s ease-in-out forwards";
  document.querySelector(".submitButton").style.pointerEvents = "none";
  document.getElementById("signupname").value = "";
  document.getElementById("signupemail").value = "";
}

const bodyClass = document.body.className;
const logoImg = document.getElementById("logo-img");
const headerbg1 = document.getElementById("bfheaderbg1");

if (bodyClass.includes("bf2042")) {
  logoImg.src = "./../media/img/battlefield2042-logo.svg";
  headerbg1.style.backgroundImage = "url('./../media/img/bf2042/bf2042header.jpg')";
} else if (bodyClass.includes("bf5")) {
  logoImg.src = "./../media/img/battlefield5-logo.png";
  headerbg1.style.backgroundImage = "url('./../media/img/bf5/bf5header.png')";
} else if (bodyClass.includes("bf1")) {
  logoImg.src = "./../media/img/battlefield1-logo.svg";
  headerbg1.style.backgroundImage = "url('./../media/img/bf1/bf1header.jpg')";
} else if (bodyClass.includes("bf4")) {
  logoImg.src = "./../media/img/battlefield4-logo.png";
  headerbg1.style.backgroundImage = "url('./../media/img/bf4/bf4header.webp')";
}

/* GSAP */

if (window.innerWidth >= 768) {
  function updateDateTime() {
    const now = new Date();
    const options = {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    };
    const formatted = now.toLocaleString('en-US', options);
    document.getElementById('datetime').textContent = formatted;
  }
  setInterval(updateDateTime, 1000);
  updateDateTime();

  gsap.registerPlugin(ScrollTrigger);

  // Animation for Main Page
  gsap.from(".lockerweaponimg", {
    scrollTrigger: {
      trigger: ".lockerweaponimg",
      toggleActions: "restart pause reverse pause",
      start: "top 80%",
      scrub: 1,
      end: "top 25%",
    },
    x: 700,
    rotation: 45,
    scale: 0.5,
    duration: 2
  });

  gsap.from(".homepageText p", {
    scrollTrigger: {
      trigger: ".homepageText",
      start: "top 80%",
      end: "top 20%",
    },
    x: -700,
    duration: 1.5
  });

  gsap.from(".vehicleimg", {
    scrollTrigger: {
      trigger: ".vehicleimg",
      start: "top 70%",
      end: "top 40%",
      scrub: 1
    },
    rotation: -10,
    scale: 0.7,
    x: -700,
    y: 100,
    duration: 2
  });

  gsap.from(".homepageText1 p", {
    scrollTrigger: {
      trigger: ".homepageText1",
      start: "top 80%",
      end: "top 20%",
    },
    x: 700,
    duration: 1.5
  });

  gsap.from(".vehicleshot", {
    scrollTrigger: {
      trigger: ".vehicleshot",
      scrub: 1,
      start: "top 45%",
      end: "top 35%",
    },
    opacity: 0,
    scale: 0.1,
    duration: 0.2
  });

  gsap.from(".signup", {
    scrollTrigger: {
      trigger: ".signup",
      start: "top 90%",
      end: "top 50%",
    },
    y: 300,
    scale: 0.6,
    opacity: 0,
    duration: 1
  });

  // Animation for Battlefield X Header
  gsap.from(".imgheader", {
    x: -700,
    y: 700,
    duration: 1.5,
    delay: 0.5,
    rotation: -45,
  });

  gsap.from(".cardheader", {
    x: 1200,
    duration: 1.5,
    delay: 0.5
  });

  // Animation for posters
  const titles = gsap.utils.toArray(".storecard");
  titles.forEach((preview, i) => {
    gsap.from(preview, {
      scrollTrigger: {
        toggleActions: "play none none none",
        scroller: ".gamepreview",
        trigger: preview,
        start: "top 60%",
        end: "top 50%",
        scrub: 1,
        once: true
      },
      x: -1400,
      duration: 1.5,
      delay: i * 0.2
    });
  }
  )
}

/* Store */

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(game, button) {
  const exists = cart.some(item => item.title === game.title);

  if (!exists) {
    cart.push(game);
    saveCart();
    renderCart();
  } else {
    if (button) {
      button.classList.add('orderbuttonshake');
      setTimeout(() => {
        button.classList.remove('orderbuttonshake');
      }, 500);
    }
  }
}

function removeFromCart(title) {
  cart = cart.filter(item => item.title !== title);
  saveCart();
  renderCart();
}

function renderCart() {
  const ordercard = document.querySelector('.ordercard');
  if (!ordercard) return;

  ordercard.innerHTML = "";

  cart.forEach(game => {
    const item = document.createElement('div');
    item.classList.add('orderitem');
    item.style.position = 'relative';

    item.innerHTML = `
            <div class="orderposter">
                <img src="${game.poster}" alt="${game.title}">
            </div>
            <div class="ordercontent">
                <h1>${game.title}</h1>
                <h2>${game.price}</h2>
                <div class="removeOrderButton" data-title="${game.title}">REMOVE</div>
            </div>
        `;

    ordercard.appendChild(item);
  });

  document.querySelectorAll('.removeOrderButton').forEach(button => {
    button.addEventListener('click', (e) => {
      const title = e.target.getAttribute('data-title');
      removeFromCart(title);
    });
  });

  calculateTotal();
}

document.querySelectorAll('.addtocart').forEach(button => {
  button.addEventListener('click', () => {
    const storecard = button.closest('.storecard');
    const title = storecard.querySelector('h1').innerText;
    const price = storecard.querySelector('h2').innerText;
    const poster = storecard.querySelector('.poster img').src;

    const game = { title, price, poster };
    addToCart(game, button);
  });
});

document.querySelectorAll('.purchasebuttonheader').forEach(button => {
  button.addEventListener('click', () => {
    const title = button.dataset.title;
    const price = button.dataset.price;
    const poster = button.dataset.poster;

    const game = { title, price, poster };
    addToCart(game, button);

    button.innerHTML = 'REDIRECTING';
    button.classList.add('purchased');

    setTimeout(() => {
      window.location.href = "../pages/store.html";
    }, 1500);
  });
});

function calculateTotal() {
  let total = 0;
  cart.forEach(item => {
    const priceNumber = parseFloat(item.price.replace('€', '').replace(',', '.'));
    total += priceNumber;
  });

  const totalPriceElement = document.querySelector('.totalprice h2');
  if (totalPriceElement) {
    totalPriceElement.innerText = total.toFixed(2).replace('.', ',') + '€';
  }
}

renderCart();

const placeOrderBtn = document.querySelector('.placeorder');
if (placeOrderBtn) {
  placeOrderBtn.addEventListener('click', () => {
    if (cart.length === 0) return;

    cart = [];
    saveCart();
    renderCart();

    const modal = document.getElementById('order');
    modal.style.display = 'flex';
    document.querySelector('.referral').value = '';
  });
}

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('close')) {
      document.getElementById('order').style.display = 'none';
  }
});

/* Locker */

const equipmentMap = {
  // Outfit
  'Assault': './../media/img/locker/outfits/assault.png',
  'Engineer': './../media/img/locker/outfits/engineer.png',
  'Support': './../media/img/locker/outfits/support.png',
  'Recon': './../media/img/locker/outfits/recon.png',

  // Primary 
  'AEK-971': './../media/img/locker/primary/aek-971.png',
  'P90': './../media/img/locker/primary/p90.png',
  'M249': './../media/img/locker/primary/m249.png',
  'SAIGA-12': './../media/img/locker/primary/saiga-12.png',
  'M98B': './../media/img/locker/primary/m98b.png',

  // Secondary
  'G18': './../media/img/locker/secondary/g18.png',
  'M9': './../media/img/locker/secondary/m9.png',
  'M1911': './../media/img/locker/secondary/m1911.png',
  'TAURUS 44': './../media/img/locker/secondary/taurus44.png'
};

const boxes = document.querySelectorAll('.equipmentcontainer > div');

window.addEventListener('DOMContentLoaded', () => {
  boxes.forEach(box => {
    const key = box.dataset.label.toLowerCase();
    const saved = localStorage.getItem(`locker_${key}`);
    if (saved) {
      box.setAttribute('data-active', `${saved}`);
      insertImage(box, saved);
    }
  });
});

boxes.forEach(box => {
  box.addEventListener('click', (e) => {
    boxes.forEach(b => {
      if (b !== box) b.classList.remove('open');
    });
    box.classList.toggle('open');
    e.stopPropagation();
  });

  box.querySelectorAll('.dropdown-menu > div').forEach(item => {
    item.addEventListener('click', (e) => {
      e.stopPropagation();
      const selected = item.textContent.trim();
      const key = box.dataset.label.toLowerCase();

      box.setAttribute('data-active', `${selected}`);
      localStorage.setItem(`locker_${key}`, selected);
      insertImage(box, selected);
      box.classList.remove('open');
    });
  });
});

function insertImage(box, selectedItem) {
  let img = box.querySelector('img');
  const src = equipmentMap[selectedItem];
  if (!src) return;

  if (!img) {
    img = document.createElement('img');
    box.appendChild(img);
  }

  img.classList.remove('loaded');
  img.src = src;

  img.onload = () => {
    img.classList.add('loaded');
  };
}

document.addEventListener('click', () => {
  boxes.forEach(b => b.classList.remove('open'));
});

const previewImgContainer = document.querySelector('.previewimg');
const previewBox = document.querySelector('.preview');
const previewDesc = document.querySelector('.previewdescription');

boxes.forEach(box => {
  box.addEventListener('mouseenter', () => {
    const img = box.querySelector('img');
    const activeLabel = box.getAttribute('data-active')?.replace('Equipped: ', '') || '';

    if (!img || !img.src) return;

    previewImgContainer.innerHTML = '';

    const previewImg = document.createElement('img');
    previewImg.src = img.src;

    previewImg.onload = () => {
      previewImg.classList.add('visible');
    };

    previewImgContainer.appendChild(previewImg);

    previewBox.setAttribute('data-label', activeLabel);

    previewDesc.textContent = activeLabel;

    const itemName = box.getAttribute('data-active')?.replace('Equipped: ', '').trim();
    if (itemName) updatePreview(itemName);
  });
});

const dropdownItems = document.querySelectorAll('.dropdown-menu > div');

dropdownItems.forEach(item => {
  item.addEventListener('mouseenter', () => {
    const name = item.textContent.trim();
    const imagePath = equipmentMap[name];

    if (!imagePath) return;

    previewImgContainer.innerHTML = '';
    const previewImg = document.createElement('img');
    previewImg.src = imagePath;
    previewImg.onload = () => {
      previewImg.classList.add('visible');
    };
    previewImgContainer.appendChild(previewImg);

    previewBox.setAttribute('data-label', name);
    previewDesc.textContent = name;

    const itemName = item.textContent.trim();
    updatePreview(itemName);
  });
});

let itemData = { 
  "Assault": {
      "type": "Outfit",
      "description": "The Assault class excels in close to medium-range combat, delivering consistent damage and suppressive fire on the frontlines. Equipped with balanced armor and enhanced mobility, Assault troops are trained to breach and secure enemy positions under pressure.",
      "stats": {
          "armor": 70,
          "speed": 75,
          "utility": 60
      }
  },
  "Engineer": {
      "type": "Outfit",
      "description": "Engineers specialize in repairing vehicles, deploying explosives, and neutralizing enemy armor threats. Their compact loadout allows for high mobility, and they thrive in technical roles both offensively and defensively.",
      "stats": {
          "armor": 60,
          "speed": 80,
          "utility": 85
      }
  },
  "Support": {
      "type": "Outfit",
      "description": "Support troops are the backbone of any squad, providing continuous ammunition, suppressive fire, and heavy weaponry. Built for resilience, they maintain pressure on enemy lines and keep allies combat-ready.",
      "stats": {
          "armor": 85,
          "speed": 60,
          "utility": 70
      }
  },
  "Recon": {
      "type": "Outfit",
      "description": "Recon units gather intel, mark enemy targets, and deliver precise shots from a distance. With enhanced spotting tools and camouflage capabilities, they operate best when unseen and outmaneuvering opponents.",
      "stats": {
          "armor": 50,
          "speed": 85,
          "utility": 90
      }
  },
  "AEK-971": {
      "type": "Primary Weapon",
      "description": "The AEK-971 is a Russian assault rifle known for its exceptional rate of fire and controllable recoil. Designed for urban and mid-range encounters, it offers a deadly balance of firepower and accuracy in close quarters.",
      "stats": {
          "damage": 36,
          "fireRate": 900,
          "accuracy": 68,
          "range": 55,
          "mobility": 75
      }
  },
  "P90": {
      "type": "Primary Weapon",
      "description": "The FN P90 is a compact, futuristic SMG with a top-mounted magazine and high-capacity rounds. Its ergonomic design and rapid rate of fire make it ideal for tight indoor skirmishes and reactive combat scenarios.",
      "stats": {
          "damage": 25,
          "fireRate": 900,
          "accuracy": 55,
          "range": 30,
          "mobility": 90
      }
  },
  "M249": {
      "type": "Primary Weapon",
      "description": "A belt-fed light machine gun, the M249 provides unmatched sustained fire, capable of pinning enemies and laying down effective cover. While heavier than other primaries, it makes up for it with capacity and reliability.",
      "stats": {
          "damage": 35,
          "fireRate": 750,
          "accuracy": 60,
          "range": 60,
          "mobility": 50
      }
  },
  "SAIGA-12": {
      "type": "Primary Weapon",
      "description": "The SAIGA-12 is a semi-automatic shotgun derived from the AK platform, delivering devastating damage at close range. It's the preferred choice for aggressive breaching and hallway dominance.",
      "stats": {
          "damage": 80,
          "fireRate": 400,
          "accuracy": 40,
          "range": 20,
          "mobility": 65
      }
  },
  "M98B": {
      "type": "Primary Weapon",
      "description": "A high-caliber bolt-action sniper rifle, the M98B is built for long-range precision with armor-piercing capability. Effective in open fields and vantage points, it rewards accuracy and patience.",
      "stats": {
          "damage": 90,
          "fireRate": 45,
          "accuracy": 95,
          "range": 100,
          "mobility": 40
      }
  },
  "G18": {
      "type": "Secondary Weapon",
      "description": "The G18 is a fully automatic variant of the classic Glock, featuring rapid burst fire and a compact frame. Best used as a backup in close encounters, it offers surprising power in its class.",
      "stats": {
          "damage": 20,
          "fireRate": 1100,
          "accuracy": 40,
          "range": 15,
          "mobility": 90
      }
  },
  "M9": {
      "type": "Secondary Weapon",
      "description": "Reliable and accurate, the M9 sidearm serves as a dependable secondary weapon in any loadout. It's a balanced pistol with consistent performance and minimal recoil.",
      "stats": {
          "damage": 28,
          "fireRate": 400,
          "accuracy": 60,
          "range": 25,
          "mobility": 85
      }
  },
  "M1911": {
      "type": "Secondary Weapon",
      "description": "A time-tested .45 caliber handgun, the M1911 is praised for its stopping power and historical significance. While it has a slower fire rate, its damage per shot compensates effectively.",
      "stats": {
          "damage": 35,
          "fireRate": 350,
          "accuracy": 65,
          "range": 20,
          "mobility": 80
      }
  },
  "TAURUS 44": {
      "type": "Secondary Weapon",
      "description": "This powerful revolver is chambered in .44 Magnum, delivering heavy impact with each shot. Ideal for skilled marksmen, the Taurus 44 is perfect for taking down enemies with just a few well-placed hits.",
      "stats": {
          "damage": 50,
          "fireRate": 200,
          "accuracy": 70,
          "range": 30,
          "mobility": 75
      }
  }
}

const previewDescription = document.querySelector('.previewdescription');

const STAT_MAX = {
  damage: 100,
  fireRate: 1200,
  accuracy: 100,
  range: 100,
  mobility: 100,
  armor: 100,
  speed: 100,
  utility: 100
};

function normalizeStat(value, type) {
  const max = STAT_MAX[type] || 100;
  return Math.min(100, (value / max) * 100);
}

function updatePreview(itemName) {
  if (!itemData[itemName]) return;

  const item = itemData[itemName];
  const stats = item.stats;

  const statsHtml = Object.entries(stats)
    .map(([key, val]) => {
      const percentage = normalizeStat(val, key);
      return `
              <div class="stat-line">
                  <span class="stat-name">${key}</span>
                  <div class="stat-bar-container">
                      <div class="stat-bar" style="width: ${percentage}%"></div>
                  </div>
              </div>
          `;
    })
    .join('');

  previewDescription.innerHTML = `
        <h2>${itemName} <small>(${item.type})</small></h2>
        <p>${item.description}</p>
        <div class="stats">${statsHtml}</div>
    `;
}