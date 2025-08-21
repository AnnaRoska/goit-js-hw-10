import 'izitoast/dist/css/iziToast.min.css';
import iziToast from 'izitoast';


const form = document.querySelector(".form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
    event.preventDefault();
    const radioBtn = document.querySelector('[name="state"]:checked')?.value;
    const delay = document.querySelector('[name="delay"]').value; 
        const promise = new Promise((res, rej) => {
            setTimeout(() => {
                if (radioBtn === "fulfilled") {
                    res(delay);
                } else {
                    rej(delay);  
                }
                }, delay);
            });
    promise
      .then((delay) => {
        iziToast.show({
            color: 'green',
            position: 'center',
            message: `✅ Fulfilled promise in ${delay}ms`
    });
      })
      .catch((delay) => {
        iziToast.show({
                    color: 'red',
                    position: 'center',
                    message: `❌ Rejected promise in ${delay}ms`
                })
      })
    .finally(() => {
      form.reset();
    });
  });

  

    


