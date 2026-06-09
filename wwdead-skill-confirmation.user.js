// ==UserScript==
// @name         WWDead Skill Purchase Confirmation
// @namespace    https://wwdead.com/
// @version      1.0
// @description  Adds confirmation dialogs to all skill purchase buttons
// @match        https://www.wwdead.com/classic/skills*
// @match        https://wwdead.com/classic/skills
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const BRAIN_ROT_PHRASE = 'i embrace true barhah';

    document.querySelectorAll('li.buy').forEach(li => {
        const skillNameEl = li.querySelector('b');
        const form = li.querySelector('form[action="/classic/skills/purchase"]');
        if (!skillNameEl || !form) return;

        const skillName = skillNameEl.textContent.trim();

        form.addEventListener('submit', e => {
            e.preventDefault();

            if (skillName === 'Brain Rot') {
                const input = prompt(
                    'To purchase Brain Rot, you must type the following phrase exactly:\n\n' +
                    '"' + BRAIN_ROT_PHRASE + '"'
                );
                if (input === null) return;
                if (input.trim().toLowerCase() !== BRAIN_ROT_PHRASE) {
                    alert('Incorrect phrase. Purchase cancelled.');
                    return;
                }
            } else {
                if (!confirm('Purchase "' + skillName + '"?')) return;
            }

            form.submit();
        });
    });
})();
