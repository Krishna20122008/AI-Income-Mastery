const pets = [
  { id:'dog-1', type:'dog', name:'Bruno', breed:'Pug', img:'assets/pets/dog-1.jpg',
    desc:'Bruno is a calm, affectionate fawn Pug who loves lounging beside his people. Fully leash-trained and great with families.',
    traits:['Leash Trained','Family Friendly','Calm Temperament'], age:'2 years', trained:'Obedience & Leash' },
  { id:'dog-2', type:'dog', name:'Sunny', breed:'Pomeranian', img:'assets/pets/dog-2.jpg',
    desc:'Sunny is a cheerful ginger Pom with a big personality. Outdoor-ready, socialized, and always ready to play.',
    traits:['Outdoor Ready','Socialized','Playful'], age:'1.5 years', trained:'Recall & Socialization' },
  { id:'dog-3', type:'dog', name:'Scout', breed:'Sheltie', img:'assets/pets/dog-3.jpg',
    desc:'Scout is an intelligent, loyal Shetland Sheepdog with a gentle nature. Excellent with children and other pets.',
    traits:['Intelligent','Kid Friendly','Loyal'], age:'2 years', trained:'Advanced Obedience' },
  { id:'dog-4', type:'dog', name:'Honey', breed:'Golden Retriever', img:'assets/pets/dog-4.jpg',
    desc:'Honey is the quintessential family dog — warm, patient, and eager to please. A true best friend in every sense.',
    traits:['Family Dog','Patient','Eager to Please'], age:'1 year', trained:'Full Obedience Program' },
  { id:'dog-5', type:'dog', name:'Snowball', breed:'Pomeranian', img:'assets/pets/dog-5.jpg',
    desc:'Snowball is a white Pom who already knows tricks like high-fives and shake. A showstopper and a sweetheart.',
    traits:['Trick Trained','High-Five Pro','Affectionate'], age:'1 year', trained:'Tricks & Obedience' },
  { id:'cat-1', type:'cat', name:'Mochi', breed:'Persian Kitten', img:'assets/pets/cat-1.jpg',
    desc:'Mochi is an adorable fluffy Persian kitten with a gentle soul. Litter trained and accustomed to gentle handling.',
    traits:['Litter Trained','Gentle','Fluffy'], age:'4 months', trained:'Litter & Handling' },
  { id:'cat-2', type:'cat', name:'Ginger', breed:'Long-Hair Tabby', img:'assets/pets/cat-2.jpg',
    desc:'Ginger is a majestic orange-and-white long-hair with amber eyes. Calm, regal, and loves quiet companionship.',
    traits:['Calm','Regal','Companion'], age:'1.5 years', trained:'Litter & Socialization' },
  { id:'cat-3', type:'cat', name:'Leo', breed:'Siberian Tabby', img:'assets/pets/cat-3.jpg',
    desc:'Leo has striking green eyes and a friendly, approachable nature. Great with families and adapts quickly to new homes.',
    traits:['Adaptable','Friendly','Green Eyes'], age:'1 year', trained:'Litter & Recall' },
  { id:'cat-4', type:'cat', name:'Maple', breed:'Maine Coon', img:'assets/pets/cat-4.jpg',
    desc:'Maple is a large, dignified Maine Coon with a luxurious coat. Gentle giant energy — perfect for spacious homes.',
    traits:['Gentle Giant','Dignified','Loyal'], age:'2 years', trained:'Full Socialization' },
  { id:'cat-5', type:'cat', name:'Biscuit', breed:'Munchkin', img:'assets/pets/cat-5.jpg',
    desc:'Biscuit is an adorable ginger-and-white Munchkin with short legs and a big heart. Playful, curious, and cuddly.',
    traits:['Playful','Curious','Cuddly'], age:'8 months', trained:'Litter & Play Manners' }
];

const grid = document.getElementById('pets-grid');
const select = document.getElementById('pet-select');
const modal = document.getElementById('pet-modal');
const modalBody = document.getElementById('modal-body');

function renderPets(filter = 'all') {
  grid.innerHTML = pets
    .filter(p => filter === 'all' || p.type === filter)
    .map(p => `
      <article class="pet-card" data-id="${p.id}" data-type="${p.type}">
        <img src="${p.img}" alt="${p.name} — ${p.breed}" loading="lazy">
        <div class="pet-info">
          <p class="pet-breed">${p.breed}</p>
          <h3>${p.name}</h3>
          <p class="pet-desc">${p.desc}</p>
          <div class="pet-tags">${p.traits.map(t => `<span class="tag">${t}</span>`).join('')}</div>
        </div>
      </article>`).join('');
}

function populateSelect() {
  select.innerHTML = '<option value="">Select a pet (optional)</option>' +
    pets.map(p => `<option value="${p.name}">${p.name} — ${p.breed}</option>`).join('');
}

function openModal(id) {
  const p = pets.find(x => x.id === id);
  if (!p) return;
  modalBody.innerHTML = `
    <img src="${p.img}" alt="${p.name}">
    <div class="modal-details">
      <p class="pet-breed">${p.breed}</p>
      <h2>${p.name}</h2>
      <p>${p.desc}</p>
      <p><strong>Age:</strong> ${p.age} &nbsp;|&nbsp; <strong>Training:</strong> ${p.trained}</p>
      <div class="modal-traits">${p.traits.map(t => `<span class="tag">${t}</span>`).join('')}</div>
      <a href="#contact" class="btn modal-inquire" data-name="${p.name}">Inquire About ${p.name}</a>
    </div>`;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
}

renderPets();
populateSelect();

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderPets(btn.dataset.filter);
  });
});

grid.addEventListener('click', e => {
  const card = e.target.closest('.pet-card');
  if (card) openModal(card.dataset.id);
});

modal.addEventListener('click', e => {
  if (e.target.classList.contains('modal-backdrop') || e.target.classList.contains('modal-close')) {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
  }
  if (e.target.classList.contains('modal-inquire')) {
    modal.classList.remove('open');
    select.value = e.target.dataset.name;
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
  }
});

document.getElementById('contact-form').addEventListener('submit', e => {
  e.preventDefault();
  document.getElementById('form-note').hidden = false;
  e.target.reset();
  setTimeout(() => { document.getElementById('form-note').hidden = true; }, 4000);
});

const toggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.nav-links');
toggle.addEventListener('click', () => {
  const open = links.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
});
links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));
