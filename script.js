history.scrollRestoration = "manual";

if(location.hash){
  history.replaceState(null, "", location.pathname + location.search);
}

window.scrollTo(0, 0);

window.addEventListener("pageshow", () => {
  window.scrollTo(0, 0);
});

/* =========================
   MARQUEE
========================= */
function initMarquee(){
  const marqueeTrack = document.getElementById("marqueeTrack");
  if(!marqueeTrack) return;

  const items = Array.from(marqueeTrack.children);
  items.forEach(item => {
    marqueeTrack.appendChild(item.cloneNode(true));
  });
}

initMarquee();

/* =========================
   DARK MODE
========================= */
const darkToggle = document.getElementById("darkToggle");
const savedTheme = localStorage.getItem("portfolioTheme");

if(savedTheme === "dark"){
  document.body.classList.add("dark-mode");
}

function updateDarkIcon(){
  if(!darkToggle) return;

  if(document.body.classList.contains("dark-mode")){
    darkToggle.innerText = "☀";
  }else{
    darkToggle.innerText = "☾";
  }
}

updateDarkIcon();

darkToggle?.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  const isDark = document.body.classList.contains("dark-mode");
  localStorage.setItem("portfolioTheme", isDark ? "dark" : "light");

  updateDarkIcon();

  setTimeout(() => {
    moveGlassIndicator(getActiveCategoryButton());
  }, 80);
});

/* =========================
   SUPABASE
========================= */
const SUPABASE_URL = "https://cwnfcrokfkhmguvsqcgs.supabase.co";
const SUPABASE_KEY = "sb_publishable_nlc6fsuk7kscuECiLoZImg_P_-Psp_S";
const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/* =========================
   ELEMENTS
========================= */
const aboutPanel = document.querySelector(".about-panel");
const categoryPanel = document.querySelector(".category-panel");
const buttons = document.querySelectorAll(".category-btn");
const groups = document.querySelectorAll(".product-group");
const productList = document.querySelector(".product-list");
const categoryBackBtn = document.querySelector(".category-back-btn");
const categoryAddBtn = document.querySelector(".category-add-btn");
const scrollArea = document.querySelector(".scroll-area");

const glassTabs = document.querySelector(".category-buttons");
const glassIndicator = document.querySelector(".glass-indicator");

const detailOverlay = document.querySelector(".detail-overlay");
const detailPanel = document.querySelector(".detail-panel");
const detailClose = document.querySelector(".detail-close");
const detailImg = document.getElementById("detailImg");
const detailTitle = document.getElementById("detailTitle");
const detailDesc = document.getElementById("detailDesc");
const detailType = document.getElementById("detailType");
const detailRole = document.getElementById("detailRole");
const detailYear = document.getElementById("detailYear");
const detailStory = document.getElementById("detailStory");
const detailGallery = document.getElementById("detailGallery");
const detailMedia = document.getElementById("detailMedia");
const detailLinks = document.getElementById("detailLinks");
const detailEditBtn = document.querySelector(".detail-edit-btn");

const adminOverlay = document.querySelector(".admin-overlay");
const adminPanel = document.querySelector(".admin-panel");
const adminClose = document.querySelector(".admin-close");
const adminTitle = document.getElementById("adminTitle");
const adminStatus = document.getElementById("adminStatus");

const editId = document.getElementById("editId");
const projectTitle = document.getElementById("projectTitle");
const projectCategory = document.getElementById("projectCategory");
const projectShortDesc = document.getElementById("projectShortDesc");
const projectContent = document.getElementById("projectContent");
const projectRole = document.getElementById("projectRole");
const projectYear = document.getElementById("projectYear");
const projectImage = document.getElementById("projectImage");
const projectDetailImages = document.getElementById("projectDetailImages");
const projectVideoFile = document.getElementById("projectVideoFile");
const projectVideoUrl = document.getElementById("projectVideoUrl");
const projectPdfUrl = document.getElementById("projectPdfUrl");
const detailPreviewList = document.getElementById("detailPreviewList");

