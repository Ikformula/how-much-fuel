
  const KM_PER_MILE = 1.60934;
  const LITERS_PER_GALLON = 3.78541;

  const distanceKm = document.getElementById('distanceKm');
  const distanceMiles = document.getElementById('distanceMiles');
  const priceLiter = document.getElementById('priceLiter');
  const priceGallon = document.getElementById('priceGallon');
  const currency = document.getElementById('currency');
  const consumptionLkm = document.getElementById('consumptionLkm');
  const consumptionMpg = document.getElementById('consumptionMpg');
  const fuelNeeded = document.getElementById('fuelNeeded');
  const totalCost = document.getElementById('totalCost');
  const resetBtn = document.getElementById('resetBtn');

  function round(val) { return Math.round(val * 100) / 100; }

  function updateConversions(e) {
  if (e.target === distanceKm && distanceKm.value) {
  distanceMiles.value = round(distanceKm.value / KM_PER_MILE);
} else if (e.target === distanceMiles && distanceMiles.value) {
  distanceKm.value = round(distanceMiles.value * KM_PER_MILE);
}

  if (e.target === priceLiter && priceLiter.value) {
  priceGallon.value = round(priceLiter.value * LITERS_PER_GALLON);
} else if (e.target === priceGallon && priceGallon.value) {
  priceLiter.value = round(priceGallon.value / LITERS_PER_GALLON);
}

  // 🔄 updated L/km ↔ mpg conversion
  if (e.target === consumptionLkm && consumptionLkm.value) {
  consumptionMpg.value = round(235.215 / (100 * consumptionLkm.value));
} else if (e.target === consumptionMpg && consumptionMpg.value) {
  consumptionLkm.value = round(235.215 / (100 * consumptionMpg.value), 4);
}

  calculate();
}

  function calculate() {
  const km = parseFloat(distanceKm.value);
  const pricePerL = parseFloat(priceLiter.value);
  const lPerKm = parseFloat(consumptionLkm.value);

  if (km > 0 && pricePerL > 0 && lPerKm > 0) {
  // 🔄 liters needed with L/km
  const litersNeeded = km * lPerKm;
  const cost = litersNeeded * pricePerL;

  fuelNeeded.textContent = `${round(litersNeeded)} liters`;
  totalCost.textContent = `${currency.value}${round(cost)}`;
} else {
  fuelNeeded.textContent = '-';
  totalCost.textContent = '-';
}
}

  function resetAll() {
  [distanceKm, distanceMiles, priceLiter, priceGallon,
    consumptionLkm, consumptionMpg].forEach(i => i.value = '');
  currency.value = '₦';
  fuelNeeded.textContent = '-';
  totalCost.textContent = '-';
}

  [distanceKm, distanceMiles, priceLiter, priceGallon,
  consumptionLkm, consumptionMpg].forEach(input =>
  input.addEventListener('input', updateConversions)
  );

  currency.addEventListener('input', calculate);
  resetBtn.addEventListener('click', resetAll);