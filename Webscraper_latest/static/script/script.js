// Ders Aramak için, örnek : mvc
var sonSayfa = 1;
var lessonName="";
var ordering="";
var text =  document.getElementById('txt').value;
var languageUrl ="";
var timeUrl ="";
var ratings ="";
var page=Number(1);
var page_size=Number(12);
var loadImage = document.querySelector('#loading');
//var search = document.getElementById('txt').value;
    function order(that){
    ordering =that.value;
    filtreCalistir(text,languageUrl,ratings,ordering);
}
function Scrape(){
    alert("aa");
    const request = require('request');
    const cheerio = require('cheerio');


(request("https://webtekno.com", (error,response, html)=>{
    response.statusCode == 200;
    if(!error && response.statusCode == 200){
        const $ = cheerio.load(html);
        var html="";
        //const siteHeading = $('.header__appbar--left__menu__list');
        $('.header__appbar--left__menu__list a').each((i,el)=>{
            
            // response.setHeader('Content-Type', 'text/plain');
            const item = $(el).text();
           
            console.log(item);
            
            html+=`${item} `;
            // response.end(item);
        })
        alert(html);
    }
}))
}


     
async function  getFilteredCourse(search,languageUrl,ratings,ordering,page,timeUrl){
   
        loadImage.style.display="block";   
        deleteMyTable();
        var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        let =  targetUrl = `https://www.udemy.com/api-2.0/courses/?page=${page}&page_size=${page_size}&ratings=${ratings}&language=${languageUrl}&ordering=${ordering}&duration=${timeUrl}&search=${search}`;
        const url = proxyUrl;
        //targetUrl = `https://www.udemy.com/api-2.0/courses/?search=javascript`;
        const searchLesson = await fetch(proxyUrl + targetUrl,{
            headers: {
                method:'GET',
                
                'Authorization': 'Basic dlNxZUNjSWVSWDMyU0ZZSWxrS3NzYVliVkQ2ckZ0NnJGbDQxVUVPQzp0Y0owMHFGVjZVV2pHRUdDUGlncGhDM2VvdG5UNXhuZ3o1UFRuYWhERUNQbTdPRGZZU25qeE1JWkxKbFlOYTZjdVN1NklDbkhMU1VzT0tHMmFhVnQ3b01ISXJWak9GVnlLa09CbTNtVlU4MDlHeXhKdUdYSnFCUnFIMjBWdGVhOQ=='
             }
          })
        //   const lessons= await searchLesson.json();
        //   return {
        //     lessons
        //  }
        .then(response=>{
            return response.json();
        })
        
        .then(users=>{
           var html="";
           var displayName="";
           var i = 1;
           console.log("starts");
           users.results.forEach(lesson=>{
               
                lesson.visible_instructors.forEach(name=>{
                 displayName = name.title;
               })
               html += `
               <div class="container">
               <div class="row">
                 <div class="col-md-1 align-self-center">
                 <input type="checkbox" class="comments" id="${lesson.id}" value="${lesson.title}"> 
                 <label for="${lesson.id}">Seç <span id="${lesson.id}" class="text-muted"></span></label>
                 </div>
               <div class="col-md-11">
               
               <nav>
               <div class="nav nav-tabs" id="nav-tab" role="tablist">
                 <a class="nav-item nav-link active" id="nav-course-tab" data-toggle="tab" href="#nav-course-${i}" role="tab" 
                   aria-selected="true">Kurs Bilgisi</a>
                 <a class="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" 
                   aria-selected="false">Kurs Detay</a>
                 
               </div>
             </nav>
             <div class="tab-content" id="nav-tabContent">
               <div class="tab-pane fade show active" id="nav-course-${i}" role="tabpanel" aria-labelledby="nav-course-tab">
                 <div class="card mb-3 courseDiv">
                       <div class="row no-gutters">
                         <div class="col-md-4">
                           <img src=${lesson.image_240x135} class="card-img" alt="..." />
                         </div>
                         <div class="col-md-8">
                           <div class="card-body">
                             <h5 class="card-title">${lesson.title}</h5>
                             <p class="card-text">
                             <span class="list-view-course-card--meta-item--1Pyfe">Price : <b>${lesson.price_detail.price_string}</b></span>
                             </p>
                             <p class="card-text">
                             <span class="list-view-course-card--meta-item--1Pyfe">Instructor : <b>${displayName}</b></span>
                             </p>
                             <div class="row">
                             <div class="col-md-4">
                             <p class="card-text">
                             <span class="badge badge-dark" >${lesson.id}</span>
                             </p>
                             </div>
                             <div>
                                 <button type="button"  value="${lesson.id}" id="${lesson.title}"  class="btn btn-primary btnYorumlarıGoster" onclick="Comment(this)">Yorumları Göster</button>
                                 
                             </div>
                             </div>
                           </div>
                         </div>
                       </div>
                     </div>
               </div>
               <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                 <div class="card mb-3 courseDiv">
                 Lorem ipsum dolor sit
                 amet consectetur adipisicing elit. Eligendi, aliquam.
                 </div>  
               </div>
               
             </div>
             </div>
              </div>
              </div>
               `;
                  document.querySelector('#lessonsList').innerHTML=html;
                  i = i + 1 ;
                  console.log(i);
            });
            getPaging2(users);
            var pageCount = Number(Math.ceil(users.count / page_size));
            var html2 ="";
            for(let i=1;i<=Number(pageCount);i++){
                if(Number(page) === Number(i)){
                    html2 += ` <li class="page-item ">
                                <button id="${i}" class="active" value="${i}" type="button" class="btn-page" onclick="Paging(this)">
                                    ${i}
                                </button>
                            </li>`;
                }else{
                    html2 += ` <li class="page-item">
                                <button id="${i}" value="${i}" type="button" class="btn-page" onclick="Paging1(this)">
                                    ${i}
                                </button>
                            </li>`;
                }
                
                
                // document.querySelector('#links').innerHTML = html2;
            }
            totalCourseCount(search,users);  
            
        }).catch(error=>{
            console.log(error);
        })
        loadImage.style.display="none"; 
}