/* =========================
   STATE
========================= */
let allProjects = [];
let currentProject = null;
let detailItems = [];
let draggedIndex = null;

/* =========================
   PANEL MOTION
========================= */
const stackPanels = document.querySelectorAll(".stack-panel");

const panelObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if(entry.isIntersecting){
      entry.target.classList.add("is-visible");
      entry.target.classList.add("panel-active");
    }
  });
},{
  threshold:0.28
});

stackPanels.forEach((panel) => panelObserver.observe(panel));

function updatePanels(){
  const y = window.scrollY;
  const vh = window.innerHeight;

  if(aboutPanel){
    const aboutTop = aboutPanel.offsetTop;
    aboutPanel.classList.toggle("panel-active", y > aboutTop - vh * .85);
  }

  if(categoryPanel){
    const categoryTop = categoryPanel.offsetTop;
    categoryPanel.classList.toggle("panel-active", y > categoryTop - vh * .85);
  }
}

window.addEventListener("scroll", updatePanels, {passive:true});
window.addEventListener("resize", () => {
  updatePanels();
  moveGlassIndicator(getActiveCategoryButton());
});

/* =========================
   GLASS INDICATOR
========================= */
function getActiveCategoryButton(){
  return document.querySelector(".category-btn.active") || buttons[0];
}

function moveGlassIndicator(target){
  if(!glassTabs || !glassIndicator || !target) return;

  const tabsRect = glassTabs.getBoundingClientRect();
  const btnRect = target.getBoundingClientRect();

  const left = btnRect.left - tabsRect.left + glassTabs.scrollLeft;

  glassIndicator.style.transform = `translateX(${left - 9}px)`;
  glassIndicator.style.width = `${btnRect.width}px`;
}

buttons.forEach(button => {
  button.addEventListener("pointerenter", () => moveGlassIndicator(button));
});

glassTabs?.addEventListener("pointerleave", () => {
  moveGlassIndicator(getActiveCategoryButton());
});

glassTabs?.addEventListener("scroll", () => {
  moveGlassIndicator(getActiveCategoryButton());
}, {passive:true});

/* =========================
   CATEGORY
========================= */
function resetCategoryView(){
  buttons.forEach(button => button.classList.remove("active"));
  groups.forEach(group => group.classList.remove("active"));
  productList?.classList.remove("all-active");
}

function openCategory(tabButton){
  const target = tabButton.dataset.tab;

  document.body.classList.add("category-mode");
  categoryPanel?.classList.add("opened", "panel-active");

  if(scrollArea){
    scrollArea.scrollTo({
      top:0,
      behavior:"auto"
    });
  }

  resetCategoryView();

  tabButton.classList.add("active");

  if(target === "all"){
    productList?.classList.add("all-active");
    groups.forEach(group => group.classList.add("active"));
  }else{
   const selected = document.querySelector(`.product-group[data-category="${target}"]`);
    if(selected) selected.classList.add("active");
  }

  setTimeout(() => {
    moveGlassIndicator(tabButton);
  }, 120);
}

buttons.forEach(button => {
  button.addEventListener("click", () => openCategory(button));
});

categoryBackBtn?.addEventListener("click", () => {
  document.body.classList.remove("category-mode");

  categoryPanel?.classList.remove("opened");

  resetCategoryView();
  buttons[0]?.classList.add("active");

  window.scrollTo({
    top:categoryPanel.offsetTop,
    behavior:"smooth"
  });

  setTimeout(() => {
    moveGlassIndicator(buttons[0]);
    updatePanels();
  }, 450);
});

/* =========================
   DETAIL MODAL
========================= */
function closeDetail(){
  detailOverlay?.classList.remove("show", "full");
  if(detailPanel) detailPanel.scrollTop = 0;
}

