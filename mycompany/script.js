  function myFunction(event) {
  if (event.target.parentElement.className === "topnav") {
      event.target.parentElement.className += "responsive";
  } else {
    event.target.parentElement.className = "topnav";
  }
}
const burger=document.getElementById('menu');
burger.addEventListener('click' , myFunction);
