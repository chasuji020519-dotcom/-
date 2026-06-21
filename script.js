
/* =========================
   SITE TEXT
========================= */
const SITE_TEXT={
  logo:"Portfolio",
  heroLeft:["감각을","가치를","경험을","생각을","감각을"],
  heroCenter:"담은",
  heroRight:["디자인","퀄리티","임팩트","디테일","디자인"],
  subtitle:"작은 브랜드라도 온라인에서는 단단하게 보여야 하니까요.",

  marqueeImages:[
    "https://i.pinimg.com/736x/19/bb/3b/19bb3beae640b3cce669de47c1169ab7.jpg",
    "https://i.pinimg.com/736x/43/cb/59/43cb5931f4cc90e88202d34df8614261.jpg",
    "https://i.pinimg.com/736x/8d/62/e9/8d62e9284a322bfcdd273cf361a324d4.jpg",
    "https://i.pinimg.com/736x/39/eb/61/39eb6170a2508af0bb7cccc7a28977e5.jpg",
    "https://i.pinimg.com/736x/65/14/68/651468f340d841d9a7053d5afef7e5a7.jpg"
  ],

  profileImage:"https://i.pinimg.com/736x/ff/0d/2a/ff0d2a921264637b1268a56fae27867c.jpg",
  profileName:"CHA SUJI _ 차수지",
  profileInfo:"01080195019<br>suji020519@kakao.com",

  aboutTitle:"ABOUT",
  aboutDesc:"감각적인 비주얼과 섬세한 디테일을 바탕으로 브랜드의 분위기를 정리하고,<br>보는 사람이 오래 기억할 수 있는 디자인을 만듭니다.",

  keywords:[
    "불꽃같은 열정으로 꽃피우는",
    "디자이너 차수지입니다.",
    "Detail",
    "Layout",
    "Portfolio"
  ],

  cards:[
    {
      num:"01",
      title:"Brand Design",
      desc:"브랜드의 방향성과 분위기를 시각적으로 정리하는 작업입니다."
    },
    {
      num:"02",
      title:"Graphic Design",
      desc:"포스터, 콘텐츠, 편집 디자인 등 인상적인 비주얼을 만듭니다."
    },
    {
      num:"03",
      title:"UI Concept",
      desc:"웹과 모바일 화면에서 보기 좋은 구조와 흐름을 설계합니다."
    }
  ],

  categoryTitle:"CATEGORY",
  categoryDesc:"작업 유형별로 포트폴리오를 볼 수 있도록 정리했습니다.",
  categorySmall:"SELECT YOUR PROJECT"
};

function renderSiteText(){
  document.getElementById("logoText").innerText=SITE_TEXT.logo;
  document.getElementById("centerWord").innerText=SITE_TEXT.heroCenter;
  document.getElementById("mainSubtitle").innerText=SITE_TEXT.subtitle;

  document.getElementById("leftWords").innerHTML=
    SITE_TEXT.heroLeft.map(word=>`<div class="word">${word}</div>`).join("");

  document.getElementById("rightWords").innerHTML=
    SITE_TEXT.heroRight.map(word=>`<div class="word">${word}</div>`).join("");

  const marqueeImages=[...SITE_TEXT.marqueeImages,...SITE_TEXT.marqueeImages];

  document.getElementById("marqueeTrack").innerHTML=
    marqueeImages.map(src=>`
      <div class="project">
        <img src="${src}" alt="portfolio image">
      </div>
    `).join("");

  document.getElementById("profileImage").src=SITE_TEXT.profileImage;
  document.getElementById("profileName").innerText=SITE_TEXT.profileName;
  document.getElementById("profileInfo").innerHTML=SITE_TEXT.profileInfo;

  document.getElementById("aboutTitle").innerText=SITE_TEXT.aboutTitle;
  document.getElementById("aboutDesc").innerHTML=SITE_TEXT.aboutDesc;

  document.getElementById("keywordRow").innerHTML=
    SITE_TEXT.keywords.map(keyword=>`<span class="keyword">${keyword}</span>`).join("");

  document.getElementById("aboutCards").innerHTML=
    SITE_TEXT.cards.map(card=>`
      <div class="card">
        <span>${card.num}</span>
        <h3>${card.title}</h3>
        <p>${card.desc}</p>
      </div>
    `).join("");

  document.getElementById("categoryTitle").innerText=SITE_TEXT.categoryTitle;
  document.getElementById("categoryDesc").innerText=SITE_TEXT.categoryDesc;
  document.getElementById("categorySmall").innerText=SITE_TEXT.categorySmall;
}