function openDetail(project){
  currentProject = project;

  detailImg.src = project.image_url || "";
  detailTitle.innerText = project.title || "Untitled";
  detailDesc.innerText = project.short_desc || "";
  detailType.innerText = project.category || "";
  detailRole.innerText = project.role || "Design / Visual";
  detailYear.innerText = project.project_year || "2026";
  detailStory.innerText = project.content || "상세 설명이 아직 없습니다.";

  detailGallery.innerHTML = "";
  detailMedia.innerHTML = "";
  detailLinks.innerHTML = "";

  (project.detail_images || []).forEach(url => {
    detailGallery.innerHTML += `<img src="${url}" alt="">`;
  });

  if(project.video_url){
    if(/\.(gif)(\?.*)?$/i.test(project.video_url)){
      detailMedia.innerHTML += `<img src="${project.video_url}" alt="">`;
    }else if(/\.(mp4|webm|mov|m4v)(\?.*)?$/i.test(project.video_url)){
      detailMedia.innerHTML += `<video src="${project.video_url}" controls muted loop playsinline></video>`;
    }else{
      detailLinks.innerHTML += `<a href="${project.video_url}" target="_blank">영상 보기</a>`;
    }
  }

  if(project.pdf_url){
    detailLinks.innerHTML += `<a href="${project.pdf_url}" target="_blank">PDF / 외부 링크</a>`;
  }

  detailOverlay?.classList.remove("full");
  detailOverlay?.classList.add("show");

  if(detailPanel) detailPanel.scrollTop = 0;
}

detailPanel?.addEventListener("scroll", () => {
  detailOverlay?.classList.toggle("full", detailPanel.scrollTop > 35);
}, {passive:true});

detailClose?.addEventListener("click", closeDetail);

detailOverlay?.addEventListener("click", (e) => {
  if(e.target === detailOverlay) closeDetail();
});

/* =========================
   ADMIN MODAL
========================= */
function openAdmin(){
  adminOverlay?.classList.add("show");
  adminOverlay?.classList.remove("full");
  if(adminPanel) adminPanel.scrollTop = 0;
}

function closeAdmin(){
  adminOverlay?.classList.remove("show", "full");
  if(adminPanel) adminPanel.scrollTop = 0;
}

adminPanel?.addEventListener("scroll", () => {
  adminOverlay?.classList.toggle("full", adminPanel.scrollTop > 35);
}, {passive:true});

categoryAddBtn?.addEventListener("click", () => {
  resetForm();
  openAdmin();
});

adminClose?.addEventListener("click", closeAdmin);

adminOverlay?.addEventListener("click", (e) => {
  if(e.target === adminOverlay) closeAdmin();
});

/* =========================
   LOGIN
========================= */
async function checkLogin(){
  const {data} = await client.auth.getSession();

  if(data.session){
    document.body.classList.add("logged-in");
  }else{
    document.body.classList.remove("logged-in");
  }
}

document.getElementById("loginBtn")?.addEventListener("click", async () => {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const {error} = await client.auth.signInWithPassword({
    email,
    password
  });

  if(error){
    alert("로그인 실패: " + error.message);
    return;
  }

  await checkLogin();
  resetForm();
});

document.getElementById("logoutBtn")?.addEventListener("click", async () => {
  await client.auth.signOut();
  document.body.classList.remove("logged-in");
  closeAdmin();
});

