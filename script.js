const dashBtn = document.getElementById('dashBtn');
const panel = document.getElementById('panel');
const chev = document.getElementById('chev');
const main = document.querySelector('main');
const links = document.querySelectorAll('#panel a');
// Initial render function
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

// Dashboard toggle
dashBtn.addEventListener('click', () => {
  panel.classList.toggle('open');
  chev.classList.toggle('rot');
});

document.addEventListener('click', (e) => {
  if (!dashBtn.contains(e.target) && !panel.contains(e.target)) {
    panel.classList.remove('open');
    chev.classList.remove('rot');
  }
});

// Section links
const homeLink = document.querySelector('a[data-section="home"]');
const mentalCheckLink = document.querySelector('a[data-section="checkup"]');
const pregnancyLink = document.querySelector('a[data-section="pregnancy"]');
const seasonalLink = document.querySelector('a[data-section="seasonal"]');
const illnessLink = document.querySelector('a[data-section="common-illness"]');

// Home
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

// Mental Health Check
mentalCheckLink.addEventListener('click', (e) => {
  e.preventDefault();
  renderMentalCheck();
});

// Pregnancy
pregnancyLink.addEventListener('click', (e) => {
  e.preventDefault();
  renderPregnancy();
});

// Seasonal
seasonalLink.addEventListener('click', (e) => {
  e.preventDefault();
  renderSeasonal();
});



// === Functions ===

