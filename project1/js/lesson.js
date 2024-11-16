// Phone checker
const phoneInput = document.querySelector('#phone_input');
const phoneButton = document.querySelector('#phone_button');
const phoneResult = document.querySelector('#phone_result');

const regExp = /^\+996 [2579]\d{2} \d{2}-\d{2}-\d{2}$/;

phoneButton.onclick = () => {
    if (regExp.test(phoneInput.value)) {
        phoneResult.innerHTML = "OK";
        phoneResult.style.color = "green";
    } else {
        phoneResult.innerHTML = "NOT OK";
        phoneResult.style.color = "red";
    }
};

// Tab slider
const tabContentBlocks = document.querySelectorAll(".tab_content_block");
const tabs = document.querySelectorAll(".tab_content_item");
const tabsParent = document.querySelector(".tab_content_items");

const hideTabContent = () => {
    tabContentBlocks.forEach((block) => {
        block.style.display = "none";
    });
    tabs.forEach((tab) => {
        tab.classList.remove('tab_content_item_active');
    });
};

const showTabContent = (id = 0) => {
    tabContentBlocks[id].style.display = "block";
    tabs[id].classList.add('tab_content_item_active');
};

hideTabContent();
showTabContent();

tabsParent.onclick = (event) => {
    if (event.target.classList.contains('tab_content_item')) {
        tabs.forEach((tab, tabIndex) => {
            if (event.target === tab) {
                hideTabContent();
                showTabContent(tabIndex);
            }
        });
    }
};

let slideIndex = 0;
const slideTimer = () => {
    slideIndex++;
    if (slideIndex > 4) {
        slideIndex = 0;
    }
    hideTabContent();
    showTabContent(slideIndex);
    console.log(slideIndex);
};

setInterval(() => slideTimer(), 3000);

// convertor
const som = document.querySelector('#som');
const usd = document.querySelector('#usd');
const eur = document.querySelector('#eur');
const rub = document.querySelector('#rub');

const convertor = (element, targetElement, current) => {
    element.oninput = () => {
        const request = new XMLHttpRequest();
        request.open("GET", "../data/convertor.json", true);
        request.setRequestHeader("Content-Type", "application/json");

        request.onload = () => {
            if (request.status >= 200 && request.status < 300) {
                try {
                    const data = JSON.parse(request.responseText);
                    const inputValue = parseFloat(element.value);

                    if (!isNaN(inputValue)) {
                        switch (current) {
                            case "som":
                                usd.value = (inputValue / data.usd).toFixed(2);
                                eur.value = (inputValue / data.eur).toFixed(2);
                                rub.value = (inputValue / data.rub).toFixed(2);
                                break;
                            case "usd":
                                som.value = (inputValue * data.usd).toFixed(2);
                                eur.value = (som.value / data.eur).toFixed(2);
                                rub.value = (som.value / data.rub).toFixed(2);
                                break;
                            case "eur":
                                som.value = (inputValue * data.eur).toFixed(2);
                                usd.value = (som.value / data.usd).toFixed(2);
                                rub.value = (som.value / data.rub).toFixed(2);
                                break;
                            case "rub":
                                som.value = (inputValue * data.rub).toFixed(2);
                                usd.value = (som.value / data.usd).toFixed(2);
                                eur.value = (som.value / data.eur).toFixed(2);
                                break;
                            default:
                                break;
                        }
                    } else {
                        som.value = '';
                        usd.value = '';
                        eur.value = '';
                        rub.value = '';
                    }
                } catch (error) {
                    console.error('Error parsing response:', error);
                }
            } else {
                console.error('Request failed with status:', request.status);
            }
        };

        request.onerror = () => {
            console.error('Request failed');
        };

        request.send();
    };
};

const validateInput = (element) => {
    element.onkeypress = (event) => {
        const key = event.key;
        const isNumber = /^\d+$/.test(key) || key === '.' || key === ','

        if (!isNumber) {
            event.preventDefault();
        }
    };
};

convertor(som, usd, "som");
convertor(usd, som, "usd");
convertor(eur, som, "eur");
convertor(rub, som, "rub");

validateInput(som);
validateInput(usd);
validateInput(eur);
validateInput(rub);