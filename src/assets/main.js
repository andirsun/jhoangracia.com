
const getBlogPosts = () => {
  fetch('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@jhoangracia')
  .then(response => response.json())
  .then(data => {
    let postsHtml = '';
    data.items?.map ((post,index)=> {
      if (index==0) {
        postsHtml+= `
          <ion-row>
            <ion-col offset="3" size="6" offset-bg="0">
              <ion-card class="post-card" mode="ios" href=${post.link}>
                <img class="first-post" src=${post.thumbnail} >
                <ion-card-header>
                  <ion-card-subtitle>${post.pubDate.split(' ')[0]}
                  ${
                    post.categories.map((item) =>{
                      return `<ion-chip mode="ios" outline="true" color="primary">
                        <ion-label color="primary">${item}</ion-label>
                      </ion-chip>`
                    })
                  }
                  </ion-card-subtitle>
                  <ion-card-title>${post.title}</ion-card-title>
                </ion-card-header>
    
                <ion-card-content>
                  ${post.description.replace(/(<([^>]+)>)/gi, "").slice(0,200)}...
                  <a href=${post.link}>
                    Leer
                  </a>
    
                </ion-card-content>
              </ion-card>
            </ion-col>
          </ion-row>
          <ion-row>
        `;
      } else if (index < 4){
        postsHtml+= `
          <ion-col offset=${(index==1) ? "3" : "0"} size="2">
            <ion-card  mode="ios" href=${post.link}>
              <img class="small-posts" src=${post.thumbnail} >
              <ion-card-header>
                <ion-card-subtitle>${post.pubDate.split(' ')[0]}</ion-card-subtitle>
                <ion-card-title>${post.title}</ion-card-title>
              </ion-card-header>

              <ion-card-content>
                ${post.description.replace(/(<([^>]+)>)/gi, "").slice(0,100)}...
                <a href=${post.link}>
                  Leer
                </a>

              </ion-card-content>
            </ion-card>
          </ion-col>` 
      }
    });
    postsHtml+= `
      <ion-col class="ion-no-margin ion-align-self-center">
        <ion-button mode="ios" target=”_blank” href=${data.feed.link} >
            Ver Mas &nbsp;
            <ion-icon name="arrow-forward-outline"></ion-icon>
          </ion-button>
        </ion-col>
      </ion-row>`
    postsHtml+= '</ion-row>'
    // Adding the html of cards
    document.getElementById("blogs-content").innerHTML = postsHtml;
  });

}
const getPodcastPosts = () => {
  fetch('https://api.rss2json.com/v1/api.json?rss_url=https://anchor.fm/s/31c1b9d0/podcast/rss')
    .then(response => response.json())
    .then(data => {
      let postsHtml = '';
      data.items?.map ((post,index)=> {
        if (index==0) {
          postsHtml+= `
            <ion-row>
              <ion-col offset="3" size="6">
                <ion-card class="post-card" mode="ios" href=${post.link}>
                  <img class="first-post" src=${post.thumbnail} >
                  <ion-card-header>
                    <ion-card-subtitle>${post.pubDate.split(' ')[0]}</ion-card-subtitle>
                    <ion-card-title>${post.title}</ion-card-title>
                  </ion-card-header>
      
                  <ion-card-content>
                    ${post.description.replace(/(<([^>]+)>)/gi, "").slice(0,200)}...
                    <a href=${post.link}>
                      Leer
                    </a>
      
                  </ion-card-content>
                </ion-card>
              </ion-col>
            </ion-row>
            <ion-row>
          `;
        } else if (index > 0 && index <4) {
          postsHtml+= `
            <ion-col offset=${(index==1) ? "3" : "0"} size="2">
              <ion-card  mode="ios" href=${post.link}>
                <img class="small-posts" src=${post.thumbnail} >
                <ion-card-header>
                  <ion-card-subtitle>${post.pubDate.split(' ')[0]}</ion-card-subtitle>
                  <ion-card-title>${post.title}</ion-card-title>
                </ion-card-header>
  
                <ion-card-content>
                  ${post.description.replace(/(<([^>]+)>)/gi, "").slice(0,100)}...
                  <a href=${post.link}>
                    Escuchar
                  </a>
  
                </ion-card-content>
              </ion-card>
            </ion-col>` 
        }
        
      });
      postsHtml+= '</ion-row>'
      // Adding the html of cards
      document.getElementById("purga-content").innerHTML = postsHtml;
    });
}

getBlogPosts ();
getPodcastPosts ();