// Mental Health Check
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
  document.getElementById('submitMood').addEventListener('click', () => {
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
      advices.push('কিছু ধর্মীয় বানী পড়ুন।');
      advices.push('প্রিয় কোনো জায়গায় ঘুরতে যান।');
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


function renderPregnancy() {
  main.innerHTML = `
    <div class="pregnancy-section flex flex-wrap gap-6 p-6 bg-white rounded-3xl shadow-2xl max-w-6xl mx-auto animate-fadein justify-center">
      <div class="box p-4 rounded-2xl shadow-lg bg-rose-50 flex flex-col gap-3 w-[30%]">
        <h2 class="text-xl font-bold text-rose-700">🍅 পুষ্টি ও খাদ্য</h2>
        <div class="flex flex-col gap-2">
          <div class="p-2 bg-white rounded-xl shadow-inner">প্রতি দিনে পর্যাপ্ত পানি পান করুন।</div>
          <div class="p-2 bg-white rounded-xl shadow-inner">শাকসবজি ও ফলের পরিমাণ বাড়ান।</div>
          <div class="p-2 bg-white rounded-xl shadow-inner">প্রোটিন ও ক্যালসিয়াম যুক্ত খাবার খান।</div>
        </div>
      </div>
      <div class="box p-4 rounded-2xl shadow-lg bg-green-50 flex flex-col gap-3 w-[30%]">
        <h2 class="text-xl font-bold text-green-700">🙆🏻‍♀️ ব্যায়াম ও বিশ্রাম</h2>
        <div class="flex flex-col gap-2">
          <div class="p-2 bg-white rounded-xl shadow-inner">প্রতি দিন হালকা হাঁটাহাঁটি করুন।</div>
          <div class="p-2 bg-white rounded-xl shadow-inner">পর্যাপ্ত বিশ্রাম নিন।</div>
          <div class="p-2 bg-white rounded-xl shadow-inner">ঘুম কমপক্ষে ৭-৮ ঘণ্টা নিশ্চিত করুন।</div>
        </div>
      </div>
      <div class="box p-4 rounded-2xl shadow-lg bg-indigo-50 flex flex-col gap-3 w-[30%]">
        <h2 class="text-xl font-bold text-indigo-700">👩🏻‍⚕️ মানসিক সুস্থতা ও পরামর্শ</h2>
        <div class="flex flex-col gap-2">
          <div class="p-2 bg-white rounded-xl shadow-inner">শ্বাস-প্রশ্বাস অনুশীলন করুন।</div>
          <div class="p-2 bg-white rounded-xl shadow-inner">পরিবার বা বন্ধুদের সাথে কথা বলুন।</div>
          <div class="p-2 bg-white rounded-xl shadow-inner">অতিরিক্ত চাপ এড়ান এবং শান্ত পরিবেশে থাকুন।</div>
        </div>
      </div>
    </div>
  `;
}


function renderSeasonal() {
  main.innerHTML = `
    <div class="seasonal-section flex flex-wrap gap-6 p-6 bg-white rounded-3xl shadow-2xl max-w-6xl mx-auto animate-fadein justify-center">
      <div class="box p-4 rounded-2xl shadow-lg bg-blue-50 flex flex-col gap-2 w-[45%]">
        <h2 class="text-xl font-bold text-blue-700">🌧️ বর্ষা (জুন-সেপ্টেম্বর)</h2>
        <div class="small-box">ডেঙ্গু প্রতিরোধে মশক নিধন স্প্রে ছেটানো</div>
        <div class="small-box">জমে থাকা পানি ফেলে দেওয়া</div>
        <div class="small-box">মশারি ব্যবহার করা</div>
      </div>
      <div class="box p-4 rounded-2xl shadow-lg bg-gray-100 flex flex-col gap-2 w-[45%]">
        <h2 class="text-xl font-bold text-gray-800">❄️ শীতকাল (ডিসেম্বর-ফেব্রুয়ারি)</h2>
       <div class="small-box">ঠান্ডা ও ফ্লু রোধে গরম কাপড় পরিধান</div>
        <div class="small-box">নিউমোনিয়া রোধে সতর্ক থাকা</div>
        <div class="small-box">পুষ্টি বৃদ্ধিতে শীতকালীন শাক-সবজি খাওয়া</div>
      </div>
      <div class="box p-4 rounded-2xl shadow-lg bg-yellow-50 flex flex-col gap-2 w-[45%]">
        <h2 class="text-xl font-bold text-yellow-800">☀️ গ্রীষ্মকাল (মার্চ-মে)</h2>
        <div class="small-box">মুখ মন্ডলে পানি দেওয়া</div>
        <div class="small-box">পরিষ্কার পানি পান করা</div>
        <div class="small-box">হিটস্ট্রোক প্রতিরোধে রোদে বা গরমে ছাতা ব্যাবহার করা</div>
        <div class="small-box">সম্ভব হলে রোদ এড়িয়ে চলা</div>
      </div>
      <div class="box p-4 rounded-2xl shadow-lg bg-green-50 flex flex-col gap-2 w-[45%]">
        <h2 class="text-xl font-bold text-green-700">📅 সারাবছর</h2>
        <div class="small-box">হাত ধোয়া নিশ্চিত করা</div>
        <div class="small-box">খাদ্য নিরাপত্তা নিশ্চিত করা</div>
      </div>
    </div>
  `;
}

// --- Common Illness ---
const CommonIllness = Array.from(links).find(a => a.dataset.section === 'common-illness');
illnessLink.addEventListener('click', (e) => {
  e.preventDefault();
  renderCommonIllness();
});
function renderCommonIllness() {
  main.innerHTML = `
    <div class="common-illness-section flex flex-wrap justify-between gap-6 p-6 bg-white rounded-3xl shadow-2xl max-w-5xl mx-auto animate-fadein">
      <!-- শিশু -->
      <div class="box p-4 rounded-2xl shadow-lg bg-yellow-50 flex-1 min-w-[250px] hover:scale-105 transition-transform cursor-pointer illness-box">
        <h2 class="text-xl font-bold text-yellow-700">শিশু রোগ</h2>
        <ul class="mt-2 list-disc list-inside text-yellow-800 text-sm">
          <li>পোলিও – জ্বর হতে পারে</li>
          <li>সর্দি – নাক/গলা বন্ধ হতে পারে</li>
          <li>হাপানি – শ্বাস নিতে কষ্ট</li>
          <li>হাম – কানে ব্যথা বা ফুলে যেতে পারে</li>
        </ul>
      </div>

      <!-- মধ্যবয়স্ক -->
      <div class="box p-4 rounded-2xl shadow-lg bg-green-50 flex-1 min-w-[250px] hover:scale-105 transition-transform cursor-pointer illness-box">
        <h2 class="text-xl font-bold text-green-700">মধ্যবয়স্ক</h2>
        <ul class="mt-2 list-disc list-inside text-green-800 text-sm">
          <li>সাধারণ জ্বর: মাথাব্যথা হতে পারে</li>
          <li>বুকে ভার অনুভূত হওয়া বা ব্যথা</li>
          <li>হালকা সর্দি ও কাশি</li>
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

  // Click effect for highlighting box
  const boxes = document.querySelectorAll('.illness-box');
  boxes.forEach(box => {
    box.addEventListener('click', () => {
      boxes.forEach(b => b.classList.remove('ring-4', 'ring-indigo-400'));
      box.classList.add('ring-4', 'ring-indigo-400');
    });
  });
}
// Social Health Section
const socialLink = Array.from(links).find(a => a.dataset.section === 'social');

if (socialLink) {
  socialLink.addEventListener('click', (e) => {
    e.preventDefault();
    renderSocialHealth();
  });
}

function renderSocialHealth() {
  main.innerHTML = `
    <div class="social-health-section flex justify-center w-full mt-6 animate-fadein">
      <div class="p-6 rounded-2xl shadow-xl bg-white/80 border border-white/30 w-full max-w-4xl">
        <h2 class="text-2xl font-bold text-indigo-700 text-center mb-4">সামাজিক স্বাস্থ্য পরিষেবা ইভেন্ট তালিকা</h2>
        <table class="w-full border border-indigo-200 rounded-lg text-center">
          <thead class="bg-indigo-100">
            <tr>
              <th class="border p-2">ইভেন্টের নাম</th>
              <th class="border p-2">তারিখ</th>
              <th class="border p-2">সময়</th>
              <th class="border p-2">স্থান</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border p-2">স্বাস্থ্য সচেতনতা ক্যাম্প</td>
              <td class="border p-2">১৫ নভেম্বর ২০২৫</td>
              <td class="border p-2">সকাল ১০টা</td>
              <td class="border p-2">কুমিল্লা শহর</td>
            </tr>
            <tr>
              <td class="border p-2">টিকা প্রদান অনুষ্ঠান</td>
              <td class="border p-2">২০ নভেম্বর ২০২৫</td>
              <td class="border p-2">দুপুর ১২টা</td>
              <td class="border p-2">মুরাদনগর উপজেলা</td>
            </tr>
            <tr>
              <td class="border p-2">নারী স্বাস্থ্য কর্মশালা</td>
              <td class="border p-2">২৫ নভেম্বর ২০২৫</td>
              <td class="border p-2">বিকাল ৪টা</td>
              <td class="border p-2">দাউদকান্দি</td>
            </tr>
            <tr>
              <td class="border p-2">রক্তদান কর্মসূচি</td>
              <td class="border p-2">৩০ নভেম্বর ২০২৫</td>
              <td class="border p-2">সকাল ৯টা</td>
              <td class="border p-2">ব্রাহ্মণপাড়া</td>
            </tr>
            <tr>
              <td class="border p-2">মানসিক স্বাস্থ্য সেমিনার</td>
              <td class="border p-2">৫ ডিসেম্বর ২০২৫</td>
              <td class="border p-2">সন্ধ্যা ৬টা</td>
              <td class="border p-2">কুমিল্লা বিশ্ববিদ্যালয়</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `;
}
const volunteerLink = Array.from(links).find(a => a.dataset.section === 'volunteer');
volunteerLink.addEventListener('click', (e) => {
  e.preventDefault();
  
  // Main content replace
  main.innerHTML = `
    <div class="volunteer-form p-6 bg-white rounded-3xl shadow-2xl max-w-4xl w-full animate-fadein mx-auto">
      <h2 class="text-2xl font-bold text-indigo-700 text-center mb-4">সেচ্ছাসেবক কর্মী ফর্ম</h2>
      <form id="volunteerForm" class="flex flex-col gap-4">
        <label for="name">নাম (বাংলায়):</label>
        <input type="text" id="name" name="name" placeholder="নাম লিখুন" required class="p-2 border rounded-md">

        <label for="village">গ্রাম/ইউনিয়ন:</label>
        <input type="text" id="village" name="village" placeholder="গ্রাম বা ইউনিয়নের নাম লিখুন" required class="p-2 border rounded-md">

        <label for="skills">দক্ষতা:</label>
        <select id="skills" name="skills" multiple required class="p-2 border rounded-md">
          <option value="mental_health">মানসিক স্বাস্থ্য সহায়তা</option>
          <option value="first_aid">প্রাথমিক চিকিৎসা</option>
          <option value="maternal_health">মাতৃস্বাস্থ্য</option>
          <option value="child_health">শিশুস্বাস্থ্য</option>
          <option value="chronic_disease">দীর্ঘমেয়াদি রোগ (ডায়াবেটিস/রক্তচাপ)</option>
        </select>

        <label for="phone">ফোন নম্বর:</label>
        <input type="tel" id="phone" name="phone" placeholder="ফোন নম্বর লিখুন" required class="p-2 border rounded-md">

        <label for="whatsapp">হোয়াটসঅ্যাপ আছে কি?</label>
        <select id="whatsapp" name="whatsapp" required class="p-2 border rounded-md">
          <option value="yes">হ্যাঁ</option>
          <option value="no">না</option>
        </select>

        <label for="hours">কোন সময় যোগাযোগ করা যাবে:</label>
        <input type="text" id="hours" name="hours" placeholder="যেমন: সকাল ৯টা - বিকেল ৫টা" class="p-2 border rounded-md">

        <label for="verification">প্রশিক্ষণ/যাচাই:</label>
        <input type="text" id="verification" name="verification" placeholder="যেমন: [এনজিও নাম] দ্বারা প্রশিক্ষিত" required class="p-2 border rounded-md">

        <p><em>⭐ এটি কোনো রেটিং বা রিভিউ নয় — শুধুমাত্র যাচাইকৃত ও সহজলভ্য সহায়তা।</em></p>

        <button type="submit" class="mt-2 px-4 py-2 bg-indigo-700 text-white rounded-xl hover:bg-indigo-600 transition">জমা দিন</button>
      </form>
    </div>
  `;

  // Form submission handle (demo)
  const volunteerForm = document.getElementById('volunteerForm');
  volunteerForm.addEventListener('submit', (event) => {
    event.preventDefault();
    alert('ফর্ম জমা হয়েছে! ধন্যবাদ।');
    volunteerForm.reset();
  });
});
// Digital Health Assistant
const digitalLink = document.querySelector('a[data-section="digital"]');

digitalLink.addEventListener('click', (e) => {
  e.preventDefault();
  renderDigitalAssistant();
});

function renderDigitalAssistant() {
  main.innerHTML = `
    <div class="digital-section flex flex-col gap-4 p-6 bg-white rounded-3xl shadow-2xl max-w-3xl mx-auto animate-fadein">
      <h2 class="text-2xl font-bold text-indigo-700 text-center">আপনার মনের কথা লিখুন বা বলুন</h2>
      <div class="flex items-center gap-2">
        <input id="digitalInput" type="text" placeholder="এখানে লিখুন..." class="flex-1 p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300">
        <button id="voiceBtn" class="p-2 bg-indigo-100 rounded-xl hover:bg-indigo-200 transition">
          🎤
        </button>
      </div>
      <button id="submitDigital" class="mt-2 px-4 py-2 bg-indigo-700 text-white rounded-xl hover:bg-indigo-600 transition">Submit</button>
      <div id="digitalMessage" class="mt-2 text-sm text-indigo-800"></div>
    </div>
  `;

  const inputField = document.getElementById('digitalInput');
  const voiceBtn = document.getElementById('voiceBtn');
  const submitBtn = document.getElementById('submitDigital');
  const messageBox = document.getElementById('digitalMessage');

  // Voice button click (demo)
  voiceBtn.addEventListener('click', () => {
    alert("এখানে পরে voice capture যোগ করা যাবে। 🎤");
  });

  // Submit button
  submitBtn.addEventListener('click', () => {
    const text = inputField.value.trim();
    if(text === "") {
      messageBox.textContent = "দয়া করে কিছু লিখুন বা বলুন।";
      return;
    }
    
    // Offline store
    let savedMessages = JSON.parse(localStorage.getItem('digitalMessages') || '[]');
    savedMessages.push(text);
    localStorage.setItem('digitalMessages', JSON.stringify(savedMessages));

    // Online simulation (demo)
    messageBox.textContent = "আপনার বার্তা পাঠানো হয়েছে। মনোবিজ্ঞানী (online) এটি দেখবেন।";
    
    // Clear input
    inputField.value = "";
  });
}

// Emergency / জরুরি সেবা
const emergencyLink = Array.from(links).find(a => a.dataset.section === 'emergency');
if(emergencyLink){
 emergencyLink.addEventListener('click', (e) => {
  e.preventDefault();
  
  
  const emergencyFooter = document.getElementById('emergencyFooter');
  emergencyFooter.classList.remove('hidden');


  main.innerHTML = `
    <div class="flex flex-col items-center justify-center gap-4 p-6 bg-white rounded-3xl shadow-2xl max-w-3xl mx-auto animate-fadein mt-6">
      <h2 class="text-xl font-bold text-red-600">জরুরি সেবা চালু</h2>
      <p class="text-indigo-700 text-center">নিচের নম্বরে কল করুন এবং সরাসরি মনোবিজ্ঞানী বা ডাক্তার এর সাথে সংযোগ করুন।</p>
      <a href="tel:+880123456789" class="mt-2 px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition">কল করুন</a>
    </div>
  `;
});
}

// Initial render
renderInitial();