function filtreCalistir(){
        sonSayfa =1;
        // Puan filtreleme işlemi (Ratings)
         ratings = $('.chk:checked').val();
        
         // Dil filtreleme işlemi (Language)
        var checkLanguage = document.getElementsByClassName('language');
        languageUrl="";
       
        for(i=0; i<checkLanguage.length; i++){
            if(checkLanguage[i].checked === true){
                languageUrl +=checkLanguage[i].value + "|";
            }
        }
        //languageUrl+='&';
        languageUrl = languageUrl.slice('|',-1);
        languageUrl+='&';
        //alert(languageUrl);

        // Kurs saati uzunluğuna göre filtreleme işlemi (Duration)
        var checkTime = document.getElementsByClassName('duration');
        timeUrl = "";

        for(i=0;i<checkTime.length;i++){
            if(checkTime[i].checked === true){
                timeUrl += checkTime[i].value + "|";
            }
        }
        
        timeUrl = timeUrl.slice('|',-1);
        getFilteredCourse(text,languageUrl,ratings,ordering,page,timeUrl);
}

function yorumlarıYazdir(){
    var commentToCsv = [];
    var courseNames = [];
    var checkComments = document.getElementsByClassName('comments');
    for(i=0;i<checkComments.length;i++){
        if(checkComments[i].checked === true){
            commentToCsv.push(checkComments[i].id);
            courseNames.push(checkComments[i].value);
        }
    }
    return [commentToCsv,courseNames];
}



$(document).ready(function(){
    // const courseList = document.querySelector('#lessonsList.nav-item');
    // courseList.addEventListener('mouseover',eventHandler);
    // function eventHandler(e){
    //     console.log(`event type : ${e.type}`);
    // }
    document.getElementById('downloadComment').addEventListener('click',Csv);
    document.getElementById('allComments').addEventListener('click',function(){
        $(".comments").attr("checked", "true");
    })
    document.getElementById('btn').addEventListener('click',function(){
        console.log('aa');
        sonSayfa =1;
        
        //var text = document.getElementById('txt').value;
        deleteMyTable();
        document.getElementById('tumFiltreler').style.display="block";
        document.getElementById('orderCourse').style.display="block";
        page =1;
        text = document.getElementById('txt').value;
        
        if(text != ""){
            $('#allFilter').slideDown("slow");
            $('input[type="checkbox"]:checked').prop('checked',false);
            getCourse(text,1);
            console.log(text);
            getCourseCount(text);
            getRatingCount(text);
            getDurationCount(text);
            //document.getElementById('tumFiltreler').style.display = "block";
            $('#tumFiltreler').slideDown("slow");
            $('#filtreler').slideUp("slow");
            
              
            //document.getElementById('totalCourseCount').style.display = "block";
            
        }
        
        
    });

    $('#btn').keypress(function(e){
        if(e.which === 13){//Enter key pressed
            $('#btn').click();//Trigger search button click event
        }
    });
   
        // let id = document.querySelectorAll(this.value);

    // Filtrelere göre sonuçları getirir.
    document.getElementById('filtreCalistir').addEventListener('click',filtreCalistir);
    document.getElementById('yorumlariYazdir').addEventListener('click',yorumlarıYazdir);
    
    //Filtreleri Temizle
    document.getElementById('filtreTemizle').addEventListener('click',function(){
        var text = document.getElementById('txt').value;
        //$('input[type="checkbox"]:checked').prop('checked',false);  /* Seçili olan checkboxları ipta butonuna basınca temizler */
        // document.getElementById('filtreler').style.display = "none";
        // document.getElementById('tumFiltreler').style.display = "block";
        $('#filtreler').slideUp("slow");
        $('#tumFiltreler').slideDown("slow");
        //getCourse(text);
    }) 

    // Tum Filtreleme butonuna tıklanınca filtreleme ekranını getir.
    document.getElementById('tumFiltreler').addEventListener('click',function(){
        //document.getElementById('filtreler').style.display = "block";
        $('#filtreler').slideDown("slow");
        $('#tumFiltreler').slideUp("slow");
        //document.getElementById('tumFiltreler').style.display = "none";
    })
    
        //$('#myTable').DataTable();
    
   
});

