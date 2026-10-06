const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'src', 'app', '(marketing)');
const templateStr = fs.readFileSync(path.join(__dirname, 'template.txt'), 'utf8');

const contentMap = {
  'careers/page.tsx': {
    idTitle: "Karier di NOVERA", enTitle: "Careers at NOVERA",
    idDesc: "Bergabunglah dengan tim engineers dan arsitek kelas dunia. Kami memecahkan masalah tersulit dalam perangkat lunak enterprise.",
    enDesc: "Join a team of world-class engineers and architects. We solve the hardest problems in enterprise software."
  },
  'contact/page.tsx': {
    idTitle: "Hubungi Kami", enTitle: "Contact Us",
    idDesc: "Untuk pertanyaan umum, kemitraan, atau dukungan pers. Jika Anda ingin memulai proyek, silakan gunakan form Start a Project kami.",
    enDesc: "For general inquiries, partnerships, or press support. If you are looking to start a project, please use our Start a Project form."
  },
  'process/page.tsx': {
    idTitle: "Metodologi Kami", enTitle: "Our Methodology",
    idDesc: "Proses rekayasa yang disiplin dan terstruktur untuk menjamin keandalan, skalabilitas, dan pengiriman tepat waktu pada sistem mission-critical.",
    enDesc: "A disciplined, structured engineering process to guarantee reliability, scalability, and on-time delivery for mission-critical systems."
  },
  'privacy/page.tsx': {
    idTitle: "Kebijakan Privasi", enTitle: "Privacy Policy",
    idDesc: "Transparansi dan komitmen kami terhadap perlindungan data, kepatuhan SOC 2, dan privasi pengguna tingkat enterprise.",
    enDesc: "Our transparency and commitment to data protection, SOC 2 compliance, and enterprise-grade user privacy."
  },
  'terms/page.tsx': {
    idTitle: "Syarat & Ketentuan", enTitle: "Terms & Conditions",
    idDesc: "Perjanjian layanan legal untuk memastikan hubungan kerja yang aman dan profesional dengan NOVERA.",
    enDesc: "Legal service agreements to ensure a secure and professional working relationship with NOVERA."
  },
  'portfolio/project/page.tsx': {
    idTitle: "Studi Kasus Enterprise", enTitle: "Enterprise Case Study",
    idDesc: "Bagaimana kami merekayasa ulang arsitektur monolitik yang usang menjadi infrastruktur microservices berbasis cloud dengan nol downtime.",
    enDesc: "How we re-engineered a legacy monolithic architecture into a cloud-native microservices infrastructure with zero downtime."
  }
};

Object.keys(contentMap).forEach(route => {
  const filePath = path.join(baseDir, route);
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  const data = contentMap[route];
  let content = templateStr;
  
  const conceptStr = route.includes('/project') ? '<div className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest rounded-full mb-6">NOVERA Concept Project</div>' : '';
  
  content = content.replace('__CONCEPT__', conceptStr);
  content = content.replace('__ID_TITLE__', data.idTitle);
  content = content.replace('__EN_TITLE__', data.enTitle);
  content = content.replace('__ID_DESC__', data.idDesc);
  content = content.replace('__EN_DESC__', data.enDesc);
  
  fs.writeFileSync(filePath, content);
  console.log("Updated " + route);
});