renderSiteText();

/* =========================
   DARK MODE
========================= */
const darkToggle=document.getElementById("darkToggle");

/* 저장된 테마 불러오기 */
const savedTheme=localStorage.getItem("portfolioTheme");

if(savedTheme==="dark"){
  document.body.classList.add("dark-mode");
}

function updateDarkIcon(){
  if(!darkToggle) return;

  if(document.body.classList.contains("dark-mode")){
    darkToggle.innerText="☀";
    darkToggle.setAttribute("aria-label","light mode");
  }else{
    darkToggle.innerText="☾";
    darkToggle.setAttribute("aria-label","dark mode");
  }
}

updateDarkIcon();

darkToggle?.addEventListener("click",()=>{
  document.body.classList.toggle("dark-mode");

  const isDark=document.body.classList.contains("dark-mode");
  localStorage.setItem("portfolioTheme",isDark ? "dark" : "light");

  updateDarkIcon();

  setTimeout(()=>{
    moveGlassIndicator(getActiveCategoryButton());
  },60);
});

/* =========================
   SUPABASE
========================= */
const SUPABASE_URL="https://cwnfcrokfkhmguvsqcgs.supabase.co";
const SUPABASE_KEY="sb_publishable_nlc6fsuk7kscuECiLoZImg_P_-Psp_S";
const client=supabase.createClient(SUPABASE_URL,SUPABASE_KEY);

/* =========================
   ELEMENTS
========================= */
const categoryPanel=document.querySelector(".category-panel");
const buttons=document.querySelectorAll(".category-btn");
const groups=document.querySelectorAll(".product-group");
const productList=document.querySelector(".product-list");
const backZone=document.querySelector(".back-home-zone");
const categoryBackBtn=document.querySelector(".category-back-btn");
const categoryAddBtn=document.querySelector(".category-add-btn");
const scrollArea=document.querySelector(".scroll-area");

const glassTabs=document.querySelector(".glass-tabs");
const glassIndicator=document.querySelector(".glass-indicator");

const detailOverlay=document.querySelector(".detail-overlay");
const detailPanel=document.querySelector(".detail-panel");
const detailClose=document.querySelector(".detail-close");
const detailImg=document.getElementById("detailImg");
const detailTitle=document.getElementById("detailTitle");
const detailDesc=document.getElementById("detailDesc");
const detailType=document.getElementById("detailType");
const detailRole=document.getElementById("detailRole");
const detailYear=document.getElementById("detailYear");
const detailStory=document.getElementById("detailStory");
const detailGallery=document.getElementById("detailGallery");
const detailMedia=document.getElementById("detailMedia");
const detailLinks=document.getElementById("detailLinks");
const detailEditBtn=document.querySelector(".detail-edit-btn");

const adminOverlay=document.querySelector(".admin-overlay");
const adminPanel=document.querySelector(".admin-panel");
const adminClose=document.querySelector(".admin-close");
const adminTitle=document.getElementById("adminTitle");
const adminStatus=document.getElementById("adminStatus");