// Filtrelenmiş Kurslar


// Seçilen kursa ait yorumları getir.
function getComment(id){
    document.getElementById('comment').style.display="block";
    var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
    targetUrl = `https://www.udemy.com/api-2.0/courses/895138/reviews?page=1&page_size=1000&is_text_review=1`;
    //targetUrl = `https://www.udemy.com/api-2.0/courses/${id}/reviews?page=1&page_size=1000&is_text_review=1`;
    
   
    fetch(proxyUrl + targetUrl,{
        headers: {
            method:'GET',
            'Authorization': 'Basic dlNxZUNjSWVSWDMyU0ZZSWxrS3NzYVliVkQ2ckZ0NnJGbDQxVUVPQzp0Y0owMHFGVjZVV2pHRUdDUGlncGhDM2VvdG5UNXhuZ3o1UFRuYWhERUNQbTdPRGZZU25qeE1JWkxKbFlOYTZjdVN1NklDbkhMU1VzT0tHMmFhVnQ3b01ISXJWak9GVnlLa09CbTNtVlU4MDlHeXhKdUdYSnFCUnFIMjBWdGVhOQ=='
         }
      })
    .then(response=>{
        return response.json();
    }).then(users=>{
        // Yorumlar için oluşan tabloyu siler, temizler.
        
        deleteMyTable();
        document.getElementById('comment').style.display="block";
       var html="";
       var i=1;
          users.results.forEach(user=>{
              if(user.content == "" || user.rating == "" || user.user.display_name== "" || 
                    user.id =="" || user.created ==""){
               
                }
               else
               {
                    html += `
                
                    <tr>
                      <td>${i}</td>
                      <td>${user.user.display_name}</td>
                      <td>${user.id}</td>
                      <td>${user.content}</td>
                      <td>${user.rating} / 5</td>
                      <td>${user.created}</td>
                    </tr>
                       
                    `;
                    i++;
                    document.querySelector('#comments').innerHTML=html;

                }
                
                
        });
        
        $('#myTable').DataTable();
        loadImage.style.display="none";
        
    }).catch(error=>{
        console.log(error);
    })
    $('#comment').slideDown("slow")
   
  }



// Yorumları Getir butonuna basılırsa lesson.id yi getComment'e gönderir.
function Comment(that){
    getComment(that.value);
    lessonName = String(that.id);
     document.getElementById('commentFor').innerHTML = `<b><i>${String(that.id)}</i></b> kursu için yapılan yorumlar..`;
     console.log(lessonName);
    loadImage.style.display="block";
}

