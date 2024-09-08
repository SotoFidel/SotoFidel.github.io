window.onresize = function() {
    document.body.style.height = window.innerHeight + 'px';
}

window.onload = () => {

    window.onresize();
    
    for(let i of document.querySelectorAll(".buttons div.button")) {

        let d = i.querySelector(".growable");
        let boundingClientRect = i.getBoundingClientRect();

        d.style.width = boundingClientRect.width + 'px';
        d.style.height = boundingClientRect.height + 'px';
        d.style.left = boundingClientRect.left + 'px';
        d.style.top = (boundingClientRect.top - boundingClientRect.height) + 'px';

        d.addEventListener("click", handleGrowableClicked);

        i.querySelector(".close").addEventListener("click",function(e){

            if (d.classList.contains("grown"))
            {
                d.scrollTo(0,0);
                d.addEventListener("transitionend",function(){
                    for(let i of document.querySelectorAll(".growable")){
                        i.addEventListener("click",handleGrowableClicked);
                    }
                    d.style.zIndex = '0';
                    d.style.transition = 'none';
                },{once: true});
                d.classList.remove("grown");
            }
        });

    }

    ["resize","scroll","ontouchmove","ontouchend"].forEach(event => {
        addEventListener(event,function(e){

            for(let i of document.querySelectorAll(".buttons div.button")) {
                let d = i.querySelector('.growable');
                let boundingClientRect = i.getBoundingClientRect();
                d.style.width = boundingClientRect.width + 'px';
                d.style.height = boundingClientRect.height + 'px';
                d.style.left = boundingClientRect.left + 'px';
                d.style.top = boundingClientRect.top + 'px';
            }

        });
    });

    ["gestureend","gesturestart","gesturechange"].forEach(event => {
        document.addEventListener(event,function(e){
            e.preventDefault();
        });
    });

    function handleGrowableClicked(e) {
        for(let i of document.querySelectorAll(".growable")){
            i.removeEventListener("click",handleGrowableClicked);
        }
        let d = e.target.closest(".growable");
        d.style.transition = 'width 1s,height 1s,transform 1s,left 1s,top 1s';
        d.style.zIndex = '100';
        d.classList.add("grown");
    }

    setTimeout(function() {
        for(let i of document.querySelectorAll(".buttons div.button")) {
            let d = i.querySelector('.growable');
            d.addEventListener("transitionend",function(){
                d.classList.remove("initial");
            },{once:true});
            let boundingClientRect = i.getBoundingClientRect();
            d.style.width = boundingClientRect.width + 'px';
            d.style.height = boundingClientRect.height + 'px';
            d.style.left = boundingClientRect.left + 'px';
            d.style.top = boundingClientRect.top + 'px';
            d.style.opacity = 1;
        }
    }, 200);

}