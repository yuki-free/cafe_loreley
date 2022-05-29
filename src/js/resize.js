window.addEventListener('DOMContentLoaded', () => {
  let timeoutId;

  const beforeWindowWidth = window.innerWidth;
  
  window.addEventListener( "resize", function () {
    if ( timeoutId ) return ;
  
    timeoutId = setTimeout( () => {
      timeoutId = 0 ;
  
      const currentWindowWidth = window.innerWidth;
  
      if (beforeWindowWidth <= 1024 && currentWindowWidth > 1024 || beforeWindowWidth > 1024 && currentWindowWidth <= 1024) {
        location.reload();
      }
    }, 100);
  });
});