// Girilen kurs adını udemy üzerinde arar.
async function  getCourse(search,page){
   
    loadImage.style.display="block"; 
    deleteMyTable();
    document.querySelector('#lessonsList').innerHTML ="";
    var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
    //targetUrl = `https://www.udemy.com/api-2.0/courses/?page=${page}&page_size=${page_size}&search=${search}`;
    targetUrl = `https://www.udemy.com/api-2.0/courses/?page=${page}&page_size=100&search=${search}`;
    
    //targetUrl = `https://www.udemy.com/api-2.0/courses/?search=javascript`;
    await fetch(proxyUrl + targetUrl,{
        headers: {
            method:'GET',
            'Authorization': 'Basic dlNxZUNjSWVSWDMyU0ZZSWxrS3NzYVliVkQ2ckZ0NnJGbDQxVUVPQzp0Y0owMHFGVjZVV2pHRUdDUGlncGhDM2VvdG5UNXhuZ3o1UFRuYWhERUNQbTdPRGZZU25qeE1JWkxKbFlOYTZjdVN1NklDbkhMU1VzT0tHMmFhVnQ3b01ISXJWak9GVnlLa09CbTNtVlU4MDlHeXhKdUdYSnFCUnFIMjBWdGVhOQ=='
         }
      })
    
    
    .then(response=>{
        return response.json();
    })
    
    .then(users=>{
       var html="";
       var displayName="";
       var i = 1;
          users.results.forEach(lesson=>{
              
              console.log("starts");
               lesson.visible_instructors.forEach(name=>{
                displayName = name.title;
              })
              html += `
              <div class="container">
                    <div class="row">
                        <div class="col-md-1 align-self-center">
                            <input type="checkbox" class="comments" id="${lesson.id}" value="${lesson.title}"> 
                            <label for="${lesson.id}">Seç <span id="${lesson.id}" class="text-muted"></span></label>
                        </div>
                        <div class="col-md-11">
                        <div class="container classList">
                        <div class="row">
                          <div class="col-xs-12 ">
                            <nav>
                              <div class="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                                <a class="nav-item nav-link active" id="nav-${i}-tab" data-toggle="tab" href="#nav-${i}" role="tab" aria-controls="nav-${i}" aria-selected="true">Kurs Bilgileri</a>
                                <a class="nav-item nav-link" id="nav-${i+1}-tab" value="${lesson.url}" onclick="webScraper('${lesson.url}', nav-${i+1}')" data-toggle="tab" href="#nav-${i+1}" role="button" aria-controls="nav-${i+1}" aria-selected="false">Kurs Detayı</a>
                                
                              </div>
                            </nav>
                            <div class="tab-content py-3 px-3 px-sm-0" id="nav-tabContent">
                              <div class="tab-pane fade show active" id="nav-${i}" role="tabpanel" aria-labelledby="nav-${i}-tab">
                              <div class="card mb-3 courseDiv">
                              <div class="row no-gutters">
                                <div class="col-md-4">
                                  <img src=${lesson.image_240x135} class="card-img" alt="..." />
                                </div>
                                <div class="col-md-8">
                                  <div class="card-body">
                                    <h5 class="card-title">${lesson.title}</h5>
                                    <p class="card-text">
                                    <span class="list-view-course-card--meta-item--1Pyfe">Price : <b>${lesson.price_detail.price_string}</b></span>
                                    </p>
                                    <p class="card-text">
                                    <span class="list-view-course-card--meta-item--1Pyfe">Instructor : <b>${displayName}</b></span>
                                    </p>
                                    <div class="row">
                                    <div class="col-md-4">
                                    <p class="card-text">
                                    <span class="badge badge-dark" >${lesson.id}</span>
                                    </p>
                                    </div>
                                    <div>
                                        <button type="button"  value="${lesson.id}" id="${lesson.title}"  class="btn btn-primary btnYorumlarıGoster" onclick="Comment(this)">Yorumları Göster</button>
                                        
                                    </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                              </div>
                              <div class="tab-pane fade" id="nav-${i+1}" role="tabpanel" aria-labelledby="nav-${i+1}-tab">
                              <div class="card mb-3 courseDiv">  
                              Ahmet Et et consectetur ipsum labore excepteur est proident excepteur ad velit occaecat qui minim occaecat veniam. Fugiat veniam incididunt anim aliqua enim pariatur veniam sunt est aute sit dolor anim. Velit non irure adipisicing aliqua ullamco irure incididunt irure non esse consectetur nostrud minim non minim occaecat. Amet duis do nisi duis veniam non est eiusmod tempor incididunt tempor dolor ipsum in qui sit. Exercitation mollit sit culpa nisi culpa non adipisicing reprehenderit do dolore. Duis reprehenderit occaecat anim ullamco ad duis occaecat ex.
                              </div>
                              </div>
                              
                            </div>
                          
                          </div>
                        </div>
                  </div>
                </div>
          </div>
                               
                        </div>
                    </div>
             </div>
              `;
              $('#totalCourseCount').show("fast");
              document.querySelector('#lessonsList').innerHTML=html;
              i=i+2;
              
        });
        getPaging2(users);
        var pageCount = Number(Math.ceil(users.count / page_size));
        var html2 ="";
        for(let i=1;i<=Number(pageCount);i++){
            if(Number(page) === Number(i)){
                html2 += ` <li class="page-item ">
                            <button id="${i}" class="active" value="${i}" type="button" class="btn-page" onclick="Paging(this)">
                                ${i}
                            </button>
                        </li>`;
            }else{
                html2 += ` <li class="page-item">
                            <button id="${i}" value="${i}" type="button" class="btn-page" onclick="Paging(this)">
                                ${i}
                            </button>
                        </li>`;
            }
            
            
            // document.querySelector('#links').innerHTML = html2;
        }
        totalCourseCount(search,users);  
        
    }).catch(error=>{
        console.log(error);
    })
    loadImage.style.display="none"; 
  }
  


