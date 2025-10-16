const USER = {
  fullName: 'Ayomipo Soyinka',
  initials: 'AS',
  role: 'Software Engineer',
  location: 'Lagos, Nigeria',
  email: 'ayomiposoyinka@gmail.com',
  website: 'https://my-portfolio-2-0-rho.vercel.app/',
  github: 'https://github.com/AY-CODED',
  linkedin: 'https://www.linkedin.com/in/ayomipo-soyinka-208156335/',
  bio: 'Software engineer focused on building delightful web experiences and robust tools. I work on personal projects and freelance gigs — currently building a local-language learning app and other web apps.',
  skills: ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'C Programming', 'React', 'Tailwind', 'React Native'],
  hobbies: ['🎮 Gaming', '🎧 Music', '💻 Coding Projects', '🏀 Basketball'],
  interests: ['💡 AI', '🎨 UI/UX', '🌍 Open Source', '📚 Education Tech'],
  dislikes: ['🐞 Bugs', '⏰ Procrastination', '📶 Slow Wi-Fi', 'Messy code']
};

// Fill DOM
document.querySelector('[data-testid="full-name"]').textContent = USER.fullName;
document.querySelector('[data-testid="role"]').textContent = USER.role;
document.querySelector('[data-testid="location"]').textContent = USER.location;
document.querySelector('[data-testid="bio"]').textContent = USER.bio;

// Avatar fallback
const avatar = document.querySelector('[data-testid="avatar"] img');
avatar.onerror = () => {
  avatar.remove();
  const initials = document.createElement('div');
  initials.textContent = USER.initials;
  initials.style.fontSize = '36px';
  initials.style.fontWeight = '700';
  document.querySelector('[data-testid="avatar"]').appendChild(initials);
};

// Skills
const badges = document.querySelector('[data-testid="skills"]');
badges.innerHTML = '';
USER.skills.forEach(skill => {
  const span = document.createElement('span');
  span.className = 'badge';
  span.textContent = skill;
  badges.appendChild(span);
});

// Lists
function fillList(selector, items) {
  const list = document.querySelector(selector);
  list.innerHTML = '';
  items.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    list.appendChild(li);
  });
}
fillList('[data-testid="hobbies"]', USER.hobbies);
fillList('[data-testid="interests"]', USER.interests);
fillList('[data-testid="dislikes"]', USER.dislikes);

// Buttons
document.getElementById('contactBtn').addEventListener('click', () => {
  window.location.href = `mailto:${USER.email}?subject=Hi ${USER.fullName}`;
});
document.getElementById('copyBtn').addEventListener('click', async (e) => {
  await navigator.clipboard.writeText(USER.email);
  const btn = e.currentTarget;
  const original = btn.textContent;
  btn.textContent = 'Copied!';
  setTimeout(() => (btn.textContent = original), 1500);
});
document.getElementById('downloadBtn').addEventListener('click', () => {
  const vcard = `BEGIN:VCARD\nVERSION:3.0\nFN:${USER.fullName}\nEMAIL:${USER.email}\nURL:${USER.website}\nTITLE:${USER.role}\nEND:VCARD`;
  const blob = new Blob([vcard], { type: 'text/vcard' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${USER.fullName.replace(/\s+/g, '_')}.vcf`;
  a.click();
  URL.revokeObjectURL(url);
});

// Timestamp counter
const timestampEl = document.querySelector('[data-testid="timestamp"]');
const startTime = Date.now();

function updateTimestamp() {
  const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
  timestampEl.textContent = `Timestamp: ${elapsedSeconds}s`;
  requestAnimationFrame(updateTimestamp);
}
updateTimestamp();
