import { driveTabs } from "../../js/libs/driveTabs";


(() => {

    const callbackModal = document.querySelector('.callback-modal');
    if (!callbackModal) return;

    const tabs = driveTabs({
        container: '.callback-modal',
        controls: '.callback-modal__nav-btn',
        selects: '.callback-modal__tab',
        cls: 'active'
    });

})();
