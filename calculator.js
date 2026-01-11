const drugs = [
  { name: "Norepinephrine", highAlert: true, concentration: 8, unit: "mcg/kg/min" },
  { name: "Dopamine", highAlert: true, concentration: 1600, unit: "mcg/kg/min" },
  { name: "Dobutamine", highAlert: true, concentration: 500, unit: "mcg/kg/min" },
  { name: "Nitroglycerin", highAlert: true, concentration: 200, unit: "mcg/min" },
  { name: "Amiodarone", highAlert: true, concentration: 1.8, unit: "mg/min" }
];

const select = document.getElementById("drugSelect");

drugs.forEach(d => {
  const opt = document.createElement("option");
  opt.value = d.name;
  opt.text = d.name;
  select.appendChild(opt);
});

function calculate() {
  const drugName = select.value;
  const weight = parseFloat(document.getElementById("weight").value);
  const dose = parseFloat(document.getElementById("dose").value);
  const drug = drugs.find(d => d.name === drugName);

  let dosePerMin;

  if (drug.unit === "mcg/kg/min") {
    dosePerMin = dose * weight;
  } else {
    dosePerMin = dose;
  }

  const dosePerHour = dosePerMin * 60;
  const mlPerHour = dosePerHour / drug.concentration;

  document.getElementById("result").innerHTML =
    `Dose per minute: ${dosePerMin.toFixed(2)} mcg<br>
     Dose per hour: ${dosePerHour.toFixed(2)} mcg<br>
     Pump Rate: <b>${mlPerHour.toFixed(2)} mL/hr</b>`;

  if (drug.highAlert) {
    document.getElementById("warning").innerHTML =
      "🔴 HIGH ALERT MEDICATION – Double check required!";
    document.getElementById("warning").style.color = "red";
  } else {
    document.getElementById("warning").innerHTML = "";
  }
}