const editId=document.getElementById("editId");
const projectTitle=document.getElementById("projectTitle");
const projectCategory=document.getElementById("projectCategory");
const projectShortDesc=document.getElementById("projectShortDesc");
const projectContent=document.getElementById("projectContent");
const projectRole=document.getElementById("projectRole");
const projectYear=document.getElementById("projectYear");
const projectImage=document.getElementById("projectImage");
const projectDetailImages=document.getElementById("projectDetailImages");
const projectVideoFile=document.getElementById("projectVideoFile");
const projectVideoUrl=document.getElementById("projectVideoUrl");
const projectPdfUrl=document.getElementById("projectPdfUrl");
const detailPreviewList=document.getElementById("detailPreviewList");

/* =========================
   STATE
========================= */
let allProjects=[];
let currentProject=null;
let detailItems=[];
let draggedIndex=null;

/* =========================
   GLASS TAB INDICATOR
========================= */
function getActiveCategoryButton(){
  return document.querySelector(".category-btn.active") || buttons[0];
}

function moveGlassIndicator(target){
  if(!glassTabs || !glassIndicator || !target) return;

  const tabsRect=glassTabs.getBoundingClientRect();
  const btnRect=target.getBoundingClientRect();

  const offset=document.body.classList.contains("tabs-compact") ? 6 : 9;
  const left=btnRect.left-tabsRect.left;
  const width=btnRect.width;

  glassIndicator.style.transform=`translateX(${left-offset}px)`;
  glassIndicator.style.width=`${width}px`;
}

function updateCategoryCompactMode(){
  if(!document.body.classList.contains("category-mode")){
    document.body.classList.remove("tabs-compact");
    return;
  }

  if(scrollArea.scrollTop>90){
    document.body.classList.add("tabs-compact");
  }else{
    document.body.classList.remove("tabs-compact");
  }

  moveGlassIndicator(getActiveCategoryButton());
}

window.addEventListener("load",()=>{
  moveGlassIndicator(getActiveCategoryButton());
});

window.addEventListener("resize",()=>{
  moveGlassIndicator(getActiveCategoryButton());
});

scrollArea.addEventListener("scroll",updateCategoryCompactMode);

buttons.forEach(button=>{
  button.addEventListener("pointerenter",()=>moveGlassIndicator(button));
  button.addEventListener("pointermove",()=>moveGlassIndicator(button));
});

glassTabs.addEventListener("pointerleave",()=>{
  moveGlassIndicator(getActiveCategoryButton());
});

glassTabs.addEventListener("scroll",()=>{
  moveGlassIndicator(getActiveCategoryButton());
});

/* =========================
   CATEGORY
========================= */
function resetCategoryView(){
  buttons.forEach(button=>button.classList.remove("active"));
  groups.forEach(group=>group.classList.remove("active"));
  productList.classList.remove("all-active");
}

function openCategory(tabButton){
  const target=tabButton.dataset.tab;

  document.body.classList.add("category-mode");
  document.body.classList.remove("tabs-compact");

  categoryPanel.classList.add("opened");
  scrollArea.scrollTo({top:0,behavior:"smooth"});

  resetCategoryView();

  tabButton.classList.add("active");
  moveGlassIndicator(tabButton);

  if(target==="all"){
    productList.classList.add("all-active");
    groups.forEach(group=>group.classList.add("active"));
  }else{
    const selected=document.querySelector(`[data-category="${target}"]`);
    if(selected) selected.classList.add("active");
  }

  setTimeout(()=>{
    moveGlassIndicator(tabButton);
    updateCategoryCompactMode();
  },120);
}

buttons.forEach(button=>{
  button.addEventListener("click",()=>openCategory(button));
});

categoryBackBtn.addEventListener("click",()=>{
  document.body.classList.remove("category-mode");
  document.body.classList.remove("tabs-compact");

  categoryPanel.classList.remove("opened");

  resetCategoryView();
  buttons[0].classList.add("active");

  window.scrollTo({top:0,behavior:"smooth"});

  setTimeout(()=>{
    moveGlassIndicator(buttons[0]);
  },400);
});

