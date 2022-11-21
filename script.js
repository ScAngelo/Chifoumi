const POINTS_IA = document.getElementById('points-ia');
const MES_POINTS = document.getElementById('mes-points');

const MES_CHOIX = document.getElementById('mes-choix');
const CHOIX_IA = document.getElementById('choix-ia');
const TABLEAU_IA = document.querySelectorAll('#mes-choix > img');
const RESULTAT_JEU = document.getElementById('resultat');

const IMG_PIERRE = document.getElementById('choixpierre');
const IMG_PAPIER = document.getElementById('choixpapier');
const IMG_CISEAU = document.getElementById('choixciseau');
const IMG_LEZARD = document.getElementById('choixlezard');
const IMG_SPOCK = document.getElementById('choixspock');

POINTS_IA.innerHTML = 10;
MES_POINTS.innerHTML = 10;
//fonction du choix de l'ia avec un math random qui sera l'indice du tableau de l'ia pour qu'il choisisse entre pierre papier ciseau
function choixDeIA(){
    let random = Math.floor(Math.random() * 5);
    console.log(random);
    let result = TABLEAU_IA[random];
    console.log(result.src);
    return result.src;
};

function showHide(){
    IMG_CISEAU.classList.remove('show');
    IMG_PAPIER.classList.remove('show');
    IMG_PIERRE.classList.remove('show');
    IMG_LEZARD.classList.remove('show');
    IMG_SPOCK.classList.remove('show');
    IMG_CISEAU.classList.add('hide');
    IMG_PAPIER.classList.add('hide');
    IMG_PIERRE.classList.add('hide');
    IMG_LEZARD.classList.add('hide');
    IMG_SPOCK.classList.add('hide');
}

//démarre le lancer de l'ia via l'appel de fonction
CHOIX_IA.innerHTML = `<div><img src="${choixDeIA()}" alt=""></div>`;

//fonction de mon choix et boucle for qui retourne le tableau des images pierre papier ciseau
function monChoice(){
    for(let i=0; i<TABLEAU_IA.length; i++){
        
    //console.log(TABLEAU_IA[i]);
        TABLEAU_IA[i].addEventListener('click', (event) => {      

            let compareME = TABLEAU_IA[i].src;
            //console.log('compareME : '+compareME);

            console.log(event.currentTarget.src);
            //  event.currentTarget.classList.add('show');

            //relance le lancer de l'ia au click de notre choix grace a l'event
            let compareIA = choixDeIA();
            CHOIX_IA.innerHTML = `<div><img src="${compareIA}" alt=""></div>`;

            //console.log('compareIA : '+compareIA);
            // constante pour changer l'ip du serveur facilement afin de comparer les liens des images dans le if et elseif
            const HTTP_REQ = 'http://127.0.0.1:5500/assets/';
            //comparaisons des images pour dire si l'on gagne ou si l'on perd la partie, on incremente le score dans les points, on fait un toggle des classes show et hide pour la non transparence de notre choix
            if(
                ((compareME == HTTP_REQ+'pierre.jpg') && (compareIA == HTTP_REQ+'ciseaux.jpg')) ||
                ((compareME == HTTP_REQ+'pierre.jpg') && (compareIA == HTTP_REQ+'lezard.jpg')) || 
                ((compareME == HTTP_REQ+'ciseaux.jpg') && (compareIA == HTTP_REQ+'feuille.jpg')) ||
                ((compareME == HTTP_REQ+'ciseaux.jpg') && (compareIA == HTTP_REQ+'lezard.jpg')) ||
                ((compareME == HTTP_REQ+'feuille.jpg') && (compareIA == HTTP_REQ+'pierre.jpg')) ||
                ((compareME == HTTP_REQ+'feuille.jpg') && (compareIA == HTTP_REQ+'spock.jpg')) ||
                ((compareME == HTTP_REQ+'lezard.jpg') && (compareIA == HTTP_REQ+'spock.jpg')) ||
                ((compareME == HTTP_REQ+'lezard.jpg') && (compareIA == HTTP_REQ+'papier.jpg')) ||
                ((compareME == HTTP_REQ+'spock.jpg') && (compareIA == HTTP_REQ+'ciseaux.jpg')) ||
                ((compareME == HTTP_REQ+'spock.jpg') && (compareIA == HTTP_REQ+'pierre.jpg'))
            ){   console.log("BRAVO TU AS GAGNÉ !!😉");

                if(POINTS_IA.innerHTML > 0){
                    RESULTAT_JEU.innerHTML = 'BRAVO TU AS GAGNÉ !!😉';
                    POINTS_IA.innerHTML--;
                }else if(POINTS_IA.innerHTML == 0){
                    RESULTAT_JEU.innerHTML = 'PARTIE TERMINEE BRAVO TU AS GAGNÉ !!😉🥳🥳';
                    POINTS_IA.innerHTML = 10;
                    MES_POINTS.innerHTML = 10;
                }

                showHide();
                event.currentTarget.classList.remove('hide');
                event.currentTarget.classList.add('show');

            }else if(
            ((compareME == HTTP_REQ+'pierre.jpg') && (compareIA == HTTP_REQ+'pierre.jpg'))  || 
            ((compareME == HTTP_REQ+'ciseaux.jpg') && (compareIA == HTTP_REQ+'ciseaux.jpg'))  ||
            ((compareME == HTTP_REQ+'feuille.jpg') && (compareIA == HTTP_REQ+'feuille.jpg'))  ||
            ((compareME == HTTP_REQ+'lezard.jpg') && (compareIA == HTTP_REQ+'lezard.jpg'))  ||
            ((compareME == HTTP_REQ+'spock.jpg') && (compareIA == HTTP_REQ+'spock.jpg'))
            ){   console.log("EX AEQUO... REJOUE !!"); 
                RESULTAT_JEU.innerHTML = 'EX AEQUO... REJOUE !!🙃';
                showHide();
                event.currentTarget.classList.remove('hide');
                event.currentTarget.classList.add('show');   

            }else {
                console.log("PERDUUUU !!🙁");
                if(MES_POINTS.innerHTML > 0){
                    RESULTAT_JEU.innerHTML = 'PERDUUUU !!🙁';
                    MES_POINTS.innerHTML--;
                }else if(MES_POINTS.innerHTML == 0){
                    RESULTAT_JEU.innerHTML = 'PARTIE TERMINEE TU AS PERDUUUU !!🙁';
                    MES_POINTS.innerHTML = 10;
                    POINTS_IA.innerHTML = 10;
                }

                showHide();
                event.currentTarget.classList.remove('hide');
                event.currentTarget.classList.add('show');
            };
        });
    }
}
//appel de fonction de mon choix
monChoice();
