function controlFromInput(fromSlider, fromInput, toInput, controlSlider) {
    const [from, to] = getParsed(fromInput, toInput);
    fillSlider(fromInput, toInput, '#C6C6C6', '#25daa5', controlSlider);
    if (from > to) {
        fromSlider.value = to;
        fromInput.value = to;
    } else {
        fromSlider.value = from;
    }
}

function controlToInput(toSlider, fromInput, toInput, controlSlider) {
    const [from, to] = getParsed(fromInput, toInput);
    fillSlider(fromInput, toInput, '#C6C6C6', '#25daa5', controlSlider);
    setToggleAccessible(toInput);
    if (from <= to) {
        toSlider.value = to;
        toInput.value = to;
    } else {
        toInput.value = from;
    }
}

function controlFromSlider(fromSlider, toSlider, fromInput) {
    const [from, to] = getParsed(fromSlider, toSlider);
    fillSlider(fromSlider, toSlider, '#C6C6C6', '#25daa5', toSlider);
    if (from > to) {
        fromSlider.value = to;
        fromInput.value = to;
    } else {
        fromInput.value = from;
    }
}

function controlToSlider(fromSlider, toSlider, toInput) {
    const [from, to] = getParsed(fromSlider, toSlider);
    fillSlider(fromSlider, toSlider, '#C6C6C6', '#25daa5', toSlider);
    setToggleAccessible(toSlider);
    if (from <= to) {
        toSlider.value = to;
        toInput.value = to;
    } else {
        toInput.value = from;
        toSlider.value = from;
    }
}

function getParsed(currentFrom, currentTo) {
    const from = parseInt(currentFrom.value, 10);
    const to = parseInt(currentTo.value, 10);
    return [from, to];
}

function fillSlider(from, to, sliderColor, rangeColor, controlSlider) {
    const rangeDistance = to.max - to.min;
    const fromPosition = from.value - to.min;
    const toPosition = to.value - to.min;
    controlSlider.style.background = `linear-gradient(
      to right,
      ${sliderColor} 0%,
      ${sliderColor} ${(fromPosition) / (rangeDistance) * 100}%,
      ${rangeColor} ${((fromPosition) / (rangeDistance)) * 100}%,
      ${rangeColor} ${(toPosition) / (rangeDistance) * 100}%, 
      ${sliderColor} ${(toPosition) / (rangeDistance) * 100}%, 
      ${sliderColor} 100%)`;
}

function setToggleAccessible(currentTarget) {
    const toSlider = document.querySelector('#toSlider');
    if (Number(currentTarget.value) <= 0) {
        toSlider.style.zIndex = 2;
    } else {
        toSlider.style.zIndex = 0;
    }
}

function fromSingleSlider(slider, input) {
    let value = parseInt(slider.value);
    if (Math.abs(value - input.value) > 1) {
        input.value = value;
        fillSlider(fromSlider, slider, '#C6C6C6', '#25daa5', slider);
    }
}
function fromSingleInput(slider, input) {
    let value = parseInt(input.value);
    if (Math.abs(value - slider.value) > 1) {
        slider.value = value;
        fillSlider(fromSlider, slider, '#C6C6C6', '#25daa5', slider);
    }
}
function fromSingleTimerSlider(slider, inputMinutes, inputSeconds) {
    let value = parseInt(slider.value);
    let seconds = value % 60;
    let minues = (value - seconds) / 60;
    let timeIninputes = parseInt(inputMinutes.value * 60 + inputSeconds.value);
    if (Math.abs(value - timeIninputes) > 1) {
        inputMinutes.value = minues;
        inputSeconds.value = seconds;
        fillSlider(fromSlider, slider, '#C6C6C6', '#25daa5', slider);
    }
}
function fromSingleTimerInput(slider, inputMinutes, inputSeconds) {
    let valueMinutes = parseInt(inputMinutes.value);
    let valueSeconds = parseInt(inputSeconds.value);
    let value = valueMinutes * 60 + valueSeconds;
    if (Math.abs(value - slider.value) > 1) {
        slider.value = value;
        fillSlider(fromSlider, slider, '#C6C6C6', '#25daa5', slider);
    }
}

const fromSlider = document.querySelector('#fromSlider');
const toSlider = document.querySelector('#toSlider');
const fromInput = document.querySelector('#fromInput');
const toInput = document.querySelector('#toInput');
const amountOfSongsSlider = document.querySelector('#amountOfSongsSlider');
const amountOfSongsNumber = document.querySelector('#amountOfSongsNumber');
const songFragmentMenagmentSlider = document.querySelector('#songFragmentMenagmentSlider');
const songFragmentMenagmentNumberMinutes = document.querySelector('#songFragmentMenagmentNumberMinutes');
const songFragmentMenagmentNumberSeconds = document.querySelector('#songFragmentMenagmentNumberSeconds');
fillSlider(fromSlider, toSlider, '#C6C6C6', '#25daa5', toSlider);
fillSlider(fromSlider, amountOfSongsSlider, '#C6C6C6', '#25daa5', amountOfSongsSlider);
setToggleAccessible(toSlider);

fromSlider.oninput = () => controlFromSlider(fromSlider, toSlider, fromInput);
toSlider.oninput = () => controlToSlider(fromSlider, toSlider, toInput);
fromInput.oninput = () => controlFromInput(fromSlider, fromInput, toInput, toSlider);
toInput.oninput = () => controlToInput(toSlider, fromInput, toInput, toSlider);
amountOfSongsSlider.oninput = () => fromSingleSlider(amountOfSongsSlider, amountOfSongsNumber);
amountOfSongsNumber.oninput = () => fromSingleInput(amountOfSongsSlider, amountOfSongsNumber);
songFragmentMenagmentSlider.oninput = () => fromSingleTimerSlider(songFragmentMenagmentSlider, songFragmentMenagmentNumberMinutes, songFragmentMenagmentNumberSeconds);
songFragmentMenagmentNumberMinutes.oninput = () => fromSingleTimerInput(songFragmentMenagmentSlider, songFragmentMenagmentNumberMinutes, songFragmentMenagmentNumberSeconds);
songFragmentMenagmentNumberSeconds.oninput = () => fromSingleTimerInput(songFragmentMenagmentSlider, songFragmentMenagmentNumberMinutes, songFragmentMenagmentNumberSeconds);