window.addEventListener("scroll",()=>{
  backZone.classList.toggle("active",window.scrollY>300);
});

backZone.addEventListener("click",()=>{
  window.scrollTo({top:0,behavior:"smooth"});
});

/* =========================
   DETAIL MODAL
========================= */
function closeDetail(){
  detailOverlay.classList.remove("show","full");
  detailPanel.scrollTop=0;
}

function openDetail(project){
  currentProject=project;

  detailImg.src=project.image_url || "";
  detailTitle.innerText=project.title || "Untitled";
  detailDesc.innerText=project.short_desc || "";
  detailType.innerText=project.category || "";
  detailRole.innerText=project.role || "Design / Visual";
  detailYear.innerText=project.project_year || "2026";
  detailStory.innerText=project.content || "상세 설명이 아직 없습니다.";

  detailGallery.innerHTML="";
  detailMedia.innerHTML="";
  detailLinks.innerHTML="";

  (project.detail_images || []).forEach(url=>{
    detailGallery.innerHTML+=`
      <img src="${url}" alt="detail image">
    `;
  });

  if(project.video_url){
    if(/\.(gif)(\?.*)?$/i.test(project.video_url)){
      detailMedia.innerHTML+=`
        <img src="${project.video_url}" alt="gif image">
      `;
    }else if(/\.(mp4|webm|mov|m4v)(\?.*)?$/i.test(project.video_url)){
      detailMedia.innerHTML+=`
        <video src="${project.video_url}" controls muted loop playsinline></video>
      `;
    }else{
      detailLinks.innerHTML+=`
        <a href="${project.video_url}" target="_blank">영상 보기</a>
      `;
    }
  }

  if(project.pdf_url){
    detailLinks.innerHTML+=`
      <a href="${project.pdf_url}" target="_blank">PDF / 외부 링크</a>
    `;
  }

  detailPanel.scrollTop=0;
  detailOverlay.classList.remove("full");
  detailOverlay.classList.add("show");
}

detailPanel.addEventListener("scroll",()=>{
  detailOverlay.classList.toggle("full",detailPanel.scrollTop>35);
});

detailClose.addEventListener("click",closeDetail);

detailOverlay.addEventListener("click",(e)=>{
  if(e.target===detailOverlay) closeDetail();
});

/* =========================
   ADMIN MODAL
========================= */
function openAdmin(){
  adminOverlay.classList.add("show");
  adminOverlay.classList.remove("full");
  adminPanel.scrollTop=0;
}

function closeAdmin(){
  adminOverlay.classList.remove("show","full");
  adminPanel.scrollTop=0;
}

adminPanel.addEventListener("scroll",()=>{
  adminOverlay.classList.toggle("full",adminPanel.scrollTop>35);
});

categoryAddBtn.addEventListener("click",()=>{
  resetForm();
  openAdmin();
});

adminClose.addEventListener("click",closeAdmin);

adminOverlay.addEventListener("click",(e)=>{
  if(e.target===adminOverlay) closeAdmin();
});

/* =========================
   LOGIN
========================= */
async function checkLogin(){
  const {data}=await client.auth.getSession();

  if(data.session){
    document.body.classList.add("logged-in");
  }else{
    document.body.classList.remove("logged-in");
  }
}

document.getElementById("loginBtn").addEventListener("click",async()=>{
  const email=document.getElementById("loginEmail").value;
  const password=document.getElementById("loginPassword").value;

  const {error}=await client.auth.signInWithPassword({
    email,
    password
  });

  if(error){
    alert("로그인 실패: "+error.message);
    return;
  }

  await checkLogin();
  resetForm();
});

document.getElementById("logoutBtn").addEventListener("click",async()=>{
  await client.auth.signOut();
  document.body.classList.remove("logged-in");
  closeAdmin();
});

