// @ts-nocheck
// ===============================
// Giga Pet Game
// ===============================

$(function () {
  $('.treat-button').on('click', clickedTreatButton);
  $('.play-button').on('click', clickedPlayButton);
  $('.exercise-button').on('click', clickedExerciseButton);
  $('.bark-button').on('click', clickedBarkButton);
  $('.nap-button').on('click', clickedNapButton);

  // Runs once: first click on the pet image
  $('.pet-image').one('click', function () {
    comment("Hi there! I'm your new pet 🐾");
  });

  checkAndUpdatePetInfoInHtml();
});

// ---- Pet state
var pet_info = {
  name: 'Buddy',
  weight: 10,
  happiness: 5,
  energy: 6
};

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

// ---- Button behaviors
function clickedTreatButton() {
  pet_info.happiness += 2;
  pet_info.weight += 1;
  pet_info.energy = clamp(pet_info.energy - 1, 0, 10);

  wigglePet();
  comment('Yum! Treats make me happy! ');
  checkAndUpdatePetInfoInHtml();
}

function clickedPlayButton() {
  pet_info.happiness += 3;
  pet_info.weight = pet_info.weight - 1;
  pet_info.energy = clamp(pet_info.energy - 2, 0, 10);

  hopPet();
  comment('Play time! Throw the ball! ');
  checkAndUpdatePetInfoInHtml();
}

function clickedExerciseButton() {
  pet_info.happiness -= 1;
  pet_info.weight -= 2;
  pet_info.energy = clamp(pet_info.energy - 3, 0, 10);

  runPet();
  comment('Phew… cardio is ruff! ');
  checkAndUpdatePetInfoInHtml();
}

function clickedBarkButton() {
  pet_info.happiness += 1;
  pet_info.energy = clamp(pet_info.energy - 1, 0, 10);

  barkPet();
  comment('WOOF! ');
  checkAndUpdatePetInfoInHtml();
}

function clickedNapButton() {
  pet_info.happiness += 1;
  pet_info.weight = clamp(pet_info.weight - 1, 0, Infinity);
  pet_info.energy = clamp(pet_info.energy + 4, 0, 10);

  snoozePet();
  comment('Zzz… best nap ever. ');
  checkAndUpdatePetInfoInHtml();
}

// ---- Update helpers
function checkAndUpdatePetInfoInHtml() {
  pet_info.weight = clamp(pet_info.weight, 0, Infinity);
  pet_info.happiness = clamp(pet_info.happiness, 0, Infinity);
  pet_info.energy = clamp(pet_info.energy, 0, 10);

  $('.name').text(pet_info.name);
  $('.weight').text(pet_info.weight);
  $('.happiness').text(pet_info.happiness);
  $('.energy').text(pet_info.energy);
}

// ---- Visual notification with animation queue
function comment(text) {
  var $c = $('#pet-comment');
  $c.stop(true, true)
    .hide()
    .text(text)
    .fadeIn(180)
    .delay(1200)
    .fadeOut(220)
    .queue(function (next) {
      // Proof the queue step ran:
      // console.log('Pet comment animation completed!');
      next();
    });
}

// ---- Tiny animations
function wigglePet() {
  var $img = $('.pet-image');
  $img.stop(true, true)
    .animate({ left: '8px' }, 80)
    .animate({ left: '-8px' }, 80)
    .animate({ left: '0px' }, 60);
}

function hopPet() {
  var $img = $('.pet-image');
  $img.stop(true, true)
    .animate({ top: '-12px' }, 120)
    .animate({ top: '0px' }, 120);
}

function runPet() {
  var $img = $('.pet-image');
  $img.stop(true, true)
    .animate({ left: '18px' }, 120)
    .delay(60)
    .animate({ left: '0px' }, 140);
}

function barkPet() {
  var $img = $('.pet-image');
  $img.stop(true, true)
    .animate({ width: '+=8' }, 90)
    .animate({ width: '-=8' }, 90);

  var audio = document.getElementById('bark-audio');
  if (audio && audio.play) {
    audio.currentTime = 0;
    audio.play().catch(function () {});
  }
}

function snoozePet() {
  var $img = $('.pet-image');
  $img.stop(true, true)
    .animate({ opacity: 0.8, top: '10px' }, 160)
    .delay(120)
    .animate({ opacity: 1, top: '0px' }, 160);
}
