(() => {
    const { height: headerHeight } = document
        .querySelector(".header-homepage")
        .getBoundingClientRect();

    document.body.style.paddingTop = `${headerHeight}px`;
})();