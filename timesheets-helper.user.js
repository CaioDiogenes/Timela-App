// ==UserScript==
// @name         Timesheets fill helper
// @namespace    http://tampermonkey.net/
// @version      2025-04-11
// @description  Created to help on appointments daily or weekly
// @author       Corchc
// @match        https://*.atlassian.net/*timela*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=atlassian.net
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // ==== ADD HOVER EFFECT ====
    function addHoverEffect(cmp){
        cmp.addEventListener('mouseenter', () => {
            cmp.style.boxShadow = '0 0 5px rgba(0, 123, 255, 0.5)';
            cmp.style.opacity = "1";

        });

        cmp.addEventListener('mouseleave', () => {
            cmp.style.boxShadow = 'none';
            cmp.style.opacity = "0.7";
        });

        cmp.addEventListener('focus', () => {
            cmp.style.transition = 'opacity 0.2s ease-in-out';
            cmp.style.opacity = '1';
        });

        cmp.addEventListener('blur', () => {
            cmp.style.transition = 'opacity 0.2s ease-in-out';
            cmp.style.opacity = '0.7';
        });
    }

    // ==== RE-ENABLE BUTTON ====
    function reEnableButton() {
        setTimeout(() => {
            feedbackSpan.style.display = 'none';
            submitButton.disabled = false;
            submitButton.style.cursor = "initial";
            submitButton.style.backgroundColor = '#007bff';
        }, 2000);
    }

    // ==== DRAGGABLE LOGIC ====
    function makeDraggable(el) {
        let offsetX = 0, offsetY = 0, isDown = false;

        el.addEventListener('mousedown', (e) => {
            isDown = true;
            offsetX = el.offsetLeft - e.clientX;
            offsetY = el.offsetTop - e.clientY;
            el.style.cursor = 'move';
        });

        document.addEventListener('mouseup', () => {
            isDown = false;
            el.style.cursor = 'default';
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            el.style.left = (e.clientX + offsetX) + 'px';
            el.style.top = (e.clientY + offsetY) + 'px';
        });
    }

    // ==== UI ====
    // Note; Images may not appear to all because google images not allow everyone to get access into it. Improve this when found a better way.
    const imageUrls = [
        "https://lh3.googleusercontent.com/pw/AP1GczPXcCy7CK0VmVRrNsIt6qvoQcMLd4SFK99G1Nx2OFGEPwM1jNhSAkPhwDONr4GUNGQvrB3dxb4eP1mPainhF0BsnQakHPHNLK_mltIFsUeaJYeTq3Jpk5SYYpNFXYD6UnO91e__RoPqF7siHm5LsN3nkQ=w683-h911-s-no-gm",
        "https://lh3.googleusercontent.com/pw/AP1GczNK5d7rudkGfZTD6TwaqN8ybhNVpIMiClo2gUwAe0SbLpaYaEgHhqZ4KlONrW53aTAFYLPsYMbqJGaC2m3cUYnBppqk2u1MiUfEwsWYPU1cUyDzHiJ0_FDfYiKInVU2ZTeeYrw1oERrgRYRFy2JN9snJA=w1215-h911-s-no-gm?authuser=0",
        "https://lh3.googleusercontent.com/pw/AP1GczM3h0KmpBcL6eZJWs-WSAqbDFdVrZJB8WRCuUHqjuDq93peKrvIthLu86l1jo8ual5iMoEOJl-CCYszklAjxMnNMiqM3Dx2PMD8qpl0eOIZ1YlWD_u7gbLijjw7jvI9tCrQjkAjbcH3oixpN3oN6qv9Tg=w630-h911-s-no-gm?authuser=0",
        "https://lh3.googleusercontent.com/pw/AP1GczP1Yk8Rzz7rjLqYbELVngvwhWEHN2lNYLyE-zWH19VIfY7dtEPkziM0Z7MAGcODGzIdQ-uwy6Sfz-9_icsIjasJJ8mbZxJtRKnTJ4Q6MNoUN3kzlos7mWoKabLIaIVjqliepULIwpAIaySnF3la-XNVSA=w1618-h911-s-no-gm?authuser=0",
        "https://lh3.googleusercontent.com/pw/AP1GczPXcCy7CK0VmVRrNsIt6qvoQcMLd4SFK99G1Nx2OFGEPwM1jNhSAkPhwDONr4GUNGQvrB3dxb4eP1mPainhF0BsnQakHPHNLK_mltIFsUeaJYeTq3Jpk5SYYpNFXYD6UnO91e__RoPqF7siHm5LsN3nkQ=w683-h911-s-no-gm?authuser=0"
    ];

    const randomImage = imageUrls[Math.floor(Math.random() * imageUrls.length)];

    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.display = 'flex';
    container.style.flexWrap = 'wrap';
    container.style.top = '359px';
    container.style.left = '1639px';
    container.style.backgroundColor = 'white';
    container.style.padding = '15px';
    container.style.boxShadow = 'rgba(0, 0, 0, 10.3) 10px 10px 17px';
    container.style.zIndex = '9999';
    container.style.borderRadius = '8px';
    container.style.fontFamily = 'Arial, sans-serif';
    container.style.width = '160px';
    container.style.backgroundImage = `url('${randomImage}')`;
    container.style.backgroundSize = "cover";
    container.style.backgroundRepeat = "no-repeat";
    container.style.backgroundPosition = "center";

    makeDraggable(container);

    const createInput = (placeholder, disabled = false, defaultValue = '') => {
        const input = document.createElement('input');
        input.type = 'text';
        input.disabled = disabled;
        input.value = defaultValue;
        input.placeholder = placeholder;
        input.style.display = 'flex';
        input.style.marginBottom = '10px';
        input.style.width = '100%';
        input.style.padding = '5px';
        input.style.border = '1px solid #ccc';
        input.style.borderRadius = '4px';
        input.style.backgroundColor = 'white';
        input.style.color = 'black';
        input.style.opacity = "0.7";

        addHoverEffect(input);

        container.appendChild(input);
        return input;
    };

    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = String(now.getMonth() + 1).padStart(2, '0');

    const yearInput = createInput('Year', false, currentYear);
    const monthInput = createInput('Month', false, currentMonth);
    const dayInput = createInput('Days (ex: 5 6 7)');
    const timeSpentInput = createInput('Time (ex: 5h)');
    const cardIdInput = createInput('Card (ex: time-38)');

    const submitButton = document.createElement('button');
    submitButton.textContent = 'Enviar';
    submitButton.style.padding = '8px 16px';
    submitButton.style.border = 'none';
    submitButton.style.borderRadius = '4px';
    submitButton.style.backgroundColor = '#007bff';
    submitButton.style.color = 'white';
    submitButton.style.cursor = 'pointer';
    submitButton.style.opacity = '0.7';

    addHoverEffect(submitButton);

    const feedbackSpan = document.createElement('span');
    feedbackSpan.textContent = 'Done';
    feedbackSpan.style.marginLeft = '10px';
    feedbackSpan.style.color = 'green';
    feedbackSpan.style.display = 'none';


    // ==== BUTTON LOGIC ====
    submitButton.onclick = async function () {
        submitButton.disabled = true;
        submitButton.style.backgroundColor = "gray";
        submitButton.style.cursor = "wait";

        const year = yearInput.value;
        const month = monthInput.value;
        const timeSpent = timeSpentInput.value;
        const cardId = cardIdInput.value.toUpperCase();

        const rawDays = dayInput.value;
        if (!rawDays || !timeSpent || !cardId) {
            alert("Fill the inputs.");
            reEnableButton();
            return;
        }

        const days = rawDays.split(/[,\s]+/).map(d => d.trim()).filter(d => /^\d+$/.test(d));

        if (days.length === 0) {
            alert("Inform at least one valid day.");
            reEnableButton();
            return;
        }

        try {
            for (const day of days) {
                const dayStr = String(day).padStart(2, '0');
                const started = `${year}-${month}-${dayStr}T08:00:00.000-0300`;

                const payload = {
                    started,
                    timeSpent
                };

                const url = `<full-atlasian-link-with-token>`;
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                });

                if (!response.ok) {
                    alert(`Failure to process day:${dayStr}: ${response.statusText}`);
                    reEnableButton();
                    return;
                }
            }

            console.log("[Info] Finished with success.");
            feedbackSpan.style.display = 'inline';
            reEnableButton();
        } catch (error) {
            alert(`Err: ${error.message}`);
            reEnableButton();
        }
    };

    container.appendChild(submitButton);
    container.appendChild(feedbackSpan);
    document.body.appendChild(container);
})();
