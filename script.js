const dashBtn = document.getElementById('dashBtn');
const panel = document.getElementById('panel');
const chev = document.getElementById('chev');
const main = document.querySelector('main');

// Initial render
function renderInitial() {
  main.innerHTML = `
  <div class="flex flex-col items-center justify-center px-6 mt-6 gap-6">
    <div class="moner-box relative flex items-center justify-center p-8 rounded-3xl shadow-2xl bg-gradient-to-r from-indigo-200 via-indigo-100 to-indigo-200 animate-fadein w-full max-w-3xl">
      <h1 class="text-5xl font-extrabold text-indigo-800 tracking-wider glow-text text-center">
        মনোবন্ধু
      </h1>
    </div>
  </div>
  `;
}

// Dashboard toggle
dashBtn.addEventListener('click', () => {
  panel.classList.toggle('open');
  chev.classList.toggle('rot');
});

// Close panel on click outside
document.addEventListener('click', (e) => {
  if (!dashBtn.contains(e.target) && !panel.contains(e.target)) {
    panel.classList.remove('open');
    chev.classList.remove('rot');
  }
});

// Dashboard links
const links = panel.querySelectorAll('a');

// Home
const homeLink = Array.from(links).find(a => a.textContent.includes('হোম'));
homeLink.addEventListener('click', (e) => {
  e.preventDefault();

  const oldPara = main.querySelector('.para-box');
  if (oldPara) oldPara.remove();
  const mentalBox = main.querySelector('#mentalHealthCheck');
  if (mentalBox) mentalBox.remove();

  const paraBox = document.createElement('div');
  paraBox.className = "moner-box para-box relative flex flex-col items-center justify-center p-6 rounded-3xl shadow-2xl bg-indigo-50 animate-fadein w-full max-w-3xl mt-4";
  paraBox.innerHTML = `
    <p class="mt-2 text-indigo-700 text-center text-base md:text-lg">
      মনোবন্ধু এমন একটি অ্যাপ যা আপনার শারীরিক ও মানসিক সুস্থতার নির্ভরযোগ্য সঙ্গী হিসেবে কাজ করে। মনোবন্ধু ঠিক সময়ে আপনার পাশে এগিয়ে আসে যখন আপনার প্রয়োজন। এই অ্যাপের মাধ্যমে আপনি পাবেন মানসিক স্বাস্থ্যবিষয়ক পরামর্শ, জরুরি পরিস্থিতিতে তাৎক্ষণিক হেল্পলাইন নম্বর, স্বাস্থ্য-পরীক্ষা বা মেডিকেল সহায়তা সংক্রান্ত তথ্য, এমনকি নিজের মুড ট্র্যাক করার সুবিধাও। এটি শুধু একটি অ্যাপ নয়, বরং এক বন্ধুর মতো—যে আপনার প্রয়োজনে পাশে থাকে, শোনে, বোঝে, এবং সাহায্য করে। মনোবন্ধু মানে—মন ও জীবনের যত্ন, এক স্পর্শে।
    </p>
  `;
  main.appendChild(paraBox);
});

