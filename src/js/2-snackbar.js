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
                    res(`✅ Fulfilled promise in ${delay}ms`);
                } else {
                    rej(`❌ Rejected promise in ${delay}ms`);  
                }
                }, delay);
            });
    promise
      .then((result) => {
        iziToast.show({
            color: 'green',
            position: 'center',
            message: result
    });
      })
      .catch((result) => {
        iziToast.show({
                    color: 'red',
                    position: 'center',
                    message: result
                })
      });
  });

  

    


