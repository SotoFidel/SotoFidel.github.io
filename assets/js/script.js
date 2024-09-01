for(let i of document.querySelectorAll(".buttons div.button")) {

    let d = document.createElement("div");
    let boundingClientRect = i.getBoundingClientRect();

    d.innerHTML = `<p class="button-title" style="transition: font-size 1s">`+i.dataset.title+"</p>";
    d.classList.add("growable");
    d.style.width = boundingClientRect.width + 'px';
    d.style.height = boundingClientRect.height + 'px';
    d.style.left = boundingClientRect.x + 'px';
    d.style.top = boundingClientRect.y + 'px';
    i.append(d);

    i.closest(".button").addEventListener("click",function() {
        
        if(d.classList.contains("grown"))
        {
            d.addEventListener("transitionend",function(){
                console.log("done");
                d.style.zIndex = 'auto';
                d.style.transition = 'none';
            },{once: true});
        
            d.classList.remove("grown");
            return;
        }

        d.style.transition = 'width 1s,height 1s,transform 1s,left 1s,top 1s';
        d.style.zIndex = '100';
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

var templateInfo = {
    "Education": "",
    "Experience": "",
    "Projects": "",
};