const down = fileUrl => {
  const id = "for_download_iframe";
  let $f = document.getElementById(id);
  if (!$f) {
    $f = document.createElement("iframe");
    document.body.appendChild($f);
  }
  $f.id = id;
  $f.setAttribute("src", fileUrl);
  $f.style.display = "none";
};
const postDown = (fileUrl, datas) => {
  return new Promise((resolve, reject) => {
    const id = "for_download_iframe";
    let $f = document.getElementById(id);
    if (!$f) {
      $f = document.createElement("iframe");
      document.body.appendChild($f);
    }
    const $form = document.createElement("form");
    $form.action = fileUrl;
    $form.method = "POST";
    for (let key in datas) {
      let tmp = document.createElement("input");
      tmp.name = key;
      tmp.value = datas[key];
      $form.appendChild(tmp);
    }
    $f.contentDocument.body.appendChild($form);
    $f.style.display = "none";
    $f.onload = () => {
      try {
        const { code } = JSON.parse($f.contentDocument.body.innerHTML);
        if (code !== "401") {
          resolve();
        } else {
          reject(code);
        }
      } catch (err) {
        reject("404");
      }
    };
    setTimeout(resolve, 1000);
    $app.$nextTick(() => {
      $form.submit();
    });
  });
};
export default {
  down,
  postDown
};
