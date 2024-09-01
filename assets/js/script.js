for(let i of document.querySelectorAll(".buttons div.button")) {

    let d = document.createElement("div");
    let boundingClientRect = i.getBoundingClientRect();
    d.textContent = i.dataset.title;
    d.classList.add("growable");
    d.style.width = boundingClientRect.width + 'px';
    d.style.height = boundingClientRect.height + 'px';
    d.style.left = boundingClientRect.x + 'px';
    d.style.top = boundingClientRect.y + 'px';
    i.append(d);

    i.closest(".button").addEventListener("click",function() {
        if(d.classList.contains("grown"))
        {
            d.classList.remove("grown");
            return;
        }
        d.classList.add("grown");
        i.classList.add("clicked");
    });
}

["resize","scroll"].forEach(event => {
    addEventListener(event,function(){

        for(let i of document.querySelectorAll(".buttons div.button")) {

            let d = i.querySelector('.growable');

            let boundingClientRect = i.getBoundingClientRect();
            d.style.width = boundingClientRect.width + 'px';
            d.style.height = boundingClientRect.height + 'px';
            d.style.left = boundingClientRect.x + 'px';
            d.style.top = boundingClientRect.y + 'px';
        }

    });
});