// Ders sayılarını filtreleme bölümünde Dil kısmında yazdırır.
async function  getCourseCount(search){
    var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    let =  targetUrl = `https://www.udemy.com/api-2.0/courses/?search=${search}`;
    const url = proxyUrl;
    //targetUrl = `https://www.udemy.com/api-2.0/courses/?search=javascript`;
    const searchLesson = await fetch(proxyUrl + targetUrl,{
        headers: {
            method:'GET',
            
            'Authorization': 'Basic dlNxZUNjSWVSWDMyU0ZZSWxrS3NzYVliVkQ2ckZ0NnJGbDQxVUVPQzp0Y0owMHFGVjZVV2pHRUdDUGlncGhDM2VvdG5UNXhuZ3o1UFRuYWhERUNQbTdPRGZZU25qeE1JWkxKbFlOYTZjdVN1NklDbkhMU1VzT0tHMmFhVnQ3b01ISXJWak9GVnlLa09CbTNtVlU4MDlHeXhKdUdYSnFCUnFIMjBWdGVhOQ=='
         }
      })
    //   const lessons= await searchLesson.json();
    //   return {
    //     lessons
    //  }
    
    .then(response=>{
        return response.json();
    })
    .then(users=>{
        if(users.aggregations.forEach(lng=>{
            
           if(lng.id=="language"){
               var dersMiktari = lng;
               
               dersMiktari.options.forEach(ders=>{
                if(ders.value =='en'){
                    document.getElementById('en').innerHTML=ders.count;
                }
               })
           }
           if(lng.id=="language"){
                var dersMiktari = lng;
                
                dersMiktari.options.forEach(ders=>{
                if(ders.value =='pt'){
                    document.getElementById('pt').innerHTML=ders.count;
                }
                })
            }
            if(lng.id=="language"){
                var dersMiktari = lng;
                
                dersMiktari.options.forEach(ders=>{
                if(ders.value =='es'){
                    document.getElementById('es').innerHTML=ders.count;
                }
                })
            }
            if(lng.id=="language"){
                var dersMiktari = lng;
               
                dersMiktari.options.forEach(ders=>{
                if(ders.value =='tr'){
                    document.getElementById('tr').innerHTML=ders.count;
                }
                })
            }
           
        }));
     })
    
    .catch(error=>{
        console.log(error);
    })
  }