// Mental health check
const mentalCheckLink = Array.from(links).find(a => a.textContent.includes('মানসিক স্বাস্থ্য যাচাই'));
mentalCheckLink.addEventListener('click', (e) => {
  e.preventDefault();

  const oldPara = main.querySelector('.para-box');
  if (oldPara) oldPara.remove();

  main.innerHTML = `
  <div id="mentalHealthCheck" class="mental-check flex flex-col gap-6 p-6 bg-white rounded-3xl shadow-2xl max-w-5xl mx-auto animate-fadein mt-6">
    <div class="box p-4 rounded-2xl shadow-lg bg-indigo-50 flex flex-col items-center gap-3">
      <h2 class="text-xl font-bold text-indigo-700">আজকের মানসিক অবস্থা</h2>
      <div class="flex gap-4 text-3xl">
        <span class="cursor-pointer emoji" data-value="1">😢</span>
        <span class="cursor-pointer emoji" data-value="2">😔</span>
        <span class="cursor-pointer emoji" data-value="3">😐</span>
        <span class="cursor-pointer emoji" data-value="4">🙂</span>
        <span class="cursor-pointer emoji" data-value="5">😃</span>
      </div>
      <input type="range" min="0" max="10" value="5" class="w-full mt-2" id="energyRange">
      <div class="flex justify-between w-full text-sm text-indigo-600">
        <span>Low</span><span>High</span>
      </div>
    </div>

    <div class="box p-4 rounded-2xl shadow-lg bg-indigo-50 flex flex-col gap-2">
      <h2 class="text-xl font-bold text-indigo-700">আপনি কি বিষণ্ণ আজকে?</h2>
      <div class="flex gap-4">
        <label class="flex items-center gap-1"><input type="radio" name="sad" value="yes"> হ্যাঁ</label>
        <label class="flex items-center gap-1"><input type="radio" name="sad" value="no"> না</label>
      </div>
    </div>

    <div class="box p-4 rounded-2xl shadow-lg bg-indigo-50 flex flex-col gap-3">
      <h2 class="text-xl font-bold text-indigo-700">আজকের পরামর্শ</h2>
      <p class="text-indigo-600 text-sm">আপনার বর্তমান মানসিক অবস্থা অনুযায়ী পরামর্শ</p>
      <button id="submitMood" class="mt-2 px-4 py-2 bg-indigo-700 text-white rounded-xl hover:bg-indigo-600 transition">Submit</button>
    </div>
  </div>
  `;

  // Emoji logic
  const emojis = document.querySelectorAll('.emoji');
  let selectedMood = null;
  emojis.forEach(emoji => {
    emoji.addEventListener('click', () => {
      emojis.forEach(e => e.classList.remove('scale-125'));
      emoji.classList.add('scale-125');
      selectedMood = parseInt(emoji.getAttribute('data-value'));
    });
  });

  // Submit
  const submitBtn = document.getElementById('submitMood');
  submitBtn.addEventListener('click', () => {
    const sad = document.querySelector('input[name="sad"]:checked');
    if (!selectedMood || !sad) {
      alert('দয়া করে আপনার মানসিক অবস্থা ও প্রশ্নের উত্তর দিন।');
      return;
    }

    const moodBox = document.createElement('div');
    moodBox.className = "advice-box bg-indigo-50 p-6 rounded-3xl shadow-2xl mt-6 animate-fadein";

    // Determine mood type
    let moodType = (selectedMood >= 4 && sad.value === "no") ? "good" : "bad";

    // Different messages
    let goodAdvice = `
      <ul class="list-disc list-inside text-indigo-700 text-sm leading-relaxed">
        <li>এই ইতিবাচক মনোভাবটা ধরে রাখো।</li>
        <li>নিজের জন্য কৃতজ্ঞতার কিছু মুহূর্ত লিখে রাখো।</li>
        <li>প্রিয় মানুষদের সাথে সময় কাটাও।</li>
        <li>নিজের লক্ষ্যগুলোর দিকে ছোট্ট পদক্ষেপ নাও।</li>
      </ul>
    `;
    let badAdvice = `
      <ul class="list-disc list-inside text-indigo-700 text-sm leading-relaxed">
        <li>নিজেকে সময় দাও, চাপ নিও না।</li>
        <li>বিশ্বাসযোগ্য কাউকে তোমার অনুভূতি বলো।</li>
        <li>একটু হাঁটো, গভীর শ্বাস নাও, জল খাও।</li>
        <li>মন খারাপ সাময়িক, কেটে যাবে — নিজেকে দোষ দিও না।</li>
      </ul>
    `;

    moodBox.innerHTML = `
      <h2 class="text-2xl font-bold text-indigo-700 mb-4 text-center">আজকের মানসিক পরামর্শ</h2>
      <div class="grid md:grid-cols-2 gap-4">
        <div class="p-4 bg-white rounded-2xl shadow">
          <h3 class="text-lg font-semibold text-green-600 mb-2">মন ভালো থাকলে করণীয়</h3>
          ${goodAdvice}
        </div>
        <div class="p-4 bg-white rounded-2xl shadow">
          <h3 class="text-lg font-semibold text-red-600 mb-2">মন খারাপ থাকলে করণীয়</h3>
          ${badAdvice}
        </div>
      </div>
      <p class="mt-4 text-center text-indigo-700 font-medium">
        ${moodType === "good" ? "আজ তোমার মানসিক অবস্থা ইতিবাচক — নিজেকে গর্বিত মনে করো!" : "মনটা একটু ভারী লাগছে, কিন্তু তুমি একা নও ❤️"}
      </p>
    `;
    main.appendChild(moodBox);
  });
});

// Page load
renderInitial();
const submitBtn = document.getElementById('submitBtn');
const adviceSection = document.getElementById('adviceSection');

submitBtn.addEventListener('click', () => {
  adviceSection.innerHTML = '';

  const bigBox = document.createElement('div');
  bigBox.classList.add('advice-box');

  const goodMood = document.createElement('div');
  goodMood.classList.add('small-box');
  goodMood.innerHTML = `
    <h3>😊 মন ভালো থাকলে করণীয়</h3>
    <ul>
      <li>ভালো লাগার কারণটা লিখে রাখো।</li>
      <li>যাদের ভালোবাসো তাদের সঙ্গে সময় কাটাও।</li>
      <li>ধ্যান বা প্রার্থনা করে কৃতজ্ঞতা প্রকাশ করো।</li>
    </ul>
  `;

  const badMood = document.createElement('div');
  badMood.classList.add('small-box');
  badMood.innerHTML = `
    <h3>😔 মন খারাপ থাকলে করণীয়</h3>
    <ul>
      <li>গভীরভাবে শ্বাস নাও ও ধীরে ছাড়ো।</li>
      <li>একটু হাঁটতে বের হও বা গান শোনো।</li>
      <li>কোনো কাছের জনের সঙ্গে কথা বলো।</li>
    </ul>
  `;

  bigBox.appendChild(goodMood);
  bigBox.appendChild(badMood);
  adviceSection.appendChild(bigBox);
});