/* =========================
   PROJECT LOAD / RENDER
========================= */
function makeCard(project){
  return `
    <div class="product-item" data-id="${project.id}">
      <img src="${project.image_url || ""}" alt="${project.title || ""}">
      <div class="product-info">
        <h4>${project.title || "Untitled"}</h4>
        <p>${project.short_desc || ""}</p>
      </div>
    </div>
  `;
}

async function loadProjects(){
  const {data,error}=await client
    .from("projects")
    .select("*")
    .order("created_at",{ascending:false});

  if(error){
    console.log(error);
    return;
  }

  allProjects=data || [];

  groups.forEach(group=>{
    group.innerHTML="";
  });

  allProjects.forEach(project=>{
    const group=document.querySelector(`[data-category="${project.category}"]`);

    if(group){
      group.innerHTML+=makeCard(project);
    }
  });

  document.querySelectorAll(".product-item").forEach(item=>{
    item.addEventListener("click",()=>{
      const id=Number(item.dataset.id);
      const project=allProjects.find(project=>project.id===id);

      if(project){
        openDetail(project);
      }
    });
  });
}

/* =========================
   UPLOAD
========================= */
async function uploadImage(){
  const file=projectImage.files[0];
  if(!file) return null;

  const fileName=`${Date.now()}-${file.name}`;

  const {error}=await client
    .storage
    .from("portfolio")
    .upload(fileName,file);

  if(error){
    alert("대표 이미지 업로드 실패: "+error.message);
    return null;
  }

  const {data}=client
    .storage
    .from("portfolio")
    .getPublicUrl(fileName);

  return data.publicUrl;
}

async function uploadVideoFile(){
  const file=projectVideoFile.files[0];
  if(!file) return null;

  const fileName=`${Date.now()}-${file.name}`;

  const {error}=await client
    .storage
    .from("portfolio")
    .upload(fileName,file);

  if(error){
    alert("영상/움짤 업로드 실패: "+error.message);
    return null;
  }

  const {data}=client
    .storage
    .from("portfolio")
    .getPublicUrl(fileName);

  return data.publicUrl;
}

async function uploadDetailImages(){
  if(!detailItems.length) return null;

  const urls=[];

  for(const item of detailItems){
    if(item.type==="url"){
      urls.push(item.url);
      continue;
    }

    const file=item.file;
    const fileName=`${Date.now()}-${Math.random().toString(36).slice(2)}-${file.name}`;

    const {error}=await client
      .storage
      .from("portfolio")
      .upload(fileName,file);

    if(error){
      alert("상세 이미지 업로드 실패: "+error.message);
      return null;
    }

    const {data}=client
      .storage
      .from("portfolio")
      .getPublicUrl(fileName);

    urls.push(data.publicUrl);
  }

  return urls;
}

/* =========================
   DETAIL IMAGE PREVIEW
========================= */
function renderDetailPreview(){
  detailPreviewList.innerHTML="";

  detailItems.forEach((item,index)=>{
    const div=document.createElement("div");
    div.className="detail-preview-item";
    div.draggable=true;
    div.dataset.index=index;

    div.innerHTML=`
      <img src="${item.preview}" alt="preview image">
      <button type="button">×</button>
      <span>${index+1}</span>
    `;

    div.querySelector("button").addEventListener("click",()=>{
      detailItems.splice(index,1);
      renderDetailPreview();
    });

    div.addEventListener("dragstart",()=>{
      draggedIndex=index;
      div.classList.add("dragging");
    });

    div.addEventListener("dragend",()=>{
      draggedIndex=null;
      div.classList.remove("dragging");
    });

    div.addEventListener("dragover",(e)=>e.preventDefault());

    div.addEventListener("drop",(e)=>{
      e.preventDefault();

      const targetIndex=Number(div.dataset.index);

      if(draggedIndex===null || draggedIndex===targetIndex) return;

      const movedItem=detailItems.splice(draggedIndex,1)[0];
      detailItems.splice(targetIndex,0,movedItem);

      renderDetailPreview();
    });

    detailPreviewList.appendChild(div);
  });
}

