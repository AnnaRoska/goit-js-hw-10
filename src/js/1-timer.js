import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

let userSelectedDate = new Date();
const btnStart = document.querySelector(".btn-start");
const inpDateStart = document.querySelector(".inp-date-start");
let diffTime = 0;
const timerDays = document.querySelector('[data-days]')
const timerHours = document.querySelector('[data-hours]');
const timerMinutes = document.querySelector('[data-minutes]');
const timerSeconds = document.querySelector('[data-seconds]');
btnStart.setAttribute("disabled", "true");
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      diffTime = selectedDates[0].getTime() - Date.now()
      if (diffTime <= 0) {
          // Минула дата
          iziToast.show({
              color: 'red',
              position: 'center',
              message: 'Please choose a date in the future'
            });

          btnStart.setAttribute("disabled", "true");
          console.log("Минула дата", diffTime);
      } else {
          // Майбутня дата
          btnStart.removeAttribute("disabled");
          userSelectedDate = selectedDates[0];
          console.log("Майбутня дата", diffTime);
      }     
    }
};
flatpickr("#datetime-picker", options);

btnStart.addEventListener('click', () => {
    diffTime = userSelectedDate.getTime() - Date.now()
    btnStart.setAttribute("disabled", "true");
    inpDateStart.setAttribute("disabled", "true");

    const timerFace = () => {
        diffTime = diffTime - 1000;
        if (diffTime <= 1000) {
            clearInterval(intervalId);
            inpDateStart.removeAttribute("disabled");
        }
        //  const varStr = convertMs(diffTime).days.toString;
        //  timerDays.textContent = varStr.padStart(2, "0");  
        timerDays.textContent = String(convertMs(diffTime).days).padStart(2, "0");
        timerHours.textContent = String(convertMs(diffTime).hours).padStart(2, "0");
        timerMinutes.textContent = String(convertMs(diffTime).minutes).padStart(2, "0");
        timerSeconds.textContent = String(convertMs(diffTime).seconds).padStart(2, "0");
    }
    const intervalId = setInterval(timerFace, 1000);
        
});


function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// console.log(convertMs(2000).minutes); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
