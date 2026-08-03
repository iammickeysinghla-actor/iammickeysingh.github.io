export const heroImg = 'https://static.wixstatic.com/media/3ac143_93c70562e358407696de2242af984657~mv2.jpg';
export const aboutImg = 'https://static.wixstatic.com/media/3ac143_06976ca24bea44db87db4df57976dbf1~mv2.jpg';
export const reelVideoId = 'C5Vdfuk2wPc';
export const resumeUrl = 'https://drive.google.com/uc?export=download&id=1af__ecdSe5PrW_DdzWa9vH0DVc-UZLZJ';
export const channelUrl = 'https://www.youtube.com/@iammickeysingh';
export const contactEmail = 'iammickeysingh.la@gmail.com';

export interface Film {
  id: string;
  title: string;
  role: string;
  alt: string;
  isNew?: boolean;
}

export const films: Film[] = [
  { id: 'RWHZ_zaT5EU', title: 'wait, no.', role: 'Writer · Director · Producer', alt: 'wait, no.', isNew: true },
  { id: '9zgOYS0U0u4', title: 'East of Silence', role: 'Writer · Director · Producer', alt: 'East of Silence' },
  { id: 'm7EDG0mnXZQ', title: 'The Blender Situation', role: 'Writer · Director · Producer', alt: 'The Blender Situation' },
  { id: 'GIkJUjCeVUo', title: 'The Anatomy of Assembly', role: 'Writer · Director · Producer', alt: 'The Anatomy of Assembly' },
];

export const comingSoon = {
  eyebrow: "Sunset III · Next",
  title: 'In Another Life, Tonight',
  meta: 'Short Film  ·  In Post-Production  ·  Summer 2026',
};

export interface Credit {
  title: string;
  sub: string;
  role: string;
}

export const filmCredits: Credit[] = [
  { title: 'In Another Life, Tonight', sub: 'Sunset III · Dir. Tony Tachney', role: 'Lead' },
  { title: 'Between Places', sub: 'Cinema 3.0 · Dir. Amir Jaffar', role: 'Lead' },
  { title: "We Can't Lose You", sub: 'Dir. Matt Winters', role: 'Lead' },
  { title: 'CODE', sub: 'Dir. Francisco Rosas', role: 'Lead' },
  { title: 'The Box', sub: 'Dir. Elizabeth Vasquez', role: 'Lead' },
  { title: 'Kismet', sub: 'Dir. Vigneshwar', role: 'Lead' },
  { title: 'SHE', sub: 'Dir. Shady Malak', role: 'Lead' },
  { title: 'The Game', sub: 'Dir. Sebastian Berenguer', role: 'Lead' },
  { title: 'Break-in-g Bulletin', sub: 'Dir. Natalia Espinoza Noriega', role: 'Lead' },
  { title: 'Feed Me', sub: 'Dir. Ushmey Chakraborty', role: 'Lead' },
  { title: 'The Things You Own', sub: 'Dir. Lucas Souza', role: 'Lead' },
  { title: 'I Call It a Skragg', sub: 'Dir. Lauren Morales', role: 'Supporting' },
  { title: 'The Kohinoor', sub: 'Dir. Sirtaj Bhangu', role: 'Supporting' },
  { title: 'A New Gardner', sub: 'Dir. Matt Stivender', role: 'Supporting' },
];

export const tvCredits: Credit[] = [
  { title: 'Strings Attached — Season 2', sub: 'Cinema 3.0', role: 'Recurring' },
  { title: 'Kissing Cousins', sub: 'Cpics', role: 'Series Regular' },
];

export const theaterCredits: Credit[] = [
  { title: "Twilight of the Gold's", sub: 'Dir. JP Vinals', role: 'Lead' },
  { title: 'A Kid Like Jake', sub: 'Dir. Jim Jarrett', role: 'Lead' },
  { title: 'Christmas World', sub: 'Dir. Brandon Slezak', role: 'Lead' },
];

export const stats = [
  { n: '15+', l: 'Film Credits' },
  { n: '3', l: 'Languages' },
  { n: '6+', l: 'Years Training' },
  { n: '2', l: 'TV Credits' },
];

export const galleryImages: { src: string; objectPosition?: string }[] = [
  { src: 'https://static.wixstatic.com/media/3ac143_06976ca24bea44db87db4df57976dbf1~mv2.jpg' },
  { src: 'https://static.wixstatic.com/media/3ac143_090535fdb9104392b2edc44477caf9e6~mv2.jpg' },
  { src: 'https://static.wixstatic.com/media/3ac143_cbe6fe5a2d95488bb3270a213a2ab286~mv2.jpg' },
  { src: 'https://static.wixstatic.com/media/3ac143_c2a2b83c413e42269e0e97fb164cfc8e~mv2.jpg' },
  { src: 'https://static.wixstatic.com/media/3ac143_9c8259fbcee042d799418743710b230e~mv2.jpg' },
  { src: 'https://static.wixstatic.com/media/3ac143_bb5aada6198644ad8d2519d62cd8b80a~mv2.jpg', objectPosition: '30% top' },
  { src: 'https://static.wixstatic.com/media/12dbc3_d7583fbfa94d4ca4ab52dff6c3444655~mv2.jpg' },
  { src: 'https://static.wixstatic.com/media/3ac143_e16170111afb426db2257e3013d71278~mv2.jpg' },
  { src: 'https://static.wixstatic.com/media/3ac143_6640a54172b846b0a8db803f026c99ff~mv2.jpg' },
  { src: 'https://static.wixstatic.com/media/3ac143_93c70562e358407696de2242af984657~mv2.jpg' },
  { src: 'https://static.wixstatic.com/media/3ac143_0cbbec74ca434ee3ab52b588cd0ad631~mv2.jpg' },
  { src: 'https://static.wixstatic.com/media/3ac143_21282b33dd034e25aa7fbd5f820a7574~mv2.jpg' },
  { src: 'https://static.wixstatic.com/media/3ac143_398d379c1e61463c9aeb32402ccc400d~mv2.jpg' },
];

export interface Training {
  school: string;
  course: string;
  year: string;
}

export const training: Training[] = [
  { school: 'The Acting Center, Los Angeles', course: 'Scene Study (Ongoing) · Audition Intensive', year: '2026' },
  { school: 'PEM Acting School, Los Angeles', course: 'Intensives 1, 2 & 3', year: '2025' },
  { school: 'T. Schreiber Studio, New York', course: 'Shakespeare', year: '2024' },
  { school: 'Juilliard Extension, New York', course: 'From Page to Stage · Scene Study', year: '2023' },
  { school: 'Wallace Acting Studio, Los Angeles', course: 'Audition Training', year: '2020–21' },
  { school: 'Meisner Technique Studio, San Francisco', course: 'Meisner Technique — 2 Years', year: '2018–20' },
];

export const socials = [
  { label: 'Instagram', href: 'https://www.instagram.com/its.mickeysingh/' },
  { label: 'IMDb', href: 'https://www.imdb.com/name/nm12288923/' },
  { label: 'Actors Access', href: 'https://resumes.actorsaccess.com/mickey-singh' },
  { label: 'Resume ↗', href: resumeUrl },
];
