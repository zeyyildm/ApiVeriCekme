let url = "https://random.dog/woof.json";
let sayac1 = 0;
let sayac2 = 0;

function istekYap() {
  return fetch(url) //api'ya istek gönderiyoruz.
    .then(response => response.json()) //gelen yanıt json formatına çeviriliyor
    .then(data => {
      const dogImage = document.createElement("img");
      dogImage.src = data.url;
      document.body.appendChild(dogImage); // Köpek resimlerini ekrana bastırma
      var imageSize = data.fileSizeBytes; // Byte büyüklüğünü bir değere atadım
      if (imageSize > 1050000) {  //resim büyüklüklerini kontrol ediyoruz
        sayac1++;
      } else {
        sayac2++;
      }
    })
    .catch(error => console.error(error)); //fetch sırasında hata olursa konsola hata mesajı yazdırır
}

async function main() { //sayaç1 ve sayaç2 değerlerini direkt çekemediğim için promise yapısını kullanıyorum böylece tüm işlemler bittikten sonra değerleri alacağım
  let promises = []; //fetch isteklerini tutacak

 
  for (let i = 0; i < 100; i++) { //100 kere istek atıyoruz.
    promises.push(istekYap()); // tüm istekler promise oluşturuyor ve promises dizisine ekliyoruz
  }

  await Promise.all(promises); // await ile tüm promislerin bitmesini bekliyoruz

  console.log("Atılan 100 istekten 1050000 Byte dan büyük olanlar", sayac1);
  console.log("Atılan 100 istekten 1050000 Byte dan küçük olanlar: ", sayac2);
}

main(); //main fonksiyonunu çağırıyoruz.