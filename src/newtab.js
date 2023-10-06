const SBG_KEY = 'EXTEMSIONS-SBG-KEY';

const uploadImg = document.getElementById('upload-img');

uploadImg.addEventListener('change', uploadImgChange);

getImg().then((result) => {
  setBodyBg(result[SBG_KEY])
});

async function uploadImgChange(e){
  try {
    if(e.target.files.length === 0) return;
    const file = e.target.files[0];
    const img = await convertBase64(file);
    await setImg(img)
    setBodyBg(img)
  } catch (error) {
    console.log('choose file error')
    console.log(error)
  }
}

const convertBase64 = (file) => {
  return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
          resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
          reject(error);
      };
  });
};

function setBodyBg(url) {
  if(!url) return;
  document.body.style.backgroundImage = `url(${url})`;
}

function setImg(img){
  return chrome.storage.local.set({ [SBG_KEY]: img })
}

function getImg(){
  return chrome.storage.local.get([SBG_KEY])
}