// Derslerin puan aralıklarındaki sayılarını filtreleme bölümüne yazdırır.
async function  getRatingCount(search){
    var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    let =  targetUrl = `https://www.udemy.com/api-2.0/courses/?search=${search}`;
    const url = proxyUrl;
    //targetUrl = `https://www.udemy.com/api-2.0/courses/?search=javascript`;
    const searchLesson = await fetch(proxyUrl + targetUrl,{
        headers: {
            method:'GET',
            
            'Authorization': 'Basic dlNxZUNjSWVSWDMyU0ZZSWxrS3NzYVliVkQ2ckZ0NnJGbDQxVUVPQzp0Y0owMHFGVjZVV2pHRUdDUGlncGhDM2VvdG5UNXhuZ3o1UFRuYWhERUNQbTdPRGZZU25qeE1JWkxKbFlOYTZjdVN1NklDbkhMU1VzT0tHMmFhVnQ3b01ISXJWak9GVnlLa09CbTNtVlU4MDlHeXhKdUdYSnFCUnFIMjBWdGVhOQ=='
         }
      })
    //   const lessons= await searchLesson.json();
    //   return {
    //     lessons
    //  }
    
    .then(response=>{
        return response.json();
    })
    .then(users=>{
        if(users.aggregations.forEach(rtg=>{
           if(rtg.id=="ratings"){
               var RatingCount = rtg;
               
               RatingCount.options.forEach(rating=>{
                if(rating.value =='4.5'){
                    document.getElementById('rating45').innerHTML=rating.count;
                }
               })
           }
           if(rtg.id=="ratings"){
                var RatingCount = rtg;
                
                RatingCount.options.forEach(rating=>{
                if(rating.value =='4.0'){
                    document.getElementById('rating40').innerHTML=rating.count;
                }
                })
            }
            if(rtg.id=="ratings"){
                var RatingCount = rtg;
                
                RatingCount.options.forEach(rating=>{
                if(rating.value =='3.5'){
                    document.getElementById('rating35').innerHTML=rating.count;
                }
                })
            }
            if(rtg.id=="ratings"){
                var RatingCount = rtg;
                
                RatingCount.options.forEach(rating=>{
                if(rating.value =='3.0'){
                    document.getElementById('rating30').innerHTML=rating.count;
                }
                })
            }
           
        }));
     })
    // .then(users=>{
    //     if(users.aggregations.forEach(lng=>{
    //        if(lng.id=="language"){
    //            const kursSayısı = 
    //        }
    //         // if(lng.value=='tr'){
    //         //     document.getElementById('tr').innerHTML=lng.count;
    //         // }
    //         console.log(lng);
    //     }));
    //  })
    .catch(error=>{
        console.log(error);
    })
  }

  // Derslerin sürelerine göre sayılarını Süre filtreleme bölümünde ilgili yerlere yazdırır.
  async function  getDurationCount(search){
    var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    let =  targetUrl = `https://www.udemy.com/api-2.0/courses/?search=${search}`;
    const url = proxyUrl;
    //targetUrl = `https://www.udemy.com/api-2.0/courses/?search=javascript`;
    const searchLesson = await fetch(proxyUrl + targetUrl,{
        headers: {
            method:'GET',
            
            'Authorization': 'Basic dlNxZUNjSWVSWDMyU0ZZSWxrS3NzYVliVkQ2ckZ0NnJGbDQxVUVPQzp0Y0owMHFGVjZVV2pHRUdDUGlncGhDM2VvdG5UNXhuZ3o1UFRuYWhERUNQbTdPRGZZU25qeE1JWkxKbFlOYTZjdVN1NklDbkhMU1VzT0tHMmFhVnQ3b01ISXJWak9GVnlLa09CbTNtVlU4MDlHeXhKdUdYSnFCUnFIMjBWdGVhOQ=='
         }
      })
    //   const lessons= await searchLesson.json();
    //   return {
    //     lessons
    //  }
    
    .then(response=>{
        return response.json();
    })
    .then(users=>{
        if(users.aggregations.forEach(drtn=>{
           if(drtn.id=="duration"){
               var DurationCount = drtn;
               
               DurationCount.options.forEach(duration=>{
                if(duration.value =='short'){
                    document.getElementById('durationSort').innerHTML=duration.count;
                }
               })
           }
           if(drtn.id=="duration"){
                var DurationCount = drtn;
                
                DurationCount.options.forEach(duration=>{
                if(duration.value =='medium'){
                    document.getElementById('durationMedium').innerHTML=duration.count;
                }
                })
            }
            if(drtn.id=="duration"){
                var DurationCount = drtn;
                
                DurationCount.options.forEach(duration=>{
                if(duration.value =='long'){
                    document.getElementById('durationLong').innerHTML=duration.count;
                }
                })
            }
            if(drtn.id=="duration"){
                var DurationCount = drtn;
                
                DurationCount.options.forEach(duration=>{
                if(duration.value =='extraLong'){
                    document.getElementById('durationExtraLong').innerHTML=duration.count;
                }
                })
            }
           
        }));
     })
    // .then(users=>{
    //     if(users.aggregations.forEach(lng=>{
    //        if(lng.id=="language"){
    //            const kursSayısı = 
    //        }
    //         // if(lng.value=='tr'){
    //         //     document.getElementById('tr').innerHTML=lng.count;
    //         // }
    //         console.log(lng);
    //     }));
    //  })
    .catch(error=>{
        console.log(error);
    })
  }

  // Dönen toplam ders sayısını sol üstteki butonda gösterir (count).
function totalCourseCount(search,totalCourseCount)  {
    document.getElementById('totalCourseCount').innerHTML = `<b>${search}</b> için ${totalCourseCount.count} sonuç bulundu`;
    // document.getElementById('totalCourseCount').innerHTML = totalCount.count;
    // document.getElementById('totalCourseCount').innerHTML+=' sonuç bulundu';
}

// Page butonlarından birine tıklanınca o sayfanın url bilgilerini döndürür. 
// Hangi sayfada olduğu belirtir.
function Paging(that){
    
    
    // getCourse(text,pageValue);
    
    sonSayfa = Number(that)+1;
    
     //getCourse(text,that);
     getFilteredCourse(text,languageUrl,ratings,ordering,sonSayfa,timeUrl);
     
    // var id =document.getElementById(that.id);
    // id.classList.add("active");
}

function Paging1(that){
    getFilteredCourse(text,languageUrl,ratings,ordering,that.value)
    //getCourse(text,that.value);
    var id =document.getElementById(that.id);
    id.classList.add("active");
}

