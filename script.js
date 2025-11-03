const dashBtn = document.getElementById('dashBtn');
const panel = document.getElementById('panel');
const chev = document.getElementById('chev');
const main = document.querySelector('main');


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


dashBtn.addEventListener('click', () => {
  panel.classList.toggle('open');
  chev.classList.toggle('rot');
});

// Close panel if clicked outside
document.addEventListener('click', (e) => {
  if (!dashBtn.contains(e.target) && !panel.contains(e.target)) {
    panel.classList.remove('open');
    chev.classList.remove('rot');
  }
});

const links = panel.querySelectorAll('a');


const homeLink = Array.from(links).find(a => a.dataset.section === 'home');
homeLink.addEventListener('click', (e) => {
  e.preventDefault();
  renderInitial();

  const paraBox = document.createElement('div');
  paraBox.className = "moner-box para-box relative flex flex-col items-center justify-center p-6 rounded-3xl shadow-2xl bg-indigo-50 animate-fadein w-full max-w-3xl mt-4";
  paraBox.innerHTML = `
    <p class="mt-2 text-indigo-700 text-center text-base md:text-lg">
      মনোবন্ধু এমন একটি অ্যাপ যা আপনার শারীরিক ও মানসিক সুস্থতার নির্ভরযোগ্য সঙ্গী হিসেবে কাজ করে। মনোবন্ধু ঠিক সময়ে আপনার পাশে এগিয়ে আসে যখন আপনার প্রয়োজন। এই অ্যাপের মাধ্যমে আপনি পাবেন মানসিক স্বাস্থ্যবিষয়ক পরামর্শ, জরুরি পরিস্থিতিতে তাৎক্ষণিক হেল্পলাইন নম্বর, স্বাস্থ্য-পরীক্ষা বা মেডিকেল সহায়তা সংক্রান্ত তথ্য, এমনকি নিজের মুড ট্র্যাক করার সুবিধাও। এটি শুধু একটি অ্যাপ নয়, বরং এক বন্ধুর মতো—যে আপনার প্রয়োজনে পাশে থাকে, শোনে, বোঝে, এবং সাহায্য করে। মনোবন্ধু মানে—মন ও জীবনের যত্ন, এক স্পর্শে।
    </p>
  `;
  main.appendChild(paraBox);
});


const mentalCheckLink = Array.from(links).find(a => a.dataset.section === 'checkup');
mentalCheckLink.addEventListener('click', (e) => {
  e.preventDefault();
  renderMentalCheck();
});

