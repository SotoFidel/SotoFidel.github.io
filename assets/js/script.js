const templateInfo = {
    "Education": `
                    <div class="info text">
                        <div>
                            <h3>New Mexico State University</h3>
                            <span> | Bachelor of Science - Computer Science | August 2018 - May 2022</span>
                        </div>
                        <ul>
                            <li>
                                Relevant coursework: Linear Algebra &#x2022; Operating Systems &#x2022; Parallel Programming &#x2022;
                                Data Structures & Algorithms &#x2022; Human Centered Computing &#x2022; Linux System Administration.
                            </li>
                            <li>
                                Graduated as a Crimson Scholar with 3.69 GPA and University Honors.
                            </li>
                            <li>
                                <b>Senior Project: Qualitative Analysis in VR</b>
                                <ul>
                                    <li>
                                        Worked with fellow students to create a VR application in Unity that enables the
                                        user to conduct qualitative analysis in a VR environment.
                                    </li>
                                    <li>
                                        Implemented the 'virtual pencil' feature which would allow the user to draw in 
                                        3D space and--from any distance--point and draw/annotate on cards and whiteboards.
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>

                `,
    "Experience": `<div class="info text">
                    <div><h3>Full-Stack Software Developer</h3><span> | Steele Consulting | June 2019 - July 2024</span></div>
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
                    <div><h3> Lab Proctor</h3><span> | NMSU | January 2019 - June 2022</span></div>
                    <ul>
                        <li> 
                        Oversaw the computer equipment. Ensured cleanliness of equipment during opening shift and
                        security during the closing shift. Assisted students with CS related homework.
                        </li>
                    </ul>
                    <hr/>
                    <div><h3>Crew Member</h3><span> | NMSU KRWG News | June 2019 - June 2022</span></div>
                    <ul>
                        <li>
                            Coordinated and communicated with fellow crew members to ensure the success of our broadcasts
                            in this time sensitive environment. Worked in a rotation of roles
                            (media master, cameraman, floor manager) during live broadcasts.
                        </li>
                    </ul>
                  </div>`,
    "Projects": "",
    "Skills": `
                <div class="info text">
                    
                    <div><h4>Programming Languages</h4></div>
                    <p>C# &#x2022; SQL &#x2022; PHP &#x2022; Java &#x2022; Javascript/Typescript</p>
                    
                    <div><h4>Frameworks/Libraries</h4></div>
                    <p>Angular &#x2022; .Net Core &#x2022; Entity Framework &#x2022; AngularJs &#x2022; jQuery &#x2022; CodeIgniter &#x2022; Google APIs</p>
                    
                    <div><h4>Concepts</h4></div>
                    <p>Object Oriented Programming, Design Patterns, MVC, MVVM, REST APIs, Agile, OData, Data Structures & Algorithms, CICD, Research skills</p>

                    <div><h4>Cloud Computing </h4></div>
                    <p>Amazon AWS (CodeCommit, CodeBuild, CodeDeploy, CloudFront, S3, CloudWatch, SQS, SNS, EC2 and EC2 autoscaling, RDS) &#x2022; Microsoft Azure (CICD, Build Agents, networking)</p>

                    <div><h4>Tools / Software</h4></div>
                    <p>Git &#x2022; Docker &#x2022; Package Managers (Nuget, NuGet, Composer) &#x2022; Postman &#x2022; Chrome Dev Tools &#x2022; Microsoft Azure &#x2022; Amazon AWS &#x2022; Github &#2022; Microsoft IIS</p>
                    
                    <div><h4>Soft Skills</h4></div>
                    <p>Coordination and Collaboration &#x2022; Teamwork &#x2022; Communication (written and verbal)</p>

                    <div><h4>Bilingual</h4></div>
                    <p>English and Spanish</p>
                </div>
                `
};

window.onload = () => {
    
    for(let i of document.querySelectorAll(".buttons div.button")) {

        let d = document.createElement("div");
        let boundingClientRect = i.getBoundingClientRect();

        d.innerHTML = `
                        <div class="info close"><button>X</button></div>
                        <p class="button-title" style="transition: font-size 1s;">` +
                        i.dataset.title+"</p>" +
                        templateInfo[`${i.dataset.title ?? ''}`];

        d.classList.add("growable");
        d.style.width = boundingClientRect.width + 'px';
        d.style.height = boundingClientRect.height + 'px';
        d.style.left = boundingClientRect.left + 'px';
        d.style.top = boundingClientRect.top + 'px';
        i.append(d);

        i.closest(".button").addEventListener("click", handleGrowableClicked);

        i.querySelector(".close").addEventListener("click",function(e){
            e.stopPropagation();

            if (d.classList.contains("grown"))
            {
                d.addEventListener("transitionend",function(){
                    for(let i of document.querySelectorAll(".button")){
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
            
            // document.querySelector("#event").innerHTML = "Last event: " + e.type;

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

    function handleGrowableClicked(e) {
        for(let i of document.querySelectorAll(".button")){
            i.removeEventListener("click",handleGrowableClicked);
        }
        console.log(e,e.target);
        let d = e.target.closest(".growable");
        d.style.transition = 'width 1s,height 1s,transform 1s,left 1s,top 1s';
        d.style.zIndex = '100';
        d.classList.add("grown");
    }

}