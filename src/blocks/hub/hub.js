import { driveTabs } from "../../js/libs/driveTabs";

(() => {

    const tabs = driveTabs({
        container: '.hub__tabs',
        controls: '.hub__navigation-btn',
        selects: '.hub__group',
        cls: 'active'
    });

})();
