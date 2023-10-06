const DB_NAME = 'start-db'
const DB_NAME_TABLE = 'bg'
let db = null
init()

const uploadImg = document.getElementById('upload-img')
uploadImg.addEventListener('change', uploadImgChange)

async function init() {
  await initStore()
  const file = await getImg()
  setBodyBg(file)
}

function initStore() {
  const request = window.indexedDB.open(DB_NAME, 1)

  return new Promise((resolve, reject) => {
    request.onerror = function (event) {
      reject(event)
    }

    request.onsuccess = function (event) {
      db = request.result
      resolve(event)
    }

    request.onupgradeneeded = function (event) {
      db = event.target.result
      if (!db.objectStoreNames.contains(DB_NAME_TABLE))
        db.createObjectStore(DB_NAME_TABLE, { autoIncrement: true })
    }
  })
}

function setImg(file) {
  const r = db.transaction([DB_NAME_TABLE], 'readwrite')
    .objectStore(DB_NAME_TABLE)
    .put(file, 1)

  return new Promise((resolve, reject) => {
    r.onsuccess = function (event) {
      resolve(event)
    }

    r.onerror = function (event) {
      reject(event)
    }
  })
}

function getImg() {
  const r = db.transaction([DB_NAME_TABLE], 'readwrite')
    .objectStore(DB_NAME_TABLE)
    .get(1)

  return new Promise((resolve, reject) => {
    r.onsuccess = function () {
      resolve(r.result)
    }

    r.onerror = function (event) {
      reject(event)
    }
  })
}

async function uploadImgChange(e) {
  const f = e.target.files
  if (f.length === 0)
    return
  await setImg(f[0])
  setBodyBg(f[0])
}

function setBodyBg(file) {
  if (!file)
    return
  const img = URL.createObjectURL(file)
  document.body.style.backgroundImage = `url(${img})`
}