/* =========================
   PROJECT LOAD
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
  const {data, error} = await client
    .from("projects")
    .select("*")
    .order("created_at", {ascending:false});

  if(error){
    console.log(error);
    return;
  }

  allProjects = data || [];

  groups.forEach(group => {
    group.innerHTML = "";
  });

  allProjects.forEach(project => {
    const group = document.querySelector(`[data-category="${project.category}"]`);
    if(group) group.innerHTML += makeCard(project);
  });

  document.querySelectorAll(".product-item").forEach(item => {
    item.addEventListener("click", () => {
      const id = Number(item.dataset.id);
      const project = allProjects.find(project => project.id === id);
      if(project) openDetail(project);
    });
  });
}

/* =========================
   UPLOAD
========================= */
async function uploadImage(){
  const file = projectImage.files[0];
  if(!file) return null;

  const fileName = `${Date.now()}-${file.name}`;

  const {error} = await client.storage
    .from("portfolio")
    .upload(fileName, file);

  if(error){
    alert("대표 이미지 업로드 실패: " + error.message);
    return null;
  }

  const {data} = client.storage
    .from("portfolio")
    .getPublicUrl(fileName);

  return data.publicUrl;
}

async function uploadVideoFile(){
  const file = projectVideoFile.files[0];
  if(!file) return null;

  const fileName = `${Date.now()}-${file.name}`;

  const {error} = await client.storage
    .from("portfolio")
    .upload(fileName, file);

  if(error){
    alert("영상/움짤 업로드 실패: " + error.message);
    return null;
  }

  const {data} = client.storage
    .from("portfolio")
    .getPublicUrl(fileName);

  return data.publicUrl;
}