function webScraper(that,id){
    alert(that);
    alert(id);
}


// Arama sonuçlarında kaç sayfa olacağı hesaplanır.
function getPaging(users){
    var pageCount = Number(Math.ceil(users.count / page_size));
        var html2 ="";
        for(let i=1;i<=Number(pageCount);i++){
            if(Number(page) === Number(i)){
                html2 += `<li class="page-item ">
                            <button id="${i}" class="active" value="${i}" type="button" class="btn-page" onclick="Paging(this)">
                                ${i}
                            </button>
                        </li>`;
            }else{
                html2 += ` <li class="page-item">
                            <button id="${i}" value="${i}" type="button" class="btn-page" onclick="Paging(this)">
                                ${i}
                            </button>
                        </li>`;
            }
            
            
            document.querySelector('#links').innerHTML = html2;
        }
}

function PaginationDemo(){
    $('#pagination-demo').twbsPagination({
        totalPages: 15,
        // the current page that show on start
        startPage: 1,
        
        // maximum visible pages
        visiblePages: 5,
        
        initiateStartPageClick: true,
        
        // template for pagination links
        href: false,
        
        // variable name in href template for page number
        hrefVariable: '{{number}}',
        
        // Text labels
        first: 'First',
        prev: 'Previous',
        next: 'Next',
        last: 'Last',
        
        // carousel-style pagination
        loop: false,
        
        // callback function
        onPageClick: function (event, page) {
            $('.page-active').removeClass('page-active');
          $('#page'+page).addClass('page-active');
        },
        
        // pagination Classes
        paginationClass: 'pagination',
        nextClass: 'next',
        prevClass: 'prev',
        lastClass: 'last',
        firstClass: 'first',
        pageClass: 'page',
        activeClass: 'active',
        disabledClass: 'disabled'
        
        });
}

// Yorumların gösterildiği tablo silinir.
function deleteMyTable(){
    $('#myTable').dataTable().fnClearTable();
     $('#myTable').dataTable().fnDestroy();
     document.getElementById('comment').style.display="none";
}

// Yorumların olduğu objeyi csv dosyasına yazdırmak için döndürür.
function getPaging2(users){
    var pageLen = Number(Math.ceil(users.count / page_size));
    //var pageLen = 20;
    //var curPage = 1;
    var item = [];
    for(var i = 1; i<=pageLen;i++){
    item.push(i);
    }

    function isPageInRange( curPage, index, maxPages, pageBefore, pageAfter ) {
    if (index <= 1) {
        // first 2 pages
        return true;
    }
    if (index >= maxPages - 2) {
        // last 2 pages
        return true;
    }
    if (index >= curPage - pageBefore && index <= curPage + pageAfter) {
        return true;
    }
    }

    function render( curPage, item, first ) {
    var html = '', separatorAdded = false;
    for(var i in item){
        if ( isPageInRange( curPage, i, pageLen, 2, 2 ) ) {
            //  html += '<li onclick=Paging("'+ i +'") id=("'+ i +'") data-page="' + i + '">' + item[i] + '</li>';
            //html += '<li onclick=Paging(this) id=('+ i +') data-page="' + i + '">' + item[i] + '</li>';
             html += `<li onclick="Paging(this.id)" id="${i}" data-page=${i} > ${item[i]} </li>`;
        // as we added a page, we reset the separatorAdded
        separatorAdded = false;
        } else {
        if (!separatorAdded) {
            // only add a separator when it wasn't added before
            html += '<li class="separator" />';
            separatorAdded = true;
        }
        }
    }
    
    var holder = document.querySelector('#holder');  
    holder.innerHTML = html;
    document.querySelector('#holder>li[data-page="' + curPage + '"]').classList.add('active');
    
    if ( first ) {
        holder.addEventListener('click', function(e) {
        if (!e.target.getAttribute('data-page')) {
            // no relevant item clicked (you could however offer expand here )
            return;
        }
        curPage = parseInt( e.target.getAttribute('data-page') );
        render( curPage, item );
        
        });
    }
    }

    render( sonSayfa-1, item, true );  
    }

