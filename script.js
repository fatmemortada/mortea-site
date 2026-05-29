const categories = [
  'Beauty salons',
  'Hair stylists',
  'Hair color specialists',
  'Barbers',
  'Makeup artists',
  'Bridal beauty',
  'Estheticians',
  'Facial specialists',
  'Hydrafacial specialists',
  'Japanese head spa',
  'Nail technicians',
  'Lash technicians',
  'Brow artists',
  'Brow lamination',
  'Waxing specialists',
  'Massage therapists',
  'Wellness clinics',
  'Holistic practitioners',
  'Botox clinics',
  'Laser clinics',
  'Medical aesthetics clinics',
  'Cosmetic injectors',
  'Med spas',
  'PRP specialists',
  'Microneedling specialists',
  'Skin rejuvenation clinics',
  'Body contouring clinics',
  'Hair restoration clinics',
  'Permanent makeup artists',
  'Cosmetic tattoo artists',
  'Teeth whitening specialists',
  'Beauty bloggers',
  'Beauty influencers',
  'Beauty educators'
];

const categoriesFr = [
  'Salons de beauté',
  'Coiffeurs / stylistes capillaires',
  'Coloristes',
  'Barbiers',
  'Maquilleurs',
  'Beauté nuptiale',
  'Esthéticiennes',
  'Spécialistes des soins du visage',
  'Spécialistes Hydrafacial',
  'Head spa japonais',
  'Techniciennes d’ongles',
  'Techniciennes de cils',
  'Spécialistes des sourcils',
  'Brow lamination',
  'Spécialistes de l’épilation',
  'Massothérapeutes',
  'Cliniques bien-être',
  'Praticiens holistiques',
  'Cliniques Botox',
  'Cliniques laser',
  'Cliniques de médecine esthétique',
  'Injecteurs cosmétiques',
  'Med spas',
  'Spécialistes PRP',
  'Spécialistes microneedling',
  'Cliniques de rajeunissement de la peau',
  'Cliniques de remodelage corporel',
  'Cliniques de restauration capillaire',
  'Artistes maquillage permanent',
  'Tatoueurs cosmétiques',
  'Spécialistes blanchiment dentaire',
  'Blogueurs beauté',
  'Influenceurs beauté',
  'Éducateurs beauté'
];

function renderTags(id, list){
  const el = document.getElementById(id);
  if (!el) return;
  el.innerHTML = list.map(c => `<span class="tag">${c}</span>`).join('');
}

renderTags('category-tags', categories);
renderTags('category-tags-fr', categoriesFr);
