// Dynamic SEO tags
function updateSEO(title, description){
 document.title = title;
 const meta = document.querySelector('meta[name="description"]');
 if(meta){ meta.setAttribute('content', description); }
}
