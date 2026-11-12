// Tiny scripts placed in <head> (plain strings, so the server can include them in every page).

// Runs before the page is shown (see layout) so the saved mode never flashes.
export const themeScript = `(function(){try{var t=localStorage.getItem("merc-theme");if(!t){t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}if(t==="dark")document.documentElement.classList.add("dark")}catch(e){}})();`;

// Runs in <head> before the page is drawn: decides whether to play the intro.
export const introScript = `(function(){try{var d=document.documentElement;
var fix=/introAt=/.test(location.search);
if(!fix&&sessionStorage.getItem("merc-intro")||matchMedia("(prefers-reduced-motion: reduce)").matches)return;
sessionStorage.setItem("merc-intro","1");d.classList.add("intro");
var end=function(){d.classList.remove("intro");d.classList.remove("intro-skip")};
var t=fix?0:setTimeout(end,3900);
var skip=function(){if(!d.classList.contains("intro"))return;clearTimeout(t);d.classList.add("intro-skip");setTimeout(end,500);
removeEventListener("pointerdown",skip);removeEventListener("keydown",skip)};
setTimeout(function(){addEventListener("pointerdown",skip);addEventListener("keydown",skip)},300);
}catch(e){}})();`;
