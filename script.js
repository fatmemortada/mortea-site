const categories = [
  'Beauty salons','Estheticians','Lash technicians','Nail technicians','Facial specialists','Japanese head spa','Eyebrow artists','Massage therapists','Makeup artists','Hair stylists','Hair colorists','Brow lamination','Waxing specialists','Laser technicians','Skincare clinics','Beauty bloggers','Wellness spas','Bridal beauty','Barbers','Permanent makeup artists','Body sculpting','Spray tan artists'
];
function renderTags(id){const el=document.getElementById(id); if(!el)return; el.innerHTML=categories.map(c=>`<span class="tag">${c}</span>`).join('');}
renderTags('category-tags');renderTags('category-tags-fr');