// Yorumların olduğu objeyi csv dosyasına yazdırmak için döndürür.
async function Csv(){
    console.log('start');
    var csv = yorumlarıYazdir();
    var commentToCsv = csv[0];
    var courseNames = csv[1];
    for(i=0;i<commentToCsv.length;i++){
        console.log(commentToCsv[i]);
    }
    for(i=0;i<courseNames.length;i++){
        console.log(courseNames[i]);
    }
    alert(commentToCsv);
    var next = null;
    var csvData ="";
    for(i=0;i<commentToCsv.length;i++){
        var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
        targetUrl = `https://www.udemy.com/api-2.0/courses/${commentToCsv[i]}/reviews/?page=1&page_size=2900&is_text_review=1`;
            //targetUrl = `https://www.udemy.com/api-2.0/courses/${id}/reviews?page=1&page_size=1000&is_text_review=1`;
            
        
        do {
            const res = await fetch(proxyUrl + targetUrl,{
                headers: {
                    method:'GET',
                    'Authorization': 'Basic dlNxZUNjSWVSWDMyU0ZZSWxrS3NzYVliVkQ2ckZ0NnJGbDQxVUVPQzp0Y0owMHFGVjZVV2pHRUdDUGlncGhDM2VvdG5UNXhuZ3o1UFRuYWhERUNQbTdPRGZZU25qeE1JWkxKbFlOYTZjdVN1NklDbkhMU1VzT0tHMmFhVnQ3b01ISXJWak9GVnlLa09CbTNtVlU4MDlHeXhKdUdYSnFCUnFIMjBWdGVhOQ=='
                }
            })
            
            
            .then(response=>{
                return response.json();
                
            }).then(users=>{
                next = users.next;
                var json =  users.results;
                
                const data = json.map(row =>({
                        courseId:commentToCsv[i],
                        courseName:courseNames[i],
                        commentId : row.id,
                        userName : row.user.display_name,
                        comment : row.content,
                        rating : row.rating,
                        createdDate : row.created
                
                
                }));
                csvData = csvData + objectToCsv(data);
                if(next!=null){
                    targetUrl = next;
                    console.log(targetUrl);
                }

                //console.log(csvData);
                
                
            // return  users.results;
            })
            .catch(error=>{
                console.log(error);
            })
        } while (next!=null);
    }
    console.log('end');
    download(csvData);
    
//     var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
//     targetUrl = `https://www.udemy.com/api-2.0/courses/${commentToCsv[1]}/reviews/?page=1&page_size=2900&is_text_review=1`;
//     //targetUrl = `https://www.udemy.com/api-2.0/courses/${id}/reviews?page=1&page_size=1000&is_text_review=1`;
    
   
//    do {
//     const res = await fetch(proxyUrl + targetUrl,{
//         headers: {
//             method:'GET',
//             'Authorization': 'Basic dlNxZUNjSWVSWDMyU0ZZSWxrS3NzYVliVkQ2ckZ0NnJGbDQxVUVPQzp0Y0owMHFGVjZVV2pHRUdDUGlncGhDM2VvdG5UNXhuZ3o1UFRuYWhERUNQbTdPRGZZU25qeE1JWkxKbFlOYTZjdVN1NklDbkhMU1VzT0tHMmFhVnQ3b01ISXJWak9GVnlLa09CbTNtVlU4MDlHeXhKdUdYSnFCUnFIMjBWdGVhOQ=='
//          }
//       })
      
     
//     .then(response=>{
//         return response.json();
        
//      }).then(users=>{
//          next = users.next;
//          var json =  users.results;
//          const data = json.map(row =>({
//                 commentId : row.id,
//                 userName : row.user.display_name,
//                 comment : row.content,
//                 rating : row.rating,
//                 createdDate : row.created
          
           
//         }));
//          csvData = csvData + objectToCsv(data);
//         if(next!=null){
//             targetUrl = next;
//             console.log(targetUrl);
//         }else {
//             download(csvData);
//         }

//         //console.log(csvData);
        
        
//       // return  users.results;
//      })
//     .catch(error=>{
//         console.log(error);
//     })
//    } while (next!=null);
}

function objectToCsv (data){
    const csvRows = [];
    // get the headers
    const headers = Object.keys(data[0]);
    csvRows.push(headers.join(','));
    

    // loop over the rows
    for (const row of data){

        const values = headers.map(header=>{
            //const escaped = (''+row[header]).replace(/"/g, '\\"');
            const escaped = (''+row[header]).replace(/"/g, '\\"').replace(/'\'/g,'\\"\"');
            return `"${escaped}"`;
        });
       csvRows.push(values.join(','));
    }
    
    // form escaped comma seperated values
     return csvRows.join('\n');
}

function download(data){
    const blob = new Blob([data], {type: 'text/csv'});
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden','');
    a.setAttribute('href', url);
    a.setAttribute('download','download.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    console.log('end 2');
};
// Yorumları csv dosyasına yazdırma ve indirme işlemleri
function getReport(){
    getCommentForCsv();
        console.log('done');
        
}












   