projectDetailImages.addEventListener("change",(e)=>{
  const files=Array.from(e.target.files);

  files.forEach(file=>{
    detailItems.push({
      type:"file",
      file:file,
      preview:URL.createObjectURL(file),
      url:null
    });
  });

  projectDetailImages.value="";
  renderDetailPreview();
});

/* =========================
   SAVE / EDIT / DELETE
========================= */
document.getElementById("saveBtn").addEventListener("click",async()=>{
  if(!projectTitle.value){
    alert("제목을 입력해줘");
    return;
  }

  adminStatus.innerText="저장 중...";

  const imageUrl=await uploadImage();
  const detailImages=await uploadDetailImages();
  const videoFileUrl=await uploadVideoFile();

  const projectData={
    title:projectTitle.value,
    category:projectCategory.value,
    short_desc:projectShortDesc.value,
    content:projectContent.value,
    role:projectRole.value,
    project_year:projectYear.value,
    video_url:videoFileUrl || projectVideoUrl.value,
    pdf_url:projectPdfUrl.value
  };

  if(imageUrl){
    projectData.image_url=imageUrl;
  }

  if(detailImages){
    projectData.detail_images=detailImages;
  }

  let result;

  if(editId.value){
    result=await client
      .from("projects")
      .update(projectData)
      .eq("id",editId.value);
  }else{
    result=await client
      .from("projects")
      .insert(projectData);
  }

  if(result.error){
    adminStatus.innerText="";
    alert("저장 실패: "+result.error.message);
    return;
  }

  adminStatus.innerText="저장 완료!";

  await loadProjects();
  resetForm();
});

document.getElementById("resetBtn").addEventListener("click",resetForm);

document.getElementById("deleteBtn").addEventListener("click",async()=>{
  if(!editId.value){
    alert("삭제할 게시물이 없어");
    return;
  }

  if(!confirm("정말 삭제할까?")) return;

  const {error}=await client
    .from("projects")
    .delete()
    .eq("id",editId.value);

  if(error){
    alert("삭제 실패: "+error.message);
    return;
  }

  alert("삭제 완료");

  resetForm();
  closeAdmin();
  closeDetail();

  await loadProjects();
});

function resetForm(){
  adminTitle.innerText="ADD PROJECT";

  editId.value="";
  projectTitle.value="";
  projectCategory.value="brand";
  projectShortDesc.value="";
  projectContent.value="";
  projectRole.value="";
  projectYear.value="";
  projectImage.value="";
  projectDetailImages.value="";
  projectVideoFile.value="";
  projectVideoUrl.value="";
  projectPdfUrl.value="";
  adminStatus.innerText="";

  detailItems=[];
  renderDetailPreview();
}

function fillForm(project){
  adminTitle.innerText="EDIT PROJECT";

  editId.value=project.id;
  projectTitle.value=project.title || "";
  projectCategory.value=project.category || "brand";
  projectShortDesc.value=project.short_desc || "";
  projectContent.value=project.content || "";
  projectRole.value=project.role || "";
  projectYear.value=project.project_year || "";
  projectImage.value="";
  projectDetailImages.value="";
  projectVideoFile.value="";
  projectVideoUrl.value=project.video_url || "";
  projectPdfUrl.value=project.pdf_url || "";

  detailItems=(project.detail_images || []).map(url=>({
    type:"url",
    file:null,
    preview:url,
    url:url
  }));

  renderDetailPreview();
}

detailEditBtn.addEventListener("click",()=>{
  if(!currentProject) return;

  fillForm(currentProject);
  closeDetail();
  openAdmin();
});

/* =========================
   INIT
========================= */
checkLogin();
loadProjects();

setTimeout(()=>{
  moveGlassIndicator(getActiveCategoryButton());
},300);
