// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

// Описан в документации
import SimpleLightbox from "simplelightbox";
// Дополнительный импорт стилей
import "simplelightbox/dist/simple-lightbox.min.css";


console.log(galleryItems);

const galleryList = document.querySelector(".gallery");

const markup = galleryItems.map(({preview, original, description}) => 
    `<li class="gallery__item">
        <a class="gallery__link" href="large-image.jpg">
            <img
                class="gallery__image"
                src="${preview}"
                data-source="${original}"
                alt="${description}"
            />
        </a>
    </li>`
);

galleryList.insertAdjacentHTML("beforeend", markup.join(""));



galleryList.addEventListener("click", onClick);

let instance = basicLightbox.create("");

function onClick(evt) {
    evt.preventDefault();
    const {target} = evt;
    if (!target.classList.contains("gallery__image")) {
        return;
    }


    instance = basicLightbox.create(`<img class="gallery__image" 
    src="${target.getAttribute("data-source")}" 
    alt="${target.alt}"/>`);



    instance.show();
};


galleryList.addEventListener("keydown", (evtClose) => {
    if (evtClose.key === "Escape") {
        instance.close();
    };
});