async function uploadDetailImages(){
  if(!detailItems.length) return null;

  const urls = [];

  for(const item of detailItems){
    if(item.type === "url"){
      urls.push(item.url);
      continue;
    }

    const file = item.file;
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}-${file.name}`;

    const {error} = await client.storage
      .from("portfolio")
      .upload(fileName, file);

    if(error){
      alert("상세 이미지 업로드 실패: " + error.message);
      return null;
    }

    const {data} = client.storage
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
  if(!detailPreviewList) return;

  detailPreviewList.innerHTML = "";

  detailItems.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "detail-preview-item";
    div.draggable = true;
    div.dataset.index = index;

    div.innerHTML = `
      <img src="${item.preview}" alt="">
      <button type="button">×</button>
      <span>${index + 1}</span>
    `;

    div.querySelector("button").addEventListener("click", () => {
      detailItems.splice(index, 1);
      renderDetailPreview();
    });

    div.addEventListener("dragstart", () => {
      draggedIndex = index;
      div.classList.add("dragging");
    });

    div.addEventListener("dragend", () => {
      draggedIndex = null;
      div.classList.remove("dragging");
    });

    div.addEventListener("dragover", (e) => e.preventDefault());

    div.addEventListener("drop", (e) => {
      e.preventDefault();

      const targetIndex = Number(div.dataset.index);
      if(draggedIndex === null || draggedIndex === targetIndex) return;

      const movedItem = detailItems.splice(draggedIndex, 1)[0];
      detailItems.splice(targetIndex, 0, movedItem);

      renderDetailPreview();
    });

    detailPreviewList.appendChild(div);
  });
}

projectDetailImages?.addEventListener("change", (e) => {
  const files = Array.from(e.target.files);

  files.forEach(file => {
    detailItems.push({
      type:"file",
      file:file,
      preview:URL.createObjectURL(file),
      url:null
    });
  });

  projectDetailImages.value = "";
  renderDetailPreview();
});

/* =========================
   SAVE / EDIT / DELETE
========================= */
document.getElementById("saveBtn")?.addEventListener("click", async () => {
  if(!projectTitle.value){
    alert("제목을 입력해줘");
    return;
  }

  adminStatus.innerText = "저장 중...";

  const imageUrl = await uploadImage();
  const detailImages = await uploadDetailImages();
  const videoFileUrl = await uploadVideoFile();

  const projectData = {
    title:projectTitle.value,
    category:projectCategory.value,
    short_desc:projectShortDesc.value,
    content:projectContent.value,
    role:projectRole.value,
    project_year:projectYear.value,
    video_url:videoFileUrl || projectVideoUrl.value,
    pdf_url:projectPdfUrl.value
  };

  if(imageUrl) projectData.image_url = imageUrl;
  if(detailImages) projectData.detail_images = detailImages;

  let result;

  if(editId.value){
    result = await client
      .from("projects")
      .update(projectData)
      .eq("id", editId.value);
  }else{
    result = await client
      .from("projects")
      .insert(projectData);
  }

  if(result.error){
    adminStatus.innerText = "";
    alert("저장 실패: " + result.error.message);
    return;
  }

  adminStatus.innerText = "저장 완료!";

  await loadProjects();
  resetForm();
});

document.getElementById("resetBtn")?.addEventListener("click", resetForm);

document.getElementById("deleteBtn")?.addEventListener("click", async () => {
  if(!editId.value){
    alert("삭제할 게시물이 없어");
    return;
  }

  if(!confirm("정말 삭제할까?")) return;

  const {error} = await client
    .from("projects")
    .delete()
    .eq("id", editId.value);

  if(error){
    alert("삭제 실패: " + error.message);
    return;
  }

  alert("삭제 완료");

  resetForm();
  closeAdmin();
  closeDetail();

  await loadProjects();
});

function resetForm(){
  adminTitle.innerText = "ADD PROJECT";

  editId.value = "";
  projectTitle.value = "";
  projectCategory.value = "brand";
  projectShortDesc.value = "";
  projectContent.value = "";
  projectRole.value = "";
  projectYear.value = "";
  projectImage.value = "";
  projectDetailImages.value = "";
  projectVideoFile.value = "";
  projectVideoUrl.value = "";
  projectPdfUrl.value = "";
  adminStatus.innerText = "";

  detailItems = [];
  renderDetailPreview();
}

function fillForm(project){
  adminTitle.innerText = "EDIT PROJECT";

  editId.value = project.id;
  projectTitle.value = project.title || "";
  projectCategory.value = project.category || "brand";
  projectShortDesc.value = project.short_desc || "";
  projectContent.value = project.content || "";
  projectRole.value = project.role || "";
  projectYear.value = project.project_year || "";
  projectImage.value = "";
  projectDetailImages.value = "";
  projectVideoFile.value = "";
  projectVideoUrl.value = project.video_url || "";
  projectPdfUrl.value = project.pdf_url || "";

  detailItems = (project.detail_images || []).map(url => ({
    type:"url",
    file:null,
    preview:url,
    url:url
  }));

  renderDetailPreview();
}

detailEditBtn?.addEventListener("click", () => {
  if(!currentProject) return;

  fillForm(currentProject);
  closeDetail();
  openAdmin();
});

/* =========================
   LOGO CLICK
========================= */
const logoText = document.getElementById("logoText");

logoText?.addEventListener("click", function(e){
  e.preventDefault();

  const url = window.location.origin + window.location.pathname + "?v=" + Date.now();
  window.location.replace(url);
});

/* =========================
   PANEL AUTO SNAP
========================= */
const snapPanels = document.querySelectorAll(".about-panel, .category-panel");
let snapping = false;
let snapTimer;

function autoSnap(){
  if(snapping) return;

  const trigger = window.innerHeight * 0.45;

  snapPanels.forEach(panel => {
    const rect = panel.getBoundingClientRect();

    if(rect.top > 0 && rect.top < trigger){
      snapping = true;

      panel.scrollIntoView({
        behavior:"smooth",
        block:"start"
      });

      setTimeout(() => {
        snapping = false;
      }, 760);
    }
  });
}

window.addEventListener("scroll", () => {
  clearTimeout(snapTimer);
  snapTimer = setTimeout(autoSnap, 90);
});

/* =========================
   INIT
========================= */
window.addEventListener("load", () => {
  window.scrollTo(0, 0);

  setTimeout(() => {
    updatePanels();
    moveGlassIndicator(getActiveCategoryButton());
  }, 300);
});

checkLogin();
loadProjects();