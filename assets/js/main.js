/*********************************************************************/

    document.querySelector(".settings-box i").onclick = ()=> {

        document.querySelector(".settings-box").classList.toggle("opened");

    }

    document.querySelector(".settings-box .reset-options").onclick = function(){
        localStorage.clear();

        window.location.reload();
    };


/*********************************************************************/

function handleActive(ev){
    ev.target.parentElement.querySelectorAll(".active").forEach(ele=>{
        ele.classList.remove("active");
    });

    ev.target.classList.add("active");
}

/*********************************************************************/


    let color = localStorage.getItem("color-option");

    if(color != null){
        document.documentElement.style.setProperty("--main-color", color);

        document.querySelectorAll(".color-list li").forEach(li =>{

            li.classList.remove("active");

            if(li.dataset.color == color){

                li.classList.add("active");
            }

        }) ;

    }


    /*********************************************************************/
        
        const colorsLi = document.querySelectorAll(".color-list li");

        colorsLi.forEach(li => {
            li.addEventListener("click", (e)=>{

                document.documentElement.style.setProperty("--main-color", e.target.dataset.color);

                localStorage.setItem("color-option", e.target.dataset.color ) ;

                handleActive(e);

            })
        })

    /*********************************************************************/
        
        let random_background = true;
        let backgroundInterval;

       
        let background = localStorage.getItem("background-option");

        if(background != null){

            if(background == "true"){

                random_background = true ;

                document.querySelector(".background-option .yes").classList.add("active")

            }else{
                random_background = false ;

                document.querySelector(".background-option .yes").classList.remove("active");
                document.querySelector(".background-option .no").classList.add("active");

            }
        }

        

        const BackgroundOptionSpan = document.querySelectorAll(".background-option span");

        BackgroundOptionSpan.forEach(span => {
            span.addEventListener("click", (s)=>{
              
                handleActive(s);

                if(s.target.dataset.background == "yes"){
                    random_background = true ;
                    randomizeImgs();
            
                    localStorage.setItem("background-option", true);

                }else{
                    random_background = false ;
                    clearInterval(backgroundInterval);

                    localStorage.setItem("background-option", false);
                }
            })
        });

    /************************/


    let hero_image = document.querySelector(".hero-image");

    let imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];
    
    function randomizeImgs(){

        if (random_background == true){

            backgroundInterval = setInterval(() => {
                let randomIndex = Math.floor(Math.random() * imgsArray.length);
            
                hero_image.style.backgroundImage = `url("assets/images/${imgsArray[randomIndex]}")` ;
        
            }, 7000);

        }else{
            clearInterval(backgroundInterval);
        }

    };

    randomizeImgs();
    
     
    /*********************************************************************/

    let bulletsOptionSpan = document.querySelectorAll(".bullets-option span");

    let bulletContainer = document.querySelector(".nav-bullets");

    let bulletsLocal = localStorage.getItem("bullets-option");

    if (bulletsLocal != null){

        bulletsOptionSpan.forEach(span=>{
            span.classList.remove("active");

            if(bulletsLocal == "block"){

                bulletContainer.style.display = "block" ;

                document.querySelector(".bullets-option .yes").classList.add("active");
            }else{

                bulletContainer.style.display = "none" ;

                document.querySelector(".bullets-option .no").classList.add("active");

            }
        })
    }

    bulletsOptionSpan.forEach(span =>{

        span.addEventListener("click",(e)=>{

            if(span.dataset.bullets == "yes"){

                bulletContainer.style.display = "block" ;

                localStorage.setItem("bullets-option", "block");

            }else{
                bulletContainer.style.display = "none" ;
    
                localStorage.setItem("bullets-option", "none");

            }

            handleActive(e);
        })

        

    });

   

    /*********************************************************************/


    window.onscroll = function(){
        
        let ourSkills = document.querySelector(".skills");

        let skillsOffsetTop = ourSkills.offsetTop;

        let skillsHeight = ourSkills.offsetHeight ;

        let windowHeight = this.innerHeight  ;

        let windowScrollTop = this.pageYOffset ;



        if(windowScrollTop > ((skillsOffsetTop + skillsHeight - windowHeight)-300 ) ){
           
            let skillsSpan = document.querySelectorAll(".skills span");

            skillsSpan.forEach(span =>{
                span.style.width = span.dataset.progress;
            });
        }

    };


    /*********************************************************************/

    let gallaryImgs = document.querySelectorAll(".gallary img");

        gallaryImgs.forEach(img =>{
            img.addEventListener("click", ()=>{

                let popupOverlayDiv = document.createElement("div");
                popupOverlayDiv.classList.add("popup-overlay");
                document.body.appendChild(popupOverlayDiv);

                let popupBox = document.createElement("div");
                popupBox.className = "popup-box" ;

                let popupImg = document.createElement("img");
                popupImg.src = img.src ;

                popupBox.appendChild(popupImg);
                document.body.appendChild(popupBox);

                if(img.alt != null){

                    let imgHead = document.createElement("h3");
                    let imgHeadText = document.createTextNode(img.alt);

                    imgHead.appendChild(imgHeadText);

                    popupBox.prepend(imgHead);

                }

                let closeBtn = document.createElement("span");
                let closeBtnText = document.createTextNode("X");

                closeBtn.className = "close-btn";

                closeBtn.appendChild(closeBtnText);

                popupBox.prepend(closeBtn);


            });

            document.addEventListener("click", function(e){
                if(e.target.className == "close-btn"){
                    e.target.parentElement.remove();
                    if(document.querySelector(".popup-overlay")){
                        document.querySelector(".popup-overlay").remove();
                    }
                }
            });

        });

    /*********************************************************************/

       const navBullets = document.querySelectorAll(".nav-bullets .bullet");

       const headerLinks = document.querySelectorAll(".header .links");

       function scrollToSection (element){

        element.forEach(ele =>{

            ele.addEventListener("click",(e)=>{

                e.preventDefault();

                document.querySelector(e.target.dataset.section).scrollIntoView({
                    
                    behavior: "smooth" 
                });
            })
        })

       } 

       scrollToSection(navBullets);
       scrollToSection(headerLinks);
       
       
    /*********************************************************************/

       let menuBtn  = document.querySelector(".links-container .toggle-menu");
       let menuList = document.querySelector(".links-container .links"); 

       menuBtn.onclick = function(e){
           e.stopPropagation();
           this.classList.toggle("menu-opened");
           menuList.classList.toggle("opened");
       };

      document.addEventListener("click", (ev) =>{
          if(ev.target != menuBtn && ev.target != menuList){
              if(menuList.classList.contains("opened")){
                menuBtn.classList.toggle("menu-opened");
                menuList.classList.toggle("opened");
               }
            }
      });

    /*********************************************************************/





