'use strict';

//Elementleri Seçmek için id'lerini değişkenlere atadık
const player0El = document.querySelector('.player--0')
const player1El = document.querySelector('.player--1')
const score0El = document.querySelector('#score--0') //sol skor
const score1El = document.getElementById('score--1') // sağ skor sadece id adı 
const current0El = document.getElementById('current--0') //Current butonu
const current1El = document.getElementById('current--1')
const diceEl = document.querySelector('.dice')//zar resimleri
const btnNew = document.querySelector('.btn--new')
const btnRoll = document.querySelector('.btn--roll')
const btnHold = document.querySelector('.btn--hold')


//Başlangıç koşullarını yazıyoruz.
//Skor puanlarını sıfırladık
// İnit fonksiyonuna attım
score0El.textContent = 0 //sol skor 0,
score1El.textContent = 0 //sağ skor 0'ladık.
diceEl.classList.add('hidden') //class listesine hidden'ı ekliyoruz.

// İnit fonksiyonuna attık
// const scores = [0, 0]; 
// let currentScore = 0 //güncelleyeceğimiz için 0 Dışarda ayarladık çünkü function içinde yazsak bastıkça 0 olacaktı
// let activePlayer = 0 // aktif oyuncu kim bir nolu oyuncu 0 numaralı aslında
// let playing = true;

// Normalde let scores vs. onlar çalışmıyordu let ile böyle yaptık ve fonksiyon içinde çalışmayan kodları çalışır hale getirdik.
let scores, currentScore, activePlayer, playing
const init = function () {
    scores = [0, 0]
    currentScore = 0
    activePlayer = 0
    playing = true
  
    score0El.textContent = 0
    score1El.textContent = 0
    current0El.textContent = 0
    current1El.textContent = 0
  

    diceEl.classList.add('hidden')
    player0El.classList.remove('player--winner')
    player1El.classList.remove('player--winner')
    player0El.classList.add('player--active')
    player1El.classList.remove('player--active')

    btnHold.classList.remove("hidden");
    btnRoll.classList.remove("hidden");
    
  }
  init()
  const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0
    activePlayer = activePlayer === 0 ? 1 : 0
    currentScore = 0
    player0El.classList.toggle('player--active')
    player1El.classList.toggle('player--active')  
    
  }
//Roll Dice Zar Atma İşlemi

btnRoll.addEventListener('click', function () { //btn-rolla tıkladıkça olacaklar
    if (playing) {
// 1. Rastgele zar oluştur. Global bi değişken olmamalı içerede kullanacağız.
const dice = Math.trunc(Math.random() * 6) + 1  // 6 ile çarpıp rastgele ver
console.log(dice)
// 2. Zarları göster 
diceEl.classList.remove('hidden') //class listesindeki hidden'ı sildik.
diceEl.src = `dice-${dice}.png` // resimlerin ismi dice- ile başlıyor yukarıda oluşturduğumuz math-random değişkenini çağırdık rastgele gelecek.
// 3. Zarda '1' olup olmadığını kontrol et. Eğer doğruysa diğer oyuncuya geç.

// Zarda 1'i kontrol et
if (dice !== 1) {
    // Zarı mevcut skora ekle.
        // currentScore = currentScore + dice; uzun
    currentScore += dice //kısa hali
    document.getElementById(`current--${activePlayer}`).textContent = currentScore //Current--0 'ı yakaladık ve metin içeriiğini mevcut puanla değiştirdik 
    // current0El.textContent = currentScore // current0' ı currentscore'a eşitledik.
} else {
    switchPlayer(); // alttaki kodların hepsini switchPlayer'e yazdık. Daha sonra fonksiyona gönderdik.
    //Eğer doğruysa diğer oyuncuya geç.
    // document.getElementById(`current--${activePlayer}`).textContent = 0
    // activePlayer = activePlayer === 0 ? 1 : 0; //aktif oyuncu 0'a eşitse 1 yap değilse 0 yap.
    // currentScore = 0;
    // player1El.classList.toggle("player--active") //toggle değiştir demek orda class yoksa o class'ı ekleyecek ya da o class varsa silecek
    // player0El.classList.toggle("player--active") 
}
}
});

btnHold.addEventListener('click', function () { //btn-hold'a tıkladığımızda olacaklar
    if (playing) { 
    // 1. Aktif oyuncunun puanına mevcut puanı eklemek.
    scores[activePlayer] += currentScore //ya 0'ı ya da 1. indexteki elemanı verecek plyr0 ya da plyr1 
    // scores[1] = scores[1] + currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =scores[activePlayer] //aktif player'i current skor ile doldurduk ya solu ya sağı sürekli arttırdı metin içerisini ekledik.
    // 2. Puanın en az 100 olduğunun kontrolü.
    if (scores[activePlayer] >= 20) {

    // Oyunu bitir
    playing = false
    diceEl.classList.add('hidden')
    btnRoll.classList.add("hidden");
    btnHold.classList.add("hidden");
    document.querySelector(`.player--${activePlayer}`).classList.add('player--winner')
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--active')
} else {
    
  switchPlayer()
}
//Oyunu bitir
//Diğer oyuncuya geç
}
})

btnNew.addEventListener('click', init);