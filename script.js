const dashBtn = document.getElementById('dashBtn');
const panel = document.getElementById('panel');
const chev = document.getElementById('chev');
const main = document.querySelector('main');

// 1️⃣ Initial render: শুধু Moner Bondhu title box
function renderInitial() {
  main.innerHTML = `
  <div class="flex flex-col items-center justify-center px-6 mt-6 gap-6">
    <div class="moner-box relative flex items-center justify-center p-8 rounded-3xl shadow-2xl bg-gradient-to-r from-indigo-200 via-indigo-100 to-indigo-200 animate-bounce-slow w-full max-w-3xl">
      <h1 class="text-5xl font-extrabold text-indigo-800 tracking-wider glow-text text-center">
        মনোবন্ধু
      </h1>
    </div>
  </div>
  `;
}

// 2️⃣ Dashboard toggle
dashBtn.addEventListener('click', () => {
  panel.classList.toggle('open');
  chev.classList.toggle('rot');
});

// 3️⃣ Close panel on click outside
document.addEventListener('click', (e) => {
  if (!dashBtn.contains(e.target) && !panel.contains(e.target)) {
    panel.classList.remove('open');
    chev.classList.remove('rot');
  }
});

// 4️⃣ Dashboard links
const links = panel.querySelectorAll('a');

// 5️⃣ Home link logic
const homeLink = Array.from(links).find(a => a.dataset.section === 'home');
homeLink.addEventListener('click', (e) => {
  e.preventDefault();

  // Remove old mental health box if exists
  const mentalBox = main.querySelector('#mentalHealthCheck');
  if (mentalBox) mentalBox.remove();

  // Add paragraph box
  const paraBox = document.createElement('div');
  paraBox.className = "moner-box para-box relative flex flex-col items-center justify-center p-6 rounded-3xl shadow-2xl bg-indigo-50 animate-fadein w-full max-w-3xl mt-4";
  paraBox.innerHTML = `
    <p class="mt-2 text-indigo-700 text-center text-base md:text-lg">
      মনোবন্ধু এমন একটি অ্যাপ যা আপনার শারীরিক ও মানসিক সুস্থতার নির্ভরযোগ্য সঙ্গী হিসেবে কাজ করে। মনোবন্ধু ঠিক সময়ে আপনার পাশে এগিয়ে আসে যখন আপনার প্রয়োজন। এই অ্যাপের মাধ্যমে আপনি পাবেন মানসিক স্বাস্থ্যবিষয়ক পরামর্শ, জরুরি পরিস্থিতিতে তাৎক্ষণিক হেল্পলাইন নম্বর, স্বাস্থ্য-পরীক্ষা বা মেডিকেল সহায়তা সংক্রান্ত তথ্য, এমনকি নিজের মুড ট্র্যাক করার সুবিধাও। এটি শুধু একটি অ্যাপ নয়, বরং এক বন্ধুর মতো—যে আপনার প্রয়োজনে পাশে থাকে, শোনে, বোঝে, এবং সাহায্য করে। মনোবন্ধু মানে—মন ও জীবনের যত্ন, এক স্পর্শে।
    </p>
  `;
  main.appendChild(paraBox);
});

// 6️⃣ মানসিক স্বাস্থ্য যাচাই link
const mentalCheckLink = Array.from(links).find(a => a.dataset.section === 'checkup');
mentalCheckLink.addEventListener('click', (e) => {
  e.preventDefault();

  // Remove old paragraph box
  const oldPara = main.querySelector('.para-box');
  if (oldPara) oldPara.remove();

  main.innerHTML = `
  <div id="mentalHealthCheck" class="mental-check flex flex-col gap-6 p-6 bg-white rounded-3xl shadow-2xl max-w-5xl mx-auto animate-fadein mt-6">
    <!-- Box 1: আজকের মানসিক অবস্থা -->
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
        <span>Low</span>
        <span>High</span>
      </div>
    </div>

    <!-- Box 2: আপনি কি বিষণ্ণ -->
    <div class="box p-4 rounded-2xl shadow-lg bg-indigo-50 flex flex-col gap-2">
      <h2 class="text-xl font-bold text-indigo-700">আপনি কি বিষণ্ণ আজকে?</h2>
      <div class="flex gap-4">
        <label class="flex items-center gap-1"><input type="radio" name="sad" value="yes"> হ্যাঁ</label>
        <label class="flex items-center gap-1"><input type="radio" name="sad" value="no"> না</label>
      </div>
    </div>

    <!-- Box 3: আজকের পরামর্শ + Submit -->
    <div class="box p-4 rounded-2xl shadow-lg bg-indigo-50 flex flex-col gap-3">
      <h2 class="text-xl font-bold text-indigo-700">আজকের পরামর্শ</h2>
      <p class="text-indigo-600 text-sm">আপনার বর্তমান মানসিক অবস্থা অনুযায়ী পরামর্শ</p>
      <button id="submitMood" class="mt-2 px-4 py-2 bg-indigo-700 text-white rounded-xl hover:bg-indigo-600 transition">Submit</button>

      <!-- Advice section -->
      <div id="adviceSection" class="mt-4 flex flex-col gap-2">
        <!-- ছোট ছোট box এখানে JS দিয়ে বসানো হবে -->
      </div>
    </div>
  </div>
  `;

  // Emoji selection logic
  const emojis = document.querySelectorAll('.emoji');
  emojis.forEach(emoji => {
    emoji.addEventListener('click', () => {
      emojis.forEach(e => e.classList.remove('scale-125'));
      emoji.classList.add('scale-125');
    });
  });

  // Submit button logic (advice)
  const submitBtn = document.getElementById('submitMood');
  submitBtn.addEventListener('click', () => {
    const adviceSection = document.getElementById('adviceSection');
    adviceSection.innerHTML = ''; // clear previous advice

    const selectedEmoji = document.querySelector('.emoji.scale-125');
    const sadRadio = document.querySelector('input[name="sad"]:checked');

    // Advice array
    const advices = [];

    if (selectedEmoji && parseInt(selectedEmoji.dataset.value) >= 4) {
      advices.push('আজ মন ভালো আছে, ধন্যবাদ ধরে রাখার চেষ্টা করুন।');
      advices.push('হালকা ব্যায়াম করুন বা গান শুনুন।');
    } else {
      advices.push('আজ মন খারাপ থাকলে কিছু ধ্যান করুন বা কেউ সাথে কথা বলুন।');
      advices.push('হালকা হাঁটাচলা করুন বা আপনার প্রিয় কাজ করুন।');
    }

    if (sadRadio && sadRadio.value === 'yes') {
      advices.push('আপনি বললেন আপনি বিষণ্ণ, মানসিক সহায়তা নেওয়ার চেষ্টা করুন।');
    }

    // Insert advice boxes
    advices.forEach(text => {
      const div = document.createElement('div');
      div.className = "p-2 bg-indigo-100 rounded-xl shadow-sm text-indigo-700 text-sm";
      div.textContent = text;
      adviceSection.appendChild(div);
    });
  });
});

// 🔹 Call initial render on page load
renderInitial();
