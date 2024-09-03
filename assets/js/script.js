const templateInfo = {
    "Education": "",
    "Experience": `<div class="info text">
                    <div><h3 style="display: inline">Full-Stack Software Developer</h3><span> | Steele Consulting | June 2019 - July 2024</span></div>
                    <ul>
                        <li>
                            Developed and maintained web apps that automated business processes for clients. 
                            Gathered needs and requirements from clients to develop software. Consulted clients as well
                            to develop requirements. Able to do this in English and Spanish.
                        </li>
                        <li>
                            Researched topics (examples include microservice architecture, 3rd party APIs and libraries,
                            SQL table partitioning, and possible task implementations) and presented findings to help
                            team leadership make more informed decisions about the direction and scaling of projects.
                        </li>
                        <li>
                            DevOps
                            <ul>
                                <li>
                                    AWS: Added CI/CD pipelines for new and legacy projects.
                                    Worked with EC2, Cloudwatch alarms, SQS, and SNS as well.
                                </li>
                                <li>
                                    Azure: Worked on site migrations and reconfigurations. Also worked with build agents.
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <hr/>
                    <div style="display:inline"><h3 style="display:inline"> Lab Proctor</h3><span> | NMSU | January 2019 - June 2022</span></div>
                    <ul>
                        <li> 
                        Oversaw the computer equipment. Ensured cleanliness of equipment during opening shift and
                        security during the closing shift. Assisted students with CS related homework.
                        </li>
                    </ul>
                    <hr/>
                    <div style="display:inline"><h3 style="display:inline">Crew Member</h3><span> | NMSU KRWG News | June 2019 - June 2022</span></div>
                    <ul>
                        <li>
                            Coordinated and communicated with fellow crew members to ensure the success of our broadcasts
                            in this time sensitive environment. Worked in a rotation of roles
                            (media master, cameraman, floor manager) during live broadcasts.
                        </li>
                    </ul>
                  </div>`,
    "Projects": "",
};

window.onload = () => {
    
    for(let i of document.querySelectorAll(".buttons div.button")) {

        let d = document.createElement("div");
        let boundingClientRect = i.getBoundingClientRect();

        d.innerHTML = `
                        <div class="info close"><button>X</button></div>
                        <p class="button-title" style="transition: font-size 1s;">` +
                        i.dataset.title+"</p>" +
                        templateInfo[`${i.dataset.title}`];
        d.classList.add("growable");
        d.style.width = boundingClientRect.width + 'px';
        d.style.height = boundingClientRect.height + 'px';
        d.style.left = boundingClientRect.x + 'px';
        d.style.top = boundingClientRect.y + 'px';
        i.append(d);

        i.closest(".button").addEventListener("click",function() {

            console.log("clicked");
            if(d.classList.contains("grown"))
            {
                return;   
            }

            d.style.transition = 'width 1s,height 1s,transform 1s,left 1s,top 1s';
            d.style.zIndex = '100';
            d.classList.add("grown");
        });

        i.querySelector(".close").addEventListener("click",function(e){
            e.stopPropagation();

            if (d.classList.contains("grown"))
            {
                d.addEventListener("transitionend",function(){
                    d.style.zIndex = '0';
                    d.style.transition = 'none';
                },{once: true});
            
                d.classList.remove("grown");
            }
        });

    }

    ["resize","scroll","ontouchmove","ontouchend"].forEach(event => {
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
    
}