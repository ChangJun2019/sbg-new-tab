const SBG_KEY = 'EXTEMSIONS-SBG-KEY';
const SBG_DB_NAME = 'start-db'
const SBG_DB_NAME_TABLE = 'bg'
let db = null;
init()

const uploadImg = document.getElementById('upload-img');
uploadImg.addEventListener('change', uploadImgChange);

async function init() {
  await initStore();
  const file = await getImg()
  setBodyBg(file)
}

function initStore() {
  const request = window.indexedDB.open(SBG_DB_NAME, 1);

  return new Promise((resolve, reject) => {
    request.onerror = function (event) {
      console.log('db open error');
      reject(event)
    };

    request.onsuccess = function (event) {
      db = request.result;
      resolve(event)
    };

    request.onupgradeneeded = function (event) {
      db = event.target.result;
      let objectStore;

      if (!db.objectStoreNames.contains(SBG_DB_NAME_TABLE)) {
        objectStore = db.createObjectStore(SBG_DB_NAME_TABLE, { autoIncrement: true });
      }
    }
  })
}

function setImg(file) {
  let r = db.transaction([SBG_DB_NAME_TABLE], 'readwrite')
    .objectStore(SBG_DB_NAME_TABLE)
    .put(file, 1);

  return new Promise((resolve, reject) => {
    r.onsuccess = function (event) {
      resolve(event)
    };

    r.onerror = function (event) {
      reject(event)
    }
  })
}

function getImg() {
  let r = db.transaction([SBG_DB_NAME_TABLE], 'readwrite')
    .objectStore(SBG_DB_NAME_TABLE)
    .get(1);

  return new Promise((resolve, reject) => {
    r.onsuccess = function (event) {
      resolve(r.result)
    };

    r.onerror = function (event) {
      reject(event)
    }
  })
}

async function uploadImgChange(e) {
  try {
    if (e.target.files.length === 0) return;
    const file = e.target.files[0];
    await setImg(file)
    setBodyBg(file)
  } catch (error) {
    console.log('choose file error')
    console.log(error)
  }
}

function setBodyBg(file) {
  if (!file) return;
  const img = URL.createObjectURL(file);
  document.body.style.backgroundImage = `url(${img})`;
}