function renderMentalCheck() {
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
          <span>Low</span>
          <span>High</span>
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
        <div id="adviceSection" class="mt-4 flex flex-col gap-2"></div>
      </div>
    </div>
  `;

  const emojis = document.querySelectorAll('.emoji');
  emojis.forEach(emoji => {
    emoji.addEventListener('click', () => {
      emojis.forEach(e => e.classList.remove('scale-125'));
      emoji.classList.add('scale-125');
    });
  });

  const submitBtn = document.getElementById('submitMood');
  submitBtn.addEventListener('click', () => {
    const adviceSection = document.getElementById('adviceSection');
    adviceSection.innerHTML = '';
    const selectedEmoji = document.querySelector('.emoji.scale-125');
    const sadRadio = document.querySelector('input[name="sad"]:checked');
    const advices = [];

    if (selectedEmoji && parseInt(selectedEmoji.dataset.value) >= 4) {
      advices.push('আজ মনের ভালো লাগা ধরে রাখার চেষ্টা করুন।');
      advices.push('হালকা ব্যায়াম করুন।');
      advices.push('আপনার প্রিয় কাজ করুন।');
    } else {
      advices.push(' কিছু ধর্মীয় বানী পড়ুন।');
      advices.push('প্রিয় কোনো জায়গায় ঘুরতে যান।');
    }

    if (sadRadio && sadRadio.value === 'yes') {
      advices.push('আপনি বললেন আপনি বিষণ্ণ, অ্যাপের সাহায্যে মানসিক সহায়তা নিন।');
      advices.push('পরিবারের কাছের মানুষের সাথে খোলামেলা আলোচনা করুন।');    
      advices.push('একা না থেকে নিজেকে দৈনন্দিন কাজে ব্যস্ত রাখুন।');
    }

    advices.forEach(text => {
      const div = document.createElement('div');
      div.className = "p-2 bg-indigo-100 rounded-xl shadow-sm text-indigo-700 text-sm";
      div.textContent = text;
      adviceSection.appendChild(div);
    });
  });
}


const pregnancyLink = Array.from(links).find(a => a.dataset.section === 'pregnancy');
pregnancyLink.addEventListener('click', (e) => {
  e.preventDefault();
  renderPregnancy();
});

function renderPregnancy() {
  main.innerHTML = `
    <div class="pregnancy-section flex flex-wrap gap-6 p-6 bg-white rounded-3xl shadow-2xl max-w-6xl mx-auto animate-fadein justify-center">

      <!-- পুষ্টি ও খাদ্য -->
      <div class="box p-4 rounded-2xl shadow-lg bg-rose-50 flex flex-col gap-3 w-[30%]">
        <h2 class="text-xl font-bold text-rose-700">🍅 পুষ্টি ও খাদ্য</h2>
        <div class="flex flex-col gap-2">
          <div class="p-2 bg-white rounded-xl shadow-inner">প্রতি দিনে পর্যাপ্ত পানি পান করুন।</div>
          <div class="p-2 bg-white rounded-xl shadow-inner">শাকসবজি ও ফলের পরিমাণ বাড়ান।</div>
          <div class="p-2 bg-white rounded-xl shadow-inner">প্রোটিন ও ক্যালসিয়াম যুক্ত খাবার খান।</div>
           <div class="p-2 bg-white rounded-xl shadow-inner">প্রসব পরবর্তী সময়ে রক্তশূন্যতা রোধে </div>
        </div>
      </div>

      <!-- ব্যায়াম ও বিশ্রাম -->
      <div class="box p-4 rounded-2xl shadow-lg bg-green-50 flex flex-col gap-3 w-[30%]">
        <h2 class="text-xl font-bold text-green-700">🙆🏻‍♀️ ব্যায়াম ও বিশ্রাম</h2>
        <div class="flex flex-col gap-2">
          <div class="p-2 bg-white rounded-xl shadow-inner">প্রতি দিন হালকা হাঁটাহাঁটি করুন।</div>
          <div class="p-2 bg-white rounded-xl shadow-inner">পর্যাপ্ত বিশ্রাম নিন।</div>
          <div class="p-2 bg-white rounded-xl shadow-inner">ঘুম কমপক্ষে ৭-৮ ঘণ্টা নিশ্চিত করুন।</div>
           <div class="p-2 bg-white rounded-xl shadow-inner">প্রসব পরবর্তী সময়ে অতিরিক্ত ব্যায়াম না করা ও পর্যাপ্ত ঘুম নিশ্চিত করা।</div>
        </div>
      </div>

      <!-- মানসিক সুস্থতা ও পরামর্শ -->
      <div class="box p-4 rounded-2xl shadow-lg bg-indigo-50 flex flex-col gap-3 w-[30%]">
        <h2 class="text-xl font-bold text-indigo-700">👩🏻‍⚕️ মানসিক সুস্থতা ও পরামর্শ</h2>
        <div class="flex flex-col gap-2">
          <div class="p-2 bg-white rounded-xl shadow-inner"> শ্বাস-প্রশ্বাস অনুশীলন করুন(প্রসব পূর্ব ও পরবর্তী)।</div>
          <div class="p-2 bg-white rounded-xl shadow-inner">পরিবার বা বন্ধুদের সাথে খোলাখুলিভাবে কথা বলুন(প্রসব পূর্ব ও পরবর্তী)।</div>
          <div class="p-2 bg-white rounded-xl shadow-inner">অতিরিক্ত চাপ এড়ান এবং শান্ত পরিবেশে থাকুন(প্রসব পূর্ব ও পরবর্তী)।</div>
        </div>
      </div>

    </div>
  `;
}


const seasonalLink = Array.from(links).find(a => a.dataset.section === 'seasonal');
seasonalLink.addEventListener('click', (e) => {
  e.preventDefault();
  renderSeasonal();
});

function renderSeasonal() {
  main.innerHTML = `
    <div class="seasonal-section flex flex-wrap gap-6 p-6 bg-white rounded-3xl shadow-2xl max-w-6xl mx-auto animate-fadein justify-center">

      <div class="box p-4 rounded-2xl shadow-lg bg-blue-50 flex flex-col gap-2 w-[45%]">
        <h2 class="text-xl font-bold text-blue-700">🌧️ বর্ষা (জুন-সেপ্টেম্বর)</h2>
        <div class="small-box">ডেঙ্গু প্রতিরোধ</div>
        <div class="small-box">জমে থাকা পানি পরীক্ষা করুন</div>
        <div class="small-box">মশারি ব্যবহার করুন</div>
      </div>

      <div class="box p-4 rounded-2xl shadow-lg bg-gray-100 flex flex-col gap-2 w-[45%]">
        <h2 class="text-xl font-bold text-gray-800">❄️ শীতকাল (ডিসেম্বর-ফেব্রুয়ারি)</h2>
        <div class="small-box">ঠান্ডা ও ফ্লু যত্ন</div>
        <div class="small-box">নিউমোনিয়ার বিপদ সংকেত</div>
      </div>

      <div class="box p-4 rounded-2xl shadow-lg bg-yellow-50 flex flex-col gap-2 w-[45%]">
        <h2 class="text-xl font-bold text-yellow-800">☀️ গ্রীষ্মকাল (মার্চ-মে)</h2>
        <div class="small-box">মুখে পানীয় দ্রবণ (Oral Rehydration Therapy)</div>
        <div class="small-box">পরিষ্কার পানি পান করুন</div>
        <div class="small-box">হিটস্ট্রোক প্রতিরোধ</div>
      </div>

      <div class="box p-4 rounded-2xl shadow-lg bg-green-50 flex flex-col gap-2 w-[45%]">
        <h2 class="text-xl font-bold text-green-700">📅 সারাবছর</h2>
        <div class="small-box">হাত ধোয়া</div>
        <div class="small-box">খাদ্য নিরাপত্তা</div>
      </div>

    </div>
  `;
}
function renderCommonIllness() {
  main.innerHTML = `
    <div class="common-illness-section flex flex-wrap justify-between gap-6 p-6 bg-white rounded-3xl shadow-2xl max-w-5xl mx-auto animate-fadein">
      
      <!-- শিশু -->
      <div class="box p-4 rounded-2xl shadow-lg bg-yellow-50 flex-1 min-w-[250px] hover:scale-105 transition-transform cursor-pointer illness-box">
        <h2 class="text-xl font-bold text-yellow-700">শিশু রোগ</h2>
        <ul class="mt-2 list-disc list-inside text-yellow-800 text-sm">
          <li>পোলিও – জ্বর হতে পারে</li>
          <li>সর্দি – নাক/গলা বন্ধ হতে পারে</li>
          <li>হাপানি – শ্বাস নিতে কষ্ট </li>
          <li>হাম – কানে ব্যথা বা কান ফুলে যেতে পারে</li>
        </ul>
      </div>
      
      <!-- মধ্যবয়স্ক -->
      <div class="box p-4 rounded-2xl shadow-lg bg-green-50 flex-1 min-w-[250px] hover:scale-105 transition-transform cursor-pointer illness-box">
        <h2 class="text-xl font-bold text-green-700">মধ্যবয়স্ক</h2>
        <ul class="mt-2 list-disc list-inside text-green-800 text-sm">
          <li>সাধারণ জ্বর:মাথাব্যথা</li>
          <li>বুকে ব্যথা : বুকে ভার অনুভূত হওয়া</li>
          <li>হালকা সর্দি,কাশি</li>
        </ul>
      </div>

      <!-- বৃদ্ধ -->
      <div class="box p-4 rounded-2xl shadow-lg bg-indigo-50 flex-1 min-w-[250px] hover:scale-105 transition-transform cursor-pointer illness-box">
        <h2 class="text-xl font-bold text-indigo-700">বৃদ্ধ</h2>
        <ul class="mt-2 list-disc list-inside text-indigo-800 text-sm">
          <li>সাধারণ জ্বর ও ক্লান্তি</li>
          <li>হৃদরোগ বা রক্তচাপ সমস্যা</li>
          <li>শ্বাসকষ্ট বা শারীরিক সমস্যা বাড়তে থাকা</li>
        </ul>
      </div>

    </div>
  `;

  // Optional: click effect to highlight selected box
  const boxes = document.querySelectorAll('.illness-box');
  boxes.forEach(box => {
    box.addEventListener('click', () => {
      boxes.forEach(b => b.classList.remove('ring-4', 'ring-indigo-400'));
      box.classList.add('ring-4', 'ring-indigo-400'); // Tailwind ring effect
    });
  });
}

renderInitial();
