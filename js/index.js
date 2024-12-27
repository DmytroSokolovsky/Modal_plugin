let fruits = [
  {
    id: 1,
    title: 'Apples',
    price: 20,
    img: 'https://pngfre.com/wp-content/uploads/apple-poster.png',
  },
  {
    id: 2,
    title: 'Oranges',
    price: 30,
    img: 'https://cdn.pixabay.com/photo/2016/02/23/17/42/orange-1218158_960_720.png',
  },
  {
    id: 3,
    title: 'Mango',
    price: 40,
    img: 'https://i.pinimg.com/originals/a3/f9/6b/a3f96b85d302cf3d4f375bbd105fddec.png',
  },
];

const toHTML = fruit => {
  return `
      <div class="card">
        <div class="card__item">
          <div class="card__image">
            <img src=${fruit.img} alt=${fruit.title}>
          </div>
          <div class="card__body">
            <h2 class="card__title">${fruit.title}</h2>
            <div class="card__buttons">
              <button class="card__btn card__btn_primary" data-btn="price" data-id=${fruit.id}>View price</button>
              <button class="card__btn card__btn_danger" data-btn="remove" data-id=${fruit.id}>Delete</button></div>
            </div>
         </div>
      </div>
   `;
};

function render() {
  const html = fruits.map(fruit => toHTML(fruit)).join('');
  document.querySelector('#fruits').innerHTML = html;
}

render();

const priceModal = $.modal({
  title: 'Product price',
  closable: true,
  width: '300px',
  footerButtons: [
    {
      text: 'Oк',
      type: 'primary',
      handler() {
        console.log('Primary btn clicked');
        priceModal.close();
      },
    }
  ],
});

document.addEventListener('click', e => {
  const btnType = e.target.dataset.btn;
  const id = +e.target.dataset.id;
  const fruit = fruits.find(fruit => fruit.id === id);

  if (btnType === 'price') {
    priceModal.setContent(`<p>${fruit.title}</p><p>Price: ${fruit.price}</p>`);
    priceModal.open();
  } else if (btnType === 'remove') {
    $.confirm({
      title: 'Are you sure?',
      content: `You remove the fruit: <strong>${fruit.title}</strong>`,
    })
      .then(() => {
        fruits = fruits.filter(fruit => fruit.id !== id);
        render();
      })
      .catch(() => {
        console.log('cancel');
      });
  }
});
