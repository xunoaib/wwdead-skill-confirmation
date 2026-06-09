// ==UserScript==
// @name         WWDead Skill Purchase Confirmation
// @namespace    https://wwdead.com/
// @version      1.1
// @description  Adds confirmation dialogs to all skill purchase buttons
// @match        https://www.wwdead.com/classic/skills*
// @match        https://wwdead.com/classic/skills
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function () {
    'use strict';

    const BRAIN_ROT_PHRASE = 'I embrace true barhah';

    function setupConfirmation(li) {
        const skillNameEl = li.querySelector('b');
        const form = li.querySelector('form[action="/classic/skills/purchase"]');
        if (!skillNameEl || !form || form._confirmAttached) return;
        form._confirmAttached = true;

        const skillName = skillNameEl.textContent.trim();

        form.addEventListener('submit', e => {
            e.preventDefault();
            e.stopImmediatePropagation();

            if (skillName === 'Brain Rot') {
                const input = prompt(
                    'To purchase Brain Rot, you must type the following phrase exactly:\n\n' +
                    '"' + BRAIN_ROT_PHRASE + '"'
                );
                if (input === null) return;
                if (input.trim() !== BRAIN_ROT_PHRASE) {
                    alert('Incorrect phrase. Barhah averted.');
                    return;
                }
            } else {
                if (!confirm('Purchase "' + skillName + '"?')) return;
            }

            form.submit();
        });
    }

    const observer = new MutationObserver(mutations => {
        for (const mutation of mutations) {
            for (const node of mutation.addedNodes) {
                if (node.nodeType !== Node.ELEMENT_NODE) continue;
                if (node.matches('li.buy')) setupConfirmation(node);
                node.querySelectorAll('li.buy').forEach(setupConfirmation);
            }
        }
    });

    observer.observe(document, { childList: true, subtree: true });
})();
