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
} else if (bodyClass.includes("store")) {
}

let mm = gsap.matchMedia();
mm.add("(min-width: 768px)", () => {
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
  setInterval(updateDateTime, 1000);
  updateDateTime();
});



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
    button.classList.add('orderbuttonshake');
    console.log('item already in cart');

    setTimeout(() => {
      button.classList.remove('orderbuttonshake');
    }, 500);
  }
}

function removeFromCart(title) {
  cart = cart.filter(item => item.title !== title);
  saveCart();
  renderCart();
}

function renderCart() {
  const ordercard = document.querySelector('.ordercard');
  ordercard.innerHTML = '';

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

function calculateTotal() {
  let total = 0;
  cart.forEach(item => {
    // Remove the € and convert to number
    const priceNumber = parseFloat(item.price.replace('€', '').replace(',', '.'));
    total += priceNumber;
    console.log(priceNumber);
    console.log(total);
  });

  // Update the totalprice element
  const totalPriceElement = document.querySelector('.totalprice h2');
  if (totalPriceElement) {
    totalPriceElement.innerText = total.toFixed(2).replace('.', ',') + '€';
    console.log(totalPriceElement.innerText);
  }
}

renderCart();