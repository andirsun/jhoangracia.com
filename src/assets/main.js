
const getBlogs = () => {
  fetch('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@jhoangracia')
  .then(response => response.json())
  .then(data => {
    let postsHtml = '';
    data.items?.map ((post, index) => {
      if (index==0) {
        postsHtml += `
					<div class="transform transition duration-500 hover:scale-110 m-10 max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden md:max-w-3xl">
						<div class="md:flex p-4">
							<div class="md:flex-shrink-0">
								<img class="h-80 w-full object-cover md:h-full md:w-80 " src=${post.thumbnail} alt="postimg">
							</div>
							<div class="flex flex-wrap p-8 content-center">
								<h2 class="medium-title text-3xl">${post.title}</h2>
								<p class="mt-2 text-xl text-gray-500">
									${post.description.replace(/(<([^>]+)>)/gi, "").slice(0,200)}...
								</p>
								${
									post.categories.map((item) => (
										`<ion-chip mode="ios" color="primary">
											<ion-label color="primary">${item}</ion-label>
										</ion-chip>`
									))
								}
							</div>
						</div>
					</div>
					
					<div class="flex justify-center">
						<div class="w-full md:w-3/4 grid grid-cols-3 gap-4">
				`
      } else if (index < 4){
        postsHtml+= `
          <div class="col-span-3 md:col-span-1 transform transition duration-500 hover:scale-110">
            <ion-card mode="ios" href=${post.link}>
              <img class="small-posts" src=${post.thumbnail} >
              <ion-card-header>
                <ion-card-subtitle>${post.pubDate.split(' ')[0]}</ion-card-subtitle>
                <ion-card-title>${post.title}</ion-card-title>
              </ion-card-header>

              <ion-card-content>
                ${post.description.replace(/(<([^>]+)>)/gi, "").slice(0,100)}...
              </ion-card-content>
            </ion-card>
          </div>` 
      }
    });
    postsHtml+= 
			`</div>
			</div>`;
			const buttonHtml = `
				<div class="flex justify-center mb-10 mt-10">
					<ion-button class="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-150" mode="ios"  target=”_blank” href=${data.feed.link} >
						Ver Todos 
					</ion-button>
				</div>`;
		// Load the cards into Html
		document.getElementById("blogs-content").outerHTML = `${postsHtml}${buttonHtml}`;

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

getBlogs ();
getPodcastPosts ();