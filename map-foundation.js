let allProviders = [];

function providerCard(provider) {
  return `
    <article class="map-provider-card">
      <div class="map-provider-thumb"></div>
      <div>
        <div class="map-provider-topline">${provider.category || "Beauty Professional"}</div>
        <h3>${provider.business_name || "Professional"}</h3>
        <p>${provider.city || ""}, ${provider.country || ""}</p>
      </div>
    </article>`;
}

function renderProviders(list){
 const results=document.getElementById("mapResults");
 const count=document.getElementById("resultCount");
 if(!results) return;
 results.innerHTML=list.map(providerCard).join("");
 if(count) count.textContent=`${list.length} providers found`;
}

async function loadProviders(){
 const {data,error}=await supabaseClient.from("professionals").select("*");
 if(error){ console.error(error); return; }
 allProviders=data||[];
 renderProviders(allProviders);
}

document.addEventListener("DOMContentLoaded", async ()=>{
 await loadProviders();
});
