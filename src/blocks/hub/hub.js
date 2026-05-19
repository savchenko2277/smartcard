import { driveTabs } from "../../js/libs/driveTabs";

(() => {

    const hubSection = document.querySelector(".hub");
    if (!hubSection) return;

    const tabs = driveTabs({
        container: '.hub__tabs',
        controls: '.hub__navigation-btn',
        selects: '.hub__group',
        cls: 'active'
    });

})();
